"use client";

import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const FRAME_SOURCES = Array.from({ length: 40 }, (_, index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${frame}.jpg`;
});

const FRAME_COUNT = FRAME_SOURCES.length;

type OverlayConfig = {
  title: string;
  copy: string;
  input: [number, number, number, number];
  desktopAlignment: "left" | "center" | "right";
};

const overlays: OverlayConfig[] = [
  {
    title: "EmagineX",
    copy: "AI automation for modern businesses.",
    input: [0, 0.06, 0.18, 0.28],
    desktopAlignment: "center"
  },
  {
    title: "Disconnected Tools",
    copy: "Your systems shouldn't work alone.",
    input: [0.16, 0.26, 0.38, 0.5],
    desktopAlignment: "left"
  },
  {
    title: "Intelligent Automation",
    copy: "AI connects your workflows.",
    input: [0.5, 0.6, 0.72, 0.84],
    desktopAlignment: "right"
  },
  {
    title: "Fully Automated",
    copy: "Your business. Optimized by AI.",
    input: [0.8, 0.9, 0.98, 1],
    desktopAlignment: "center"
  }
];

const heroMetrics = [
  { label: "Response Time", value: "< 60s" },
  { label: "Systems Unified", value: "CRM + Ops + Support" },
  { label: "Automation Coverage", value: "24/7" }
];

function clampFrame(frame: number) {
  return Math.max(0, Math.min(frame, FRAME_COUNT - 1));
}

function getCoverDimensions(
  viewportWidth: number,
  viewportHeight: number,
  imageWidth: number,
  imageHeight: number
) {
  const scale = Math.max(viewportWidth / imageWidth, viewportHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;

  return {
    width,
    height,
    x: (viewportWidth - width) / 2,
    y: (viewportHeight - height) / 2
  };
}

function overlayPositionClass(alignment: OverlayConfig["desktopAlignment"]) {
  if (alignment === "left") {
    return "justify-center md:justify-start";
  }

  if (alignment === "right") {
    return "justify-center md:justify-end";
  }

  return "justify-center";
}

function textAlignClass(alignment: OverlayConfig["desktopAlignment"]) {
  if (alignment === "left") {
    return "text-center md:text-left";
  }

  if (alignment === "right") {
    return "text-center md:text-right";
  }

  return "text-center";
}

export default function AIAutomationScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isReady = loadedCount === FRAME_COUNT;

  const drawFrame = useMemo(
    () => (frameIndex: number) => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      const image = framesRef.current[frameIndex];

      if (!canvas || !context || !image) {
        return;
      }

      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;

      context.clearRect(0, 0, cssWidth, cssHeight);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      const { width, height, x, y } = getCoverDimensions(
        cssWidth,
        cssHeight,
        image.width,
        image.height
      );

      context.drawImage(image, x, y, width, height);
      renderedFrameRef.current = frameIndex;
    },
    []
  );

  useEffect(() => {
    setHasMounted(true);
    framesRef.current = new Array(FRAME_COUNT).fill(null);

    let isCancelled = false;

    FRAME_SOURCES.forEach((src, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;

      image.onload = () => {
        if (isCancelled) {
          return;
        }

        framesRef.current[index] = image;
        setLoadedCount((count) => count + 1);
      };

      image.onerror = () => {
        if (!isCancelled) {
          setFailedCount((count) => count + 1);
        }
      };
    });

    return () => {
      isCancelled = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true
    });

    if (!context) {
      return;
    }

    contextRef.current = context;

    const updateSize = () => {
      const viewportWidth = canvas.clientWidth;
      const viewportHeight = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(viewportWidth * dpr);
      canvas.height = Math.round(viewportHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(
        clampFrame(
          renderedFrameRef.current >= 0
            ? renderedFrameRef.current
            : Math.round(currentFrameRef.current)
        )
      );
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(canvas);
    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [drawFrame]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const initialFrame = shouldReduceMotion
      ? FRAME_COUNT - 1
      : Math.round(targetFrameRef.current);

    currentFrameRef.current = initialFrame;
    targetFrameRef.current = initialFrame;
    drawFrame(clampFrame(initialFrame));
  }, [drawFrame, isReady, shouldReduceMotion]);

  const animateTowardsTarget = useMemo(
    () => () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) < 0.015) {
        currentFrameRef.current = target;
      } else {
        currentFrameRef.current = current + delta * 0.18;
      }

      const nextFrame = clampFrame(Math.round(currentFrameRef.current));

      if (nextFrame !== renderedFrameRef.current) {
        drawFrame(nextFrame);
      }

      if (Math.abs(targetFrameRef.current - currentFrameRef.current) >= 0.015) {
        rafRef.current = requestAnimationFrame(animateTowardsTarget);
        return;
      }

      rafRef.current = null;
    },
    [drawFrame]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady || shouldReduceMotion) {
      return;
    }

    const nextFrame = clampFrame(latest * (FRAME_COUNT - 1));

    if (Math.abs(nextFrame - targetFrameRef.current) < 0.01) {
      return;
    }

    targetFrameRef.current = nextFrame;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animateTowardsTarget);
    }
  });

  return (
    <section
      id="automation-system"
      ref={sectionRef}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-fog-radial" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(236,236,236,0.22),rgba(230,230,230,0.46))]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),rgba(255,255,255,0)_54%)]" />

        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-black/[0.08] pb-5 text-sm text-black/60">
            <span className="font-medium uppercase tracking-[0.28em] text-black/80">
              EmagineX
            </span>
            <div className="flex items-center gap-5">
              <nav className="hidden gap-8 md:flex">
                <a href="#automation-system">System</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
              </nav>
              <a
                href="#contact"
                className="inline-flex h-10 items-center rounded-full border border-black/10 bg-white/[0.82] px-4 text-xs font-medium uppercase tracking-[0.18em] text-black/80 backdrop-blur-md transition hover:bg-white"
              >
                Start audit
              </a>
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="relative z-10 h-screen w-full"
          aria-label="EmagineX AI automation system animation"
        />

        <div className="pointer-events-none absolute inset-0 z-20">
          {overlays.map((overlay) => (
            <OverlayBlock
              key={overlay.title}
              overlay={overlay}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.5rem] border border-white/40 bg-white/[0.36] p-4 shadow-soft backdrop-blur-[8px]"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-black/45">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-base font-medium tracking-[-0.03em] text-black/85 sm:text-lg">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-white/40 bg-white/[0.36] px-4 py-3 shadow-soft backdrop-blur-[8px] lg:min-w-[280px]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-black/42">
                <span>Scroll progress</span>
                <span>Automation sequence</span>
              </div>
              <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-black/[0.08]">
                <motion.div
                  style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
                  className="h-full rounded-full bg-black/75"
                />
              </div>
            </div>
          </div>
        </div>

        {!isReady && hasMounted ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(236,236,236,0.8)] backdrop-blur-sm">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/70 shadow-soft">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/15 border-t-black/60" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-[0.04em] text-black/80">
                  Initializing EmagineX automation engine...
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-black/45">
                  {loadedCount}/{FRAME_COUNT} frames ready
                </p>
                {failedCount > 0 ? (
                  <p className="mt-2 text-xs text-black/55">
                    {failedCount} frame{failedCount === 1 ? "" : "s"} failed to load.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OverlayBlock({
  overlay,
  scrollYProgress
}: {
  overlay: OverlayConfig;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, overlay.input, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, overlay.input, [10, 0, 0, -10]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex items-start px-6 pt-[13.5rem] md:items-center md:px-10 md:pt-0 lg:px-16 ${overlayPositionClass(overlay.desktopAlignment)}`}
    >
      <div
        className={`max-w-[21rem] rounded-[1.8rem] border border-white/45 bg-white/[0.3] px-5 py-4 shadow-soft backdrop-blur-[8px] md:max-w-[25rem] md:px-6 md:py-5 ${textAlignClass(overlay.desktopAlignment)}`}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-black/45">
          Connected by AI
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-black/90 md:text-5xl">
          {overlay.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-black/60 md:text-base">
          {overlay.copy}
        </p>
      </div>
    </motion.div>
  );
}
