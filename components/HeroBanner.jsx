"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";

// Hero slider content configuration
const heroSlides = [
  {
    tagline: "🚀 Start Learning Today",
    mainHeading: "Upgrade Your Skills Today",
    description: "Learn from industry experts and accelerate your career with hands-on courses.",
    buttonText: "Browse Courses",
    buttonLink: "/courses",
    backgroundGradient: "from-orange-500/20 via-base-100 to-base-100",
    accentColor: "#f97316",
  },
  {
    tagline: "🎯 Expert-Led Courses",
    mainHeading: "Learn from Industry Experts",
    description: "Join 50,000+ students mastering Development, Design, Marketing and more.",
    buttonText: "Explore Now",
    buttonLink: "/courses",
    backgroundGradient: "from-violet-500/20 via-base-100 to-base-100",
    accentColor: "#8b5cf6",
  },
  {
    tagline: "💼 Career Growth",
    mainHeading: "Build Skills That Get You Hired",
    description: "Practical, project-based learning designed for the real world. No fluff, just results.",
    buttonText: "Get Started",
    buttonLink: "/register",
    backgroundGradient: "from-sky-500/20 via-base-100 to-base-100",
    accentColor: "#0ea5e9",
  },
];

// Platform statistics displayed at bottom
const platformStats = [
  { displayValue: "50K+", description: "Students" },
  { displayValue: "8+", description: "Courses" },
  { displayValue: "3", description: "Categories" },
  { displayValue: "4.8★", description: "Avg Rating" },
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
        {heroSlides.map((slideContent, slideIndex) => (
          <SwiperSlide key={`hero-slide-${slideIndex}`}>
            <div className={`min-h-screen flex items-center bg-gradient-to-br ${slideContent.backgroundGradient}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <div className="section-tag mb-6">{slideContent.tagline}</div>
                  <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                    {slideContent.mainHeading.split(" ").map((word, wordIndex) =>
                      wordIndex === 1 || wordIndex === 2 ? (
                        <span key={`word-${wordIndex}`} className="gradient-text"> {word}</span>
                      ) : (
                        <span key={`word-${wordIndex}`}> {word}</span>
                      )
                    )}
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                    {slideContent.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={slideContent.buttonLink}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all duration-200 hover:scale-105"
                    >
                      {slideContent.buttonText}
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
            {platformStats.map((statItem) => (
              <div
                key={statItem.description}
                className="bg-base-200/60 backdrop-blur-sm border border-base-300 rounded-xl p-4 text-center"
              >
                <div className="font-heading font-extrabold text-2xl text-brand-500">
                  {statItem.displayValue}
                </div>
                <div className="text-xs text-slate-400 mt-1">{statItem.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
