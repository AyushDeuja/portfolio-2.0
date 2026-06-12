"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { education, certification } from "@/lib/data";
import { AwardIcon, GraduationCapIcon } from "./Icons";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="05" title="Education & Certification" />

      <div className="grid gap-5 lg:grid-cols-3">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-xl border border-line bg-card p-6 transition-colors hover:border-accent/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <GraduationCapIcon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold">
              {edu.degree}
            </h3>
            <p className="mt-1 text-sm text-mute">{edu.institution}</p>
            <p className="mt-3 font-mono text-xs text-faint">{edu.period}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="rounded-xl border border-accent/30 bg-accent-soft p-6"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-solid text-white">
            <AwardIcon className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-base font-semibold">
            {certification.title}
          </h3>
          <p className="mt-1 text-sm text-mute">
            Issued by {certification.issuer}
          </p>
          <p className="mt-3 font-mono text-xs text-accent">
            {certification.year}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
