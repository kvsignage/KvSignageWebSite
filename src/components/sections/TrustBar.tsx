"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { stats } from "@/lib/constants";

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center py-8 px-4"
    >
      <div className="text-3xl sm:text-4xl font-bold text-gold font-[family-name:var(--font-heading)]">
        {value}
      </div>
      <div className="mt-2 text-sm text-gray-400">
        {label}
      </div>
    </motion.div>
  );
}

export function TrustBar() {
  return (
    <section className="py-6 border-y border-gray-800/40">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-800/40">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
