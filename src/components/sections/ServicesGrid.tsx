"use client";

import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { services } from "@/lib/constants";

export function ServicesGrid() {
  return (
    <section className="py-28 md:py-36 border-t border-gray-800/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-5">Our Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] leading-snug">
            Everything Your Business
            <br />
            <span className="text-gold">Needs to Shine</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
            From design to installation, we handle it all. Premium quality at competitive prices.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group block p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40 hover:border-gold/20 transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 bg-gold/[0.08] rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-gold/[0.12] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-gold/70 group-hover:text-gold transition-all duration-300">
                  Learn More →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
