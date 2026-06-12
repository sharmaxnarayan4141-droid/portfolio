"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail } from "lucide-react";

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-sans tracking-widest uppercase border ${
          type === "success"
            ? "border-primary/40 bg-secondary text-primary"
            : "border-red-900 bg-secondary text-red-400"
        }`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  multiline,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;
  const baseClass =
    "w-full bg-transparent border-b border-[#333] focus:border-primary outline-none text-primary text-sm md:text-base font-sans font-light pt-5 pb-2 placeholder-transparent transition-colors duration-300 caret-primary resize-none";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] transition-all duration-300 pointer-events-none ${
          isFloated ? "top-0 text-muted text-[10px]" : "top-4 text-muted/60 text-xs"
        }`}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          required={required}
          rows={4}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      )}
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      showToast("Message sent. I'll get back to you soon.", "success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full bg-background py-16 md:py-36">
      <div className="absolute top-0 w-full h-[1px] bg-muted/20" />
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-8xl font-bold text-primary tracking-tight leading-none mb-4">
            Let&apos;s Talk
          </h2>
          <svg viewBox="0 0 400 12" className="w-36 md:w-72 h-3 overflow-visible">
            <motion.path
              d="M0 6 Q25 0 50 6 Q75 12 100 6 Q125 0 150 6 Q175 12 200 6 Q225 0 250 6 Q275 12 300 6 Q325 0 350 6 Q375 12 400 6"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-8 md:gap-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <FloatingInput
              id="contact-name"
              label="Name"
              value={form.name}
              onChange={(val) => setForm({ ...form, name: val })}
              required
            />
            <FloatingInput
              id="contact-email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(val) => setForm({ ...form, email: val })}
              required
            />
          </div>
          <FloatingInput
            id="contact-message"
            label="Message"
            value={form.message}
            onChange={(val) => setForm({ ...form, message: val })}
            required
            multiline
          />

          <div>
            <button
              id="contact-submit"
              type="submit"
              disabled={loading}
              className="group relative overflow-hidden border border-primary px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm uppercase tracking-[0.25em] font-sans text-primary transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
              <span className="relative group-hover:text-background transition-colors duration-500 ease-in-out flex items-center gap-3">
                {loading ? "Sending..." : (
                  <>Send Message <span className="group-hover:translate-x-1 transition-transform duration-300">→</span></>
                )}
              </span>
            </button>
          </div>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-[#1a1a1a]"
        >
          <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted mb-6 md:mb-8">
            Reach Out Directly
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#333] group-hover:border-primary/40 transition-colors duration-300">
                <Phone className="w-4 h-4 text-muted group-hover:text-primary transition-colors duration-300" />
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Phone</p>
                <a href="tel:+919829659238" className="font-sans text-sm text-accent hover:text-primary transition-colors duration-300">
                  +91 9829659238
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#333] group-hover:border-primary/40 transition-colors duration-300">
                <Mail className="w-4 h-4 text-muted group-hover:text-primary transition-colors duration-300" />
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Email</p>
                <a href="mailto:narayansharma8503@gmail.com" className="font-sans text-sm text-accent hover:text-primary transition-colors duration-300">
                  narayansharma8503@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#333] group-hover:border-primary/40 transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-muted group-hover:text-primary transition-colors duration-300">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted mb-1">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/narayan-sharma-0b8197381"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-accent hover:text-primary transition-colors duration-300"
                >
                  linkedin.com/in/narayan-sharma-0b8197381
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#333] group-hover:border-primary/40 transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-muted group-hover:text-primary transition-colors duration-300">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Instagram</p>
                <a
                  href="https://instagram.com/sharmanarayan41"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-accent hover:text-primary transition-colors duration-300"
                >
                  instagram.com/sharmanarayan41
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
