"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { faqItems } from "@/lib/constants";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 border-t border-gray-800/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <ScrollReveal>
            <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-4">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] leading-snug">
              Got <span className="text-gold">Questions?</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Everything you need to know before ordering your sign board.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-gray-900/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <p className="font-semibold text-white text-sm sm:text-base leading-snug">
                    {item.question}
                  </p>
                  <svg
                    className={`w-5 h-5 text-gold flex-shrink-0 mt-0.5 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 border-t border-gray-800/60">
                    <p className="text-gray-400 text-sm leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
