import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | KV Signage Chennai",
  description:
    "Read KV Signage's privacy policy. Learn how we collect, use, and protect your personal information when you use our signage services in Chennai.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "26 May 2026";

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-gold/80 font-medium text-sm tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-gray-300 leading-relaxed">
          <section>
            <p>
              KV Signage (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your personal information when you visit our website or contact us for signage services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>We may collect the following information when you:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>Fill out the contact or lead form on our website</li>
              <li>Message us via WhatsApp or call us directly</li>
              <li>Email us with a project enquiry</li>
            </ul>
            <p className="mt-4">The personal data collected may include:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>Your name and business name</li>
              <li>Phone number and email address</li>
              <li>Location or area within Chennai</li>
              <li>Details about your signage requirements</li>
            </ul>
            <p className="mt-4">
              We also automatically collect non-personal technical data such as browser type, IP address,
              and pages visited through cookies and analytics tools (Google Analytics, Meta Pixel) to improve
              our website experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>Respond to your enquiries and provide quotes</li>
              <li>Send you design mockups and project updates</li>
              <li>Deliver the signage services you requested</li>
              <li>Send occasional offers or updates (you may opt out at any time)</li>
              <li>Improve our website and marketing effectiveness</li>
            </ul>
            <p className="mt-4">
              We do <strong className="text-white">not</strong> sell, rent, or share your personal data with
              third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services</h2>
            <p>
              We use the following third-party tools which may process your data under their own privacy
              policies:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>
                <strong className="text-white">Google Analytics</strong> — website traffic and behaviour
                analytics
              </li>
              <li>
                <strong className="text-white">Meta (Facebook) Pixel</strong> — ad performance measurement
              </li>
              <li>
                <strong className="text-white">HubSpot</strong> — lead management and CRM
              </li>
              <li>
                <strong className="text-white">WhatsApp Business</strong> — customer communication
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience and for analytics. By continuing
              to use our website, you consent to our use of cookies. You can disable cookies in your browser
              settings, though some features may not function correctly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfil the purposes it
              was collected for, or as required by applicable law. Enquiry data is typically retained for up
              to 2 years.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-400">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-gold hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your data from
              unauthorised access, loss, or disclosure. However, no internet transmission is completely
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page
              with an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
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

        <div className="mt-12 pt-8 border-t border-gray-800/30">
          <Link href="/" className="text-sm text-gold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
