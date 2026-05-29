export const siteConfig = {
  name: "KV Signage",
  tagline: "Premium Signage Solutions in Chennai",
  description:
    "Chennai's trusted signage partner. LED boards, neon signs, ACP letters, flex banners & more. Design mockup FREE for all orders. New shop opening? Inauguration banner also FREE.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: "+91 89257 56408",
  whatsapp: "+91 89257 56408",
  email: "signagekv@gmail.com",
  address: "593, 7th Street, J J Nagar, Mogappair East, Chennai - 600037",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d356.4289781987864!2d80.186887940746!3d13.083587437386239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA1JzAwLjkiTiA4MMKwMTEnMTMuMyJF!5e1!3m2!1sen!2sin!4v1779956969008!5m2!1sen!2sin",
  googleMapsLink:
    "https://www.google.com/maps/dir/?api=1&destination=13.083587,80.186888",
  social: {
    instagram: "https://instagram.com/kv_signage",
    facebook: "https://www.facebook.com/profile.php?id=61590336094040",
  },
};

/** Facebook/Meta Graph API version — single source of truth for all integrations */
export const FB_GRAPH_API_VERSION = "v21.0";

export const services = [
  {
    slug: "led-sign-boards",
    title: "LED Sign Boards",
    shortDescription: "Eye-catching illuminated displays that grab attention 24/7",
    description:
      "Make your business stand out with premium LED sign boards. Our energy-efficient, high-brightness LED signage ensures your brand is visible day and night. Perfect for shops, restaurants, hospitals, and commercial complexes.",
    features: [
      "Energy-efficient LED technology",
      "Weather-resistant construction",
      "Custom sizes and designs",
      "5-year warranty on electronics",
      "Professional installation included",
    ],
    icon: "💡",
    startingPrice: "₹4,000",
    image: "/gallery/led-shop-front.webp",
    gallery: ["/gallery/led-shop-front.webp", "/gallery/led-restaurant-glow.webp", "/gallery/led-showroom.webp"],
  },
  {
    slug: "flex-banner-printing",
    title: "Flex & Banner Printing",
    shortDescription: "High-quality prints for events, promotions, and branding",
    description:
      "From grand openings to seasonal promotions, our flex and banner printing delivers vibrant, durable prints that make an impact. Available in all sizes with quick turnaround.",
    features: [
      "High-resolution printing (1440 DPI)",
      "UV-resistant inks for outdoor use",
      "Same-day printing available",
      "Custom sizes up to 10ft × 50ft",
      "Mounting hardware included",
    ],
    icon: "🖨️",
    startingPrice: "₹500",
    image: "/gallery/banner-grand-opening.webp",
    gallery: ["/gallery/banner-grand-opening.webp", "/gallery/banner-inauguration.webp"],
  },
  {
    slug: "acp-metal-letter-boards",
    title: "ACP & Metal Letter Boards",
    shortDescription: "Elegant 3D letters and panels for a professional look",
    description:
      "Elevate your storefront with premium ACP cladding and 3D metal letters. Our CNC-cut stainless steel and brass letters give your business a sophisticated, high-end appearance.",
    features: [
      "CNC precision cutting",
      "Stainless steel & brass options",
      "Powder-coated finishes",
      "LED backlit options available",
      "10+ year durability",
    ],
    icon: "🔤",
    startingPrice: "₹5,000",
    image: "/gallery/acp-metal-letters.webp",
    gallery: ["/gallery/acp-metal-letters.webp", "/gallery/acp-office-signage.webp"],
  },
  {
    slug: "neon-signs",
    title: "Neon Signs",
    shortDescription: "Trendy LED neon flex for modern interiors and storefronts",
    description:
      "Create Instagram-worthy spaces with custom neon signs. Our modern LED neon flex is safer, more affordable, and more versatile than traditional glass neon — perfect for cafes, salons, and offices.",
    features: [
      "Safe LED neon flex technology",
      "Custom text and shapes",
      "RGB color options available",
      "Low power consumption",
      "Indoor and outdoor variants",
    ],
    icon: "✨",
    startingPrice: "₹4,000",
    image: "/gallery/neon-cafe-sign.webp",
    gallery: ["/gallery/neon-cafe-sign.webp", "/gallery/neon-bar-sign.webp", "/gallery/neon-wall-art.webp"],
  },
  {
    slug: "digital-signage",
    title: "Digital Signage",
    shortDescription: "Dynamic digital displays for modern communication",
    description:
      "Engage your audience with dynamic digital signage solutions. From retail displays to menu boards, our digital signage systems deliver real-time content updates with stunning visuals.",
    features: [
      "4K display options",
      "Cloud-based content management",
      "Scheduled content rotation",
      "Multi-screen synchronization",
      "Remote updates from anywhere",
    ],
    icon: "📺",
    startingPrice: "₹10,000",
    image: "/gallery/digital-indoor-signage.webp",
    gallery: ["/gallery/digital-indoor-signage.webp", "/gallery/digital-led-display.webp"],
  },
  {
    slug: "inauguration-event-banners",
    title: "Inauguration & Event Banners",
    shortDescription: "Grand opening displays that create lasting impressions",
    description:
      "Make your grand opening or event unforgettable with our premium inauguration banners and stage backdrops. From ribbon-cutting setups to full event branding, we've got you covered.",
    features: [
      "Full event branding packages",
      "Stage backdrops and standees",
      "Ribbon-cutting ceremony setups",
      "Same-day delivery available",
      "Setup and takedown included",
    ],
    icon: "🎉",
    startingPrice: "₹1,000",
    image: "/gallery/banner-inauguration.webp",
    gallery: ["/gallery/banner-inauguration.webp", "/gallery/banner-grand-opening.webp"],
  },
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    business: "Kumar Electronics, T. Nagar",
    text: "After installing the LED board, our walk-ins jumped from 15 to 40+ per day. The design team nailed our vision perfectly. Best ₹60K we ever spent — paid for itself in 2 weeks.",
    rating: 5,
  },
  {
    name: "Priya Shankar",
    business: "Bliss Cafe, Anna Nagar",
    text: "The neon sign went viral on Instagram! We got 200+ posts tagged in the first month. Now people come just for photos and end up ordering. Revenue up 35% since installation.",
    rating: 5,
  },
  {
    name: "Mohammed Faisal",
    business: "Faisal Textiles, Purasawalkam",
    text: "Our showroom looks like a premium international brand now. Customers say the 3D letters give them confidence in our quality. Sales have genuinely improved since the upgrade.",
    rating: 5,
  },
  {
    name: "Dr. Lakshmi Narayanan",
    business: "LN Hospital, Velachery",
    text: "Patients used to miss our hospital entrance from the main road. The illuminated signage solved that instantly. Professional team — delivered on time despite our tight schedule.",
    rating: 5,
  },
  {
    name: "Arun Prakash",
    business: "Chennai Food Trucks",
    text: "Got our food truck wrapped and it's basically a moving billboard. We get 5-10 new customers DAILY just from people seeing us on the road. The wrap paid for itself in a week!",
    rating: 5,
  },
  {
    name: "Deepa Venkatesh",
    business: "Glow Salon, Adyar",
    text: "Free design was what got us in the door, but the quality is what made us loyal customers. We've done 3 projects with KV now — always on time, always exceeding expectations.",
    rating: 5,
  },
];

export const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "8+", label: "Years Experience" },
  { value: "300+", label: "Happy Clients" },
  { value: "48hr", label: "Quick Turnaround" },
];

export const offerItems = [
  "FREE design consultation for all orders",
  "FREE digital mockup — see your board before we make it",
  "FREE inauguration banner (new shop openings only)",
  "48-hour delivery guarantee",
  "Lifetime maintenance support",
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const faqItems = [
  {
    question: "Do you come to our location for measurement?",
    answer: "Yes, we cover all of Chennai — T. Nagar, Anna Nagar, OMR, Adyar, Tambaram, Velachery and everywhere in between. Site visit and measurement are completely free.",
  },
  {
    question: "What is the approximate price for a LED sign board?",
    answer: "It depends on size and type. LED boards start from ₹4,000. We'll create a free design mockup first, then give you a confirmed quote — no hidden charges.",
  },
  {
    question: "Do I need to pay for the design?",
    answer: "No, the design mockup is 100% FREE. We'll show you exactly how your sign board will look before you spend a single rupee. Only pay if you're happy with it.",
  },
  {
    question: "How many days does it take?",
    answer: "Regular sign boards take 3–5 working days. Inauguration banners can be done same day or next day. Rush orders are possible with a small extra charge.",
  },
  {
    question: "Do you handle installation?",
    answer: "Yes, from fabrication to installation — we handle everything. Our professional team comes to your site and does the full setup. No need to hire anyone separately.",
  },
  {
    question: "Is there a warranty?",
    answer: "LED electronics come with 5 years warranty. ACP boards and metal letters last 10+ years. All installations include lifetime maintenance support.",
  },
];

export const areaCoverage = [
  { area: "T. Nagar", projects: "80+" },
  { area: "Anna Nagar", projects: "60+" },
  { area: "Adyar", projects: "50+" },
  { area: "OMR", projects: "45+" },
  { area: "Velachery", projects: "40+" },
  { area: "Tambaram", projects: "35+" },
  { area: "Porur", projects: "30+" },
  { area: "Chromepet", projects: "25+" },
  { area: "Nungambakkam", projects: "30+" },
  { area: "Guindy", projects: "28+" },
  { area: "Mylapore", projects: "22+" },
  { area: "Perambur", projects: "20+" },
];
