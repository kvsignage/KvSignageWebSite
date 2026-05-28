import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, siteConfig } from "@/lib/constants";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LeadForm } from "@/components/ui/LeadForm";

interface Props {
  params: Promise<{ slug: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} in Chennai | Starting ${service.startingPrice}`;
  const description = `${service.description} Get a FREE design consultation for ${service.title.toLowerCase()} from KV Signage, Chennai's trusted signage partner. Starting at just ${service.startingPrice}.`;

  return {
    title,
    description,
    keywords: [
      `${service.title.toLowerCase()} chennai`,
      `${service.title.toLowerCase()} near me`,
      `best ${service.title.toLowerCase()} in chennai`,
      `${service.title.toLowerCase()} price`,
      "signage chennai",
      "KV Signage",
    ],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/services/${service.slug}`,
      images: [{ url: `${baseUrl}${service.image}`, width: 1200, height: 630, alt: service.title }],
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "KV Signage",
      url: baseUrl,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "593, 7th Street, J J Nagar, Mogappair East",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600037",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Chennai",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.startingPrice.replace(/[^\d]/g, ""),
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        price: service.startingPrice.replace(/[^\d]/g, ""),
      },
      availability: "https://schema.org/InStock",
    },
    image: `${baseUrl}${service.image}`,
    url: `${baseUrl}/services/${service.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${baseUrl}/services/${service.slug}` },
    ],
  };

  return (
    <div className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/services" className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-6 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-6xl mb-6">{service.icon}</div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)]">
                  {service.title}
                </h1>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl">
                  {service.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-gold/10 border border-gold/20 rounded-xl">
                  <span className="text-gray-400 text-sm">Starting from</span>
                  <span className="text-gold font-bold text-xl">{service.startingPrice}</span>
                  <span className="text-gray-500 text-sm">· FREE design mockup included</span>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800">
                <Image
                  src={service.image}
                  alt={`${service.title} by KV Signage Chennai`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      {service.gallery.length > 1 && (
        <section className="py-12 md:py-16 border-t border-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-6">Our Work</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {service.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-800">
                    <Image
                      src={img}
                      alt={`${service.title} example ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Features + Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <ScrollReveal>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">What&apos;s Included</h2>
                <ul className="space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Process */}
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">Our Process</h2>
                <ol className="space-y-6">
                  {[
                    { step: "1", title: "Consultation", desc: "Share your requirements and we visit your site" },
                    { step: "2", title: "Design", desc: "Our team creates a custom mockup for approval" },
                    { step: "3", title: "Fabrication", desc: "We manufacture using premium materials" },
                    { step: "4", title: "Installation", desc: "Professional installation with warranty" },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {/* Lead Form */}
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24">
                <LeadForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
