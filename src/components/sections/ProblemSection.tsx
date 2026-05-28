"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function ProblemSection() {
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-5">The Problem</p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] leading-snug">
              Paying ₹50,000/Month Rent But
              <br />
              <span className="text-gold">Only 3 Walk-ins a Day?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              You&apos;re spending lakhs on rent, ads, and inventory — but people walk past 
              your shop without noticing. The business next door with a glowing LED sign? 
              They&apos;re getting 3x your footfall.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40">
              <div className="w-14 h-14 bg-red-500/[0.08] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">Invisible to Customers</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                73% of customers enter a store because of its signage. If yours is faded or generic, you&apos;re losing them.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40">
              <div className="w-14 h-14 bg-orange-500/[0.08] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">Wasted Marketing Budget</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Spending ₹20K/month on ads but your shop doesn&apos;t convert walk-ins? Signage is the last-mile problem.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40">
              <div className="w-14 h-14 bg-purple-500/[0.08] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">📉</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">Competitors Winning</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                The shop with premium signage gets 70% more walk-ins. Same location, same rent — better presence.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 py-8 px-8 bg-gold/[0.04] border border-gold/15 rounded-2xl text-center max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              What if you could fix this in <span className="text-gold font-semibold">48 hours</span> — and get the design <span className="text-gold font-semibold">completely free?</span>
            </p>
          </div>
        </ScrollReveal>

        {/* Before / After */}
        <ScrollReveal delay={0.35}>
          <div className="mt-20">
            <p className="text-center text-gold/80 font-medium text-sm tracking-widest uppercase mb-8">Real Transformation</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/gallery/tharun-apartment-before.jpg"
                  alt="Building without signage – before KV Signage installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm font-bold rounded-lg border border-white/20">
                  Before
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/gallery/tharun-apartment-after.jpg"
                  alt="Tharun Apartment after 3D letter signage installation by KV Signage Chennai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-gold text-black text-sm font-bold rounded-lg">
                  After
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-4">Tharun Apartment — 3D Stainless Steel Letter Signage, delivered in 48 hours</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
