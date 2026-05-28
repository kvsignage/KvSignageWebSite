import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "KV Signage | Premium Signage Solutions in Chennai",
    template: "%s | KV Signage Chennai",
  },
  description:
    "Chennai's trusted signage partner. LED sign boards, neon signs, ACP letters, flex banners, digital signage & more. Design mockup FREE for all orders. New shop opening? Inauguration banner also FREE!",
  keywords: [
    "signage chennai",
    "LED sign board chennai",
    "neon signs chennai",
    "ACP letter board",
    "flex banner printing chennai",
    "digital signage",
    "sign board maker near me",
    "inauguration banner",
    "KV Signage",
  ],
  authors: [{ name: "KV Signage" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "KV Signage",
    title: "KV Signage | Premium Signage Solutions in Chennai",
    description:
      "Design mockup FREE for all orders. New shop opening? Inauguration banner also FREE. LED boards, neon signs, ACP letters & more. 500+ projects in Chennai.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KV Signage — Premium Signage Solutions in Chennai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KV Signage | Premium Signage Solutions in Chennai",
    description:
      "Design mockup FREE for all orders. New shop opening? Inauguration banner also FREE. LED boards, neon signs, ACP letters & more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/#organization",
              name: "KV Signage",
              description: "Chennai's trusted signage partner. Premium LED sign boards, neon signs, ACP letters, flex banners, digital signage & inauguration banners.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              telephone: "+91 89257 56408",
              email: "signagekv@gmail.com",
              image: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/og-image.png",
              logo: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/logo.svg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "593, 7th Street, J J Nagar, Mogappair East",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                postalCode: "600037",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "13.083587",
                longitude: "80.186888",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
              priceRange: "₹₹",
              areaServed: {
                "@type": "City",
                name: "Chennai",
              },
              sameAs: [
                "https://instagram.com/kv_signage",
                "https://www.facebook.com/profile.php?id=61590336094040",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "120",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <MetaPixel />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
