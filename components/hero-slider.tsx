"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    image: "/16.jpg",
    title: "Experience the Ancient Art",
    subtitle: "Learn authentic Kandyan dance from master instructors",
    cta: "Start Your Journey",
  },
  {
    id: 2,
    image: "/20.jpg",
    title: "Preserve Our Heritage",
    subtitle: "Connect with centuries of cultural tradition",
    cta: "Explore Classes",
  },
  {
    id: 3,
    image: "/22.jpg",
    title: "Dance with Passion",
    subtitle: "Master the rhythm and grace of Kandyan movements",
    cta: "Register Today",
  },
  {
    id: 4,
    image: "/28.jpg",
    title: "Join Our Community",
    subtitle: "Become part of a vibrant cultural movement",
    cta: "Discover More",
  },
  {
    id: 5,
    image: "/30.jpg",
    title: "Transform Your Life",
    subtitle: "Through the power of dance and culture",
    cta: "Begin Now",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay, currentSlide])

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-[100vh] w-full overflow-hidden pt-16 bg-black">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Softer overlays so image is visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          {/* Burgundy accent wash */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#7B1129aa,transparent_60%)]" />
        </div>
      ))}

      {/* Floating burgundy glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-10 w-72 h-72 rounded-full bg-[#7B1129]/30 blur-3xl" />
        <div className="absolute bottom-[-120px] left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <p className="mb-4 inline-block rounded-full border border-white/30 bg-black/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              Ceylon Dance Company · UK
            </p>

            <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-6xl leading-tight">
              {/* Main dynamic title */}
              <span className="block text-white">
                {slides[currentSlide].title}
              </span>

              {/* ✨ New prettier line instead of “Traditional Spirit, Modern Stage” */}
              <span className="mt-3 inline-block bg-gradient-to-r from-[#FFE4EA] via-[#F4B7C2] to-[#FFF4D0] bg-clip-text text-transparent text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold tracking-tight">
                Heritage in Motion · Ceylon Dance Company in France
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-base text-white/85 md:text-lg">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-[#7B1129] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#911634]"
              >
                {slides[currentSlide].cta}
                <ChevronRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-200 hover:bg-white/15"
              >
                {isAutoPlay ? "Pause slideshow" : "Play slideshow"}
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-white/70">
              <div className="h-[1px] w-16 bg-white/50" />
              <p>
                Authentic Kandyan dance training in the heart of France.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Previous / Next buttons */}
      <button
        onClick={handlePrevSlide}
        className="group absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-3 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/70 md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={handleNextSlide}
        className="group absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-3 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/70 md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots + counter */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full bg-black/40 px-5 py-2 backdrop-blur-md border border-white/25">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${index === currentSlide
                ? "h-2 w-5 rounded-full bg-white"
                : "h-2 w-2 rounded-full bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-white/80">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  )
}
