import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions | KV Signage Chennai",
  description:
    "Read KV Signage's terms and conditions. Understand the terms governing our signage design, fabrication, and installation services in Chennai.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "26 May 2026";

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-gray-300 leading-relaxed">
          <section>
            <p>
              Please read these Terms &amp; Conditions carefully before placing an order or engaging KV
              Signage for any services. By contacting us, submitting an enquiry, or commissioning any work,
              you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Services</h2>
            <p>
              KV Signage provides signage design, fabrication, and installation services including but not
              limited to LED sign boards, ACP letter boards, flex and banner printing, neon signs, vinyl
              graphics, and digital displays. The exact scope of work will be agreed upon before any order
              is confirmed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Free Design Offer</h2>
            <p>
              Our &quot;Free Design Mockup&quot; offer applies to genuine orders and is subject to availability
              (limited slots per month). The design remains the intellectual property of KV Signage until
              full payment has been received. We reserve the right to decline or withdraw the free design
              offer at our discretion.
            </p>
            <p className="mt-3">
              The &quot;Free Inauguration Banner&quot; offer is valid only for new shop openings and is provided
              with confirmed signage orders above a minimum order value, as communicated at the time of
              quotation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Quotations &amp; Pricing</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>All quotations are valid for 7 days from the date of issue.</li>
              <li>
                Prices are subject to change based on material costs, dimensions, or changes in
                requirements after the quote is issued.
              </li>
              <li>GST and any applicable taxes will be added to the quoted price.</li>
              <li>
                A minimum advance payment of 50% of the total order value is required to confirm the order
                and begin fabrication.
              </li>
              <li>The remaining balance is due upon completion, before installation or delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Design Approval</h2>
            <p>
              All design proofs must be reviewed and approved by the client before fabrication begins. Once
              approval is given (verbally, via WhatsApp, or email), KV Signage will proceed with
              fabrication. No changes can be made after fabrication has started.
            </p>
            <p className="mt-3">
              Up to <strong className="text-white">2 design revisions</strong> are included free of charge.
              Additional revisions may be charged separately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Delivery &amp; Installation</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>
                Delivery and installation timelines are estimates and may vary due to material availability,
                weather conditions, or site accessibility.
              </li>
              <li>
                The client is responsible for ensuring site access and necessary permissions (e.g., building
                owner consent, municipality approvals) for installation.
              </li>
              <li>
                KV Signage is not liable for delays caused by the client&apos;s failure to provide site access
                or required approvals.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Warranty</h2>
            <p>
              KV Signage provides the following warranty on completed work:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>
                <strong className="text-white">LED electronics:</strong> 5-year warranty on manufacturing
                defects
              </li>
              <li>
                <strong className="text-white">Structural fabrication:</strong> 6 months on workmanship
              </li>
              <li>
                <strong className="text-white">Vinyl / flex printing:</strong> No warranty against
                weathering; outdoor durability depends on material grade selected
              </li>
            </ul>
            <p className="mt-4">
              The warranty does not cover damage caused by vandalism, accidents, improper use, electrical
              surges, or modifications made by third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Cancellations &amp; Refunds</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>
                Orders may be cancelled before fabrication begins. Any advance paid for design work already
                completed will be non-refundable.
              </li>
              <li>
                Once fabrication has begun, cancellations are not accepted and the advance is
                non-refundable.
              </li>
              <li>
                If a completed product has a verified manufacturing defect, we will repair or replace it at
                no extra cost within the warranty period.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Intellectual Property</h2>
            <p>
              All original designs created by KV Signage remain our intellectual property until full
              payment is received. Upon full payment, the client receives the right to use the final
              installed signage. Design source files are not transferred unless agreed in writing.
            </p>
            <p className="mt-3">
              Clients who provide their own logos or artwork warrant that they own or have the right to use
              that material. KV Signage accepts no liability for intellectual property infringement arising
              from client-supplied artwork.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              KV Signage&apos;s liability is limited to the value of the order in question. We are not liable
              for any indirect, consequential, or incidental loss arising from the use of our products or
              services, including loss of business or revenue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of India. Any disputes will be subject to
              the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
            <p>
              For any questions regarding these Terms &amp; Conditions, please reach out to us:
            </p>
            <div className="mt-4 p-5 rounded-xl bg-gray-900/50 border border-gray-800/40 space-y-2 text-sm">
              <p className="text-white font-semibold">KV Signage</p>
              <p className="text-gray-400">{siteConfig.address}</p>
              <p>
                <a href={`tel:${siteConfig.phone}`} className="text-gold hover:underline">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800/30 flex items-center gap-6">
          <Link href="/" className="text-sm text-gold hover:underline">
            ← Back to Home
          </Link>
          <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gold transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
