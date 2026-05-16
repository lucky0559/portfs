"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner
} from "react-icons/fa";

const inputClass =
  "w-full bg-secondaryBackground/60 border border-pastelPink/25 rounded-xl px-4 py-3 text-light font-Louis text-sm placeholder:text-pastelPink/50 focus-visible:outline-none focus:border-greenApple/40 focus-visible:ring-1 focus-visible:ring-greenApple/30 transition-all duration-200 hover:border-pastelPink/35";

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const shouldReduce = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");
    const data = new FormData(formRef.current);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: data.get("from_name"),
          from_email: data.get("from_email"),
          subject: data.get("subject"),
          message: data.get("message")
        })
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div>
      {/* Section title */}
      <motion.div
        className="mb-12"
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-light font-LouisBold text-3xl md:text-5xl xl:text-6xl leading-tight">
          Contact
        </h2>
        <p className="text-light font-LouisBold text-lg xl:text-xl mt-3 max-w-lg">
          Have a project in mind or just want to say hello? Drop me a message
          and I&apos;ll get back to you.
        </p>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-14 max-w-4xl">
        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex-1"
          variants={shouldReduce ? {} : stagger}
          initial={shouldReduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <motion.div className="flex-1" variants={shouldReduce ? {} : item}>
              <label htmlFor="from_name" className="sr-only">Your name</label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                placeholder="Your name"
                required
                autoComplete="name"
                className={inputClass}
              />
            </motion.div>
            <motion.div className="flex-1" variants={shouldReduce ? {} : item}>
              <label htmlFor="from_email" className="sr-only">Your email</label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                placeholder="Your email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </motion.div>
          </div>

          <motion.div className="mb-3" variants={shouldReduce ? {} : item}>
            <label htmlFor="subject" className="sr-only">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              required
              className={inputClass}
            />
          </motion.div>

          <motion.div className="mb-5" variants={shouldReduce ? {} : item}>
            <label htmlFor="message" className="sr-only">Your message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              required
              rows={6}
              className={`${inputClass} resize-none`}
            />
          </motion.div>

          {/* Status banner */}
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 mb-4 text-greenApple font-Louis text-sm"
                role="status"
                aria-live="polite"
              >
                <FaCheckCircle size={14} aria-hidden="true" />
                Message sent! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 mb-4 text-red-400 font-Louis text-sm"
                role="alert"
                aria-live="assertive"
              >
                <FaExclamationCircle size={14} aria-hidden="true" />
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={shouldReduce ? {} : item}>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={
                shouldReduce || status === "loading"
                  ? {}
                  : { y: -3, boxShadow: "0 14px 28px rgba(206,206,90,0.25)" }
              }
              whileTap={shouldReduce || status === "loading" ? {} : { scale: 0.97, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="flex items-center gap-2.5 bg-greenApple text-primaryBackground font-LouisBold px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
            >
              {status === "loading" ? (
                <>
                  <FaSpinner size={13} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <FaPaperPlane size={13} aria-hidden="true" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Info panel */}
        <motion.div
          className="xl:w-56 flex flex-col gap-7"
          initial={shouldReduce ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          {/* Divider accent */}
          <div className="h-px bg-gradient-to-r from-greenApple/25 via-pastelPink/15 to-transparent xl:hidden" />

          {[
            {
              label: "Email",
              content: (
                <a
                  href="mailto:angelorabosa5@gmail.com"
                  className="flex items-center gap-2 text-light/70 font-Louis text-xs hover:text-greenApple/80 transition-colors duration-200"
                >
                  <FaEnvelope size={11} className="text-pastelPink/50 flex-shrink-0" aria-hidden="true" />
                  angelorabosa5@gmail.com
                </a>
              )
            },
            {
              label: "Location",
              content: (
                <p className="flex items-center gap-2 text-light/70 font-Louis text-xs">
                  <FaMapMarkerAlt size={11} className="text-pastelPink/50 flex-shrink-0" />
                  Philippines
                </p>
              )
            },
          ].map(({ label, content }) => (
            <div key={label}>
              <p className="text-greenApple/70 font-LouisBold text-[10px] uppercase tracking-[0.15em] mb-2">
                {label}
              </p>
              {content}
            </div>
          ))}

          <div>
            <p className="text-greenApple/70 font-LouisBold text-[10px] uppercase tracking-[0.15em] mb-3">
              Socials
            </p>
            <div className="flex gap-2.5">
              {[
                { href: "https://github.com/lucky0559", Icon: FaGithub, label: "GitHub" },
                {
                  href: "https://www.linkedin.com/in/lucky-angelo-aa7253217/",
                  Icon: FaLinkedin,
                  label: "LinkedIn"
                }
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={shouldReduce ? {} : { y: -3, borderColor: "rgba(206,206,90,0.3)" }}
                  className="w-9 h-9 rounded-xl border border-pastelPink/30 flex items-center justify-center text-pastelPink/70 hover:text-greenApple/90 hover:bg-greenApple/5 transition-colors duration-200"
                >
                  <Icon size={14} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
