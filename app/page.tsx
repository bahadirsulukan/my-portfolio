"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
      "Official event website for the FLL Regional Competition at Hochschule Darmstadt. Designed site structure, navigation, and responsive user interface. Close collaboration with the project team for event content integration.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "https://fll.hilfe-informatik.de",
  },
  {
    title: "B2Cargo Logistics Web Platform",
    description:
      "Full-stack development of a comprehensive web application for B2Cargo logistics provider. Implementation of frontend components, API integration, and data processing. Support in feature development, optimization, and testing within an agile team.",
    stack: ["React.js", "Node.js", "REST APIs", "PostgreSQL"],
    link: "https://www.b2cargo.com",
  },
  {
    title: "MediDash",
    description:
      "Modern web-based medical practice dashboard for managing patients, appointments, and medical documentation. Features patient management, appointment scheduling, invoice handling, and document upload functionality. Developed collaboratively with a team of 4 contributors.",
    stack: ["React.js", "JavaScript", "Vite", "CSS", "Document Management"],
    link: "https://medicinedash.vercel.app",
  },
  {
    title: "Café & Bistro Website Design",
    description:
      "Modern and responsive website design for café and bistro businesses. Built from Figma design with TypeScript and Vite, featuring elegant UI components and smooth user experience. Perfect for hospitality industry web presence.",
    stack: ["TypeScript", "Vite", "CSS", "Figma", "Responsive Design"],
    link: "https://aerolounge.vercel.app",
  },
  {
    title: "Cplusplus-Practice",
    description:
      "Comprehensive collection of C++ algorithms, data structures, and exercises. Includes object-oriented projects, STL, Templates, File I/O, and Exception Handling inspired by university coursework.",
    stack: ["C++17/20", "Algorithms", "OOP", "STL", "Templates"],
    link: "https://github.com/bahadirsulukan/Cplusplus-Practice",
  },
  {
    title: "Python-Practice",
    description:
      "Comprehensive Python programming repository covering fundamental to advanced concepts. Features hands-on implementations of data structures, algorithms, object-oriented programming, and practical projects. Includes extensive work with NumPy, Pandas, Matplotlib for data manipulation and visualization, alongside real-world problem-solving exercises.",
    stack: ["Python", "NumPy", "Pandas", "Matplotlib", "Algorithms"],
    link: "https://github.com/bahadirsulukan/Python-Practice",
  },
  {
    title: "Machine-Learning",
    description:
      "Exploration of machine learning fundamentals and experiments. Includes data analysis, model training, and practical ML applications using Jupyter notebooks.",
    stack: ["Python", "Machine Learning", "Jupyter", "Data Science"],
    link: "https://github.com/bahadirsulukan/Machine-Learning",
  },
];

const experiences: Experience[] = [
  {
    role: "Software Engineering Internship",
    place: "Optade Technologies (Remote)",
    period: "01.11.2025 — 22.12.2025",
    focus: [
      "B2Cargo Web App",
      "Optade-Route Web App",
      "Frontend/Backend",
      "Feature Development",
    ],
  },
  {
    role: "Guitar Teacher",
    place: "Christian Morgenstern & Astrid Lindgren Schule",
    period: "2024 — Present",
    focus: [
      "Early Music Education",
      "Instrumental Instruction",
      "Group Lessons",
    ],
  },
  {
    role: "Mathematics Tutor",
    place: "Hochschule Darmstadt",
    period: "2023 — 2024",
    focus: [
      "Exercise Sessions",
      "Individual Support",
      "Mathematical Fundamentals",
    ],
  },
  {
    role: "Sales & Marketing Assistant",
    place: "Süvari Clothing, Frankfurt",
    period: "2023",
    focus: ["Store Opening", "Customer Consulting", "Marketing"],
  },
];

// Languages Component
function Languages() {
  const languages = [
    {
      name: "Turkish",
      flag: "🇹🇷",
      level: "Native",
      proficiency: 100,
    },
    {
      name: "German",
      flag: "🇩🇪",
      level: "C1 (Fluent)",
      proficiency: 90,
    },
    {
      name: "English",
      flag: "🇬🇧",
      level: "B1 (Professional)",
      proficiency: 75,
    },
    // {
    //   name: "Spanish",
    //   flag: "🇪🇸",
    //   level: "A2 (Elementary)",
    //   proficiency: 25,
    // },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {languages.map((lang, idx) => (
          <div key={idx} className="space-y-2">
            {/* Language Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="text-base font-semibold text-white">
                    {lang.name}
                  </p>
                  <p className="text-base text-slate-300">{lang.level}</p>
                </div>
              </div>
              <span className="text-base font-bold text-slate-300">
                {lang.proficiency}%
              </span>
            </div>

            {/* Progress Bar with gradient */}
            <div className="relative h-2.5 rounded-full overflow-hidden bg-slate-700/30 border border-slate-600/30">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  lang.name === "Turkish"
                    ? "bg-gradient-to-r from-red-500 to-red-400"
                    : lang.name === "German"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                    : "bg-gradient-to-r from-blue-500 to-blue-400"
                } shadow-lg`}
                style={{ width: `${lang.proficiency}%` }}
              />
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
                style={{
                  animation: `shimmer 2s infinite`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-700/30">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-400">4</p>
          <p className="text-base text-slate-300 font-medium">Languages</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">1</p>
          <p className="text-base text-slate-300 font-medium">C1 Level</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">3</p>
          <p className="text-base text-slate-300 font-medium">Professional</p>
        </div>
      </div>
    </div>
  );
}

// GitHub Contributions Component
function GitHubContributions() {
  const [contributions, setContributions] = useState<number>(0);
  const [totalRepos, setTotalRepos] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [calendarData, setCalendarData] = useState<Map<string, number>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.github.com/users/bahadirsulukan"
        );
        const data = await response.json();
        setTotalRepos(data.public_repos || 5);

        // Fetch contribution data from GitHub contribution stats
        const year = selectedYear;
        const calendarMap = new Map<string, number>();

        // Initialize all days with 0
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        for (
          let d = new Date(startDate);
          d <= endDate;
          d.setDate(d.getDate() + 1)
        ) {
          const dateStr = d.toISOString().split("T")[0];
          calendarMap.set(dateStr, 0);
        }

        // Fetch from a more reliable source: GitHub's contribution overview
        // This gets contribution counts per day
        const contributionsUrl = `https://github.com/users/bahadirsulukan/contributions?from=${year}-01-01&to=${year}-12-31`;

        try {
          // Fallback: Fetch all repositories and count commits per day
          const reposResponse = await fetch(
            "https://api.github.com/users/bahadirsulukan/repos?per_page=100&sort=updated"
          );
          const repos = await reposResponse.json();

          let totalContributions = 0;

          // Fetch commits for each repo
          for (const repo of repos.slice(0, 20)) {
            try {
              const commitsResponse = await fetch(
                `https://api.github.com/repos/bahadirsulukan/${repo.name}/commits?since=${year}-01-01T00:00:00Z&until=${year}-12-31T23:59:59Z&per_page=100`
              );
              const commits = await commitsResponse.json();

              if (Array.isArray(commits)) {
                commits.forEach((commit: any) => {
                  if (commit.commit?.author?.date) {
                    const date = commit.commit.author.date.split("T")[0];
                    const count = calendarMap.get(date) || 0;
                    calendarMap.set(date, count + 1);
                    totalContributions++;
                  }
                });
              }
            } catch (e) {
              console.error(`Failed to fetch commits for ${repo.name}`);
            }
          }

          setContributions(totalContributions);
        } catch (e) {
          // If commit fetch fails, try events API
          const eventsResponse = await fetch(
            "https://api.github.com/users/bahadirsulukan/events/public?per_page=300"
          );
          const eventsData = await eventsResponse.json();

          if (Array.isArray(eventsData)) {
            const yearEvents = eventsData.filter((event: any) => {
              const eventYear = new Date(event.created_at).getFullYear();
              return eventYear === selectedYear;
            });

            yearEvents.forEach((event: any) => {
              const date = new Date(event.created_at)
                .toISOString()
                .split("T")[0];
              const count = calendarMap.get(date) || 0;
              calendarMap.set(date, count + 1);
            });

            setContributions(yearEvents.length || 0);
          }
        }

        setCalendarData(calendarMap);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setContributions(0);
        setTotalRepos(5);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, [selectedYear]);

  // Generate calendar weeks
  const generateCalendarWeeks = () => {
    const weeks = [];
    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear, 11, 31);

    let currentWeek: any[] = [];

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = d.getDay();
      const count = calendarData.get(dateStr) || 0;

      currentWeek.push({
        date: new Date(d),
        count: count,
        dateStr: dateStr,
      });

      if (dayOfWeek === 6) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const getColor = (count: number) => {
    if (count === 0) return "bg-slate-700/20";
    if (count === 1) return "bg-green-600/40";
    if (count === 2) return "bg-green-500/60";
    if (count === 3) return "bg-green-500/80";
    if (count >= 4) return "bg-green-400/95";
    return "bg-slate-700/20";
  };

  const calendarWeeks = generateCalendarWeeks();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-base">
          <p className="font-semibold text-white text-xl">
            {contributions} contributions
          </p>
          <p className="text-base text-slate-300">in the last year</p>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="rounded-lg border border-slate-600/50 bg-slate-700/30 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700/50"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Contribution Calendar */}
      <div className="rounded-xl border border-slate-700/30 bg-slate-800/20 p-4 overflow-x-auto">
        <div className="space-y-2 min-w-max">
          {/* Day of week labels */}
          <div className="flex gap-1">
            <div className="w-8 pr-2" />
            <div className="flex gap-1">
              {calendarWeeks.slice(0, 1).map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="w-4 h-4 flex items-center justify-center text-xs text-slate-400"
                    >
                      {dayIdx === 0 && daysOfWeek[day.date.getDay()].charAt(0)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Month labels and calendar grid */}
          <div className="flex gap-1">
            {/* Day of week labels */}
            <div className="flex flex-col gap-1 justify-around text-xs text-slate-400 font-medium w-8 pr-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="h-4 text-center text-xs">
                  {day === "Mon"
                    ? "M"
                    : day === "Wed"
                    ? "W"
                    : day === "Fri"
                    ? "F"
                    : ""}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="flex gap-1">
              {calendarWeeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`w-4 h-4 rounded-sm ${getColor(
                        day.count
                      )} hover:ring-2 hover:ring-green-400 transition cursor-pointer`}
                      title={`${day.count} contribution${
                        day.count !== 1 ? "s" : ""
                      } on ${day.dateStr}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 pt-2 text-xs text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-base">
        <div className="rounded-lg border border-slate-700/30 bg-slate-800/20 p-3">
          <p className="text-base text-slate-300 mb-1 font-medium">
            Repositories
          </p>
          <p className="text-2xl font-bold text-white">{totalRepos}+</p>
        </div>
        <div className="rounded-lg border border-green-700/30 bg-green-800/20 p-3">
          <p className="text-base text-green-300 mb-1 font-medium">
            Contributions {selectedYear}
          </p>
          <p className="text-2xl font-bold text-green-300">{contributions}</p>
        </div>
      </div>

      <a
        href="https://github.com/bahadirsulukan"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-700/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-700/40 hover:shadow-lg hover:shadow-slate-600/20 active:scale-95 w-full justify-center"
      >
        <span>🔗</span>
        View Full Profile
      </a>
    </div>
  );
}

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

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6,
          opacity: Math.random() * 0.35 + 0.15,
        });
      }
    };

    seedParticles();

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
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
    const resetInterval = setInterval(seedParticles, 12000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(resetInterval);
    };
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
      ctx.fillStyle = "rgba(15, 23, 42, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(168, 85, 247, 0.08)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = code[Math.floor(Math.random() * code.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.92) {
          drops[i] = 0;
        }
        drops[i] += 1.2;
      }
    };

    const interval = setInterval(draw, 70);
    const resetInterval = setInterval(() => {
      for (let i = 0; i < drops.length; i++) {
        drops[i] = Math.random() * -50;
      }
    }, 14000);

    return () => {
      clearInterval(interval);
      clearInterval(resetInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-30"
    />
  );
}

// Interactive Cursor Trail Component (subtle, professional)
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
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 0.35,
      });

      // Cap particle count to avoid clutter
      if (particles.length > 80) particles.shift();
    };

    const animate = () => {
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;

        if (p.life > 0) {
          const div = document.createElement("div");
          div.style.position = "fixed";
          div.style.pointerEvents = "none";
          div.style.left = p.x + "px";
          div.style.top = p.y + "px";
          div.style.width = "6px";
          div.style.height = "6px";
          div.style.borderRadius = "50%";
          div.style.background = `rgba(168, 85, 247, ${p.life * 0.35})`;
          div.style.zIndex = "60";
          div.style.filter = "blur(1px)";
          document.body.appendChild(div);
          setTimeout(() => div.remove(), 40);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50 overflow-hidden relative custom-cursor">
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
        @keyframes subtleGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.1), inset 0 0 20px rgba(139, 92, 246, 0.05); }
          50% { box-shadow: 0 0 25px rgba(139, 92, 246, 0.15), inset 0 0 30px rgba(139, 92, 246, 0.08); }
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
          0%, 100% { border-color: rgba(139, 92, 246, 0.8); box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), inset 0 0 10px rgba(139, 92, 246, 0.2); }
        }
        .animate-in { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-in-left { animation: slideInLeft 0.6s ease-out forwards; }
        .hologram-text { animation: hologramGlow 3s ease-in-out infinite; }
        .shimmer-bg { animation: subtleGlow 8s ease-in-out infinite; }
        .project-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); animation: neonBorder 3s ease-in-out infinite; }
        .project-card:hover { transform: translateY(-8px); border-color: rgba(139, 92, 246, 0.8) !important; box-shadow: 0 0 30px rgba(139, 92, 246, 0.5) !important; }
        .custom-cursor { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='6' fill='%23a855f7'/%3E%3C/svg%3E") 12 12, auto; }
        .custom-cursor a, .custom-cursor button { cursor: pointer; }
        .data-stream-item { animation: dataStream 2s ease-in-out infinite; }
        .tech-badge { transition: all 0.2s ease; }
        .tech-badge:hover { transform: scale(1.08); background-color: rgba(139, 92, 246, 0.3); border-color: rgba(139, 92, 246, 0.6); }
        .stat-box { transition: all 0.3s ease; position: relative; overflow: hidden; }
        .stat-box::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transition: left 0.5s; }
        .stat-box:hover::before { left: 100%; }
        .stat-box:hover { transform: translateY(-4px); border-color: rgba(139, 92, 246, 0.4); background: rgba(139, 92, 246, 0.08); }
      `}
      </style>
      <div className="mx-auto flex w-full max-w-full flex-col gap-20 px-4 pb-32 pt-20 sm:px-8 lg:px-32 relative z-10">
        <header className="flex flex-col gap-8 rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-12 backdrop-blur-xl shadow-2xl animate-in relative overflow-hidden shimmer-bg">
          <CodeRain />
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6 relative z-20">
            <img
              src="/BS_Foto.jpg"
              alt="Bahadir Sulukan"
              className="rounded-full w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 border-4 border-purple-500 shadow-lg object-cover hologram-text flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-100 via-purple-300 to-slate-300 bg-clip-text text-transparent hologram-text">
                {displayedText}
                {displayedText.length < fullText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </h1>
              <p className="mt-2 text-sm sm:text-lg lg:text-xl text-slate-200 font-medium">
                Computer Science Student @ Hochschule Darmstadt | C++ Developer
                | Startup Builder
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base lg:text-lg uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-200 font-medium mb-2 text-center sm:text-left">
            Welcome to my portfolio
          </p>
          <div className="grid gap-12 lg:grid-cols-[2.5fr_1fr] lg:items-end">
            <div className="space-y-6 animate-in-left relative z-20">
              <h2 className="text-3xl font-semibold text-purple-300">
                About Me
              </h2>
              <ul className="list-disc ml-6 text-slate-200 text-lg space-y-2">
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
                  "C++",
                  "Python",
                  "JavaScript (ES6+)",
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "HTML5",
                  "CSS3",
                  "Bootstrap 5",
                  "PostgreSQL",
                  "MySQL",
                  "REST APIs",
                  "AWS (RDS, EC2, S3)",
                  "Git & GitHub",
                  "Agile/Scrum",
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
              <Stat label="Current Focus" value="AI, Embedded Systems, Cloud" />
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
                      <p className="mt-3 text-lg leading-8 text-slate-200">
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
                  className="group rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-8 transition hover:border-purple-500/30 hover:bg-white/12 hover:shadow-lg hover:shadow-purple-500/5"
                >
                  <div className="flex items-center justify-between text-lg text-slate-300 font-semibold mb-2">
                    <span className="text-lg text-purple-300">{exp.place}</span>
                    <span className="group-hover:text-purple-300 transition">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white group-hover:text-purple-300 transition">
                    {exp.role}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-3 text-base text-slate-200">
                    {exp.focus.map((item) => (
                      <span
                        key={item}
                        className="tech-badge rounded-full bg-white/15 px-5 py-2.5 font-medium border border-white/10 hover:border-purple-500/50"
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

        <div className="grid gap-8 lg:grid-cols-2 relative z-10">
          {/* Music Box */}
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl relative overflow-hidden shimmer-bg">
            <div className="absolute top-0 right-0 text-[100px] opacity-10">
              🎸
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] font-semibold text-purple-300 mb-2">
                  Beyond Code
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">
                  KEK Music
                </h3>
                <p className="text-slate-200 text-base leading-relaxed mb-3">
                  Beyond coding, I'm a musician and founding member of{" "}
                  <span className="text-purple-300 font-bold">KEK</span>, an
                  alternative rock band where I channel creativity through
                  music. Playing guitar and creating music has taught me
                  collaboration, improvisation, and the balance between
                  structure and creative freedom.
                </p>
                <p className="text-slate-200 text-base leading-relaxed">
                  Music and code share more than you'd think: both require
                  pattern recognition, attention to detail, and the ability to
                  create something meaningful from raw elements. This creative
                  outlet keeps me balanced and inspired.
                </p>
              </div>
              <div className="space-y-3 mt-4">
                <p className="text-sm uppercase tracking-[0.3em] font-semibold text-purple-200">
                  Follow KEK Music
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://open.spotify.com/intl-de/artist/3afx5wFaInIVa4ZDMTOHaB?si=RHrbFLFfSAmu8CKt1AJTkQ"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm font-semibold text-green-300 transition hover:border-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
                  >
                    <img
                      src="/Spotify_Primary_Logo_RGB_Green.png"
                      alt="Spotify"
                      className="w-5 h-5"
                    />
                    Spotify
                  </a>
                  <a
                    href="https://youtube.com/@kek.music_official?si=Ug0GJYTUk8hEurtS"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
                  >
                    <img
                      src="/yt_icon_red_digital.png"
                      alt="YouTube"
                      className="w-5 h-5"
                    />
                    YouTube
                  </a>
                  <a
                    href="https://www.tiktok.com/@kek.music_official?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-pink-500/30 bg-pink-500/10 px-4 py-2.5 text-sm font-semibold text-pink-300 transition hover:border-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/20 active:scale-95"
                  >
                    <img
                      src="/TikTok_Icon_Black_Circle.png"
                      alt="TikTok"
                      className="w-5 h-5"
                    />
                    TikTok
                  </a>
                  <a
                    href="https://www.instagram.com/kek.music_official?igsh=MWw1cHFkZGxjdHg1bw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
                  >
                    <img
                      src="/Instagram_Glyph_Gradient.png"
                      alt="Instagram"
                      className="w-5 h-5"
                    />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl relative overflow-hidden shimmer-bg">
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.4em] font-semibold text-slate-400 mb-2">
                Communication
              </p>
              <h3 className="text-2xl font-bold text-white mb-6">Languages</h3>
              <Languages />
            </div>
          </div>
        </div>

        <Card title="Story" eyebrow="About">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center relative z-10">
            <div className="space-y-5 text-slate-200 text-lg leading-relaxed">
              <p>
                I'm studying Computer Science at Hochschule Darmstadt with a
                focus on software development, artificial intelligence, and
                modern web technologies. Through hands-on projects and intensive
                coursework, I've built solid expertise in Python, JavaScript,
                React.js, and Node.js.
              </p>
              <p>
                My approach is structured, solution-oriented, and driven by
                continuous learning. I enjoy understanding how things work under
                the hood and translating that knowledge into thoughtful,
                user-friendly software solutions. Clean code, clear
                documentation, and practical testing are second nature to me.
              </p>
              <p>
                My goal: actively shape innovative software, deepen technical
                skills in real-world projects, and build reliable products that
                feel effortless to use.
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6 text-sm text-slate-300">
              <Bullet
                label="Principles"
                items={[
                  "Clarity first",
                  "Structured approach",
                  "Solution-oriented",
                ]}
              />
              <Bullet
                label="Core Technologies"
                items={[
                  "React.js & Node.js",
                  "Python & C++",
                  "PostgreSQL & MySQL",
                ]}
              />
              <Bullet
                label="Cloud & DevOps"
                items={["AWS (RDS, EC2, S3)", "REST APIs", "Agile/Scrum"]}
              />
              <Bullet
                label="Currently Learning"
                items={[
                  "AI & Machine Learning",
                  "Distributed Systems",
                  "Advanced Cloud Architecture",
                ]}
              />
            </div>
          </div>
        </Card>

        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] relative z-10">
          {/* Contact Card */}
          <Card title="Get in touch" eyebrow="Contact">
            <div className="flex flex-col justify-between min-h-[220px] relative z-10">
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities,
                collaborations, and challenging projects. Feel free to reach
                out!
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="mailto:bahadirsulukan@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/50 bg-purple-500/15 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/25 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transform hover:scale-105 min-h-[44px]"
                >
                  <Image
                    src="/32px-Gmail_icon_(2020).svg.png"
                    alt="Gmail"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  E-Mail
                </a>
                <a
                  href="https://linkedin.com/in/bahadirsulukan"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-slate-200 transition hover:border-purple-400 hover:bg-white/15 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/10 min-h-[44px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/LI-In-Bug.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/bahadirsulukan"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-slate-200 transition hover:border-purple-400 hover:bg-white/15 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/10 min-h-[44px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/github-mark.png"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  GitHub
                </a>
                <a
                  href="/BahadirSulukan_CV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/15 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transform hover:scale-105 min-h-[44px]"
                >
                  📄 Download CV
                </a>
              </div>
            </div>
          </Card>

          {/* Life Motto Card */}
          <Card title="Life Motto" eyebrow="Philosophy">
            <div className="flex items-center justify-center min-h-[200px] relative z-10">
              <div className="space-y-6 w-full">
                <div className="space-y-3">
                  <pre className="font-mono text-base sm:text-lg text-slate-200 leading-relaxed">
                    <span className="text-purple-400">if</span> (
                    <span className="text-blue-400">sad</span>(){" "}
                    <span className="text-purple-400">===</span>{" "}
                    <span className="text-orange-400">true</span>) {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">sad</span>().
                    <span className="text-green-400">stop</span>();{"\n"}
                    {"    "}
                    <span className="text-blue-400">beAwesome</span>();{"\n"}
                    {"}"}
                  </pre>
                </div>

                <div className="pt-2 border-t border-slate-700/30">
                  <blockquote className="border-l-4 border-purple-500/50 pl-4 py-2 mt-2">
                    <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed italic">
                      "Code is like humor. When you have to explain it, it's
                      bad."
                    </p>
                    <footer className="mt-3 text-base text-purple-300 font-semibold">
                      — Cory House
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </Card>
        </div>
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
    <section className="space-y-5 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl shimmer-bg">
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
      <p className="text-sm uppercase tracking-[0.2em] font-semibold text-purple-300">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="tech-badge rounded-full border border-white/20 bg-white/10 px-5 py-2 text-slate-200 font-medium hover:border-purple-500 hover:bg-purple-500/15 transition cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
