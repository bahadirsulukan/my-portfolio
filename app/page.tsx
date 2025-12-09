"use client";

import React, { useState, useEffect, useRef } from "react";

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
    title: "Regional FIRST LEGO League Darmstadt",
    description:
      "Offizielle Event-Webseite für den FLL-Regionalwettbewerb an der Hochschule Darmstadt. Gestaltung der Seitenstruktur, Navigation und responsiven Benutzeroberfläche. Enge Zusammenarbeit mit dem Projektteam zur Integration von Eventinhalten.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "https://fll.hilfe-informatik.de",
  },
  {
    title: "B2Cargo Logistics Web Platform",
    description:
      "Full-Stack Entwicklung einer umfangreichen Webanwendung für den Logistikdienstleister B2Cargo. Implementierung von Frontend-Komponenten, API-Integration und Datenverarbeitung. Unterstützung bei Feature-Entwicklung, Optimierung und Testing innerhalb eines agilen Teams.",
    stack: ["React.js", "Node.js", "REST APIs", "PostgreSQL"],
    link: "https://www.b2cargo.com",
  },
  {
    title: "Cplusplus-Practice",
    description:
      "Comprehensive collection of C++ algorithms, data structures, and exercises. Includes object-oriented projects, STL, Templates, File I/O, and Exception Handling inspired by university coursework.",
    stack: ["C++17/20", "Algorithms", "OOP", "STL", "Templates"],
    link: "https://github.com/bahadirsulukan/Cplusplus-Practice",
  },
  {
    title: "Machine-Learning",
    description:
      "Exploration of machine learning fundamentals and experiments. Includes data analysis, model training, and practical ML applications using Jupyter notebooks.",
    stack: ["Python", "Machine Learning", "Jupyter", "Data Science"],
    link: "https://github.com/bahadirsulukan/Machine-Learning",
  },
  {
    title: "WebBasics",
    description:
      "Exploration of modern web technologies and best practices. Focused on building clean, responsive, and accessible web interfaces.",
    stack: ["HTML", "CSS", "JavaScript", "Web Design"],
    link: "https://github.com/bahadirsulukan/WebBasics",
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

// Floating Particles Component
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}

// Code Rain Component
function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const code = "01अकहल्व्य०१०१०१०१०१०१०१०१";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns)
      .fill(0)
      .map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(139, 92, 246, 0.1)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = code[Math.floor(Math.random() * code.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-30"
    />
  );
}

// Interactive Cursor Trail Component
function CursorTrail() {
  useEffect(() => {
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
        });
      }
    };

    const animate = () => {
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life > 0) {
          const div = document.createElement("div");
          div.style.position = "fixed";
          div.style.pointerEvents = "none";
          div.style.left = p.x + "px";
          div.style.top = p.y + "px";
          div.style.width = "8px";
          div.style.height = "8px";
          div.style.borderRadius = "50%";
          div.style.background = `rgba(139, 92, 246, ${p.life * 0.5})`;
          div.style.zIndex = "999";
          document.body.appendChild(div);
          setTimeout(() => div.remove(), 50);
        }

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Bahadir Sulukan";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50 overflow-hidden relative">
      <FloatingParticles />
      <CursorTrail />
      <style>
        {`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes hologramGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.2); }
        }
        @keyframes dataStream {
          0% { opacity: 0; transform: translateY(20px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes neonBorder {
          0%, 100% { border-color: rgba(139, 92, 246, 0.6); box-shadow: 0 0 15px rgba(139, 92, 246, 0.6); }
          50% { border-color: rgba(139, 92, 246, 1); box-shadow: 0 0 25px rgba(139, 92, 246, 0.8), inset 0 0 10px rgba(139, 92, 246, 0.2); }
        }
        .animate-in { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-in-left { animation: slideInLeft 0.6s ease-out forwards; }
        .hologram-text { animation: hologramGlow 3s ease-in-out infinite; }
        .gradient-bg { background-size: 200% 200%; animation: gradientShift 8s ease infinite; }
        .project-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); animation: neonBorder 3s ease-in-out infinite; }
        .project-card:hover { transform: translateY(-8px); border-color: rgba(139, 92, 246, 0.8) !important; box-shadow: 0 0 30px rgba(139, 92, 246, 0.5) !important; }
        .data-stream-item { animation: dataStream 2s ease-in-out infinite; }
        .tech-badge { transition: all 0.2s ease; }
        .tech-badge:hover { transform: scale(1.08); background-color: rgba(139, 92, 246, 0.3); border-color: rgba(139, 92, 246, 0.6); }
        .stat-box { transition: all 0.3s ease; position: relative; overflow: hidden; }
        .stat-box::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transition: left 0.5s; }
        .stat-box:hover::before { left: 100%; }
        .stat-box:hover { transform: translateY(-4px); border-color: rgba(139, 92, 246, 0.4); background: rgba(139, 92, 246, 0.08); }
      `}
      </style>
      <div className="mx-auto flex w-full max-w-full flex-col gap-20 px-6 pb-32 pt-20 sm:px-12 lg:px-32 relative z-10">
        <header className="flex flex-col gap-8 rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-xl shadow-2xl animate-in relative overflow-hidden">
          <CodeRain />
          <div className="flex items-center gap-8 mb-6 relative z-20">
            <img
              src="/BS_Foto.jpg"
              alt="Bahadir Sulukan"
              className="rounded-full w-40 h-40 border-4 border-purple-500 shadow-lg object-cover hologram-text"
            />
            <div>
              <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-slate-100 via-purple-300 to-slate-300 bg-clip-text text-transparent hologram-text">
                {displayedText}
                {displayedText.length < fullText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </h1>
              <p className="mt-2 text-lg text-slate-300 font-medium">
                Computer Science Student @ Hochschule Darmstadt | C++ Developer
                | Startup Builder
              </p>
              <div className="flex gap-4 mt-2">
                <a
                  href="mailto:bahadirsulukan@gmail.com"
                  className="text-purple-400 hover:underline"
                >
                  bahadirsulukan@gmail.com
                </a>
                <span className="text-slate-400">Darmstadt, Germany</span>
              </div>
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-medium mb-2">
            Welcome to my portfolio
          </p>
          <div className="grid gap-12 lg:grid-cols-[2.5fr_1fr] lg:items-end">
            <div className="space-y-6 animate-in-left relative z-20">
              <h2 className="text-3xl font-semibold text-purple-300">
                About Me
              </h2>
              <ul className="list-disc ml-6 text-slate-300 text-base space-y-2">
                <li>
                  Studying Computer Science (Informatik) at Hochschule Darmstadt
                  — 6th semester
                </li>
                <li>Advanced C++ (algorithms, OOP, software architecture)</li>
                <li>
                  Strong foundation in systems programming, software
                  engineering, IT security
                </li>
                <li>Exploring AI, Web Development, Embedded Systems</li>
                <li>
                  Passionate about clean code, scalable systems, user-centered
                  software
                </li>
              </ul>
              <h2 className="text-2xl font-semibold text-purple-300 mt-6">
                Technical Stack
              </h2>
              <div className="flex flex-wrap gap-3 text-sm mt-2">
                {[
                  "C++17/20",
                  "Python",
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "SQL",
                  "Linux",
                  "Git/GitHub",
                  "Bash",
                  "UML",
                  "VS Code",
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
            </div>
            <div className="space-y-4 relative z-20">
              <Stat label="University" value="Hochschule Darmstadt" />
              <Stat label="Location" value="Darmstadt, Germany" />
              <Stat label="Current Focus" value="C++, Web, AI, Embedded" />
              <Stat label="Email" value="bahadirsulukan@gmail.com" />
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[2fr_1.1fr] relative z-10">
          <Card title="Selected Projects" eyebrow="Builds">
            <div className="space-y-6">
              {projects.map((project, idx) => (
                <article
                  key={project.title}
                  className="project-card group rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-8 hover:border-purple-500/50 hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Data Stream Animation */}
                  {hoveredProject === project.title && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="data-stream-item absolute text-purple-400 opacity-20 font-mono text-xs"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        >
                          &lt;/&gt;
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-6 relative z-10">
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
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center relative z-10">
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
          <div className="flex flex-col gap-8 sm:gap-6 relative z-10">
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
                href="https://linkedin.com/in/bahadirsulukan"
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
    <section className="space-y-5 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl gradient-bg">
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
