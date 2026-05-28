"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { offerItems } from "@/lib/constants";

export function OfferStack() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/[0.02] rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/[0.08] border border-gold/20 rounded-full text-gold/90 text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              Limited — Only 5 Slots This Month
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] leading-snug">
              Your Complete Signage
              <br />
              Designed <span className="text-gold">100% FREE</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Zero risk. Zero commitment. We design your signage first — you only pay when you&apos;re 100% happy.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Offer Card */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 max-w-2xl mx-auto">
            <div className="relative rounded-3xl border border-gold/20 bg-gray-900/50 p-10 sm:p-12">
              
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-10">
                Here&apos;s Everything You Get <span className="text-gold">(FREE)</span>
              </h3>
              
              <ul className="space-y-5 max-w-md mx-auto">
                {offerItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-200 text-base">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Value comparison */}
              <div className="mt-12 pt-10 border-t border-gray-800/60 text-center">
                <div className="flex items-center justify-center gap-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Market Price</p>
                    <p className="text-xl font-bold text-gray-500 line-through mt-1">₹15,000</p>
                  </div>
                  <div className="text-3xl text-gray-700">→</div>
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider font-medium">Your Price</p>
                    <p className="text-4xl font-black text-gold mt-1">₹0</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-10 py-4.5 bg-gold text-black font-bold text-lg rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-[0_4px_40px_rgba(212,175,55,0.25)]"
                >
                  Claim Your Free Design Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Trust line */}
              <p className="mt-8 text-center text-sm text-gray-400">
                ⚡ No payment required • 100% satisfaction guarantee
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sample design mockups */}
        <ScrollReveal delay={0.35}>
          <div className="mt-14 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-medium mb-6">Sample Designs We Create</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { src: "/gallery/design-jamalias-mockup.jpg", label: "Jamalia's – Shop Name Board" },
                { src: "/gallery/design-urbanrise-mockup.jpg", label: "Urbanrise – Office Logo Panel" },
                { src: "/gallery/design-aishwarya-timbers-mockup.jpg", label: "Aishwarya Timbers – Office Sign" },
              ].map((item) => (
                <div key={item.src} className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                  <Image
                    src={item.src}
                    alt={`Free design mockup example – ${item.label} by KV Signage Chennai`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-xs font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-600">These are real designs we created for our clients — yours will look just as professional.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
