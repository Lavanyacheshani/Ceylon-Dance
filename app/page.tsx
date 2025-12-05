"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Sparkles, Users, Clock, Award, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import HeroSlider from "@/components/hero-slider"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Dilini Perera",
      role: "Beginner Student",
      message:
        "I never thought I could learn Kandyan dance at this level. The instructors are patient, kind, and incredibly knowledgeable.",
    },
    {
      name: "Suresh Bandara",
      role: "Intermediate Dancer",
      message:
        "The academy helped me build confidence to perform on stage. The technique, discipline, and cultural stories are amazing.",
    },
    {
      name: "Anuki Jayasinghe",
      role: "Parents of Student",
      message:
        "My daughter absolutely loves her classes. She has grown more graceful, focused, and proud of her Sri Lankan heritage.",
    },
    {
      name: "Kasun Rathnayake",
      role: "Professional Track",
      message:
        "This is the best place for serious dancers. The professional program refined my performance skills and stage presence.",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)

    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          element.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Auto-play testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <Navigation />

      {/* Hero */}
      <HeroSlider />

      {/* Why Choose Us */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#7B1129]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#7B1129]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="inline-block mb-3 rounded-full border border-[#7B1129]/20 bg-[#7B1129]/5 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-[#7B1129]/80 uppercase">
              Our Academy
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                Why Choose Us?
              </span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Join a dedicated community preserving the elegance, power, and heritage of authentic Kandyan dance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Expert Instructors", desc: "Train under award-winning master dancers with years of stage experience." },
              { icon: Award, title: "Certified Programs", desc: "Structured syllabi and certifications recognized by leading institutions." },
              { icon: Clock, title: "Flexible Schedule", desc: "Evening and weekend classes tailored for students and professionals." },
              { icon: Sparkles, title: "Cultural Excellence", desc: "Authentic costumes, drums, and rituals that honour true tradition." },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="scroll-reveal group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 px-6 py-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7B1129]/70 hover:shadow-xl"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="pointer-events-none absolute inset-x-0 -top-8 h-24 bg-gradient-to-b from-[#7B1129]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7B1129]/10 ring-2 ring-[#7B1129]/5 transition-all duration-300 group-hover:bg-[#7B1129]/20 group-hover:ring-[#7B1129]/40">
                    <feature.icon className="h-6 w-6 text-[#7B1129]" />
                  </div>
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-center text-sm text-neutral-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#fdf5f7] via-white to-[#f9f3f4]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#7B1129]/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="inline-block mb-3 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#7B1129]/80 border border-[#7B1129]/15">
              Classes
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                Classes
              </span>
            </h2>
            <p className="text-lg text-neutral-600">
              Choose the perfect journey for your current skill level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Beginner", price: "LKR 29,000", duration: "8 weeks", students: "12 / 20 seats", level: "No experience " },
              { name: "Intermediate", price: "LKR 36,000", duration: "8 weeks", students: "18 / 20 seats", level: "Some training" },
              { name: "Advanced", price: "LKR 44,000", duration: "8 weeks", students: "15 / 20 seats", level: "Stage-ready" },
              { name: "Professional", price: "LKR 59,000", duration: "12 weeks", students: "8 / 15 seats", level: "Teaching" },
            ].map((course, idx) => (
              <div
                key={idx}
                className="scroll-reveal group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/90 border border-neutral-200 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7B1129]/70 hover:shadow-2xl"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#7B1129]/30 opacity-80" />
                  <img
                    src={`/kandyan-dance-${idx + 1}.jpg`}
                    alt={course.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                    {course.duration}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-900">
                      {course.name}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#7B1129]">
                      {course.level}
                    </span>
                  </div>

                  <p className="mb-3 text-2xl font-bold bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                    {course.price}
                  </p>

                  <div className="mb-4 space-y-1 text-sm text-neutral-600">
                    <p>{course.students}</p>
                    <p className="text-xs text-[#7B1129]/80">
                      Limited slots · Small group focus
                    </p>
                  </div>

                  <Link
                    href="/register"
                    className="mt-auto inline-flex items-center justify-center rounded-full bg-[#7B1129] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#7B1129]/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#911634]"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action - Burgundy */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#7B1129] via-[#5B0C1E] to-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-120px] right-10 h-80 w-80 rounded-full bg-black/40 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Begin Your{" "}
            <span className="bg-gradient-to-r from-white to-[#FBE9EC] bg-clip-text text-transparent">
              Kandyan Dance Journey?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto">
            Step into a world of rhythm, grace, and history. Train your body,
            sharpen your mind, and carry forward a legacy that has danced
            through centuries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="rounded-full bg-white px-10 py-3 text-sm font-semibold text-[#7B1129] shadow-xl shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FBE9EC]"
            >
              Register Now
            </Link>
            <Link
              href="/classes"
              className="rounded-full border border-white/60 px-10 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              View Class Details
            </Link>
          </div>
        </div>
      </section>

      {/* NEW White Testimonial Slider Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-10 h-64 w-64 rounded-full bg-[#7B1129]/8 blur-3xl" />
          <div className="absolute bottom-[-80px] right-10 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="inline-block mb-3 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-[#7B1129] uppercase">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What Our{" "}
              <span className="bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                Students Say
              </span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              Real stories from dancers and families who trusted us with their Kandyan dance journey.
            </p>
          </div>

          <div className="relative scroll-reveal">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 shadow-xl backdrop-blur-sm px-6 py-8 md:px-10 md:py-10">
              {/* Quote Icon */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7B1129]/10">
                  <Quote className="h-6 w-6 text-[#7B1129]" />
                </div>
              </div>

              {/* Testimonial content */}
              <div className="text-center min-h-[140px] transition-all duration-300">
                <p className="text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed">
                  “{testimonials[currentTestimonial].message}”
                </p>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold text-[#7B1129]">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[#f5b400]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#f5b400] text-[#f5b400]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevTestimonial}
                  className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7B1129]/60 hover:text-[#7B1129]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`h-2.5 rounded-full transition-all duration-200 ${idx === currentTestimonial ? "w-5 bg-[#7B1129]" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextTestimonial}
                  className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7B1129]/60 hover:text-[#7B1129]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-[#fdf2f5] to-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-[#7B1129]/12 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#7B1129]/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-[#7B1129]/15" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#7B1129] border-r-[#7B1129] animate-spin-slow" />
          <div className="absolute inset-4 rounded-full bg-white/70 shadow-inner shadow-[#7B1129]/20" />
        </div>

        <div className="text-center">
          <h1 className="mb-2 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-3xl font-bold text-transparent">
            Kandyan Dance Academy
          </h1>
          <p className="text-neutral-600 text-lg">Preparing your dance journey...</p>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-[#7B1129] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
