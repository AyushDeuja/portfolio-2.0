"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig, certification } from "@/lib/data";
import { AwardIcon } from "./Icons";

const stats = [
  { value: "5+", label: "Projects built" },
  { value: "2", label: "Companies" },
  { value: "3", label: "Schools mentored" },
  { value: "15+", label: "Technologies" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Image drifts gently against scroll direction while the section is in view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto max-w-6xl px-6 py-28"
    >
      <SectionHeading index="01" title="About" />

      <div className="grid items-start gap-14 lg:grid-cols-[2fr_3fr]">
        <motion.div style={{ y: imageY }} className="mx-auto w-fit">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <Image
                src="/profile-placeholder.jpeg"
                alt="Ayush Deuja"
                width={320}
                height={380}
                className="h-95 w-80 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority
              />
            </div>
            <div className="absolute -right-4 -bottom-4 flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <AwardIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs font-semibold">Certified Developer</p>
                <p className="text-xs text-faint">{certification.issuer}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className="font-display text-xl font-semibold sm:text-2xl">
            Full Stack Developer & Tech Mentor
          </h3>
          <p className="mt-5 leading-relaxed text-mute">{siteConfig.tagline}</p>
          <p className="mt-4 leading-relaxed text-mute">
            Beyond writing code, I&apos;m passionate about sharing knowledge —
            from running intensive bootcamps for fresh SEE graduates to teaching
            robotics, IoT and game development to school students. I believe
            great software and great communities are built the same way: one
            solid foundation at a time.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card p-5 text-center">
                <p className="font-display text-2xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-faint">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
