"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
      
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-40 text-center">
        {/* Urgency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gold/[0.08] border border-gold/20 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold/90 text-sm font-medium tracking-wide">
            Limited — Only 5 Free Design Slots Left
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight"
        >
          Get <span className="text-gold">40% More Walk-ins</span>
          <br className="hidden sm:block" />
          <span className="sm:mt-2 inline-block"> With Signage That Sells</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          We&apos;ve done 500+ signage projects across Chennai — from T. Nagar to OMR.{" "}
          <span className="text-white/90 font-medium">Design mockup FREE for all orders.</span>{" "}
          New shop opening? <span className="text-white/90 font-medium">We&apos;ll give the inauguration banner FREE.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/contact"
            className="group px-9 py-4.5 bg-gold text-black font-bold text-lg rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-[0_4px_40px_rgba(212,175,55,0.25)] w-full sm:w-auto text-center"
          >
            Get Your FREE Design
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/gallery"
            className="px-9 py-4.5 border border-gray-700/80 text-gray-200 font-medium text-lg rounded-xl hover:border-gold/40 hover:text-gold transition-all duration-300 w-full sm:w-auto text-center"
          >
            See Our 500+ Projects
          </Link>
        </motion.div>

        {/* Minimal trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-sm text-gray-500 tracking-wide"
        >
          Trusted by 500+ businesses • 8+ years experience
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-gray-700/60 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2.5 bg-gold/60 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
