"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = ["About", "Work", "Skills", "Contact"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 md:px-8 py-5 md:py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-lg md:text-xl font-bold tracking-widest uppercase text-primary"
        >
          Narayan
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-sans">
          {links.map((link) => (
            <li key={link}>
              <Link
                href={`#${link.toLowerCase()}`}
                className="relative group text-muted hover:text-primary transition-colors duration-300"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted hover:text-primary transition-colors duration-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-10"
              onClick={closeMobile}
            />
            {/* Slide-in menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-secondary border-l border-[#2a2a2a] md:hidden z-20 flex flex-col pt-24 px-8"
            >
              <ul className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={`#${link.toLowerCase()}`}
                      onClick={closeMobile}
                      className="text-lg font-sans uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
