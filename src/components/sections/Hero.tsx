import Link from "next/link";

export function Hero() {
  return (
    <section className="relative sm:min-h-svh overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
      
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[150px]" />

      {/* 
        Spacing: header(64/72) + offerbar(36/40) + gap(24-32)
        Mobile:  64 + 36 + 24 = 124px → pt-[124px]
        Tablet:  64 + 40 + 28 = 132px → sm:pt-[132px]
        Desktop: 72 + 40 + 32 = 144px → lg:pt-36
      */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-[124px] sm:pt-[132px] lg:pt-36 pb-20 sm:pb-24 lg:pb-32 text-center flex flex-col items-center sm:justify-center sm:min-h-svh">
        {/* Urgency Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gold/[0.08] border border-gold/20 mb-6 sm:mb-8 animate-fade-in-up"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold/90 text-xs sm:text-sm font-medium tracking-wide">
            Limited — Only 5 Free Design Slots Left
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-[clamp(1.6rem,6vw,1.875rem)] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold font-[family-name:var(--font-heading)] leading-[1.15] tracking-tight animate-fade-in-up [animation-delay:100ms]"
        >
          <span className="block sm:inline">Get <span className="text-gold">40% More Walk-ins</span></span>
          <span className="block sm:inline sm:mt-2">With Signage That Sells</span>
        </h1>


        {/* Value Props */}
        <div
          className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl sm:max-w-2xl mx-auto w-full animate-fade-in-up [animation-delay:200ms]"
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <svg className="w-7 h-7 sm:w-9 sm:h-9 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-snug text-center">
              FREE Design<br />Mockup for<br className="sm:hidden" /> Every Order
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3 border-x border-gray-800/60">
            <svg className="w-7 h-7 sm:w-9 sm:h-9 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-snug text-center">
              FREE Inauguration<br />Banner for<br className="sm:hidden" /> New Shops
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <svg className="w-7 h-7 sm:w-9 sm:h-9 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-snug text-center">
              500+ Signage<br />Projects Across<br className="sm:hidden" /> Chennai
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto animate-fade-in-up [animation-delay:350ms]"
        >
          <Link
            href="/contact"
            className="group px-8 py-3.5 sm:px-9 sm:py-4.5 bg-gold text-black font-bold text-base sm:text-lg rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-[0_4px_40px_rgba(212,175,55,0.25)] w-full sm:w-auto text-center"
          >
            Get Your FREE Design
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/gallery"
            className="group px-8 py-3.5 sm:px-9 sm:py-4.5 border border-gold/30 text-gray-200 font-medium text-base sm:text-lg rounded-xl hover:border-gold/60 hover:text-gold transition-all duration-300 w-full sm:w-auto text-center"
          >
            View Our 500+ Projects
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Trust line */}
        <p
          className="mt-8 sm:mt-14 text-xs sm:text-sm text-gray-400 tracking-wide animate-fade-in [animation-delay:700ms]"
        >
          500+ projects across Chennai — T. Nagar to OMR • 8+ years experience
        </p>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in [animation-delay:2000ms]"
      >
        <div
          className="w-5 h-9 border-2 border-gray-700/60 rounded-full flex justify-center animate-scroll-bounce"
        >
          <div className="w-1 h-2.5 bg-gold/60 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
