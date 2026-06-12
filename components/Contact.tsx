"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/data";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
} from "./Icons";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="06" title="Contact" />

      <div className="grid gap-14 lg:grid-cols-[2fr_3fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display text-2xl font-semibold">
            Let&apos;s work together
          </h3>
          <p className="mt-4 leading-relaxed text-mute">
            Whether you have a project in mind, a question, or just want to say
            hi — my inbox is always open. I&apos;ll get back to you as soon as I
            can.
          </p>

          <div className="mt-9 space-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <MailIcon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-faint">Email</p>
                <p className="truncate text-sm font-medium">
                  {siteConfig.email}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-line bg-card p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <MapPinIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs text-faint">Location</p>
                <p className="text-sm font-medium">{siteConfig.location}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-card text-mute transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-card text-mute transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-line bg-card p-7 sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className={inputClass}
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium"
            >
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-solid py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-solid/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <SendIcon className="h-4 w-4" />
              </>
            )}
          </button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400"
            >
              Message sent successfully — I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-600 dark:text-rose-400"
            >
              {errorMsg}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
