"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Monitor,
  Palette,
  Share2,
  Layout,
  Sparkles,
} from "lucide-react";

const services = [
  {
    title: "Business Website Designing",
    description:
      "Professional, responsive business websites with clean layouts, modern UI, and seamless user experience tailored to your brand.",
    icon: Globe,
  },
  {
    title: "Portfolio Website Development",
    description:
      "Custom portfolio websites designed to showcase your skills, work, and digital identity with stunning visuals and smooth interactions.",
    icon: Monitor,
  },
  {
    title: "Logo Designing & Brand Identity",
    description:
      "Unique logo designs and complete brand identity packages including color palettes, typography, and visual guidelines.",
    icon: Palette,
  },
  {
    title: "Social Media Handling & Content Creation",
    description:
      "Strategic social media management, engaging content creation, and creative visuals to grow your online presence.",
    icon: Share2,
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive user interfaces and thoughtful user experiences that blend aesthetics with functionality for digital products.",
    icon: Layout,
  },
  {
    title: "AI Content Creation & Prompt Engineering Solutions",
    description:
      "AI-powered content generation, prompt optimization, and workflow automation to supercharge your creative productivity.",
    icon: Sparkles,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-background py-16 md:py-24">
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
            Services
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group border border-[#1f1f1f] hover:border-primary/30 bg-transparent hover:bg-secondary transition-all duration-500 p-6 md:p-8 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#333] group-hover:border-primary/40 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="font-serif text-lg md:text-2xl text-primary group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-muted font-light leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="w-full h-[1px] bg-[#1f1f1f] group-hover:bg-primary/20 transition-colors duration-300 mt-2" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
