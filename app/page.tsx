"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CoverflowCarousel,
  type CoverflowSlide,
} from "@/components/ui/coverflow-carousel";

// Three.js is heavy — split it out of the initial bundle and load client-side only
const RobotCanvas = dynamic(() => import("./RobotCanvas"), { ssr: false });

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

type Experience = { role: string; place: string; period: string; focus: string[]; icon: string };

// Covers are real screenshots of the live sites, captured from the deployed
// URLs — not stock photography. Ordered by how much weight each one carries
// with an employer: shipped systems first, templates last.
const projectSlides: CoverflowSlide[] = [
  {
    src: "/projects/memora.jpg",
    alt: "Memora pitch page — collect every trip on a world map",
    title: "Memora",
    subtitle: "Every trip collected on a world map that belongs to you",
    meta: [
      { label: "Type", value: "Concept · Pitch" },
      { label: "Stack", value: "React · TypeScript" },
      { label: "Design", value: "Figma" },
    ],
    href: "https://memora-pitch.vercel.app",
    hrefLabel: "Read the pitch",
  },
  {
    src: "/projects/immobad.jpg",
    alt: "ImmoBAD pitch deck title slide — Alle Immobilien. Eine Karte.",
    title: "ImmoBAD",
    subtitle: "Real estate aggregator with map search and an AI assistant",
    meta: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Frontend · AI · Backend" },
      { label: "Stack", value: "TS · Express · Postgres" },
      { label: "Infra", value: "Docker Compose" },
    ],
    href: "https://immobad-deck.vercel.app/#1",
    hrefLabel: "View deck",
  },
  {
    src: "/projects/sqlgym.jpg",
    alt: "SQLgym homepage showing a SQL editor and query results",
    title: "SQLgym",
    subtitle: "Write the query, see the result — SQL practice in the browser",
    meta: [
      { label: "Databases", value: "10" },
      { label: "Exercises", value: "69" },
      { label: "Engine", value: "SQLite via WASM" },
      { label: "Stack", value: "JavaScript · sql.js" },
    ],
    href: "https://sqlgym-hda.vercel.app",
    hrefLabel: "Try it",
  },
  {
    src: "/projects/pizza.jpg",
    alt: "Pizza Palace restaurant website",
    title: "Pizza Palace",
    subtitle: "Restaurant site built on Radix UI primitives",
    meta: [
      { label: "Stack", value: "React · Vite" },
      { label: "UI", value: "Radix UI" },
      { label: "Type", value: "Single-page" },
    ],
    href: "https://pizzapalacerestaurant.vercel.app",
    hrefLabel: "Visit site",
  },
  {
    src: "/projects/b2cargo.jpg",
    alt: "B2Cargo logistics platform homepage",
    title: "B2Cargo",
    subtitle: "Logistics platform built during my engineering internship",
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Full-stack" },
      { label: "Stack", value: "React · Node · Postgres" },
      { label: "Client", value: "Optade Technologies" },
    ],
    href: "https://www.b2cargo.com",
    hrefLabel: "Visit site",
  },
  {
    src: "/projects/fahrschule.jpg",
    alt: "Fahrschule Kendirci driving school website",
    title: "Fahrschule Kendirci",
    subtitle: "Multilingual site for a local driving school",
    meta: [
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Next.js · TypeScript" },
      { label: "Features", value: "i18n · contact flow" },
      { label: "Motion", value: "GSAP · Framer Motion" },
    ],
    href: "https://fahrschulekendirci.vercel.app/de",
    hrefLabel: "Visit site",
  },
  {
    src: "/projects/medidash.jpg",
    alt: "MediDash dashboard with appointments, lab results and a to-do list",
    title: "MediDash",
    subtitle: "Practice dashboard for appointments, labs and documentation",
    meta: [
      { label: "Team", value: "4 developers" },
      { label: "Stack", value: "React · Vite" },
      { label: "Features", value: "Appointments · Labs" },
    ],
    href: "https://medicinedash.vercel.app",
    hrefLabel: "Open dashboard",
  },
];

const experiences: Experience[] = [
  {
    role: "Werkstudent Cloud & DevOps",
    place: "Proventa GmbH",
    period: "Mar 2026 — Present",
    focus: ["Containerized Backup System", "Podman · Restic · rclone", "Rocky Linux 9 · systemd", "Monitoring & Alerting"],
    icon: "☁️",
  },
  {
    role: "Software Engineering Intern",
    place: "Optade Technologies (Remote)",
    period: "Nov 2025 — Dec 2025",
    focus: ["B2Cargo Web App", "Optade-Route Web App", "Frontend / Backend", "Feature Development"],
    icon: "💼",
  },
  {
    role: "Guitar Teacher",
    place: "Christian Morgenstern & Astrid Lindgren Schule",
    period: "2024 — Present",
    focus: ["Early Music Education", "Instrumental Instruction", "Group Lessons"],
    icon: "🎸",
  },
  {
    role: "Mathematics Tutor",
    place: "Hochschule Darmstadt",
    period: "2023 — 2024",
    focus: ["Exercise Sessions", "Individual Support", "Mathematical Fundamentals"],
    icon: "📐",
  },
  {
    role: "Sales & Marketing Assistant",
    place: "Süvari Clothing, Frankfurt",
    period: "2023",
    focus: ["Store Opening", "Customer Consulting", "Marketing"],
    icon: "🛍️",
  },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Cloud & DevOps", href: "#cloud" },
  { label: "Music", href: "#music" },
  { label: "Contact", href: "#contact" },
];

// ─────────────────────────────────────────────
// INTRO SCREEN
// ─────────────────────────────────────────────

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set(logoRef.current, { opacity: 0, scale: 0.2, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0 });
    gsap.set(nameRef.current, { opacity: 0, y: 15 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = "none";
        }
        onComplete();
      },
    });

    tl.to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.7)" })
      .to(lineRef.current, { scaleX: 1, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(containerRef.current, { opacity: 0, duration: 0.7, delay: 0.9, ease: "power2.inOut" });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#060606",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Background subtle grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div ref={logoRef} style={{
        fontSize: "clamp(80px, 15vw, 140px)",
        fontWeight: 900,
        lineHeight: 1,
        background: "linear-gradient(135deg, #C9A84C 0%, #FFD700 50%, #C9A84C 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 60px rgba(201,168,76,0.45))",
        position: "relative",
        zIndex: 1,
      }}>
        BS
      </div>

      <div ref={lineRef} style={{
        width: "220px",
        height: "1px",
        background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        margin: "18px 0 16px",
        transformOrigin: "center",
        position: "relative",
        zIndex: 1,
      }} />

      <div ref={nameRef} style={{
        fontSize: "clamp(13px, 2vw, 16px)",
        letterSpacing: "0.55em",
        color: "#F0EAD6",
        textTransform: "uppercase",
        fontWeight: 300,
        position: "relative",
        zIndex: 1,
      }}>
        Bahadir Sulukan
      </div>

      <div ref={taglineRef} style={{
        marginTop: "8px",
        fontSize: "11px",
        letterSpacing: "0.35em",
        color: "#C9A84C",
        textTransform: "uppercase",
        fontWeight: 400,
        position: "relative",
        zIndex: 1,
      }}>
        Software Engineer
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scrollspy — highlight the section currently crossing mid-viewport
  useEffect(() => {
    const els = NAV_LINKS
      .map(l => document.getElementById(l.href.slice(1)))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(6,6,6,0.92)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <span style={{
          fontWeight: 900,
          fontSize: "22px",
          background: "linear-gradient(135deg, #C9A84C, #FFD700)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}>
          BS
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: active === l.href ? "#FFD700" : "#AAA",
              background: active === l.href ? "rgba(201,168,76,0.08)" : "transparent",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              borderRadius: "6px",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "#FFD700"; (e.target as HTMLElement).style.background = "rgba(201,168,76,0.08)"; }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = active === l.href ? "#FFD700" : "#AAA";
                (e.target as HTMLElement).style.background = active === l.href ? "rgba(201,168,76,0.08)" : "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
          <a href="/BahadirSulukan_CV.pdf" download style={{
            marginLeft: "8px",
            padding: "8px 18px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#C9A84C",
            border: "1px solid rgba(201,168,76,0.5)",
            borderRadius: "4px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(201,168,76,0.12)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
          >
            CV ↓
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
          <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", height: "2px",
                background: "#C9A84C",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: open && i === 0 ? "rotate(45deg) translateY(7px)" : open && i === 1 ? "scaleX(0)" : open && i === 2 ? "rotate(-45deg) translateY(-7px)" : "none",
              }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "rgba(6,6,6,0.97)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              padding: "12px 16px",
              color: "#AAA",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
              borderRadius: "6px",
            }}>
              {l.label}
            </a>
          ))}
          <a href="/BahadirSulukan_CV.pdf" download style={{
            marginTop: "8px",
            padding: "12px 16px",
            color: "#C9A84C",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textDecoration: "none",
            border: "1px solid rgba(201,168,76,0.4)",
            borderRadius: "4px",
          }}>
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────
// SCROLL ANIMATIONS — GSAP ScrollTrigger
// ─────────────────────────────────────────────

// Register once at module level (safe in client components)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Single element reveal — slides up/left/right + fades in */
function Reveal({
  children,
  delay = 0,
  id,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  id?: string;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const from: gsap.TweenVars =
      direction === "left"  ? { x: -52, opacity: 0 } :
      direction === "right" ? { x:  52, opacity: 0 } :
                              { y:  44, opacity: 0 };

    // scrollTrigger-bound tween: plays correctly even if the page
    // loads already scrolled past the trigger (scroll restoration)
    const tween = gsap.fromTo(el, from, {
      x: 0, y: 0, opacity: 1,
      duration: 0.72,
      delay: delay / 1000,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [delay, direction]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}

/** Direct children stagger in sequence — great for card grids */
function StaggerReveal({
  children,
  className = "",
  style,
  id,
  staggerSecs = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  staggerSecs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.children) as HTMLElement[];

    const tween = gsap.fromTo(items, { y: 44, opacity: 0 }, {
      y: 0, opacity: 1,
      duration: 0.65,
      stagger: staggerSecs,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [staggerSecs]);

  return <div ref={ref} id={id} className={className} style={style}>{children}</div>;
}

/** Section heading with eyebrow + animated title */
function SectionHeading({
  eyebrow,
  title,
  highlight,
  id,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;   // word(s) to render in gold gradient
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const goldGrad = "linear-gradient(135deg, #C9A84C, #FFD700)";

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [eyebrowEl, titleEl] = Array.from(el.children) as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    tl.fromTo(eyebrowEl, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" })
      .fromTo(titleEl,   { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, 0.1);

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const titleParts = highlight
    ? title.split(highlight)
    : [title];

  return (
    <div ref={ref} id={id} style={{ marginBottom: "32px" }}>
      <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 8px" }}>
        {eyebrow}
      </p>
      <h2 style={{ color: "#F0EAD6", fontWeight: 800, fontSize: "36px", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
        {highlight ? (
          <>
            {titleParts[0]}
            <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {highlight}
            </span>
            {titleParts[1]}
          </>
        ) : (
          <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {title}
          </span>
        )}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────
// LANGUAGES
// ─────────────────────────────────────────────

function Languages() {
  const langs = [
    { name: "Turkish", flag: "🇹🇷", level: "Native", pct: 100 },
    { name: "German", flag: "🇩🇪", level: "C1 — Fluent", pct: 100 },
    { name: "English", flag: "🇬🇧", level: "B1 — Professional", pct: 75 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {langs.map((l) => (
        <div key={l.name}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "24px" }}>{l.flag}</span>
              <div>
                <p style={{ color: "#F0EAD6", fontWeight: 600, margin: 0 }}>{l.name}</p>
                <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>{l.level}</p>
              </div>
            </div>
            <span style={{ color: "#C9A84C", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{l.pct}%</span>
          </div>
          <div style={{ height: "6px", background: "#1A1A1A", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${l.pct}%`,
              background: "linear-gradient(to right, #C9A84C, rgba(201,168,76,0.45))",
              borderRadius: "3px",
              transition: "width 1.2s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// CLOUD STACK ORBIT
// ─────────────────────────────────────────────

const cloudTools = [
  { icon: "🐳", label: "Docker",           ring: 1, angle: 0   },
  { icon: "☁️",  label: "AWS",              ring: 1, angle: 90  },
  { icon: "⚙️",  label: "Kubernetes",       ring: 1, angle: 180 },
  { icon: "🔧",  label: "Terraform",        ring: 1, angle: 270 },
  { icon: "🗄️",  label: "PostgreSQL",       ring: 2, angle: 0   },
  { icon: "🚀",  label: "GitHub Actions",   ring: 2, angle: 72  },
  { icon: "🔒",  label: "Security",         ring: 2, angle: 144 },
  { icon: "📊",  label: "Monitoring",       ring: 2, angle: 216 },
  { icon: "🐧",  label: "Linux",            ring: 2, angle: 288 },
];

function CloudOrbit() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
      {/* Orbit diagram */}
      <div
        style={{ position: "relative", width: "280px", height: "280px", flexShrink: 0 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <style>{`
          @keyframes orbitRing1 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes orbitRing2 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
          @keyframes counterRing1 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
          @keyframes counterRing2 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes orbitPulse { 0%,100%{box-shadow:0 0 30px rgba(201,168,76,0.3)} 50%{box-shadow:0 0 55px rgba(201,168,76,0.55)} }
        `}</style>

        {/* Ring 1 */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: "160px", height: "160px",
          border: "1px solid rgba(201,168,76,0.18)",
          borderRadius: "50%",
          animation: paused ? "none" : "orbitRing1 9s linear infinite",
          transform: "translate(-50%,-50%)",
        }}>
          {cloudTools.filter(t => t.ring === 1).map((tool) => {
            const rad = (tool.angle * Math.PI) / 180;
            const r = 80;
            return (
              <div key={tool.label}
                title={tool.label}
                onMouseEnter={() => setHovered(tool.label)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  top: `calc(50% + ${Math.sin(rad) * r}px)`,
                  left: `calc(50% + ${Math.cos(rad) * r}px)`,
                  width: "40px", height: "40px",
                  transform: "translate(-50%,-50%)",
                  background: hovered === tool.label ? "rgba(201,168,76,0.2)" : "#111",
                  border: `1px solid ${hovered === tool.label ? "#C9A84C" : "rgba(201,168,76,0.3)"}`,
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  animation: paused ? "none" : "counterRing1 9s linear infinite",
                  boxShadow: hovered === tool.label ? "0 0 16px rgba(201,168,76,0.4)" : "none",
                }}
              >{tool.icon}</div>
            );
          })}
        </div>

        {/* Ring 2 */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: "256px", height: "256px",
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: "50%",
          animation: paused ? "none" : "orbitRing2 16s linear infinite",
          transform: "translate(-50%,-50%)",
        }}>
          {cloudTools.filter(t => t.ring === 2).map((tool) => {
            const rad = (tool.angle * Math.PI) / 180;
            const r = 128;
            return (
              <div key={tool.label}
                title={tool.label}
                onMouseEnter={() => setHovered(tool.label)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  top: `calc(50% + ${Math.sin(rad) * r}px)`,
                  left: `calc(50% + ${Math.cos(rad) * r}px)`,
                  width: "32px", height: "32px",
                  transform: "translate(-50%,-50%)",
                  background: hovered === tool.label ? "rgba(201,168,76,0.2)" : "#0F0F0F",
                  border: `1px solid ${hovered === tool.label ? "#C9A84C" : "rgba(201,168,76,0.2)"}`,
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  animation: paused ? "none" : "counterRing2 16s linear infinite",
                  boxShadow: hovered === tool.label ? "0 0 12px rgba(201,168,76,0.35)" : "none",
                }}
              >{tool.icon}</div>
            );
          })}
        </div>

        {/* Center */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "72px", height: "72px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #C9A84C, #FFD700)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontSize: "10px", fontWeight: 800, color: "#000", lineHeight: 1.3, textAlign: "center",
          boxShadow: "0 0 40px rgba(201,168,76,0.45)",
          animation: "orbitPulse 3s ease-in-out infinite",
          zIndex: 10,
        }}>
          <span style={{ fontSize: "20px" }}>☁️</span>
          Cloud
        </div>
      </div>

      {/* Tool list below orbit */}
      {/* Wider than the orbit itself: at 280px these nine names wrapped onto
          five cramped rows and cost more height than the diagram deserved. */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "460px" }}>
        {cloudTools.map(t => (
          <span key={t.label}
            onMouseEnter={() => { setHovered(t.label); setPaused(true); }}
            onMouseLeave={() => { setHovered(null); setPaused(false); }}
            style={{
              padding: "5px 12px",
              background: hovered === t.label ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.05)",
              border: `1px solid ${hovered === t.label ? "#C9A84C" : "rgba(201,168,76,0.2)"}`,
              borderRadius: "20px",
              fontSize: "12px",
              color: hovered === t.label ? "#FFD700" : "#AAA",
              cursor: "default",
              transition: "all 0.2s",
            }}
          >
            {t.icon} {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────

function AnimCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const steps = 50;
        const step = duration / steps;
        let current = 0;
        const timer = setInterval(() => {
          current++;
          setCount(Math.round((current / steps) * target));
          if (current >= steps) clearInterval(timer);
        }, step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────
// GITHUB CONTRIBUTIONS
// ─────────────────────────────────────────────

function GitHubContributions() {
  const [contributions, setContributions] = useState(0);
  const [totalRepos, setTotalRepos] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const r = await fetch("https://api.github.com/users/bahadirsulukan");
        const d = await r.json();
        setTotalRepos(d.public_repos || 5);

        const map = new Map<string, number>();
        const start = new Date(selectedYear, 0, 1);
        const end = new Date(selectedYear, 11, 31);
        for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1))
          map.set(dt.toISOString().split("T")[0], 0);

        try {
          const repos = await (await fetch("https://api.github.com/users/bahadirsulukan/repos?per_page=100&sort=updated")).json();
          let total = 0;
          for (const repo of repos.slice(0, 20)) {
            try {
              const commits = await (await fetch(`https://api.github.com/repos/bahadirsulukan/${repo.name}/commits?since=${selectedYear}-01-01T00:00:00Z&until=${selectedYear}-12-31T23:59:59Z&per_page=100`)).json();
              if (Array.isArray(commits)) commits.forEach((c: any) => {
                if (c.commit?.author?.date) {
                  const k = c.commit.author.date.split("T")[0];
                  map.set(k, (map.get(k) || 0) + 1);
                  total++;
                }
              });
            } catch { /* skip */ }
          }
          setContributions(total);
        } catch { setContributions(0); }

        setCalendarData(map);
      } catch { setContributions(0); setTotalRepos(5); }
      finally { setLoading(false); }
    };
    fetch_();
  }, [selectedYear]);

  const weeks = (() => {
    const w: any[][] = [];
    let cur: any[] = [];
    const start = new Date(selectedYear, 0, 1);
    const end = new Date(selectedYear, 11, 31);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const s = d.toISOString().split("T")[0];
      cur.push({ date: new Date(d), count: calendarData.get(s) || 0, s });
      if (d.getDay() === 6) { w.push([...cur]); cur = []; }
    }
    if (cur.length) w.push(cur);
    return w;
  })();

  const color = (n: number) =>
    n === 0 ? "#1A1A1A" : n === 1 ? "rgba(201,168,76,0.3)" : n === 2 ? "rgba(201,168,76,0.55)" : n === 3 ? "rgba(201,168,76,0.78)" : "#C9A84C";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "20px", margin: 0 }}>
            {loading ? "Loading…" : `${contributions} contributions`}
          </p>
          <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>in {selectedYear}</p>
        </div>
        <select value={selectedYear} aria-label="Contribution year" onChange={e => setSelectedYear(Number(e.target.value))} style={{
          background: "#111",
          border: "1px solid rgba(201,168,76,0.3)",
          color: "#F0EAD6",
          borderRadius: "6px",
          padding: "6px 12px",
          fontSize: "13px",
          cursor: "pointer",
        }}>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div style={{ background: "#0A0A0A", borderRadius: "10px", border: "1px solid rgba(201,168,76,0.12)", padding: "16px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "3px", minWidth: "max-content" }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {week.map((day, di) => (
                <div key={di} title={`${day.count} on ${day.s}`} style={{
                  width: "12px", height: "12px",
                  borderRadius: "2px",
                  background: color(day.count),
                  cursor: "pointer",
                  transition: "transform 0.1s",
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "8px", padding: "16px" }}>
          <p style={{ color: "#666", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>Repositories</p>
          <p style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "24px", margin: 0 }}>{totalRepos}+</p>
        </div>
        <div style={{ background: "#0F0F0F", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px", padding: "16px" }}>
          <p style={{ color: "#C9A84C", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>Contributions</p>
          <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: "24px", margin: 0 }}>{contributions}</p>
        </div>
      </div>

      <a href="https://github.com/bahadirsulukan" target="_blank" rel="noreferrer" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "12px",
        background: "#0F0F0F",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: "8px",
        color: "#F0EAD6",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 600,
        transition: "all 0.2s",
      }}>
        View GitHub Profile →
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD
// ─────────────────────────────────────────────

function Card({ title, eyebrow, children, className = "" }: {
  title: string; eyebrow: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={className} style={{
      background: "#0C0C0C",
      border: "1px solid rgba(201,168,76,0.18)",
      borderRadius: "20px",
      padding: "40px",
    }}>
      <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", fontWeight: 600, margin: "0 0 8px" }}>{eyebrow}</p>
      <h2 style={{ color: "#F0EAD6", fontWeight: 800, fontSize: "28px", margin: "0 0 28px" }}>{title}</h2>
      <div style={{ color: "#999" }}>{children}</div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "#111",
  border: "1px solid rgba(201,168,76,0.22)",
  borderRadius: "8px",
  padding: "12px 14px",
  color: "#F0EAD6",
  fontSize: "15px",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#888",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  marginBottom: "8px",
  textAlign: "left",
};

function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "sent" | "error"; text?: string }>({ kind: "idle" });

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#C9A84C";
    e.currentTarget.style.background = "#141414";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(201,168,76,0.22)";
    e.currentTarget.style.background = "#111";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setSending(true);
    setStatus({ kind: "idle" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({ kind: "error", text: json.error ?? "Could not send the message. Please try again." });
        return;
      }
      form.reset();
      setStatus({ kind: "sent", text: "Thanks — your message is on its way. I'll get back to you soon." });
    } catch {
      setStatus({ kind: "error", text: "Network error. Please check your connection and try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate style={{ maxWidth: "560px", margin: "0 auto", textAlign: "left" }}>
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div>
          <label htmlFor="cf-name" style={labelStyle}>Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name"
            maxLength={100} placeholder="Your name"
            style={fieldStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label htmlFor="cf-email" style={labelStyle}>Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email"
            maxLength={200} placeholder="you@example.com"
            style={fieldStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <label htmlFor="cf-message" style={labelStyle}>Message</label>
        <textarea id="cf-message" name="message" required rows={5}
          maxLength={4000} placeholder="What would you like to talk about?"
          style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={focus} onBlur={blur} />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} style={{
        marginTop: "20px",
        width: "100%",
        padding: "14px 28px",
        background: sending ? "rgba(201,168,76,0.35)" : "linear-gradient(135deg, #C9A84C, #FFD700)",
        border: "none",
        borderRadius: "8px",
        color: "#000",
        fontWeight: 700,
        fontSize: "14px",
        letterSpacing: "0.05em",
        cursor: sending ? "wait" : "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        fontFamily: "inherit",
      }}
        onMouseEnter={e => {
          if (sending) return;
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(201,168,76,0.3)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {sending ? "Sending…" : "Send message"}
      </button>

      {/* Announced to screen readers as it changes, not just shown. */}
      <p role="status" aria-live="polite" style={{
        minHeight: "20px",
        margin: "14px 0 0",
        fontSize: "13px",
        textAlign: "center",
        color: status.kind === "error" ? "#E5A0A0" : "#C9A84C",
      }}>
        {status.text ?? ""}
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────
// AMBIENT GLOW  (parallax background accent)
// ─────────────────────────────────────────────

function AmbientGlow({ side = "left" }: { side?: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Drifts slower than the scroll — subtle depth behind the section
    const tween = gsap.fromTo(el, { yPercent: -14 }, {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <div ref={ref} aria-hidden style={{
      position: "absolute",
      top: "8%",
      ...(side === "left" ? { left: "-12%" } : { right: "-12%" }),
      width: "55%",
      height: "70%",
      background: "radial-gradient(ellipse, rgba(201,168,76,0.055), transparent 70%)",
      pointerEvents: "none",
      zIndex: 0,
    }} />
  );
}

// ─────────────────────────────────────────────
// PROJECT SHOWCASE  (scroll-driven coverflow in a gold panel)
// ─────────────────────────────────────────────

function ProjectShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The stage holds the full viewport while the tall wrapper scrolls past it,
  // and scroll progress is mapped onto the slide index — one project per equal
  // slice. Someone simply scrolling the page walks through every project in
  // turn, then the page releases and Experience follows.
  useEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    if (!wrap || !panel || reduced) return;

    const count = projectSlides.length;
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setIndex(Math.min(count - 1, Math.floor(self.progress * count)));
      },
    });

    // The panel opens up on the way in, holds full size for the whole run of
    // projects, then folds back down on the way out — so it reads as its own
    // page only while you are actually inside it. Phase durations mirror the
    // real scroll split: one viewport in, the pinned stretch, one viewport out.
    const enter = 1;
    const hold = (projectSlides.length * 55 - 100) / 100;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 0.4 },
    });
    // Scaling the panel takes the whole card with it — border, padding,
    // covers, caption and dots all grow and shrink in proportion.
    tl.fromTo(panel, { scale: 0.7, opacity: 0.55 },
                     { scale: 1, opacity: 1, ease: "power2.out", duration: enter })
      .to(panel, { scale: 1, duration: hold })
      .to(panel, { scale: 0.7, opacity: 0.55, ease: "power2.in", duration: 1 });

    return () => {
      st.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set(panel, { clearProps: "transform" });
    };
  }, [reduced]);

  // Card size is tied to viewport *height*, since that is what decides whether
  // the whole stage still fits on one screen.
  const stage = (
    <div style={{
      position: "relative",
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "72px 0 20px",
    }}>
      <AmbientGlow side="right" />
      <SectionHeading eyebrow="Portfolio" title="Selected " highlight="Projects" />
      <div ref={panelRef} style={{
        background: "#0C0C0C",
        border: "1px solid rgba(201,168,76,0.18)",
        borderRadius: "20px",
        padding: "20px 20px 26px",
        position: "relative",
        zIndex: 1,
        willChange: "transform",
      }}>
        <CoverflowCarousel
          slides={projectSlides}
          label="Selected projects"
          // Landscape cards: screenshots are wide to begin with, and the
          // shorter card buys the width back out of the vertical budget.
          cardAspect={1.6}
          // The caption, heading and padding cost a fixed ~560px of height;
          // whatever the viewport has left goes to the cover, widened by the
          // 1.6 aspect. So the covers grow on tall screens without ever
          // pushing the stage past one screen on short ones.
          cardWidth="clamp(220px, min(36vw, calc((100vh - 560px) * 1.55)), 520px)"
          activeIndex={reduced ? undefined : index}
          showCaption
          showNavigation
          showPagination
        />
      </div>
    </div>
  );

  // Reduced motion: no pinning, no scroll hijack — arrows and dots still reach
  // every project.
  if (reduced) {
    return <div id="projects">{stage}</div>;
  }

  return (
    <div
      id="projects"
      ref={wrapRef}
      style={{
        position: "relative",
        height: `${projectSlides.length * 55}vh`,
      }}
    >
      <div style={{ position: "sticky", top: 0 }}>{stage}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE SECTION  (Experience)
// ─────────────────────────────────────────────

function TimelineSection({ sectionGap }: { sectionGap: string }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(el,
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true } },
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <div id="experience" style={{ marginTop: sectionGap, position: "relative" }}>
      <AmbientGlow side="left" />
      <SectionHeading eyebrow="Career" title="Experience" />

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: "40px" }}>
        {/* Vertical gold line — animated scaleY */}
        <div ref={lineRef} style={{
          position: "absolute", left: "8px", top: "8px", bottom: "8px", width: "2px",
          background: "linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.1))",
        }} />

        <StaggerReveal staggerSecs={0.12}>
          {experiences.map((exp, i) => (
            <div key={exp.role} style={{
              position: "relative",
              marginBottom: "24px",
              background: "#0C0C0C",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: "14px",
              padding: "28px",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateX(6px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              {/* Timeline dot */}
              <div style={{
                position: "absolute",
                left: "-48px", top: "32px",
                width: "18px", height: "18px",
                borderRadius: "50%",
                background: i === 0 ? "linear-gradient(135deg,#C9A84C,#FFD700)" : "#1A1A1A",
                border: "2px solid #C9A84C",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i === 0 && <span style={{ color: "#000", fontWeight: 900, fontSize: "10px" }}>★</span>}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                <div>
                  <h3 style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "20px", margin: "0 0 4px" }}>
                    {exp.icon} {exp.role}
                  </h3>
                  <p style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 500, margin: 0 }}>{exp.place}</p>
                </div>
                <span style={{
                  padding: "4px 12px",
                  background: "rgba(201,168,76,0.07)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "20px",
                  fontSize: "12px",
                  color: "#888",
                  whiteSpace: "nowrap",
                }}>{exp.period}</span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                {exp.focus.map(f => (
                  <span key={f} style={{
                    padding: "5px 12px",
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#AAA",
                  }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero({ mouseRef, introComplete }: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  introComplete: boolean;
}) {
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const textColRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollProgRef = useRef(0);
  const roles = ["Software Engineer", "C++ Developer", "Startup Builder", "Full-Stack Dev", "AI Explorer"];

  // Track hero scroll-out progress (consumed by the robot's frame loop)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => { scrollProgRef.current = self.progress; },
    });

    // Scroll hint fades out scrubbed over the first 30% of the hero
    const hint = gsap.to(scrollHintRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "30% top", scrub: true },
    });

    // Background parallax — glow and grid trail behind the content
    const bgPar = gsap.to([glowRef.current, gridRef.current], {
      yPercent: 24,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
    });

    return () => {
      hint.scrollTrigger?.kill(); hint.kill();
      bgPar.scrollTrigger?.kill(); bgPar.kill();
      st.kill();
    };
  }, []);

  // Animate hero text in after intro screen fades
  useEffect(() => {
    if (!introComplete) return;
    const col = textColRef.current;
    if (!col || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const children = Array.from(col.children) as HTMLElement[];
    gsap.fromTo(
      children,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: "power3.out", delay: 0.15 },
    );
  }, [introComplete]);

  useEffect(() => {
    const role = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (roleText.length < role.length) t = setTimeout(() => setRoleText(role.slice(0, roleText.length + 1)), 75);
      else t = setTimeout(() => setDeleting(true), 2200);
    } else {
      if (roleText.length > 0) t = setTimeout(() => setRoleText(roleText.slice(0, -1)), 40);
      else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
    }
    return () => clearTimeout(t);
  }, [roleText, deleting, roleIdx]);

  return (
    <section id="about" ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Radial gold glow — parallax layer */}
      <div ref={glowRef} style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(201,168,76,0.07), transparent)",
        pointerEvents: "none",
      }} />
      {/* Grid lines — parallax layer */}
      <div ref={gridRef} style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "96px 32px 64px",
        width: "100%", display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "40px",
        alignItems: "center",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Left: Text ── */}
        <div ref={textColRef} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ color: "#C9A84C", fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            &lt; Cloud &amp; DevOps /&gt;
          </div>

          <div>
            <h1 style={{ margin: 0, lineHeight: 0.9 }}>
              <span style={{
                display: "block",
                fontSize: "clamp(52px, 9vw, 96px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #C9A84C 0%, #FFD700 50%, #E8C86A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(201,168,76,0.25))",
              }}>Bahadir</span>
              <span style={{
                display: "block",
                fontSize: "clamp(52px, 9vw, 96px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#F0EAD6",
              }}>Sulukan</span>
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "28px", height: "1px", background: "#C9A84C" }} />
            <p style={{ margin: 0, color: "#C9A84C", fontFamily: "var(--font-geist-mono), monospace", fontSize: "18px", minHeight: "28px" }}>
              {roleText}<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
            </p>
          </div>

          <p style={{ margin: 0, color: "#777", fontSize: "17px", lineHeight: 1.7, maxWidth: "420px" }}>
            Computer Science Student @ Hochschule Darmstadt.<br />
            Passionate about AI, systems, and building products that matter.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a href="#projects" style={{
              padding: "14px 32px",
              border: "1px solid #C9A84C",
              color: "#C9A84C",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "3px",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C9A84C"; (e.currentTarget as HTMLElement).style.color = "#000"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}
            >View Projects</a>
            <a href="/BahadirSulukan_CV.pdf" download style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #C9A84C, #FFD700)",
              color: "#000",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "3px",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(201,168,76,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >Download CV</a>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a href="https://github.com/bahadirsulukan" target="_blank" rel="noreferrer">
              <Image src="/github-mark.png" alt="GitHub" width={22} height={22} style={{ opacity: 0.5, filter: "invert(1)", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")} />
            </a>
            <a href="https://linkedin.com/in/bahadirsulukan" target="_blank" rel="noreferrer">
              <Image src="/LI-In-Bug.png" alt="LinkedIn" width={22} height={22} style={{ opacity: 0.5, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")} />
            </a>
            <a href="mailto:bahadirsulukan@gmail.com">
              <Image src="/32px-Gmail_icon_(2020).svg.png" alt="Email" width={22} height={22} style={{ opacity: 0.5, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")} />
            </a>
          </div>
        </div>

        {/* ── Right: 3D Robot ── */}
        <div style={{ height: "clamp(380px, 55vw, 660px)", position: "relative" }}>
          {/* Glow halo behind robot */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "300px", height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <RobotCanvas mouseRef={mouseRef} scrollRef={scrollProgRef} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        color: "#C9A84C", opacity: 0.5,
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: "1px", height: "48px",
          background: "linear-gradient(to bottom, #C9A84C, transparent)",
          animation: "pulse 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cloudGridRef = useRef<HTMLDivElement>(null);
  const cloudHeadRef = useRef<HTMLDivElement>(null);
  // Stable reference — an inline lambda would remount the intro timeline on every render
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  // The Cloud heading lives inside the left column so it can pin with the
  // orbit, which pushes that column down. Publish the exact offset as a CSS
  // variable so the right column can match it and both cards share a top
  // edge — measured rather than hard-coded, so a wrapped title stays aligned.
  useEffect(() => {
    const head = cloudHeadRef.current;
    const grid = cloudGridRef.current;
    if (!head || !grid) return;

    const sync = () => {
      const pin = head.parentElement;
      const panel = head.nextElementSibling as HTMLElement | null;
      if (!pin || !panel) return;
      // Both sit inside the same (possibly animated) wrapper, so the delta is
      // unaffected by Reveal's transform.
      const offset = panel.getBoundingClientRect().top - pin.getBoundingClientRect().top;
      grid.style.setProperty("--cloud-head-h", `${Math.round(offset)}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(head);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goldGrad = "linear-gradient(135deg, #C9A84C, #FFD700)";
  const sectionGap = "80px";

  return (
    <div style={{ background: "#080808", color: "#F0EAD6", minHeight: "100dvh" }}>
      {/* Film grain — breaks digital flatness, sits above everything */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 300, pointerEvents: "none",
        opacity: 0.035, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
      }} />
      <IntroScreen onComplete={handleIntroComplete} />

      <div style={{
        opacity: introComplete ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
      }}>
        <Navbar scrolled={scrolled} />

        {/* ── HERO ── */}
        <Hero mouseRef={mouseRef} introComplete={introComplete} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: `0 32px ${sectionGap}` }}>

          {/* ── ABOUT / SKILLS ── */}
          <Reveal delay={0}>
            <div style={{
              marginTop: sectionGap,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
            }} className="lg:grid-cols-[2fr_1fr]">
              <Card title="Technical Stack" eyebrow="Skills">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
                  {["C++", "Python", "JavaScript (ES6+)", "TypeScript", "React.js", "Node.js", "Express.js",
                    "HTML5", "CSS3", "PostgreSQL", "MySQL", "REST APIs", "AWS (RDS, EC2, S3)", "Git & GitHub", "Agile/Scrum"].map(s => (
                    <span key={s} style={{
                      padding: "7px 16px",
                      border: "1px solid rgba(201,168,76,0.25)",
                      borderRadius: "20px",
                      fontSize: "13px",
                      color: "#C9A84C",
                      background: "rgba(201,168,76,0.05)",
                      transition: "all 0.2s",
                      cursor: "default",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.25)"; }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: "12px" }}>
                  {[
                    { label: "University", val: "Hochschule Darmstadt" },
                    { label: "Location", val: "Darmstadt, Germany" },
                    { label: "Semester", val: "7th Semester" },
                    { label: "Focus", val: "AI · Systems · Web" },
                  ].map(({ label, val }) => (
                    <div key={label} style={{
                      background: "#0F0F0F",
                      border: "1px solid rgba(201,168,76,0.12)",
                      borderRadius: "10px",
                      padding: "14px 16px",
                    }}>
                      <p style={{ color: "#555", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 4px" }}>{label}</p>
                      <p style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "14px", margin: 0 }}>{val}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="Languages" eyebrow="Communication">
                <Languages />
              </Card>
            </div>
          </Reveal>

          {/* ── PROJECTS ── */}
          <ProjectShowcase />

          {/* ── EXPERIENCE ── */}
          <TimelineSection sectionGap={sectionGap} />

          {/* ── GITHUB ── */}
          <Reveal delay={0}>
            <div id="github" style={{ marginTop: sectionGap }}>
              <Card title="GitHub Activity" eyebrow="Open Source">
                <GitHubContributions />
              </Card>
            </div>
          </Reveal>

          {/* ── CLOUD & DEVOPS ── */}
          <div id="cloud" style={{ marginTop: sectionGap }}>
            <div ref={cloudGridRef} style={{ display: "grid", gap: "20px", alignItems: "start" }} className="lg:grid-cols-2">

                {/* Left: heading and orbit pin together as one block while the
                    right column scrolls past — the title stays with its subject */}
                <Reveal direction="left" className="cloud-pin">
                  <div ref={cloudHeadRef}>
                    <SectionHeading eyebrow="Specialty" title="Cloud & " highlight="DevOps" />
                  </div>
                  <div style={{
                    background: "#0C0C0C",
                    border: "1px solid rgba(201,168,76,0.18)",
                    borderRadius: "20px",
                    padding: "26px 28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 4px" }}>Tools &amp; Stack</p>
                    <h3 style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "20px", margin: "0 0 24px" }}>Cloud Stack</h3>
                    <CloudOrbit />
                    <p style={{ color: "#555", fontSize: "12px", marginTop: "8px", textAlign: "center" }}>Hover to pause · hover icon to highlight</p>
                  </div>
                </Reveal>

                {/* Right: scrolling story — Stats → Pipeline → Certification.
                    Offset down by the heading's height so its first card sits
                    level with the orbit panel opposite. */}
                <div className="cloud-right" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <Reveal direction="right">
                  <div style={{
                    background: "#0C0C0C",
                    border: "1px solid rgba(201,168,76,0.18)",
                    borderRadius: "20px",
                    padding: "32px",
                  }}>
                    <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 4px" }}>Numbers</p>
                    <h3 style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "20px", margin: "0 0 20px" }}>Stats</h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { num: 3,  suffix: "",  label: "AWS Services",    sub: "EC2 · S3 · RDS",     delay: 0   },
                        { num: 17, suffix: "",  label: "GitHub Repos",    sub: "Public projects",    delay: 100 },
                        { num: 9,  suffix: "",  label: "Live Deployments", sub: "Vercel",            delay: 200 },
                        { num: 1,  suffix: "",  label: "Certification",   sub: "EDB Postgres AI",    delay: 300 },
                      ].map(s => (
                        <div key={s.label} style={{
                          background: "#111",
                          border: "1px solid rgba(201,168,76,0.12)",
                          borderRadius: "12px",
                          padding: "20px 18px",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.25s",
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                        >
                          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: goldGrad }} />
                          <div style={{ fontSize: "36px", fontWeight: 900, lineHeight: 1, fontVariantNumeric: "tabular-nums", background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            <AnimCounter target={s.num} suffix={s.suffix} />
                          </div>
                          <div style={{ color: "#666", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "4px 0 2px" }}>{s.label}</div>
                          <div style={{ color: "rgba(201,168,76,0.7)", fontSize: "11px", fontWeight: 600 }}>{s.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </Reveal>

                {/* Pipeline — the story between the numbers and the proof */}
                <Reveal direction="right" delay={100}>
                  <div style={{
                    background: "#0C0C0C",
                    border: "1px solid rgba(201,168,76,0.18)",
                    borderRadius: "20px",
                    padding: "32px",
                  }}>
                    <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 4px" }}>Pipeline</p>
                    <h3 style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "20px", margin: "0 0 24px" }}>How I Ship</h3>
                    {[
                      { icon: "🐳", title: "Build",     desc: "Containerized with Docker — reproducible multi-stage builds" },
                      { icon: "⚙️", title: "Test & CI", desc: "GitHub Actions runs checks on every push" },
                      { icon: "🚀", title: "Deploy",    desc: "AWS — EC2 compute, S3 storage, RDS Postgres" },
                      { icon: "📊", title: "Monitor",   desc: "Logs, alerts and health checks after release" },
                    ].map((step, i, arr) => (
                      <div key={step.title} style={{ display: "flex", gap: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{
                            width: "40px", height: "40px", flexShrink: 0,
                            borderRadius: "12px",
                            background: "#111",
                            border: "1px solid rgba(201,168,76,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "17px",
                          }}>{step.icon}</div>
                          {i < arr.length - 1 && (
                            <div style={{
                              width: "2px", flex: 1, minHeight: "18px", margin: "4px 0",
                              background: "linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.08))",
                            }} />
                          )}
                        </div>
                        <div style={{ paddingBottom: i < arr.length - 1 ? "18px" : 0 }}>
                          <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "15px", margin: "0 0 2px" }}>{step.title}</p>
                          <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* EDB Certificate */}
                <Reveal direction="right" delay={200}>
                  <div style={{
                    background: "#0C0C0C",
                    border: "1px solid rgba(201,168,76,0.18)",
                    borderRadius: "20px",
                    padding: "32px",
                  }}>
                    <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 12px" }}>Certification</p>
                    <div style={{
                      background: "linear-gradient(135deg, #0F0D07, #1C1800)",
                      border: "1px solid rgba(201,168,76,0.35)",
                      borderRadius: "14px",
                      padding: "22px",
                      display: "flex",
                      gap: "18px",
                      alignItems: "center",
                      transition: "all 0.25s",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(201,168,76,0.15)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    >
                      <div style={{
                        width: "64px", height: "64px", flexShrink: 0,
                        borderRadius: "14px",
                        background: "linear-gradient(135deg, #C9A84C, #FFD700)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "30px",
                        boxShadow: "0 8px 24px rgba(201,168,76,0.35)",
                      }}>🐘</div>
                      <div>
                        <h4 style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "15px", margin: "0 0 4px", lineHeight: 1.3 }}>
                          EDB Postgres AI<br />Database Essentials
                        </h4>
                        <p style={{ color: "#777", fontSize: "13px", margin: "0 0 10px" }}>EnterpriseDB · 2025</p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{
                            padding: "3px 10px",
                            background: "rgba(201,168,76,0.12)",
                            border: "1px solid rgba(201,168,76,0.4)",
                            borderRadius: "20px",
                            fontSize: "11px",
                            color: "#C9A84C",
                            fontWeight: 600,
                          }}>✓ Verified</span>
                          <span style={{
                            padding: "3px 10px",
                            background: "rgba(201,168,76,0.06)",
                            border: "1px solid rgba(201,168,76,0.25)",
                            borderRadius: "20px",
                            fontSize: "11px",
                            color: "rgba(240,234,214,0.8)",
                            fontWeight: 600,
                          }}>PostgreSQL · AI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                </div>
            </div>
          </div>

          {/* ── MUSIC + STORY ── */}
          <StaggerReveal id="music" style={{ marginTop: sectionGap, display: "grid", gap: "20px" }} className="lg:grid-cols-2">
              {/* KEK Music */}
              <div style={{
                background: "#0C0C0C",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "20px",
                padding: "40px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, right: 0, fontSize: "100px", opacity: 0.04, lineHeight: 1 }}>🎸</div>
                <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 8px" }}>Beyond Code</p>
                <h2 style={{ fontWeight: 800, fontSize: "28px", margin: "0 0 16px", background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KEK Music</h2>
                <p style={{ color: "#777", lineHeight: 1.75, margin: "0 0 12px", fontSize: "15px" }}>
                  Founding member of <strong style={{ color: "#C9A84C" }}>KEK</strong>, an alternative rock band. Playing guitar and writing music taught me collaboration, creative problem-solving, and the balance between structure and freedom — skills that directly translate to software.
                </p>
                <p style={{ color: "#666", lineHeight: 1.7, margin: "0 0 24px", fontSize: "14px" }}>
                  Music and code share pattern recognition, attention to detail, and building something meaningful from raw elements.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {[
                    { label: "Spotify", href: "https://open.spotify.com/intl-de/artist/3afx5wFaInIVa4ZDMTOHaB?si=RHrbFLFfSAmu8CKt1AJTkQ", img: "/Spotify_Primary_Logo_RGB_Green.png", color: "#1DB954" },
                    { label: "YouTube", href: "https://youtube.com/@kek.music_official", img: "/yt_icon_red_digital.png", color: "#FF0000" },
                    { label: "TikTok", href: "https://www.tiktok.com/@kek.music_official", img: "/TikTok_Icon_Black_Circle.png", color: "#EE1D52" },
                    { label: "Instagram", href: "https://www.instagram.com/kek.music_official", img: "/Instagram_Glyph_Gradient.png", color: "#E1306C" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "10px 16px",
                      background: "#111",
                      border: `1px solid ${s.color}33`,
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: s.color,
                      fontSize: "13px",
                      fontWeight: 600,
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${s.color}18`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#111"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                    >
                      <img src={s.img} alt="" loading="lazy" style={{ width: "18px", height: "18px", objectFit: "contain" }} />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Story */}
              <div style={{
                background: "#0C0C0C",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "20px",
                padding: "40px",
              }}>
                <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 8px" }}>Philosophy</p>
                <h2 style={{ fontWeight: 800, fontSize: "28px", margin: "0 0 20px", color: "#F0EAD6" }}>My Story</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", color: "#777", fontSize: "15px", lineHeight: 1.75 }}>
                  <p style={{ margin: 0 }}>Studying Computer Science at Hochschule Darmstadt with a focus on software development, AI, and modern web technologies.</p>
                  <p style={{ margin: 0 }}>My approach: structured, solution-oriented, and driven by continuous learning. I care about clean code and software that feels effortless to use.</p>
                </div>

                {/* Life motto code block */}
                <div style={{
                  marginTop: "24px",
                  background: "#080808",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "10px",
                  padding: "20px",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "14px",
                  lineHeight: 1.8,
                }}>
                  <span style={{ color: "#C9A84C" }}>if</span>
                  {" ("}
                  <span style={{ color: "#60A5FA" }}>sad</span>
                  {"() === "}
                  <span style={{ color: "#F97316" }}>true</span>
                  {") {\n"}
                  <br />
                  &nbsp;&nbsp;<span style={{ color: "#60A5FA" }}>sad</span>{"()."}
                  <span style={{ color: "#4ADE80" }}>stop</span>{"();"}
                  <br />
                  &nbsp;&nbsp;<span style={{ color: "#60A5FA" }}>beAwesome</span>{"();"}
                  <br />
                  {"}"}
                </div>

                <blockquote style={{
                  borderLeft: "3px solid #C9A84C",
                  margin: "20px 0 0",
                  paddingLeft: "16px",
                  color: "#888",
                  fontStyle: "italic",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}>
                  "Code is like humor. When you have to explain it, it's bad."
                  <footer style={{ color: "#C9A84C", fontStyle: "normal", fontWeight: 600, marginTop: "6px", fontSize: "13px" }}>— Cory House</footer>
                </blockquote>
              </div>
            </StaggerReveal>

          {/* ── CONTACT ── */}
          <Reveal delay={0}>
            <div id="contact" style={{ marginTop: sectionGap, marginBottom: sectionGap }}>
              <div style={{
                background: "#0C0C0C",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "20px",
                padding: "60px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* background glow */}
                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                  width: "500px", height: "300px",
                  background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)",
                  pointerEvents: "none",
                }} />
                <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", margin: "0 0 8px" }}>Let's Talk</p>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", margin: "0 0 16px", color: "#F0EAD6" }}>
                  Get in <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span>
                </h2>
                <p style={{ color: "#666", fontSize: "17px", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>
                  Open to new opportunities, collaborations, and challenging projects.
                </p>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <ContactForm />
                </div>

                {/* Secondary routes — the form is the primary one now */}
                <div style={{
                  display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px",
                  marginTop: "40px", paddingTop: "32px",
                  borderTop: "1px solid rgba(201,168,76,0.12)",
                  position: "relative", zIndex: 1,
                }}>
                  {[
                    { label: "LinkedIn", href: "https://linkedin.com/in/bahadirsulukan", img: "/LI-In-Bug.png", primary: false },
                    { label: "GitHub", href: "https://github.com/bahadirsulukan", img: "/github-mark.png", primary: false, invert: true },
                  ].map(btn => (
                    <a key={btn.label} href={btn.href} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      background: btn.primary ? "linear-gradient(135deg,#C9A84C,#FFD700)" : "#111",
                      border: btn.primary ? "none" : "1px solid rgba(201,168,76,0.25)",
                      borderRadius: "8px",
                      color: btn.primary ? "#000" : "#F0EAD6",
                      fontWeight: 700,
                      fontSize: "14px",
                      textDecoration: "none",
                      transition: "all 0.25s",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 30px rgba(201,168,76,${btn.primary ? "0.3" : "0.1"})`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = "none";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <Image src={btn.img} alt="" width={20} height={20}
                        style={{ objectFit: "contain", filter: btn.invert ? "invert(1)" : undefined }} />
                      {btn.label}
                    </a>
                  ))}
                  <a href="/BahadirSulukan_CV.pdf" download style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    background: "#111",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "8px",
                    color: "#C9A84C",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "all 0.25s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.background = "#111"; }}
                  >
                    📄 Download CV
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed", bottom: "32px", right: "32px", zIndex: 50,
          width: "44px", height: "44px",
          border: "1px solid rgba(201,168,76,0.4)",
          borderRadius: "50%",
          background: "rgba(8,8,8,0.9)",
          color: "#C9A84C",
          fontSize: "18px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(16px)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.15)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(8,8,8,0.9)"; }}
      >
        ↑
      </button>
    </div>
  );
}
