# KV Signage — Complete Project Documentation

> This document explains the entire project flow, technical architecture, CRM integrations, and automation roadmap. Written so anyone can understand and continue the project independently.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Website Pages & Routes](#4-website-pages--routes)
5. [Lead Capture Flow (End-to-End)](#5-lead-capture-flow-end-to-end)
6. [CRM Integration (HubSpot)](#6-crm-integration-hubspot)
7. [Analytics & Tracking](#7-analytics--tracking)
8. [Meta Conversions API (Server-Side)](#8-meta-conversions-api-server-side)
9. [Email & WhatsApp Notifications](#9-email--whatsapp-notifications)
10. [Ad Landing Pages](#10-ad-landing-pages)
11. [Environment Variables](#11-environment-variables)
12. [Deployment](#12-deployment)
13. [CRM Pipeline & Automation Plan](#13-crm-pipeline--automation-plan)
14. [WhatsApp Drip Automation](#14-whatsapp-drip-automation)
15. [Ad Optimization Loop](#15-ad-optimization-loop)
16. [Referral & Review System](#16-referral--review-system)
17. [Lead Scoring Model](#17-lead-scoring-model)
18. [Implementation Roadmap](#18-implementation-roadmap)
19. [Costs](#19-costs)
20. [Pending Items from Team](#20-pending-items-from-team)

---

## 1. Project Overview

**Business:** KV Signage — a signage fabrication company in Chennai.  
**Goal:** Generate leads from Meta Ads + Google Ads + organic SEO, capture them in a CRM, automate follow-ups, and track full ROI from ad spend to closed deal.

**Services offered:**
- LED Sign Boards
- Flex & Banner Printing
- ACP & Metal Letter Boards
- Neon Signs
- Digital Signage
- Inauguration & Event Banners

**Offers:**
- Free design mockup for all orders
- Free inauguration banner for new shop openings

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) | SSG/SSR website |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Animations | motion/react | Scroll reveals, stagger |
| Forms | react-hook-form + zod v4 | Client-side validation |
| CRM | HubSpot (Free tier) | Contact + Deal management |
| Email | Resend API | Transactional emails |
| WhatsApp | WhatsApp Business API | Team notifications |
| Analytics | Google Analytics 4 | Traffic & conversion tracking |
| Ads Tracking | Meta Pixel + Conversions API | Client + server-side events |
| Hosting | Vercel | Edge deployment + serverless |
| Domain | kvsignage.com (pending) | Production URL |

---

## 3. Folder Structure

```
src/
├── app/
│   ├── layout.tsx              → Root layout (fonts, analytics, JSON-LD schema)
│   ├── globals.css             → Tailwind imports + custom properties
│   ├── robots.ts               → robots.txt generation
│   ├── sitemap.ts              → XML sitemap generation
│   │
│   ├── (main)/                 → Route group: pages WITH header/footer/nav
│   │   ├── layout.tsx          → Header + OfferBar + Footer + WhatsAppButton
│   │   ├── page.tsx            → Homepage (Hero, Services, Testimonials, CTA)
│   │   ├── about/page.tsx      → About page (team, stats, story)
│   │   ├── blog/page.tsx       → Blog listing
│   │   ├── blog/[slug]/page.tsx→ Individual blog posts (MDX)
│   │   ├── contact/page.tsx    → Contact page with form + map
│   │   ├── gallery/page.tsx    → Project gallery grid
│   │   ├── services/page.tsx   → All services listing
│   │   ├── services/[slug]/    → Individual service detail pages
│   │   └── thank-you/page.tsx  → Post-form confirmation + referral CTA
│   │
│   ├── lp/                     → Route group: ad landing pages (NO nav/footer)
│   │   ├── layout.tsx          → Minimal layout (just WhatsApp button)
│   │   └── free-design/page.tsx→ Meta Ads landing page
│   │
│   └── api/
│       └── lead/route.ts       → Lead processing API endpoint
│
├── components/
│   ├── analytics/
│   │   ├── GoogleAnalytics.tsx → GA4 script injection
│   │   └── MetaPixel.tsx       → Meta Pixel script injection
│   ├── animations/
│   │   └── ScrollReveal.tsx    → Scroll-triggered animations
│   ├── layout/
│   │   ├── Header.tsx          → Site navigation + phone CTA
│   │   ├── Footer.tsx          → Footer with links + social
│   │   ├── OfferBar.tsx        → Top offer banner (sticky)
│   │   └── WhatsAppButton.tsx  → Floating WhatsApp button (tracks clicks)
│   ├── sections/               → Homepage sections (Hero, Services, etc.)
│   └── ui/
│       ├── LeadForm.tsx        → Reusable lead capture form
│       └── GalleryGrid.tsx     → Image gallery component
│
├── lib/
│   ├── constants.ts            → Site config, services data, testimonials, FAQ
│   ├── hubspot.ts              → HubSpot API integration
│   ├── meta-capi.ts            → Meta Conversions API (server-side events)
│   ├── notify-email.ts         → Email sending (client + team)
│   └── notify-whatsapp.ts      → WhatsApp notification to team
│
└── public/
    └── gallery/                → Optimized .webp images for services
```

### Why Route Groups?

- `(main)/` → All pages that need the full site chrome (Header, Footer, Nav, OfferBar)
- `lp/` → Ad landing pages that are intentionally stripped down (no distracting nav) to maximize conversion

The parentheses in `(main)` make it a "route group" — it doesn't appear in the URL. So `/about` maps to `src/app/(main)/about/page.tsx`.

---

## 4. Website Pages & Routes

| URL | Purpose | Lead Form? |
|-----|---------|-----------|
| `/` | Homepage — hero, services overview, testimonials | Yes (bottom) |
| `/services` | All 6 services listed | No (links to individual) |
| `/services/led-sign-boards` | LED service detail | Yes |
| `/services/flex-banner-printing` | Flex service detail | Yes |
| `/services/acp-metal-letter-boards` | ACP service detail | Yes |
| `/services/neon-signs` | Neon service detail | Yes |
| `/services/digital-signage` | Digital signage detail | Yes |
| `/services/inauguration-event-banners` | Events detail | Yes |
| `/gallery` | All project photos | No |
| `/about` | Team, stats, workshop photo | No |
| `/blog` | SEO blog listing | No |
| `/blog/[slug]` | Individual blog article | Yes (bottom) |
| `/contact` | Contact form + Google Maps | Yes |
| `/thank-you` | Post-submission + referral CTA | No |
| `/lp/free-design` | Meta Ads landing page | Yes (prominent) |

---

## 5. Lead Capture Flow (End-to-End)

### Step-by-step: What happens when someone fills the form

```
1. User lands on page (via Meta Ad, Google Ad, organic, referral)
   ↓
2. UTM parameters captured from URL (?utm_source=meta&utm_campaign=led_boards)
   → Stored in LeadForm state via useSearchParams()
   ↓
3. User fills form: name, email, phone, business name, service needed, message
   → Client-side validation via zod schema (react-hook-form)
   ↓
4. Form submits → POST /api/lead
   ↓
5. Server validates + sanitizes all inputs (truncates, strips HTML)
   ↓
6. Five parallel operations fire (Promise.allSettled):
   │
   ├── a) HubSpot API → Creates Contact + Creates Deal (stage: "New Enquiry")
   │                     Stores all UTM params as contact properties
   │
   ├── b) Meta Conversions API → Sends "Lead" event with hashed PII
   │                              (email SHA256, phone SHA256, city, state)
   │
   ├── c) Client Email (Resend) → "Thank you, we'll call you in 30 mins"
   │
   ├── d) Team Email (Resend) → Full lead details to sales team
   │
   └── e) WhatsApp Notification → Alert to sales team WhatsApp
   ↓
7. API returns { success: true }
   ↓
8. Client-side fires:
   ├── Meta Pixel fbq('track', 'Lead') → for client-side attribution
   └── GA4 gtag('event', 'generate_lead') → for Google Analytics
   ↓
9. User redirected to /thank-you page
   → Shows confirmation + referral CTA ("Refer a friend, get ₹500 off")
```

### Why both client-side AND server-side tracking?

- **Client-side (Meta Pixel):** Fast, gives Meta real-time signal, but blocked by ~30% of users (ad blockers)
- **Server-side (Meta CAPI):** Bypasses ad blockers, more reliable data, better attribution, required for iOS 14.5+ users
- **Deduplication:** Meta automatically deduplicates if both fire for the same user (uses event_id matching)

---

## 6. CRM Integration (HubSpot)

### File: `src/lib/hubspot.ts`

**What it does:**
1. Creates a Contact in HubSpot with all lead info + UTM data
2. Creates a Deal associated with that contact
3. Handles "contact already exists" gracefully (CONFLICT response)

**Contact properties stored:**
- `firstname`, `lastname`, `email`, `phone`
- `company` (business name)
- `lifecyclestage`: "lead"
- `hs_lead_status`: "NEW"
- `message`: service + custom message combined
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`

**Deal properties:**
- `dealname`: "{business} — {service}"
- `pipeline`: "default"
- `dealstage`: first stage (New Enquiry)
- Associated with the contact

**Auth:** Uses `HUBSPOT_API_KEY` (Private App access token from HubSpot Settings → Integrations → Private Apps)

---

## 7. Analytics & Tracking

### Google Analytics 4

**File:** `src/components/analytics/GoogleAnalytics.tsx`

**Events tracked:**
| Event | Trigger | Location |
|-------|---------|----------|
| `page_view` | Automatic | All pages |
| `generate_lead` | Form submission success | LeadForm |
| `whatsapp_click` | WhatsApp button clicked | WhatsAppButton |

**Setup:** Requires `NEXT_PUBLIC_GA4_ID` env var (format: `G-XXXXXXXXXX`)

### Meta Pixel (Client-Side)

**File:** `src/components/analytics/MetaPixel.tsx`

**Events tracked:**
| Event | Trigger | Location |
|-------|---------|----------|
| `PageView` | Every page load | Auto via pixel init |
| `Lead` | Form submission success | LeadForm |
| `Contact` | WhatsApp button clicked | WhatsAppButton |

**Setup:** Requires `NEXT_PUBLIC_META_PIXEL_ID` env var

---

## 8. Meta Conversions API (Server-Side)

### File: `src/lib/meta-capi.ts`

**Why this exists:**
- Ad blockers block client-side Meta Pixel for ~30% of visitors
- iOS 14.5+ limits client-side tracking
- Server-side events are more reliable and get better match rates
- Meta gives higher priority to server-side events for optimization

**How it works:**
1. When a lead is captured, the API route calls `sendMetaConversionEvent()`
2. User data (email, phone, name) is hashed with SHA-256 before sending
3. City ("chennai"), state ("tamil nadu"), country ("in") are also hashed and sent
4. Event is sent to Meta's Graph API: `POST https://graph.facebook.com/v21.0/{PIXEL_ID}/events`

**Data sent to Meta (all hashed):**
- `em` — email (lowercase, trimmed, SHA-256)
- `ph` — phone (normalized to 91XXXXXXXXXX format, SHA-256)
- `fn` — first name (lowercase, SHA-256)
- `ln` — last name (lowercase, SHA-256)
- `ct` — city ("chennai", SHA-256)
- `st` — state ("tamil nadu", SHA-256)
- `country` — country ("in", SHA-256)

**Custom data (not hashed):**
- `content_name` — service selected
- `content_category` — "signage"
- `lead_source` — utm_source or "organic"
- `campaign` — utm_campaign value

**Setup:** Requires `META_CONVERSIONS_API_TOKEN` env var (generated in Meta Events Manager → Settings → Conversions API)

---

## 9. Email & WhatsApp Notifications

### Email (Resend API)

**File:** `src/lib/notify-email.ts`

Two emails sent per lead:
1. **Client confirmation** — "Thanks for reaching out, we'll contact you within 30 minutes"
2. **Sales team notification** — Full lead details (name, phone, service, UTM source)

**Setup:** Requires `RESEND_API_KEY` and email addresses configured

### WhatsApp Team Alert

**File:** `src/lib/notify-whatsapp.ts`

- Sends an instant WhatsApp message to the sales team with lead details
- Uses WhatsApp Business API
- **Setup:** Requires `WHATSAPP_API_TOKEN` and `WHATSAPP_PHONE_ID`

---

## 10. Ad Landing Pages

### `/lp/free-design` — Meta Ads Landing Page

**Purpose:** Dedicated page for Meta (Facebook/Instagram) ad campaigns. Stripped of all navigation to prevent distraction and maximize form fills.

**Structure:**
- Logo (links to main site for trust)
- Headline + offer (free design mockup)
- Lead form (prominent, above fold on mobile)
- 3 gallery images (social proof)
- 4 testimonials (trust)
- Minimal footer with link to main website

**Why separate from main site?**
- No header/nav means no distracting links (user can only fill form or leave)
- Conversion rate on focused landing pages is 2-5x higher than homepage
- Can A/B test independently without affecting SEO pages

**UTM flow:**
```
Meta Ad URL: kvsignage.com/lp/free-design?utm_source=meta&utm_medium=paid&utm_campaign=led_boards_chennai
↓
useSearchParams() captures UTMs
↓
Sent with form data to /api/lead
↓
Stored in HubSpot contact → Attribution report shows which ad generated which deal
```

---

## 11. Environment Variables

Create a `.env.local` file in the project root:

```env
# HubSpot CRM
HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Meta (Facebook) Pixel
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

# Meta Conversions API (server-side)
META_CONVERSIONS_API_TOKEN=EAAxxxxxxxxxxxxxxx

# Google Analytics 4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxx
NOTIFICATION_EMAIL=team@kvsignage.com
FROM_EMAIL=hello@kvsignage.com

# WhatsApp Business API
WHATSAPP_API_TOKEN=your_token
WHATSAPP_PHONE_ID=your_phone_id
WHATSAPP_TEAM_NUMBER=
```

**Important:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never prefix secrets with `NEXT_PUBLIC_`.

---

## 12. Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Steps:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel dashboard (Settings → Environment Variables)
4. Deploy triggers automatically on every push to `main` branch

**Custom domain setup:**
1. Buy domain (kvsignage.com)
2. In Vercel → Settings → Domains → Add kvsignage.com
3. Update DNS records at registrar (point A record to Vercel's IP or use nameservers)
4. SSL is automatic

### Build command: `npm run build`
### Output: Static + Serverless (hybrid)

---

## 13. CRM Pipeline & Automation Plan

### Deal Pipeline Stages (Set up in HubSpot)

```
New Enquiry → Qualified → Quote Sent → Design Approved → In Production → Closed Won
                                    ↘ Closed Lost (at any stage)
```

| Stage | Meaning | Action |
|-------|---------|--------|
| New Enquiry | Lead just came in | Auto-created by website. Call within 30 min. |
| Qualified | Budget confirmed, genuine interest | Manual move after first call |
| Quote Sent | Quotation shared with client | Manual move. Set deal value. |
| Design Approved | Client approved the mockup | Manual move |
| In Production | 50% advance received, fabrication started | Manual move |
| Closed Won | Installed and paid in full | Manual move. Triggers review request. |
| Closed Lost | Didn't convert | Manual move. Triggers win-back flow. |

### Custom Properties to Create in HubSpot

**Contact properties:**
- `lead_source_detail` (dropdown): Meta Ad, Google Ad, Organic, Referral, Walk-in
- `service_interest` (dropdown): LED, Flex, ACP, Neon, Digital, Events
- `area_locality` (text): T.Nagar, Anna Nagar, Velachery, etc.
- `lead_score` (number): Calculated score 0-100

**Deal properties:**
- `installation_date` (date): When work was completed
- `referral_code` (text): If referred by existing customer
- `payment_status` (dropdown): Pending, 50% Paid, Full Paid

### Automations (What triggers what)

**Currently automated (via code):**
| Trigger | Action | Implementation |
|---------|--------|---------------|
| Form submitted | Create CRM contact + deal | `/api/lead` → `hubspot.ts` |
| Form submitted | Send confirmation email to client | `/api/lead` → `notify-email.ts` |
| Form submitted | Alert sales team (email + WhatsApp) | `/api/lead` → `notify-email.ts` + `notify-whatsapp.ts` |
| Form submitted | Fire Meta Lead event (server) | `/api/lead` → `meta-capi.ts` |
| WhatsApp button clicked | Fire Meta Contact event (client) | `WhatsAppButton.tsx` |

**To be automated (HubSpot Workflows + WhatsApp API):**
| Trigger | Delay | Action |
|---------|-------|--------|
| Deal created (New Enquiry) | +2 hours | WhatsApp: Send portfolio link |
| Deal created (New Enquiry) | +24 hours | WhatsApp: Recent projects in their area |
| Deal stage → Quote Sent | +3 days (if no reply) | WhatsApp: Follow-up reminder |
| Deal stage → Closed Won | +7 days | WhatsApp: Google Review request |
| Deal stage → Closed Won | +30 days | WhatsApp: Referral program nudge |
| Deal stage → Closed Lost | +14 days | WhatsApp/Email: Win-back offer |

---

## 14. WhatsApp Drip Automation

### How it will work technically

```
HubSpot Deal Stage Changes
        ↓
HubSpot Workflow triggers a Webhook
        ↓
POST /api/webhooks/hubspot (new route to build)
        ↓
Verify HubSpot webhook signature (security)
        ↓
Read payload: which deal? which stage? which contact?
        ↓
Match stage to WhatsApp template
        ↓
Call WhatsApp Business API → Send template message
        ↓
Customer receives WhatsApp message
```

### WhatsApp Templates Needed (Pre-approve with Meta)

1. **portfolio_share**
   > "Hi {{1}}! Thanks for your interest in {{2}}. Here's our recent work: kvsignage.com/gallery — Let us know if you'd like a free design mockup!"

2. **nearby_projects**
   > "Hi {{1}}, here are 5 recent {{2}} projects we did in Chennai. [Image carousel]. Interested? Reply YES for a free quote."

3. **quote_followup**
   > "Hi {{1}}, just checking in about the quote we sent for your {{2}} project. It's valid until {{3}}. Any questions? We're happy to help!"

4. **review_request**
   > "Hi {{1}}! Hope you're loving your new {{2}}. Would you mind leaving us a quick review? It really helps: {{3}}"

5. **referral_nudge**
   > "Hi {{1}}! Know any shop owner who needs signage? Refer them and get ₹500 off your next order. Share this link: {{2}}"

### WhatsApp API Providers (India)

| Provider | Cost | Good for |
|----------|------|----------|
| Interakt | ₹2,499/mo | HubSpot native integration |
| AiSensy | ₹999/mo | Budget option |
| Wati | ₹2,499/mo | Good dashboard |
| Direct Meta API | Free (per-message cost only) | If you want full control |

**Per-message cost:** ₹0.47 for marketing templates (India, as of 2026)

---

## 15. Ad Optimization Loop

### How conversion signals improve ad performance

```
Website sends Lead event → Meta receives signal
                                    ↓
Meta finds pattern: "people who convert tend to be aged 25-45,
                     business owners, browse at 9-11 PM"
                                    ↓
Meta shows your ad to MORE people matching that pattern
                                    ↓
Better leads come in → More conversions → Better signal → Loop continues
```

### Level 1: Lead Optimization (CURRENT)
- Meta optimizes for people likely to fill a form
- Problem: Some leads are junk (wrong number, just browsing)

### Level 2: Purchase Optimization (TO BUILD)
- When a deal closes, send a `Purchase` event back to Meta with the deal value
- Meta learns which LEADS actually become PAYING customers
- Meta stops showing ads to tire-kickers, focuses on real buyers
- **This alone can reduce cost per actual customer by 30-50%**

### Implementation for Level 2:
```
Deal → Closed Won in HubSpot
        ↓
HubSpot webhook → /api/webhooks/hubspot
        ↓
sendMetaConversionEvent({
  eventName: "Purchase",
  email: contact.email,
  phone: contact.phone,
  customData: { value: deal.amount, currency: "INR" }
})
        ↓
Meta receives Purchase event → optimizes for buyers, not just leads
```

### Custom Audiences to Build in Meta Ads Manager

| Audience | Source | Use |
|----------|--------|-----|
| All Website Visitors (180d) | Meta Pixel | Retarget with testimonials |
| Form Started, Not Submitted | Custom event | Retarget with "Still interested?" |
| Gallery Page Viewers | Pixel PageView on /gallery | Retarget with similar projects |
| Past Customers (CRM upload) | HubSpot export → Custom Audience | Exclude OR upsell |
| Lookalike of Converters | Based on Lead events | New cold audiences |
| Lookalike of Purchasers | Based on Purchase events | Best quality cold audience |

---

## 16. Referral & Review System

### Current Implementation
- `/thank-you` page has referral CTA: "Refer a friend, get ₹500 off"
- WhatsApp share link pre-filled with referral message

### Planned Full Flow

```
Customer's project is completed (Deal → Closed Won)
        ↓
+7 days: WhatsApp template → "Please review us on Google"
        ↓
+30 days: WhatsApp template → "Refer a friend, share this link"
        Link: kvsignage.com/lp/referral?ref=CUSTOMER_ID
        ↓
Friend clicks link → Lands on referral landing page
        → Form captures ref=CUSTOMER_ID in hidden field
        → Stored in HubSpot deal as referral_code
        ↓
Friend's deal closes → ₹500 credit applied to original customer
        → WhatsApp notification to referrer: "Your friend ordered! ₹500 credit."
```

### Technical Implementation Needed
1. New landing page: `/lp/referral/page.tsx`
2. LeadForm updated to capture `ref` param from URL
3. HubSpot deal property: `referral_code`
4. Webhook handler to detect referral deals closing

---

## 17. Lead Scoring Model

### Purpose
Prioritize which leads to call first. Hot leads get immediate attention, cold leads go into drip.

### Scoring Rules

| Signal | Points | How to Track |
|--------|--------|-------------|
| Form filled (vs WhatsApp only) | +20 | Form submission |
| Has business name filled | +15 | Field not empty |
| Service = LED or ACP (high value) | +20 | Service field |
| Source = Google Ads (high intent) | +25 | utm_source = google |
| Source = Meta (awareness) | +10 | utm_source = meta |
| Replied to WhatsApp drip | +30 | WhatsApp API webhook |
| Opened portfolio link | +10 | Link click tracking |
| Visited pricing/services page | +15 | GA4 event |
| No response after 48 hours | -20 | Time-based rule |
| Phone number invalid | -40 | Verification |

### Action Based on Score

| Score | Label | Action |
|-------|-------|--------|
| 60+ | 🔥 Hot | Call within 15 minutes |
| 30-59 | 🟡 Warm | Continue WhatsApp drip, call within 2 hours |
| 0-29 | 🔵 Cold | WhatsApp drip only, monthly newsletter |
| < 0 | ❌ Junk | Mark as disqualified, stop all outreach |

### Implementation
- Initial score calculated in `/api/lead` when lead comes in
- Stored as `lead_score` custom property in HubSpot
- HubSpot workflow updates score based on subsequent interactions

---

## 18. Implementation Roadmap

### Phase 1 — DONE ✅
- [x] Website built (all pages, responsive, dark theme)
- [x] Lead form with validation
- [x] HubSpot CRM integration (contact + deal)
- [x] Meta Pixel (client-side tracking)
- [x] Meta Conversions API (server-side tracking)
- [x] GA4 tracking
- [x] Email notifications (client + team)
- [x] WhatsApp team alert
- [x] UTM tracking end-to-end
- [x] Landing page for Meta Ads
- [x] Blog with SEO articles
- [x] Image optimization (WebP, compressed)
- [x] Service detail pages with gallery images

### Phase 2 — BLOCKED (Waiting for team)
- [ ] Domain purchase (kvsignage.com or alternative)
- [ ] Connect domain to Vercel
- [ ] Set up custom email (info@kvsignage.com) via Google Workspace or Zoho
- [ ] Verify domain in HubSpot for email sending
- [ ] Add real pricing to services
- [ ] Replace any placeholder images with real project photos
- [ ] Get HubSpot Private App token and add to env

### Phase 3 — Post-Launch (Week 1-2)
- [ ] Set up HubSpot deal pipeline stages
- [ ] Create custom properties in HubSpot
- [ ] Sign up for WhatsApp Business API provider (Interakt recommended)
- [ ] Get Meta Conversions API token (Events Manager → Settings)
- [ ] Set up Google Ads conversion tracking
- [ ] Create retargeting audiences in Meta Ads Manager
- [ ] Launch first Meta Ad campaign pointing to /lp/free-design

### Phase 4 — Automation (Week 3-4)
- [ ] Build `/api/webhooks/hubspot` route
- [ ] Implement WhatsApp drip sequence (5 templates)
- [ ] Get WhatsApp templates approved by Meta
- [ ] Connect HubSpot workflow → webhook → WhatsApp
- [ ] Add lead scoring logic

### Phase 5 — Optimization (Month 2)
- [ ] Implement offline conversion upload (Purchase event → Meta)
- [ ] Build referral landing page `/lp/referral`
- [ ] A/B test landing page variants
- [ ] Create Google Ads offline conversion import
- [ ] Set up Lookalike audiences from Purchase events
- [ ] Review automation (post-installation Google Review request)

### Phase 6 — Scale (Month 3+)
- [ ] Google Ads Search campaigns (high-intent keywords)
- [ ] YouTube Ads (video showcases)
- [ ] Area-specific landing pages (T.Nagar, Anna Nagar, etc.)
- [ ] Multi-language pages (Tamil)
- [ ] Customer portal (track order status)

---

## 19. Costs

### Monthly Running Costs

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Pro | ₹1,500/mo | Hosting + serverless functions |
| Domain renewal | ₹800/year | .com domain |
| Google Workspace | ₹136/mo | Custom email (info@kvsignage.com) |
| HubSpot Free | ₹0 | CRM (free tier is sufficient to start) |
| HubSpot Starter (optional) | ₹4,200/mo | Only if you need workflows |
| WhatsApp API (Interakt) | ₹2,499/mo | Drip automation |
| WhatsApp messages | ~₹0.47/msg | Marketing template cost |
| Resend (email) | ₹0 | Free tier: 100 emails/day |
| Meta Pixel / CAPI | ₹0 | Free (part of ad account) |
| GA4 | ₹0 | Free |
| **Total (basic)** | **~₹2,000/mo** | Without WhatsApp automation |
| **Total (full automation)** | **~₹8,500/mo** | With all automations |

### Ad Spend (Separate)
- Meta Ads: Start with ₹500-1000/day
- Google Ads: Start with ₹500/day for search keywords
- Recommend: ₹30,000-50,000/mo total ad budget to start

---

## 20. Pending Items from Team

### Must-have before launch:

1. **Real project images** — LED boards, before/after installation shots, workshop photos. Currently using a mix of real + web-sourced images.

2. **Starting prices for each service:**
   - LED Sign Boards: ₹___/sq.ft
   - Flex & Banner Printing: ₹___/sq.ft
   - ACP & Metal Letter Boards: ₹___/sq.ft
   - Neon Signs: ₹___/letter
   - Digital Signage: ₹___/screen
   - Inauguration Banners: ₹___/banner

3. **Domain name** — Need to purchase and provide DNS access. Options:
   - kvsignage.com (check availability)
   - kvsignage.in
   - kvsigns.com

4. **Contact details for website:**
   - Phone number
   - WhatsApp number (same or different?)
   - Email address (will set up after domain)
   - Physical address / Google Maps pin

5. **HubSpot account access** — Need Private App access token

---

## Quick Start for Developers

```bash
# Clone and install
git clone <repo-url>
cd kv-signage
npm install

# Set up environment
cp .env.example .env.local
# Fill in all values in .env.local

# Run dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Run production build locally
npm run start
```

---

## Key Files to Edit for Common Tasks

| Task | File |
|------|------|
| Change phone/email/address | `src/lib/constants.ts` → `siteConfig` |
| Add/edit a service | `src/lib/constants.ts` → `services` array |
| Edit testimonials | `src/lib/constants.ts` → `testimonials` array |
| Change site offers | `src/components/layout/OfferBar.tsx` |
| Edit landing page | `src/app/lp/free-design/page.tsx` |
| Modify form fields | `src/components/ui/LeadForm.tsx` |
| Add a new blog post | Create `.mdx` file in blog content directory |
| Change homepage sections | `src/components/sections/*.tsx` |

---

*Last updated: 25 May 2026*
