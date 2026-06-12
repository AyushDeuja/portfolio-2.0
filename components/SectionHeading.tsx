"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-14 flex items-center gap-5"
    >
      <span className="font-mono text-sm font-medium text-accent">{index}</span>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-line" />
    </motion.div>
  );
}

