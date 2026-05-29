"use client";

import Link from "next/link";
import { useState } from "react";

export function OfferBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed top-16 lg:top-[72px] left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-sm border-b border-gold/10 animate-slide-down [animation-delay:1000ms] [animation-fill-mode:backwards]"
    >
      {/* Mobile layout — fixed height to prevent variable spacing across viewports */}
      <div className="sm:hidden px-4 py-2 flex items-center justify-center gap-2 relative">
        <p className="text-center text-[11px] text-gold font-medium leading-tight truncate">
          ✦ FREE Design + Inauguration Banner
        </p>
        <Link
          href="/contact"
          className="shrink-0 px-3 py-1 bg-gold text-black font-bold text-[11px] rounded hover:bg-gold-light transition-colors"
        >
          Claim
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 text-gray-500 hover:text-gray-300"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tablet & Desktop layout */}
      <div className="hidden sm:flex items-center justify-center gap-3 px-6 py-2 relative">
        <p className="text-sm text-gold font-medium">
          ✦ Design FREE for all orders. New shop? Inauguration banner FREE
        </p>
        <Link
          href="/contact"
          className="px-4 py-1.5 bg-gold text-black font-bold text-xs rounded hover:bg-gold-light transition-colors"
        >
          Claim Now
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 p-1 text-gray-500 hover:text-gray-300"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
