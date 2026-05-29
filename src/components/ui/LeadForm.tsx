"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { services } from "@/lib/constants";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  business: z.string().min(2, "Business name is required"),
  service: z.string().min(1, "Select a service"),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

function LeadFormInner({ compact = false }: { compact?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const utmParams = useMemo(() => {
    const params: Record<string, string> = {};
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params[key] = value;
    });
    return params;
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...utmParams }),
      });

      if (res.ok) {
        reset();
        // Fire Meta Pixel Lead event
        if (typeof window !== "undefined" && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
          (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead", {
            content_name: data.service,
            content_category: "signage",
          });
        }
        // Fire GA4 conversion event
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
            event_category: "lead_form",
            event_label: data.service,
          });
        }
        router.push("/thank-you");
      }
    } catch {
      // Silently handle - form shows error state
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${compact ? "space-y-4" : "space-y-5"} bg-gray-900/50 rounded-xl border border-gray-800 p-6 md:p-8`}
    >
      {!compact && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white">Claim Your FREE Design</h3>
          <p className="text-sm text-gray-400 mt-1">Fill this form & get a free mockup in 2 hours</p>
        </div>
      )}

      <div>
        <input
          {...register("name")}
          placeholder="Your Name"
          aria-label="Your Name"
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email Address"
          type="email"
          aria-label="Email Address"
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("phone")}
          placeholder="Phone Number"
          type="tel"
          aria-label="Phone Number"
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <input
          {...register("business")}
          placeholder="Business Name"
          aria-label="Business Name"
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
        />
        {errors.business && <p className="text-red-400 text-xs mt-1">{errors.business.message}</p>}
      </div>

      <div>
        <select
          {...register("service")}
          aria-label="Select a Service"
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold transition-colors appearance-none"
          defaultValue=""
        >
          <option value="" disabled className="text-gray-500">Select a Service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-gray-900">
              {s.title}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
      </div>

      {!compact && (
        <div>
          <textarea
            {...register("message")}
            placeholder="Tell us about your signage needs (optional)"
            rows={3}
            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-gold text-black font-bold text-lg rounded-lg hover:bg-gold-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        {isSubmitting ? "Sending..." : "Get My FREE Design →"}
      </button>

      <p className="text-center text-xs text-gray-500">
        🔒 Your info is 100% secure. No spam, ever.
      </p>
    </form>
  );
}

export function LeadForm({ compact = false }: { compact?: boolean }) {
  return (
    <Suspense fallback={<div className="h-96 bg-gray-900/50 rounded-xl border border-gray-800 animate-pulse" />}>
      <LeadFormInner compact={compact} />
    </Suspense>
  );
}
