"use client";

import React, { useState } from "react";

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
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50 overflow-hidden">
      <style>
        {`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .project-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          transform: translateY(-8px);
        }

        .tech-badge {
          transition: all 0.2s ease;
        }

        .tech-badge:hover {
          transform: scale(1.08);
          background-color: rgba(139, 92, 246, 0.3);
          border-color: rgba(139, 92, 246, 0.6);
        }

        .stat-box {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .stat-box:hover::before {
          left: 100%;
        }

        .stat-box:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.08);
        }
      `}
      </style>
      <div className="mx-auto flex w-full max-w-full flex-col gap-20 px-6 pb-32 pt-20 sm:px-12 lg:px-32">
        <header className="flex flex-col gap-8 rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-xl shadow-2xl animate-in">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-medium">
            Welcome to my portfolio
          </p>
          <div className="grid gap-12 lg:grid-cols-[2.5fr_1fr] lg:items-end">
            <div className="space-y-6 animate-in-left">
              <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-slate-100 via-purple-300 to-slate-300 bg-clip-text text-transparent">
                Hi, I&apos;m Bahadir Sulukan.
                <span className="block text-slate-300 text-4xl sm:text-5xl lg:text-6xl mt-2 font-semibold">
                  Software Engineer & CS Student
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
                I blend systems thinking with sharp UI skills. I craft testable,
                predictable code that scales. My toolkit spans product UI, API
                design, performance optimization, and full-stack development.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-200">
              <Stat label="Based in" value="Frankfurt, DE" />
              <Stat label="Focus" value="Web • Systems" />
              <Stat label="Currently" value="Building & learning" />
              <div className="stat-box rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400">
                  Contact
                </p>
                <a
                  href="mailto:bahadirsulukan@gmail.com"
                  className="mt-3 text-lg font-bold text-white break-all hover:text-purple-300 transition"
                >
                  bahadirsulukan@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              "TypeScript",
              "React/Next.js",
              "Node.js",
              "PostgreSQL",
              "Tailwind",
              "Testing",
              "Design Systems",
              "AWS",
            ].map((item, i) => (
              <span
                key={item}
                className="tech-badge rounded-full border border-white/20 bg-white/10 px-5 py-2 text-slate-200 font-medium hover:border-purple-500 transition cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[2fr_1.1fr]">
          <Card title="Selected Projects" eyebrow="Builds">
            <div className="space-y-6">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="project-card group rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-8 hover:border-purple-500/50 hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/10"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-slate-300">
                        {project.description}
                      </p>
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        className="mt-1 whitespace-nowrap rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View →
                      </a>
                    ) : null}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tech-badge rounded-full bg-white/15 px-4 py-2 font-medium border border-white/10 hover:border-purple-500/50"
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
            <div className="space-y-6">
              {experiences.map((exp) => (
                <article
                  key={exp.role}
                  className="group rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6 transition hover:border-purple-500/30 hover:bg-white/12 hover:shadow-lg hover:shadow-purple-500/5"
                >
                  <div className="flex items-center justify-between text-sm text-slate-400 font-medium">
                    <span>{exp.place}</span>
                    <span className="group-hover:text-purple-300 transition">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-purple-300 transition">
                    {exp.role}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    {exp.focus.map((item) => (
                      <span
                        key={item}
                        className="tech-badge rounded-full bg-white/15 px-4 py-2 font-medium border border-white/10 hover:border-purple-500/50"
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
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-5 text-slate-300 text-base leading-relaxed">
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
            <div className="grid gap-4 rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6 text-sm text-slate-300">
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
          <div className="flex flex-col gap-8 sm:gap-6">
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              I&apos;m always interested in hearing about new opportunities,
              collaborations, and challenging projects. Feel free to reach out!
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:bahadirsulukan@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-purple-500/50 bg-purple-500/15 px-8 py-4 font-semibold text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/25 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transform hover:scale-105"
              >
                ✉️ Email me
              </a>
              <a
                href="https://www.linkedin.com/in/bahadir-sulukan/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-8 py-4 font-semibold text-slate-200 transition hover:border-purple-400 hover:bg-white/15 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/10"
                target="_blank"
                rel="noreferrer"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://github.com/bahadirsulukan"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-8 py-4 font-semibold text-slate-200 transition hover:border-purple-400 hover:bg-white/15 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/10"
                target="_blank"
                rel="noreferrer"
              >
                🚀 GitHub
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
    <section className="space-y-5 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.4em] font-semibold text-slate-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <div className="text-base text-slate-300 pt-2">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-box rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6">
      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-xl font-bold text-white group-hover:text-purple-300 transition">
        {value}
      </p>
    </div>
  );
}

function Bullet({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-white/15 px-4 py-2 font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
