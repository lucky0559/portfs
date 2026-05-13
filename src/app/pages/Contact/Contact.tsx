"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaSpinner
} from "react-icons/fa";

const inputClass =
  "w-full bg-secondaryBackground border border-pastelPink/30 rounded-xl px-4 py-3 text-light font-Louis text-sm placeholder:text-pastelPink/40 focus-visible:outline-none focus:border-pastelPink/70 focus-visible:ring-2 focus-visible:ring-pastelPink/40 transition-colors duration-200";

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

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="px-4 py-10 xl:px-10 xl:py-16">
      <motion.div
        className="mb-10"
        initial={shouldReduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-light font-LouisBold text-2xl md:text-4xl xl:text-6xl">
          Contact
        </span>
        <p className="text-pastelPink font-Louis text-base xl:text-lg mt-3 max-w-xl">
          Have a project in mind or just want to say hello? Drop me a message
          and I&apos;ll get back to you.
        </p>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-12 max-w-5xl">
        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex-1"
          variants={shouldReduce ? {} : containerVariants}
          initial={shouldReduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <motion.div className="flex-1" variants={shouldReduce ? {} : itemVariants}>
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
            <motion.div className="flex-1" variants={shouldReduce ? {} : itemVariants}>
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

          <motion.div className="mb-4" variants={shouldReduce ? {} : itemVariants}>
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

          <motion.div className="mb-6" variants={shouldReduce ? {} : itemVariants}>
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

          {/* Feedback banner */}
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 mb-4 text-greenApple font-Louis text-sm"
                role="status"
                aria-live="polite"
              >
                <FaCheckCircle size={16} aria-hidden="true" />
                Message sent! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 mb-4 text-red-400 font-Louis text-sm"
                role="alert"
                aria-live="assertive"
              >
                <FaExclamationCircle size={16} aria-hidden="true" />
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={shouldReduce ? {} : itemVariants}>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={shouldReduce || status === "loading" ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduce || status === "loading" ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 bg-greenApple text-primaryBackground font-LouisBold px-8 py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
            >
              {status === "loading" ? (
                <>
                  <FaSpinner size={14} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <FaPaperPlane size={14} aria-hidden="true" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Info panel */}
        <motion.div
          className="xl:w-64 flex flex-col gap-6"
          initial={shouldReduce ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <p className="text-greenApple font-LouisBold text-sm mb-2 uppercase tracking-wider">
              Email
            </p>
            <a
              href="mailto:angelorabosa5@gmail.com"
              className="flex items-center gap-2 text-light font-Louis text-sm hover:text-pastelPink transition-colors duration-200"
            >
              <FaEnvelope size={14} className="text-pastelPink flex-shrink-0" aria-hidden="true" />
              angelorabosa5@gmail.com
            </a>
          </div>

          <div>
            <p className="text-greenApple font-LouisBold text-sm mb-2 uppercase tracking-wider">
              Based in
            </p>
            <p className="text-light font-Louis text-sm">Philippines</p>
          </div>

          <div>
            <p className="text-greenApple font-LouisBold text-sm mb-3 uppercase tracking-wider">
              Socials
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://github.com/lucky0559"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={shouldReduce ? {} : { y: -3 }}
                className="w-10 h-10 rounded-xl border border-pastelPink/30 flex items-center justify-center text-pastelPink hover:border-pastelPink hover:text-light transition-colors duration-200"
              >
                <FaGithub size={16} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/lucky-angelo-aa7253217/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={shouldReduce ? {} : { y: -3 }}
                className="w-10 h-10 rounded-xl border border-pastelPink/30 flex items-center justify-center text-pastelPink hover:border-pastelPink hover:text-light transition-colors duration-200"
              >
                <FaLinkedin size={16} aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
