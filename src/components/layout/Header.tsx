"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/30">
      <nav className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="KV Signage"
              width={40}
              height={40}
              className="w-9 h-9 lg:w-10 lg:h-10"
              priority
            />
            <span className="hidden sm:block text-lg font-semibold font-[family-name:var(--font-heading)] text-white">
              KV<span className="text-gold"> Signage</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-200"
            >
              📞 {siteConfig.phone.replace("+91 ", "")}
            </a>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gold text-black font-bold text-sm rounded-lg hover:bg-gold-light transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              Get FREE Design
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 animate-fade-in"
        >
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-gold hover:bg-gold/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-3.5 bg-gold text-black font-bold rounded-lg hover:bg-gold-light transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get FREE Design →
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="block w-full text-center px-5 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
