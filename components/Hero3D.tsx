"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

type Palette = {
  core: string;
  coreEmissive: string;
  wire: string;
  dots: string;
  particles: string;
  keyLight: string;
  fillLight: string;
  ambient: number;
};

const palettes: Record<"dark" | "light", Palette> = {
  dark: {
    core: "#4f46e5",
    coreEmissive: "#1e1b4b",
    wire: "#818cf8",
    dots: "#a5b4fc",
    particles: "#818cf8",
    keyLight: "#c7d2fe",
    fillLight: "#38bdf8",
    ambient: 0.35,
  },
  light: {
    core: "#4f46e5",
    coreEmissive: "#312e81",
    wire: "#4f46e5",
    dots: "#4f46e5",
    particles: "#6366f1",
    keyLight: "#ffffff",
    fillLight: "#818cf8",
    ambient: 0.9,
  },
};

/** Eases the whole scene toward the pointer for a subtle parallax. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const damp = 1 - Math.exp(-2.5 * delta);
    group.current.rotation.y +=
      (pointer.x * 0.35 - group.current.rotation.y) * damp;
    group.current.rotation.x +=
      (-pointer.y * 0.25 - group.current.rotation.x) * damp;
  });

  return <group ref={group}>{children}</group>;
}

function Core({ palette }: { palette: Palette }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.rotation.x += delta * 0.06;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={palette.core}
          emissive={palette.coreEmissive}
          flatShading
          metalness={0.55}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function WireShell({ palette }: { palette: Palette }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y -= delta * 0.08;
    mesh.current.rotation.z += delta * 0.04;
  });

  return (
    <mesh ref={mesh} scale={2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color={palette.wire}
        wireframe
        transparent
        opacity={0.22}
      />
    </mesh>
  );
}

function OrbitingDots({ palette }: { palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const count = 10;

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5] as [
            number,
            number,
            number,
          ],
          scale: 0.035 + (i % 3) * 0.015,
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
  });

  return (
    <group rotation={[Math.PI / 3.2, 0, Math.PI / 12]}>
      <group ref={group}>
        {dots.map((dot, i) => (
          <mesh key={i} position={dot.position} scale={dot.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={palette.dots} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.004, 8, 128]} />
        <meshBasicMaterial
          color={palette.wire}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ParticleField({ palette }: { palette: Palette }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 350;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random points on a spherical shell between radius 3.2 and 5
      const r = 3.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        color={palette.particles}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  const { theme } = useTheme();
  const palette = palettes[theme];

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={palette.ambient} />
      <directionalLight
        position={[4, 4, 5]}
        intensity={1.4}
        color={palette.keyLight}
      />
      <pointLight
        position={[-5, -2, 3]}
        intensity={1.1}
        color={palette.fillLight}
      />
      <ParallaxRig>
        <Core palette={palette} />
        <WireShell palette={palette} />
        <OrbitingDots palette={palette} />
        <ParticleField palette={palette} />
      </ParallaxRig>
    </Canvas>
  );
}
