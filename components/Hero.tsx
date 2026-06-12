"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { heroRoles, siteConfig } from "@/lib/data";
import { ArrowUpRightIcon, MapPinIcon } from "./Icons";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-accent-soft blur-2xl" />
    </div>
  ),
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Parallax: as the hero scrolls out, text and scene drift apart and fade
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -90]);
  const sceneY = useTransform(scrollY, [0, 600], [0, 70]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % heroRoles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Single subtle background wash */}
      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/4 -translate-y-1/4 rounded-full bg-accent-soft blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[5fr_4fr]">
        <motion.div style={{ y: textY, opacity: heroOpacity }}>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-sm font-medium text-accent"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Ayush Deuja.
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 flex h-12 items-center font-display text-2xl font-semibold text-mute sm:text-3xl lg:text-4xl"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {heroRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-lg leading-relaxed text-mute"
          >
            I build scalable APIs, web and mobile applications at{" "}
            <span className="font-medium text-foreground">CloveIT</span>, and
            mentor the next generation of developers across Biratnagar, Nepal.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent-solid px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-solid/25"
            >
              View my work
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg border border-line bg-card px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-accent/40"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-faint"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              {siteConfig.location}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ y: sceneY }}
          className="relative hidden h-105 lg:block lg:h-135"
          aria-hidden
        >
          <Hero3D />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-9 w-5.5 items-start justify-center rounded-full border border-line p-1"
        >
          <div className="h-1.5 w-1 rounded-full bg-accent" />
        </motion.div>
      </motion.a>
    </section>
  );
}

