"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export function OfferBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed top-16 lg:top-[72px] left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-sm border-b border-gold/10"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Offers text */}
        <p className="text-center flex-1 text-[11px] sm:text-xs md:text-sm text-gray-300 leading-tight sm:leading-normal">
          <span className="text-gold font-medium">✦ Design FREE for All Orders</span>
          <span className="text-gray-500 mx-0.5 sm:mx-1">•</span>
          <span className="text-gold font-medium">New Shop? Inauguration Banner FREE</span>
          <span className="hidden md:inline text-gray-500"> — Only 5 slots left</span>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            href="/contact"
            className="px-2.5 sm:px-3.5 py-1 bg-gold/10 text-gold font-medium text-[10px] sm:text-xs rounded-md hover:bg-gold/20 transition-colors whitespace-nowrap border border-gold/20"
          >
            Claim Now
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
