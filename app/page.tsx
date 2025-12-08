type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
};

type Experience = {
  role: string;
  place: string;
  period: string;
  focus: string[];
};

const projects: Project[] = [
  {
    title: "Realtime Collaboration Board",
    description:
      "A Figma-inspired canvas with CRDT syncing, presence indicators, and keyboard-first UX.",
    stack: ["Next.js", "TypeScript", "WebSocket", "Tailwind"],
    link: "https://github.com/",
  },
  {
    title: "AI Study Buddy",
    description:
      "Personalized learning planner that creates spaced-repetition decks from lecture notes.",
    stack: ["Next.js", "tRPC", "PostgreSQL", "OpenAI"],
    link: "https://github.com/",
  },
  {
    title: "Systems Toolkit",
    description:
      "CLI + dashboard for profiling algorithms; includes benchmarks, charts, and exports.",
    stack: ["Rust", "Next.js", "D3.js"],
  },
];

const experiences: Experience[] = [
  {
    role: "Software Engineering Student",
    place: "Self-directed + University",
    period: "2022 — Present",
    focus: ["systems fundamentals", "frontend craft", "team practices"],
  },
  {
    role: "Open Source Contributor",
    place: "Community Projects",
    period: "2023 — Present",
    focus: ["DX improvements", "docs", "testing"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 sm:px-12 lg:px-20">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">
            Portfolio
          </p>
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Hi, I am Bahadır —
                <span className="block text-slate-200">
                  Software & Computer Engineering student crafting clean,
                  thoughtful products.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/80">
                I blend systems thinking with sharp UI skills. I like code that
                is testable, predictable, and easy to onboard. My toolkit spans
                product UI, API design, and performance-minded engineering.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-200/90">
              <Stat label="Based in" value="Frankfurt, DE" />
              <Stat label="Focus" value="Web • Systems" />
              <Stat label="Currently" value="Building & learning" />
              <Stat label="Email" value="bahadirsulukan@gmail.com" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              "TypeScript",
              "React / Next.js",
              "Node.js",
              "PostgreSQL",
              "Tailwind",
              "Testing",
              "Design Systems",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-slate-200/90"
              >
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr_1.1fr]">
          <Card title="Selected Projects" eyebrow="Builds">
            <div className="space-y-4">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-200/80">
                        {project.description}
                      </p>
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        className="text-xs font-medium text-slate-200/80 underline-offset-4 hover:text-white hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : null}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200/80">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/10 px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card title="Experience" eyebrow="Path">
            <div className="space-y-4">
              {experiences.map((exp) => (
                <article
                  key={exp.role}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between text-sm text-slate-200/80">
                    <span>{exp.place}</span>
                    <span>{exp.period}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {exp.role}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200/80">
                    {exp.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/10 px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Card>
        </section>

        <Card title="Story" eyebrow="About">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-4 text-slate-200/85">
              <p>
                I enjoy understanding how things work under the hood, then
                translating that into smooth product experiences. I pair solid
                fundamentals (data structures, networking, OS basics) with
                practical shipping habits: tight feedback loops, tests, and
                clear documentation.
              </p>
              <p>
                Outside of code, I sketch interfaces, read about distributed
                systems, and mentor peers on clean code and Git workflows. My
                goal: build reliable products that feel effortless to use.
              </p>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/85">
              <Bullet
                label="Principles"
                items={["Clarity first", "Test what matters", "Small batches"]}
              />
              <Bullet
                label="Practices"
                items={[
                  "Design systems",
                  "API contracts",
                  "Performance budgets",
                ]}
              />
              <Bullet
                label="Learning"
                items={["Distributed systems", "Rust", "UI animation"]}
              />
            </div>
          </div>
        </Card>

        <Card title="Get in touch" eyebrow="Contact">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-200/85">
              Have an idea, a project, or a study group? I am open to
              internships, collaborations, and open-source work.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="mailto:you@example.com"
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white transition hover:border-white/40 hover:bg-white/20"
              >
                Email me
              </a>
              <a
                href="https://www.linkedin.com"
                className="rounded-full border border-white/10 px-4 py-2 text-slate-200/85 underline-offset-4 transition hover:border-white/30 hover:text-white hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                className="rounded-full border border-white/10 px-4 py-2 text-slate-200/85 underline-offset-4 transition hover:border-white/30 hover:text-white hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="text-sm text-slate-200/85">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function Bullet({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-200/85">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white/10 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
