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
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/logo.svg", type: "image/svg+xml" },
    shortcut: "/logo.svg",
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
              name: "KV Signage",
              description: "Premium signage solutions in Chennai",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              telephone: "+91 89257 56408",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "13.0827",
                longitude: "80.2707",
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
