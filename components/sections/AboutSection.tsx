"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPublicClient } from "@/lib/supabase";

interface AboutContent {
  intro?: string;
  bio?: string;
  facts?: { label: string; value: string }[];
}

const defaultContent: AboutContent = {
  intro:
    "I'm Narayan Sharma, a creative Web Designer, Graphic Designer, Social Media Manager, and AI Enthusiast based in Jodhpur, Rajasthan.",
  bio:
    "I specialize in building modern, responsive websites, branding designs, and AI-powered digital experiences. As a student at SI School of AI, I've gained strong skills in Prompt Engineering, Prompt Essentials, and Generative AI — combining design, technology, and AI to craft innovative solutions for businesses and individuals.",
  facts: [
    { label: "Location", value: "Jodhpur, Rajasthan, India" },
    { label: "Institute", value: "SI School of AI" },
    { label: "Expertise", value: "Web Design, Graphic Design, AI" },
    { label: "Focus", value: "Design & AI Solutions" },
  ],
};

function parseIntro(intro: string): React.ReactNode[] {
  // Split on key terms to italicize them
  const segments = intro.split(
    /(Narayan Sharma|Commerce with Computer Science|St\\. Austin Sr\\. Sec\\. School, Jodhpur, Rajasthan)/g
  );
  // With regex capture groups in split, odd indices are the matched delimiters
  return segments.map((seg, i) =>
    i % 2 === 1
      ? <span key={i} className="text-primary italic">{seg}</span>
      : <span key={i}>{seg}</span>
  );
}

export default function AboutSection() {
  const [content, setContent] = useState<AboutContent>(defaultContent);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const supabase = getPublicClient();
        const { data } = await supabase
          .from("site_sections")
          .select("content")
          .eq("section_key", "about")
          .single();
        if (data && typeof data === "object" && "content" in data) {
          setContent((data as { content: AboutContent }).content);
        }
      } catch {
        // Fallback to default content
      }
    };
    fetchAbout();
  }, []);

  const { intro, bio, facts } = content;

  return (
    <section id="about" className="relative w-full bg-background text-primary py-16 md:py-24">
      <div className="absolute top-0 w-full h-[1px] bg-muted/20" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex flex-col md:flex-row items-start gap-8 md:gap-24">
        {/* Left: Large rotated ABOUT */}
        <div className="md:w-1/3 flex justify-center md:justify-end pt-2 md:pt-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sans font-bold text-5xl md:text-[120px] tracking-tighter uppercase text-muted/30 md:-rotate-90 origin-center md:origin-right whitespace-nowrap"
          >
            About
          </motion.h2>
        </div>

        {/* Right: Content */}
        <div className="md:w-2/3 flex flex-col justify-center max-w-2xl gap-6 md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-xl md:text-4xl leading-relaxed md:leading-relaxed text-accent"
          >
            {parseIntro(intro ?? defaultContent.intro!)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="font-sans text-sm md:text-lg tracking-wide text-muted font-light leading-loose md:leading-loose"
          >
            {bio || defaultContent.bio}
          </motion.p>

          {/* Quick Facts */}
          {((facts ?? defaultContent.facts)!.length ?? 0) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5 mt-2 md:mt-4 border-t border-[#1a1a1a] pt-6 md:pt-8"
            >
              {(facts ?? defaultContent.facts!).map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted font-sans mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs md:text-sm text-accent font-sans font-light">{item.value}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
