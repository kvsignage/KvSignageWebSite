import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, testimonials } from "@/lib/constants";
import { LeadForm } from "@/components/ui/LeadForm";

export const metadata: Metadata = {
  title: "Get Your FREE Sign Board Design in 2 Hours | KV Signage Chennai",
  description:
    "Chennai's #1 signage partner. Get a FREE design mockup in 2 hours — no payment, no commitment. 500+ projects completed. LED boards, neon signs, ACP letters & more.",
  robots: { index: false, follow: false },
};

export default function FreeDesignLandingPage() {
  const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi! I saw your ad and want a FREE design mockup for my shop.")}`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-gold text-black text-center py-2.5 px-4 text-sm font-bold">
        🎨 FREE Design Mockup — Only {new Date().getDate() > 20 ? "3" : "5"} Slots Left This Week
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Copy */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <Image src="/logo.svg" alt="KV Signage" width={36} height={36} />
                <span className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  KV<span className="text-gold"> Signage</span>
                </span>
              </Link>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] leading-tight">
                Get Your <span className="text-gold">FREE</span> Sign Board
                <br />Design in 2 Hours
              </h1>

              <p className="mt-5 text-lg text-gray-400 leading-relaxed">
                See exactly how your sign board will look before you spend a rupee.
                500+ Chennai businesses already got their free design from us.
              </p>

              {/* Trust Points */}
              <ul className="mt-8 space-y-3">
                {[
                  "FREE design mockup — no payment needed",
                  "FREE inauguration banner for new shop openings",
                  "Professional installation included in every order",
                  "5-year warranty on LED electronics",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Stats */}
              <div className="mt-10 flex gap-8">
                <div>
                  <div className="text-2xl font-bold text-gold">500+</div>
                  <div className="text-xs text-gray-500">Projects Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">300+</div>
                  <div className="text-xs text-gray-500">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold">8+</div>
                  <div className="text-xs text-gray-500">Years Exp.</div>
                </div>
              </div>

              {/* Gallery Preview */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                {["/gallery/led-shop-front.webp", "/gallery/neon-cafe-sign.webp", "/gallery/acp-metal-letters.webp"].map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-800">
                    <Image src={img} alt={`Project ${i + 1}`} fill className="object-cover" sizes="150px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:sticky lg:top-16">
              <LeadForm />

              {/* WhatsApp Alternative */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Prefer WhatsApp? Chat directly:</p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-600/90 text-white font-semibold rounded-xl hover:bg-green-500 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-8">
            What Our <span className="text-gold">Clients Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t) => (
              <div key={t.name} className="p-5 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-6 border-t border-gray-800/30 text-center space-y-2">
        <Link href="/" className="text-xs text-gray-500 hover:text-gold transition-colors">
          Visit kvsignage.com →
        </Link>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} KV Signage, Chennai. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
