import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { stats } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "KV Signage is Chennai's trusted signage partner with 8+ years of experience. We've completed 500+ projects for 300+ happy clients across Tamil Nadu.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)]">
                About <span className="text-gold">KV Signage</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                We&apos;re not just sign makers — we&apos;re brand visibility experts. For over 8 years, 
                we&apos;ve helped hundreds of Chennai businesses transform their storefronts into 
                customer magnets.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-6">
                  Our <span className="text-gold">Story</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    KV Signage started with a simple belief: every business deserves to be seen. 
                    Too many great businesses in Chennai were losing customers simply because they 
                    were invisible.
                  </p>
                  <p>
                    Today, we&apos;ve grown into a full-service signage company handling everything 
                    from LED boards to digital signage. Our team of skilled designers and technicians 
                    ensures every project is delivered with precision and quality.
                  </p>
                  <p>
                    What sets us apart? We don&apos;t just make signs — we create brand experiences. 
                    Every signage we design is engineered to attract attention, communicate value, 
                    and drive customers to your door.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {/* Team Photo */}
                {/* <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
                  {/* Replace src with actual team photo when ready */}
                  {/* <Image
                    src="/gallery/led-showroom.webp"
                    alt="KV Signage team at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm font-medium">Our workshop in Chennai</p>
                  </div>
                </div> */}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 text-center">
                      <div className="text-3xl font-bold text-gold font-[family-name:var(--font-heading)]">{stat.value}</div>
                      <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)]">
              Why Choose <span className="text-gold">KV Signage?</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "Expert Designers", desc: "Our creative team brings your vision to life with stunning designs that capture attention." },
              { icon: "⚡", title: "48-Hour Turnaround", desc: "Need it fast? We deliver quality signage in record time without compromising craftsmanship." },
              { icon: "🏆", title: "Premium Materials", desc: "We use only the best materials — from 3M vinyl to energy-efficient LEDs — built to last." },
              { icon: "🔧", title: "Professional Installation", desc: "Our trained technicians handle installation perfectly, every time. Included in every project." },
              { icon: "💰", title: "Competitive Pricing", desc: "Premium quality doesn't have to mean premium prices. Best value in Chennai, guaranteed." },
              { icon: "🤝", title: "Lifetime Support", desc: "We stand behind our work. Free maintenance consultations and support for the life of your sign." },
            ].map((item) => (
              <ScrollReveal key={item.title} delay={0.1}>
                <div className="p-6 bg-black/30 rounded-xl border border-gray-800">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
