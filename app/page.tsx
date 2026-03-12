import AIAutomationScroll from "@/components/AIAutomationScroll";

const services = [
  {
    title: "Workflow Architecture",
    copy: "We audit handoffs, identify drag, and redesign the operating model so automation has a clean system to plug into."
  },
  {
    title: "Agentic Execution",
    copy: "Lead routing, reporting, customer support, and internal operations become coordinated flows instead of disconnected tasks."
  },
  {
    title: "Operational Clarity",
    copy: "Every automation is built to stay visible, measurable, and stable across the teams that rely on it."
  }
];

const proof = [
  {
    stat: "CRM to delivery",
    label: "One connected system from acquisition through execution"
  },
  {
    stat: "AI-first ops",
    label: "Automations designed as infrastructure, not one-off hacks"
  },
  {
    stat: "Quiet control",
    label: "Clear ownership, observability, and human override paths"
  }
];

const process = [
  {
    index: "01",
    title: "Audit the system",
    copy: "We map the current toolchain, identify duplicate effort, and locate where context is lost."
  },
  {
    index: "02",
    title: "Design orchestration",
    copy: "We define the logic layer that connects channels, data, approvals, and AI agents into one operational flow."
  },
  {
    index: "03",
    title: "Deploy with restraint",
    copy: "Automations ship with reporting, fallbacks, and clean interfaces so the system improves the business instead of complicating it."
  }
];

export default function Home() {
  return (
    <main className="editorial-shell relative isolate">
      <div className="relative z-10">
        <AIAutomationScroll />

        <section
          id="services"
          className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
        >
          <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-[0.32em] text-black/40">
                System design for operators
              </p>
              <h2 className="mt-5 text-[2.8rem] font-medium leading-[0.96] tracking-[-0.06em] text-black/90 sm:text-[4.2rem]">
                Premium automation should feel structural, not promotional.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-black/60">
                EmagineX builds a business operating layer where tools,
                decisions, and AI actions move through one coherent system.
              </p>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group rounded-[2.2rem] border border-black/[0.08] bg-white/[0.52] p-7 shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/[0.68]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.26em] text-black/38">
                        Capability
                      </p>
                      <h3 className="mt-3 text-[1.8rem] font-medium tracking-[-0.05em] text-black/90">
                        {service.title}
                      </h3>
                    </div>
                    <span className="mt-1 text-xs uppercase tracking-[0.24em] text-black/30 transition group-hover:text-black/50">
                      Core
                    </span>
                  </div>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-black/60">
                    {service.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16 lg:pb-32">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2.8rem] border border-black/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,255,255,0.38))] p-8 shadow-soft backdrop-blur-md sm:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-black/42">
                Why it works
              </p>
              <h2 className="mt-5 max-w-3xl text-[2.6rem] font-medium leading-[0.98] tracking-[-0.06em] text-black/90 sm:text-[3.7rem]">
                The objective is not more automation. It is a business that behaves like one system.
              </h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {proof.map((item) => (
                  <div
                    key={item.stat}
                    className="rounded-[1.75rem] border border-black/[0.06] bg-white/[0.46] p-5"
                  >
                    <p className="text-lg font-medium tracking-[-0.04em] text-black/88">
                      {item.stat}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-black/58">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.8rem] border border-black/[0.08] bg-black/[0.9] p-8 text-white shadow-soft sm:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                What changes
              </p>
              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/40">
                    Before
                  </p>
                  <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-white/92">
                    Manual updates, fragmented context, slow follow-through.
                  </p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/40">
                    After
                  </p>
                  <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-white/92">
                    One intelligent layer routing intent, data, approvals, and action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16 lg:pb-32">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.32em] text-black/40">
                Delivery model
              </p>
              <h2 className="mt-5 text-[2.5rem] font-medium leading-[0.98] tracking-[-0.06em] text-black/90 sm:text-[3.6rem]">
                A sharper process. Less theatre. Better systems.
              </h2>
            </div>

            <div className="grid gap-4">
              {process.map((step) => (
                <article
                  key={step.index}
                  className="grid gap-5 rounded-[2rem] border border-black/[0.08] bg-white/[0.44] p-6 shadow-soft backdrop-blur-md sm:grid-cols-[96px_1fr] sm:items-start sm:p-7"
                >
                  <div className="text-sm uppercase tracking-[0.28em] text-black/35">
                    {step.index}
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.04em] text-black/90">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-black/60">
                      {step.copy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16 lg:pb-24"
        >
          <div className="overflow-hidden rounded-[2.8rem] border border-black/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(241,241,241,0.48))] px-6 py-10 shadow-soft backdrop-blur-md sm:px-10 sm:py-12">
            <p className="text-xs uppercase tracking-[0.3em] text-black/42">
              Contact
            </p>
            <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <h2 className="text-[2.8rem] font-medium leading-[0.96] tracking-[-0.06em] text-black/90 sm:text-[4.4rem]">
                  Build an automation ecosystem that scales with precision.
                </h2>
                <p className="mt-4 text-base leading-7 text-black/60">
                  Strategy, orchestration, implementation, and refinement for
                  modern businesses that need AI to operate like infrastructure.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[240px]">
                <a
                  href="mailto:hello@emaginex.ai"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-black px-6 text-sm font-medium text-white transition hover:bg-black/85"
                >
                  hello@emaginex.ai
                </a>
                <p className="text-sm text-black/50">
                  System audits, workflow design, agent implementation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
