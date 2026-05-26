import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LeadForm } from "@/components/ui/LeadForm";

// Blog post content (in production, this would come from MDX files or CMS)
const blogContent: Record<string, { title: string; date: string; readTime: string; category: string; content: string }> = {
  "best-led-sign-boards-chennai-2026": {
    title: "Best LED Sign Board Designs in Chennai (2026 Guide)",
    date: "May 20, 2026",
    readTime: "5 min read",
    category: "Guide",
    content: `
      <h2>Why LED Sign Boards Are Essential in 2026</h2>
      <p>In Chennai's competitive business landscape, visibility is everything. LED sign boards have become the gold standard for businesses looking to attract attention and drive foot traffic. With advances in LED technology, 2026 brings even more energy-efficient and visually stunning options.</p>
      
      <h2>Top LED Sign Board Trends in Chennai</h2>
      <h3>1. Animated LED Displays</h3>
      <p>Moving text and animations catch the eye far more effectively than static signs. Modern LED controllers make it easy to program eye-catching sequences that change throughout the day.</p>
      
      <h3>2. RGB Full-Color LED Boards</h3>
      <p>Full-color LED displays can show images, videos, and rich graphics. Perfect for restaurants showing menu items or retail stores showcasing promotions.</p>
      
      <h3>3. Energy-Efficient SMD LEDs</h3>
      <p>Surface-mounted device (SMD) LEDs offer brighter output with lower power consumption — saving you money on electricity bills while being brighter than older technology.</p>
      
      <h3>4. Slim Profile LED Boards</h3>
      <p>Modern LED boards are thinner than ever, giving a sleek, premium look that suits contemporary architecture.</p>
      
      <h2>How to Choose the Right LED Sign Board</h2>
      <p>Consider these factors when selecting an LED sign board for your Chennai business:</p>
      <ul>
        <li><strong>Location:</strong> Indoor vs outdoor determines weather-resistance needs</li>
        <li><strong>Viewing Distance:</strong> Determines pixel pitch (closer viewing = smaller pitch needed)</li>
        <li><strong>Budget:</strong> Single-color LEDs are most affordable; full-color costs more but has higher impact</li>
        <li><strong>Content:</strong> Text-only needs are simpler; images/video require higher resolution</li>
      </ul>
      
      <h2>Cost of LED Sign Boards in Chennai</h2>
      <p>LED sign board prices in Chennai typically range from ₹3,000 to ₹50,000+ depending on size, type, and features. Here's a rough guide:</p>
      <ul>
        <li>Single-color scrolling: ₹3,000 - ₹8,000</li>
        <li>Multi-color with animation: ₹8,000 - ₹20,000</li>
        <li>Full-color video display: ₹20,000 - ₹50,000+</li>
      </ul>
      
      <h2>Get Your Free LED Sign Board Design</h2>
      <p>At KV Signage, we offer FREE design consultations and mockups for LED sign boards. See exactly how your sign will look before you invest a single rupee. Contact us today to claim your free design.</p>
    `,
  },
  "neon-vs-led-signs-which-is-better": {
    title: "Neon vs LED Signs: Which Is Better for Your Business?",
    date: "May 15, 2026",
    readTime: "7 min read",
    category: "Comparison",
    content: `
      <h2>The Great Debate: Neon vs LED</h2>
      <p>When it comes to eye-catching signage for your business, neon and LED are the two most popular options. Both have their strengths, but which is right for your specific needs? Let's break it down.</p>
      
      <h2>LED Neon Flex (Modern Neon)</h2>
      <p>Modern "neon" signs actually use LED neon flex — flexible LED strips that mimic the look of traditional glass neon but with significant advantages:</p>
      <ul>
        <li><strong>Safety:</strong> No glass, no high voltage, no gas — completely safe</li>
        <li><strong>Durability:</strong> Flexible silicone housing resists damage</li>
        <li><strong>Energy:</strong> Uses 70-80% less power than glass neon</li>
        <li><strong>Cost:</strong> 40-60% cheaper than traditional neon</li>
        <li><strong>Maintenance:</strong> Virtually maintenance-free for 50,000+ hours</li>
      </ul>
      
      <h2>Traditional Glass Neon</h2>
      <p>Classic glass neon has a distinct aesthetic that some businesses prefer:</p>
      <ul>
        <li><strong>Authentic glow:</strong> The warm, organic light of real gas neon</li>
        <li><strong>Artistic value:</strong> Handcrafted by skilled glass benders</li>
        <li><strong>Vintage appeal:</strong> Perfect for retro-themed establishments</li>
      </ul>
      
      <h2>Our Recommendation</h2>
      <p>For 95% of businesses in Chennai, LED neon flex is the better choice. It's safer, cheaper, more durable, and looks virtually identical to traditional neon from a viewing distance. The only exception is if you specifically need the authentic vintage neon aesthetic for artistic purposes.</p>
      
      <h2>Ready to Get Your Neon Sign?</h2>
      <p>KV Signage specializes in custom LED neon signs for businesses across Chennai. Get a free design mockup and see your sign before you order.</p>
    `,
  },
  "signage-cost-guide-chennai": {
    title: "Signage Cost Guide: How Much Does a Sign Board Cost in Chennai?",
    date: "May 10, 2026",
    readTime: "6 min read",
    category: "Pricing",
    content: `
      <h2>Complete Signage Pricing Guide for Chennai (2026)</h2>
      <p>Understanding signage costs helps you budget effectively. Here's a comprehensive breakdown of sign board prices in Chennai across all major categories.</p>
      
      <h2>LED Sign Boards</h2>
      <ul>
        <li>Single-color scrolling LED: ₹3,000 - ₹8,000</li>
        <li>Multi-color animated LED: ₹8,000 - ₹20,000</li>
        <li>Full-color P10 outdoor: ₹15,000 - ₹50,000+ per sq.m</li>
      </ul>
      
      <h2>ACP & Metal Letter Boards</h2>
      <ul>
        <li>ACP board with vinyl: ₹250 - ₹400 per sq.ft</li>
        <li>Acrylic 3D letters: ₹150 - ₹300 per letter</li>
        <li>Stainless steel letters: ₹300 - ₹800 per letter</li>
        <li>Brass letters: ₹500 - ₹1,200 per letter</li>
      </ul>
      
      <h2>Neon Signs</h2>
      <ul>
        <li>LED neon flex (custom text): ₹3,000 - ₹15,000</li>
        <li>LED neon flex (logo/shape): ₹8,000 - ₹25,000</li>
        <li>Traditional glass neon: ₹15,000 - ₹50,000+</li>
      </ul>
      
      <h2>Flex & Banner Printing</h2>
      <ul>
        <li>Standard flex: ₹12 - ₹18 per sq.ft</li>
        <li>Star flex (premium): ₹20 - ₹35 per sq.ft</li>
        <li>Backlit flex: ₹25 - ₹45 per sq.ft</li>
        <li>One-way vision: ₹80 - ₹150 per sq.ft</li>
      </ul>
      
      <h2>Digital Signage</h2>
      <ul>
        <li>Indoor LED display (per sq.ft): ₹3,000 - ₹8,000</li>
        <li>Outdoor LED display (per sq.ft): ₹5,000 - ₹12,000</li>
        <li>Digital standee: ₹15,000 - ₹40,000</li>
      </ul>
      
      <h2>Factors That Affect Pricing</h2>
      <p>Size, material quality, design complexity, installation requirements, and urgency all impact final pricing. At KV Signage, we provide free quotes with transparent pricing — no hidden charges.</p>
      
      <h2>Get a Free Quote</h2>
      <p>Every project is unique. Contact KV Signage for a free, no-obligation quote tailored to your specific requirements.</p>
    `,
  },
  "how-signage-increases-foot-traffic": {
    title: "How the Right Signage Can Increase Your Foot Traffic by 40%",
    date: "May 5, 2026",
    readTime: "4 min read",
    category: "Case Study",
    content: `
      <h2>The Power of Great Signage</h2>
      <p>Studies consistently show that effective signage is one of the highest-ROI investments a local business can make. According to the International Sign Association, nearly 76% of consumers have entered a store they had never visited before based solely on its signs.</p>
      
      <h2>Case Study: Kumar Electronics, Chennai</h2>
      <p>Kumar Electronics, a consumer electronics store in T. Nagar, was struggling with foot traffic despite having competitive prices. After installing a bright LED sign board designed by KV Signage:</p>
      <ul>
        <li>Foot traffic increased by 40% within the first month</li>
        <li>Revenue grew by 35% over 3 months</li>
        <li>The investment was recovered within 6 weeks</li>
      </ul>
      
      <h2>Why Signage Works</h2>
      <ul>
        <li><strong>24/7 Marketing:</strong> Unlike ads that stop when you stop paying, signage works round the clock</li>
        <li><strong>Impulse decisions:</strong> 68% of purchases are impulse decisions influenced by in-store signage</li>
        <li><strong>Brand recognition:</strong> Consistent, visible signage builds brand familiarity</li>
        <li><strong>One-time cost:</strong> Pay once, benefit for years</li>
      </ul>
      
      <h2>Transform Your Business Today</h2>
      <p>Don't let poor visibility cost you customers every single day. Contact KV Signage for a free consultation and design mockup.</p>
    `,
  },
  "inauguration-banner-design-tips": {
    title: "10 Inauguration Banner Design Tips for a Grand Opening",
    date: "April 28, 2026",
    readTime: "5 min read",
    category: "Tips",
    content: `
      <h2>Make Your Grand Opening Unforgettable</h2>
      <p>Your grand opening sets the tone for your business. A well-designed inauguration banner creates excitement and attracts crowds. Here are 10 tips for a stunning inauguration setup.</p>
      
      <h2>Design Tips</h2>
      <ol>
        <li><strong>Keep it bold and readable:</strong> Use large fonts visible from 50+ feet away</li>
        <li><strong>Use high-contrast colors:</strong> Dark text on light background or vice versa</li>
        <li><strong>Include a clear offer:</strong> "Grand Opening Special: 20% Off" drives immediate action</li>
        <li><strong>Add your logo prominently:</strong> Brand recognition starts from day one</li>
        <li><strong>Include essential info:</strong> Date, time, address, and contact number</li>
        <li><strong>Use professional images:</strong> High-quality product/service photos build credibility</li>
        <li><strong>Choose the right size:</strong> Bigger is better for outdoor inauguration banners</li>
        <li><strong>Add festive elements:</strong> Rangoli borders, flower patterns suit Indian inaugurations</li>
        <li><strong>Include social media handles:</strong> Drive online followers from day one</li>
        <li><strong>Plan complementary signage:</strong> Standees, danglers, and bunting complete the look</li>
      </ol>
      
      <h2>Free Inauguration Banner Offer</h2>
      <p>KV Signage offers a FREE inauguration banner for new shop openings. Get your business noticed from the very first day. Contact us to learn more about our grand opening packages.</p>
    `,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.content.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) notFound();

  return (
    <div className="pt-28">
      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-8 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.date}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] leading-tight">
              {post.title}
            </h1>
            <div className="mt-8 h-px bg-gradient-to-r from-gold/40 via-gray-800 to-transparent" />
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.1}>
            <div
              className="mt-12 prose prose-lg prose-invert max-w-none
                prose-headings:font-[family-name:var(--font-heading)]
                prose-headings:text-white
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:leading-snug
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-gray-300 prose-li:leading-relaxed prose-li:my-2
                prose-ul:my-6 prose-ul:pl-6
                prose-ol:my-6 prose-ol:pl-6
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-gold prose-a:underline prose-a:underline-offset-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="mt-20 border-t border-gray-800 pt-14">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
                Ready to Get Started?
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Get a FREE design consultation and see your signage mockup before paying anything.
              </p>
              <LeadForm compact />
            </div>
          </ScrollReveal>
        </div>
      </article>
    </div>
  );
}
