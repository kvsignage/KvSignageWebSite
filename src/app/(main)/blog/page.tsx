import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog - Signage Tips & Guides",
  description:
    "Expert tips on signage, LED boards, neon signs, and branding for businesses in Chennai. Free guides on choosing the right signage for your business.",
  alternates: { canonical: "/blog" },
};

const blogPosts = [
  {
    slug: "best-led-sign-boards-chennai-2026",
    title: "Best LED Sign Board Designs in Chennai (2026 Guide)",
    excerpt:
      "Discover the latest LED sign board trends for businesses in Chennai. From energy-efficient options to eye-catching animated displays, find the perfect LED solution.",
    category: "Guide",
    date: "2026-05-20",
    readTime: "5 min read",
  },
  {
    slug: "neon-vs-led-signs-which-is-better",
    title: "Neon vs LED Signs: Which Is Better for Your Business?",
    excerpt:
      "A detailed comparison of neon and LED signage — cost, durability, aesthetics, and energy consumption. Make an informed decision for your storefront.",
    category: "Comparison",
    date: "2026-05-15",
    readTime: "7 min read",
  },
  {
    slug: "signage-cost-guide-chennai",
    title: "Signage Cost Guide: How Much Does a Sign Board Cost in Chennai?",
    excerpt:
      "Complete pricing breakdown for all types of signage in Chennai — LED boards, ACP letters, neon signs, flex banners, and digital displays. Budget-friendly options included.",
    category: "Pricing",
    date: "2026-05-10",
    readTime: "6 min read",
  },
  {
    slug: "how-signage-increases-foot-traffic",
    title: "How the Right Signage Can Increase Your Foot Traffic by 40%",
    excerpt:
      "Real data on how signage impacts customer acquisition. Case studies from Chennai businesses that transformed their revenue with strategic signage investment.",
    category: "Case Study",
    date: "2026-05-05",
    readTime: "4 min read",
  },
  {
    slug: "inauguration-banner-design-tips",
    title: "10 Inauguration Banner Design Tips for a Grand Opening",
    excerpt:
      "Planning a grand opening? These design tips will help you create inauguration banners that attract crowds and create buzz for your new business.",
    category: "Tips",
    date: "2026-04-28",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-heading)]">
              Signage <span className="text-gold">Blog</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Expert tips, guides, and insights to help you make the best signage decisions for your business.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-10" staggerDelay={0.1}>
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-6 md:p-10 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-gold/30 transition-all duration-300 hover:bg-gray-900/80"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-sm text-gray-500 hidden sm:inline">•</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-gray-400 leading-relaxed text-base md:text-lg">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-6 text-sm font-medium text-gold">
                    Read More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
