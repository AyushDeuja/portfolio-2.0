"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  workExperience,
  teachingExperience,
  type ExperienceItem,
} from "@/lib/data";

function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-10"
    >
      <span className="absolute top-2 left-0 h-3 w-3 rounded-full border-2 border-accent bg-background" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg font-semibold">
          {item.title}{" "}
          <span className="font-normal text-accent">@ {item.company}</span>
        </h3>
        <span className="font-mono text-xs text-faint">{item.period}</span>
      </div>

      <ul className="mt-3 space-y-2">
        {item.points.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-sm leading-relaxed text-mute"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Timeline({ items }: { items: ExperienceItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  // The accent line draws itself in as the timeline scrolls through view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });

  return (
    <div ref={ref} className="relative flex flex-col gap-12">
      <div className="absolute top-2 bottom-2 left-1.25 w-px bg-line" />
      <motion.div
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-1.25 w-px origin-top bg-accent"
      />
      {items.map((item, i) => (
        <TimelineCard key={item.title + item.company} item={item} index={i} />
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-28">
      <SectionHeading index="03" title="Experience" />
      <Timeline items={workExperience} />

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-12 font-display text-xl font-semibold"
      >
        Teaching & Mentoring
      </motion.h3>
      <Timeline items={teachingExperience} />
    </section>
  );
}
