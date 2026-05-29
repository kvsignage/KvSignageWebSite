import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery - Our Work | KV Signage Chennai",
  description:
    "Browse our portfolio of 500+ signage projects in Chennai. LED sign boards, neon signs, ACP letters, flex banners and more. See the quality before you order.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-28 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-5">Our Work</p>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] leading-snug">
              500+ Projects <span className="text-gold">Delivered</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
              From small shops to large enterprises — we&apos;ve transformed businesses across Chennai with premium signage.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery with filter */}
      <GalleryGrid />

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-gray-400 mb-6">
            Want signage like this for your shop? Get a FREE design mockup first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-bold rounded-xl hover:bg-gold-light transition-all duration-300"
            >
              Get Your FREE Design
              <span>→</span>
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi! I saw your gallery and I'm interested in a sign board for my shop. Can you send me more details?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-green-600/90 text-white font-semibold rounded-xl hover:bg-green-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp for Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
