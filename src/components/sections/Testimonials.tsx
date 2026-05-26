"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { testimonials } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-gold/80" : "text-gray-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-5">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] leading-snug">
            Trusted by <span className="text-gold">300+ Businesses</span>
            <br className="hidden sm:block" /> Across Chennai
          </h2>
          <p className="mt-5 text-gray-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Real results from real business owners who transformed their storefronts.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="p-7 sm:p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40 h-full flex flex-col">
                <StarRating rating={testimonial.rating} />
                <p className="mt-5 text-gray-300 leading-relaxed flex-1 text-[15px]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-7 pt-5 border-t border-gray-800/40 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/[0.08] flex items-center justify-center text-gold font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
