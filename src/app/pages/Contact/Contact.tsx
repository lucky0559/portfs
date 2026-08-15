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
    visible: { transition: { staggerChildren: 0.07 } }
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  return (
    <div>
      <motion.div
        className="section-heading"
        initial={shouldReduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Tell me what you&apos;re trying to make.</h2>
        <p>Have a project, a product question, or a messy workflow worth untangling? Send a note and I&apos;ll reply with a useful next step.</p>
      </motion.div>

      <div className="contact-grid">
        <motion.aside
          className="contact-intro"
          initial={shouldReduce ? false : { opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="contact-intro__title">A clear start is enough.</h3>
          <p className="contact-intro__copy">Share the context, the constraint, or the thing that feels harder than it should. We can work out the shape from there.</p>

          <div className="contact-details">
            <div>
              <p className="contact-detail__label">Email</p>
              <a className="contact-detail__value" href="mailto:angelorabosa5@gmail.com">
                angelorabosa5@gmail.com
              </a>
            </div>
            <div>
              <p className="contact-detail__label">Based in</p>
              <p className="contact-detail__value"><FaMapMarkerAlt size={11} aria-hidden="true" /> Philippines</p>
            </div>
            <div>
              <p className="contact-detail__label">Elsewhere</p>
              <div className="contact-socials">
                <a className="contact-social" href="https://github.com/lucky0559" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={14} aria-hidden="true" />
                </a>
                <a className="contact-social" href="https://www.linkedin.com/in/lucky-angelo-aa7253217/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-form"
          variants={shouldReduce ? {} : stagger}
          initial={shouldReduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          <div className="contact-form__row">
            <motion.div className="contact-field" variants={shouldReduce ? {} : item}>
              <label className="contact-label" htmlFor="from_name">Your name</label>
              <input id="from_name" name="from_name" type="text" placeholder="Jane Smith" required autoComplete="name" className="contact-input" />
            </motion.div>
            <motion.div className="contact-field" variants={shouldReduce ? {} : item}>
              <label className="contact-label" htmlFor="from_email">Your email</label>
              <input id="from_email" name="from_email" type="email" placeholder="jane@example.com" required autoComplete="email" className="contact-input" />
            </motion.div>
          </div>

          <motion.div className="contact-field" variants={shouldReduce ? {} : item}>
            <label className="contact-label" htmlFor="subject">What can I help with?</label>
            <input id="subject" name="subject" type="text" placeholder="A new product, a platform, a workflow..." required className="contact-input" />
          </motion.div>

          <motion.div className="contact-field" variants={shouldReduce ? {} : item}>
            <label className="contact-label" htmlFor="message">A little more context</label>
            <textarea id="message" name="message" placeholder="Tell me what you are building, where it is stuck, or what a good outcome looks like." required minLength={10} rows={6} className="contact-input contact-textarea" />
          </motion.div>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="contact-form__status"
                role="status"
                aria-live="polite"
              >
                <FaCheckCircle size={14} aria-hidden="true" />
                Message sent. I&apos;ll get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="contact-form__status contact-form__status--error"
                role="alert"
                aria-live="assertive"
              >
                <FaExclamationCircle size={14} aria-hidden="true" />
                Something went wrong. Please try again or email me directly.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div variants={shouldReduce ? {} : item}>
            <button type="submit" disabled={status === "loading"} className="button button--primary">
              {status === "loading" ? (
                <>
                  <FaSpinner size={13} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <FaPaperPlane size={13} aria-hidden="true" />
                  Send message
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
