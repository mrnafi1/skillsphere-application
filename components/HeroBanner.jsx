"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";

const slides = [
  {
    tag: "🚀 Start Learning Today",
    heading: "Upgrade Your Skills Today",
    sub: "Learn from industry experts and accelerate your career with hands-on courses.",
    cta: "Browse Courses",
    href: "/courses",
    bg: "from-orange-500/20 via-base-100 to-base-100",
    accent: "#f97316",
  },
  {
    tag: "🎯 Expert-Led Courses",
    heading: "Learn from Industry Experts",
    sub: "Join 50,000+ students mastering Development, Design, Marketing and more.",
    cta: "Explore Now",
    href: "/courses",
    bg: "from-violet-500/20 via-base-100 to-base-100",
    accent: "#8b5cf6",
  },
  {
    tag: "💼 Career Growth",
    heading: "Build Skills That Get You Hired",
    sub: "Practical, project-based learning designed for the real world. No fluff, just results.",
    cta: "Get Started",
    href: "/register",
    bg: "from-sky-500/20 via-base-100 to-base-100",
    accent: "#0ea5e9",
  },
];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "8+", label: "Courses" },
  { value: "3", label: "Categories" },
  { value: "4.8★", label: "Avg Rating" },
];

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="absolute inset-0 w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`min-h-screen flex items-center bg-gradient-to-br ${slide.bg}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <div className="section-tag mb-6">{slide.tag}</div>
                  <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                    {slide.heading.split(" ").map((word, wi) =>
                      wi === 1 || wi === 2 ? (
                        <span key={wi} className="gradient-text"> {word}</span>
                      ) : (
                        <span key={wi}> {word}</span>
                      )
                    )}
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                    {slide.sub}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={slide.href}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all duration-200 hover:scale-105"
                    >
                      {slide.cta}
                      <FiArrowRight />
                    </Link>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-base-300 text-slate-300 hover:text-white hover:border-slate-400 transition-all duration-200">
                      <FiPlay size={14} />
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats overlay at bottom */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-base-200/60 backdrop-blur-sm border border-base-300 rounded-xl p-4 text-center"
              >
                <div className="font-heading font-extrabold text-2xl text-brand-500">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
