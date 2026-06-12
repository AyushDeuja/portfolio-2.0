"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" title="Skills" />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/30"
          >
            <h3 className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
              {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-line px-3 py-1.5 text-sm text-mute transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
