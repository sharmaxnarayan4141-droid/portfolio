"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight } from "lucide-react";

const experiences = [
  {
    role: "Freelance Web Designer, Graphic Designer & Social Media Manager",
    period: "2024 — Present",
    description:
      "Designed professional, responsive websites and branding solutions for businesses and personal brands. Created logos, social media posts, banners, and promotional creatives. Managed social media pages and used AI tools to boost creativity and productivity.",
    highlights: [
      "Responsive website design & development",
      "Logo & brand identity creation",
      "Social media content & page management",
      "AI-powered creative workflows",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full bg-background py-16 md:py-24">
      <div className="absolute top-0 w-full h-[1px] bg-muted/20" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-8xl font-bold text-primary tracking-tight">
            Experience
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-2 md:mt-4 w-24 md:w-32 h-[2px] bg-primary origin-left"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group border border-[#1f1f1f] hover:border-primary/30 hover:bg-secondary transition-all duration-500 p-6 md:p-12"
        >
          <div className="flex items-start gap-4 mb-6 md:mb-8">
            <div className="w-10 h-10 flex items-center justify-center border border-[#333] group-hover:border-primary/40 transition-colors duration-300 shrink-0">
              <Briefcase className="w-5 h-5 text-muted group-hover:text-primary transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg md:text-3xl text-primary">
                  {experiences[0].role}
                </h3>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted whitespace-nowrap">
                  {experiences[0].period}
                </span>
              </div>
              <p className="font-sans text-sm md:text-base text-muted font-light leading-relaxed">
                {experiences[0].description}
              </p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-muted group-hover:text-primary group-hover:rotate-45 transition-all duration-300 shrink-0 mt-1 hidden md:block" />
          </div>

          <div className="border-t border-[#1f1f1f] pt-6 md:pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {experiences[0].highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full shrink-0" />
                  <span className="font-sans text-xs md:text-sm text-accent font-light">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
