"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { projects, siteConfig, type Project } from "@/lib/data";
import {
  ArrowUpRightIcon,
  ExternalLinkIcon,
  FolderIcon,
  GitHubIcon,
} from "./Icons";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = project.live || project.github;

  const openProject = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onClick={openProject}
      role="link"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && openProject()}
      className="group flex cursor-pointer flex-col rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent-solid/5"
    >
      <div className="flex items-start justify-between">
        <span className="text-accent">
          <FolderIcon className="h-9 w-9" />
        </span>
        <div className="flex items-center gap-1">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.title} GitHub repository`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-mute transition-colors hover:bg-accent-soft hover:text-foreground"
          >
            <GitHubIcon className="h-4.5 w-4.5" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} live demo`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-mute transition-colors hover:bg-accent-soft hover:text-foreground"
            >
              <ExternalLinkIcon className="h-4.5 w-4.5" />
            </a>
          )}
        </div>
      </div>

      <h3 className="mt-5 flex items-start gap-1.5 font-display text-lg font-semibold transition-colors group-hover:text-accent">
        {project.title}
        <ArrowUpRightIcon className="mt-1.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </h3>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mute">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-faint">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          See more on GitHub
          <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
