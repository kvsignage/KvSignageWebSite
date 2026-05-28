"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const galleryItems = [
  {
    category: "LED",
    title: "Shop Front LED Name Board",
    alt: "LED name board for shop front Chennai - KV Signage",
    image: "/gallery/led-shop-front.webp",
  },
  {
    category: "Neon",
    title: "Cafe Neon Sign",
    alt: "Custom neon sign for cafe Anna Nagar Chennai",
    image: "/gallery/neon-cafe-sign.webp",
  },
  {
    category: "ACP",
    title: "3D Metal Letter Board",
    alt: "3D ACP metal letter board Chennai - premium signage",
    image: "/gallery/acp-metal-letters.webp",
  },
  {
    category: "LED",
    title: "Restaurant LED Glow Sign",
    alt: "LED glow sign board for restaurant T. Nagar Chennai",
    image: "/gallery/led-restaurant-glow.webp",
  },
  {
    category: "Neon",
    title: "Bar Neon Light Sign",
    alt: "Neon light sign for bar Velachery Chennai",
    image: "/gallery/neon-bar-sign.webp",
  },
  {
    category: "Banner",
    title: "Inauguration Event Banner",
    alt: "Shop inauguration event banner printing Chennai",
    image: "/gallery/banner-inauguration.webp",
  },
  {
    category: "ACP",
    title: "Office ACP Letter Signage",
    alt: "ACP letter signage for office Nungambakkam Chennai",
    image: "/gallery/acp-office-signage.webp",
  },
  {
    category: "LED",
    title: "Showroom LED Board",
    alt: "LED sign board for showroom OMR Chennai",
    image: "/gallery/led-showroom.webp",
  },
  {
    category: "Digital",
    title: "Digital LED Display Screen",
    alt: "Digital LED display screen indoor signage Chennai",
    image: "/gallery/digital-led-display.webp",
  },
  {
    category: "Neon",
    title: "Custom Neon Wall Art",
    alt: "Custom neon wall art for salon Adyar Chennai",
    image: "/gallery/neon-wall-art.webp",
  },
  {
    category: "Banner",
    title: "Shop Grand Opening Banner",
    alt: "Grand opening flex banner printing same day Chennai",
    image: "/gallery/banner-grand-opening.webp",
  },
  {
    category: "Digital",
    title: "Indoor Digital Signage Board",
    alt: "Indoor digital signage board for retail store Chennai",
    image: "/gallery/digital-indoor-signage.webp",
  },
  {
    category: "ACP",
    title: "PNR² Homes – 3D Letter Building Sign",
    alt: "3D letter ACP signage for PNR Homes residential building Chennai - KV Signage",
    image: "/gallery/pnr-homes-3d-letters.jpg",
  },
  {
    category: "ACP",
    title: "Jamalia's – Shop Front Name Board",
    alt: "ACP 3D letter shop front signage for Jamalias store Chennai",
    image: "/gallery/jamalias-shop-sign.jpg",
  },
  {
    category: "ACP",
    title: "Urbanrise – Backlit Office Logo Panel",
    alt: "Backlit ACP office lobby signage for Urbanrise Chennai - KV Signage",
    image: "/gallery/urbanrise-office-backlit.jpg",
  },
  {
    category: "ACP",
    title: "Aishwarya Timbers – Backlit Office Sign",
    alt: "Backlit wooden panel office signage for Aishwarya Timbers Chennai",
    image: "/gallery/aishwarya-timbers-office.jpg",
  },
  {
    category: "ACP",
    title: "Tharun Apartment – 3D Letter Signage",
    alt: "3D stainless steel letter signage for Tharun Apartment building Chennai",
    image: "/gallery/tharun-apartment-after.jpg",
  },
  {
    category: "Vinyl",
    title: "Meril – Frosted Vinyl Glass Door",
    alt: "Frosted vinyl logo branding on glass door for Meril office Chennai",
    image: "/gallery/meril-glass-door-vinyl.jpg",
  },
  {
    category: "Vinyl",
    title: "Glass Partition – Custom Vinyl Design",
    alt: "Custom vinyl frosted design on glass partition for corporate office Chennai",
    image: "/gallery/glass-partition-vinyl-after.jpg",
  },
  {
    category: "ACP",
    title: "Capt Sri's – Custom House Name Plate",
    alt: "Custom gold acrylic house name plate for Capt Sris Chennai - KV Signage",
    image: "/gallery/capt-sris-nameplate.jpg",
  },
  {
    category: "Banner",
    title: "VJ Studioz – Backlit Flex Sign Board",
    alt: "Backlit flex sign board for VJ Studioz photography studio Chennai",
    image: "/gallery/vj-studioz-flex-board.jpg",
  },
  {
    category: "LED",
    title: "C3 Cinemas Rohini – LED Sign Board",
    alt: "LED backlit cinema signage for C3 Cinemas Rohini Chennai - KV Signage",
    image: "/gallery/c3-cinemas-rohini-led.jpg",
  },
  {
    category: "LED",
    title: "C3 Cinemas – Backlit Wall Panel",
    alt: "Backlit circular LED wall panel inside C3 Cinemas Chennai",
    image: "/gallery/c3-cinemas-interior-led.jpg",
  },
];

const categories = ["All", "LED", "Neon", "ACP", "Digital", "Banner", "Vinyl"];

export function GalleryGrid() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? galleryItems : galleryItems.filter((item) => item.category === active);

  return (
    <>
      {/* Filter */}
      <section className="py-4 border-b border-gray-800/30 sticky top-16 lg:top-[72px] z-30 bg-black/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  cat === active
                    ? "bg-gold text-black"
                    : "bg-gray-900/60 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-2.5 py-1 bg-gold/90 text-black text-xs font-bold rounded-md mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
