import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LeadForm } from "@/components/ui/LeadForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us - Get Your Free Design",
  description:
    "Contact KV Signage Chennai for a FREE design mockup (every order). Opening a new shop? Inauguration banner is on us. Call, WhatsApp, or fill our form.",
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm font-medium mb-6">
              Free Design Consultation
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)]">
              Let&apos;s Create Your
              <br />
              <span className="text-gold">Perfect Signage</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Fill the form below and get a FREE design mockup within 2 hours. No commitment required.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal>
              <LeadForm />
            </ScrollReveal>

            {/* Contact Details */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📞</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Phone</h3>
                        <a href={`tel:${siteConfig.phone}`} className="text-gray-400 hover:text-gold transition-colors">
                          {siteConfig.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">💬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">WhatsApp</h3>
                        <a
                          href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi! I'm interested in signage for my business.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors font-medium"
                        >
                          Chat now — reply in 2 min ⚡
                        </a>
                        <p className="text-xs text-gray-500 mt-1">Tap to start a conversation instantly</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✉️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Email</h3>
                        <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-gold transition-colors">
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📍</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Visit Us</h3>
                        <p className="text-gray-400">{siteConfig.address}</p>
                        <p className="text-sm text-gray-500 mt-1">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-gray-800">
                  <iframe
                    src={siteConfig.googleMapsEmbed}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KV Signage Location"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
