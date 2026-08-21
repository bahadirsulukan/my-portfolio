"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────
// ROBOT HEAD  (React Three Fiber)
// ─────────────────────────────────────────────

function RobotHead({ mouseRef, scrollRef }: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}) {
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const leftEyeMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const rightEyeMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const leftLightRef = useRef<THREE.PointLight>(null!);
  const rightLightRef = useRef<THREE.PointLight>(null!);
  const antennaRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const p = scrollRef.current; // 0 → 1 as the hero scrolls out

    // Head follows mouse; turns away and glances down as the page scrolls
    if (headRef.current) {
      headRef.current.rotation.y += (mx * 0.55 - p * 0.6 - headRef.current.rotation.y) * 0.06;
      headRef.current.rotation.x += (-my * 0.28 + p * 0.45 - headRef.current.rotation.x) * 0.06;
    }

    // Body floats; turns and drifts upward on scroll — a staged exit
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 0.65) * 0.13 + p * 1.1;
      bodyRef.current.rotation.y += (-p * 0.85 - bodyRef.current.rotation.y) * 0.08;
      bodyRef.current.rotation.z = Math.sin(t * 0.42) * 0.012;
      const s = 1 - p * 0.16;
      bodyRef.current.scale.set(s, s, s);
    }

    // Eye glow pulses; dims as the robot leaves the stage
    const glow = (1.6 + Math.sin(t * 2.8) * 0.7) * (1 - p * 0.55);
    if (leftEyeMatRef.current) leftEyeMatRef.current.emissiveIntensity = glow;
    if (rightEyeMatRef.current) rightEyeMatRef.current.emissiveIntensity = glow;
    if (leftLightRef.current) leftLightRef.current.intensity = glow * 0.7;
    if (rightLightRef.current) rightLightRef.current.intensity = glow * 0.7;

    // Antenna flickers slightly faster
    if (antennaRef.current) {
      antennaRef.current.emissiveIntensity = 1.0 + Math.sin(t * 4.5) * 0.5;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, 2, -4]} intensity={0.7} color="#C9A84C" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#FFD700" />
      <pointLight ref={leftLightRef} position={[-0.3, 0.15, 0.9]} color="#FFD700" distance={3} intensity={2} />
      <pointLight ref={rightLightRef} position={[0.3, 0.15, 0.9]} color="#FFD700" distance={3} intensity={2} />

      {/* ── HEAD GROUP (rotates with mouse) ── */}
      <group ref={headRef}>
        {/* Main head box */}
        <mesh>
          <boxGeometry args={[1.42, 1.65, 1.02]} />
          <meshStandardMaterial color="#0C0C0C" metalness={0.96} roughness={0.04} />
        </mesh>

        {/* Forehead inset panel */}
        <mesh position={[0, 0.48, 0.52]}>
          <boxGeometry args={[1.1, 0.38, 0.02]} />
          <meshStandardMaterial color="#090909" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Gold visor band */}
        <mesh position={[0, 0.1, 0.52]}>
          <boxGeometry args={[1.18, 0.3, 0.025]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.88} roughness={0.12} emissive="#C9A84C" emissiveIntensity={0.2} />
        </mesh>

        {/* Left eye socket (dark recess) */}
        <mesh position={[-0.29, 0.12, 0.52]}>
          <cylinderGeometry args={[0.135, 0.135, 0.04, 20]} />
          <meshStandardMaterial color="#040404" metalness={1} roughness={0} />
        </mesh>
        {/* Right eye socket */}
        <mesh position={[0.29, 0.12, 0.52]}>
          <cylinderGeometry args={[0.135, 0.135, 0.04, 20]} />
          <meshStandardMaterial color="#040404" metalness={1} roughness={0} />
        </mesh>

        {/* Left eye (glows gold) */}
        <mesh position={[-0.29, 0.12, 0.565]}>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshStandardMaterial
            ref={leftEyeMatRef}
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={2}
            metalness={0}
            roughness={0}
          />
        </mesh>
        {/* Right eye */}
        <mesh position={[0.29, 0.12, 0.565]}>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshStandardMaterial
            ref={rightEyeMatRef}
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={2}
            metalness={0}
            roughness={0}
          />
        </mesh>

        {/* Left ear panel */}
        <mesh position={[-0.78, 0, 0]}>
          <boxGeometry args={[0.14, 0.72, 0.88]} />
          <meshStandardMaterial color="#0C0C0C" metalness={0.96} roughness={0.04} />
        </mesh>
        {/* Right ear panel */}
        <mesh position={[0.78, 0, 0]}>
          <boxGeometry args={[0.14, 0.72, 0.88]} />
          <meshStandardMaterial color="#0C0C0C" metalness={0.96} roughness={0.04} />
        </mesh>

        {/* Left ear gold strip */}
        <mesh position={[-0.79, 0.05, 0.36]}>
          <boxGeometry args={[0.04, 0.4, 0.08]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.25} />
        </mesh>
        {/* Right ear gold strip */}
        <mesh position={[0.79, 0.05, 0.36]}>
          <boxGeometry args={[0.04, 0.4, 0.08]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.25} />
        </mesh>

        {/* Top head plate */}
        <mesh position={[0, 0.88, -0.02]}>
          <boxGeometry args={[1.32, 0.12, 0.92]} />
          <meshStandardMaterial color="#0A0A0A" metalness={0.96} roughness={0.04} />
        </mesh>

        {/* Top gold stripe */}
        <mesh position={[0, 0.84, 0.46]}>
          <boxGeometry args={[1.1, 0.055, 0.04]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.35} />
        </mesh>

        {/* Chin / lower face */}
        <mesh position={[0, -0.52, 0.52]}>
          <boxGeometry args={[1.1, 0.38, 0.025]} />
          <meshStandardMaterial color="#090909" metalness={0.92} roughness={0.08} />
        </mesh>

        {/* Mouth grill — 3 horizontal lines */}
        {([-0.12, 0, 0.12] as number[]).map((dy, i) => (
          <mesh key={i} position={[0, -0.52 + dy, 0.535]}>
            <boxGeometry args={[0.55, 0.03, 0.02]} />
            <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.15} />
          </mesh>
        ))}

        {/* Antenna base */}
        <mesh position={[0, 0.96, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.18, 10]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Antenna rod */}
        <mesh position={[0, 1.37, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.62, 10]} />
          <meshStandardMaterial color="#181818" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Antenna tip orb */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.07, 18, 18]} />
          <meshStandardMaterial
            ref={antennaRef}
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={1.5}
            metalness={0}
            roughness={0}
          />
        </mesh>
      </group>

      {/* ── NECK ── */}
      <mesh position={[0, -0.97, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.44, 14]} />
        <meshStandardMaterial color="#0C0C0C" metalness={0.96} roughness={0.04} />
      </mesh>

      {/* ── SHOULDERS ── */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[2.25, 0.28, 0.88]} />
        <meshStandardMaterial color="#0C0C0C" metalness={0.96} roughness={0.04} />
      </mesh>
      {/* Shoulder gold stripe */}
      <mesh position={[0, -1.17, 0.44]}>
        <boxGeometry args={[2.05, 0.05, 0.03]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.35} />
      </mesh>

      {/* ── CHEST ── */}
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[1.85, 0.42, 0.72]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.96} roughness={0.04} />
      </mesh>
      {/* Chest emblem */}
      <mesh position={[0, -1.6, 0.365]}>
        <boxGeometry args={[0.44, 0.14, 0.025]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.45} />
      </mesh>
    </group>
  );
}

export default function RobotCanvas({ mouseRef, scrollRef }: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      // Pulled back and raised: at [0, 0.3, 4.8] the antenna tip sat barely
      // above the top of frame, so the ~10s float cycle clipped it off screen
      // every time it peaked. Measured headroom at the peak is now ~30px
      // instead of 0, and the chest stays in shot at the bottom.
      camera={{ position: [0, 0.5, 5.6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <RobotHead mouseRef={mouseRef} scrollRef={scrollRef} />
      </Suspense>
    </Canvas>
  );
}
