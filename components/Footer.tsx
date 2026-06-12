"use client";

import { siteConfig } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">{siteConfig.name}</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <MailIcon className="h-4.5 w-4.5" />
          </a>
        </div>
        <p>
          Built with Next.js, Three.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
