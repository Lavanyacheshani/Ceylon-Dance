"use client"

import { useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Globe2, MapPin, Sparkles, Users, Star, CalendarDays } from "lucide-react"
import Link from "next/link"

export default function About() {
  // ✅ scroll-reveal logic so the cards become visible
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          element.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // run once on load

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24">
        {/* Hero Section (no image, just gradient + icons) */}
        <section className="mb-10 md:mb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-4">
              <Globe2 className="h-4 w-4" />
              Kandyan Dance · London, UK
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              About Our Kandyan Dance Academy in London
            </h1>
            <p className="text-sm md:text-base text-neutral-700 max-w-3xl">
              We bring the spirit of Sri Lanka's classical Kandyan dance to the heart of London — creating a home for
              heritage, artistry, and community.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          {/* Heritage + Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                Our Heritage & Story in London
              </h2>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                Kandyan dance is one of Sri Lanka’s most iconic classical dance forms, originating from the central
                highlands and royal courts of Kandy. Built on rhythm, strength, spirituality, and storytelling, it is a
                powerful symbol of Sri Lankan identity.
              </p>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                Our academy was founded to bring this sacred tradition to London — giving Sri Lankan families,
                international students, and London artists a place to experience authentic Kandyan training, right here
                in Europe.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#7B1129]/20 via-transparent to-black/20 blur-2xl opacity-70" />
              <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-2xl bg-white">
                <img
                  src="/21.jpg"
                  alt="Kandyan dance performance"
                  className="w-full h-72 md:h-80 object-cover"
                />
                <div className="flex items-center justify-between px-5 py-4 bg-white/95 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <MapPin className="h-4 w-4 text-[#7B1129]" />
                    <span>London</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#f5b400]">
                    <Star className="h-4 w-4 fill-[#f5b400] text-[#f5b400]" />
                    <span className="font-semibold text-neutral-700">Rated 5.0 by students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative mb-16">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7B1129]/25 via-transparent to-[#7B1129]/25 opacity-60 blur-2xl pointer-events-none" />
            <div className="relative bg-white/95 border border-neutral-200 rounded-3xl px-6 py-10 md:px-10 md:py-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-3">
                    Our Mission
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                    Preserving Tradition, Inspiring the Next Generation
                  </h2>
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    We are dedicated to preserving the authentic form of Kandyan dance while making it accessible to
                    students living in London. Through structured classes, workshops, and performances, we help dancers
                    develop strong technique, cultural understanding, and stage presence.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-64">
                  {[
                    { number: "500+", label: "Students Trained" },
                    { number: "15+", label: "Years of Teaching" },
                    { number: "2", label: "London Areas" },
                    { number: "100%", label: "Heritage Focused" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#7B1129]/70 hover:shadow-xl"
                    >
                      <div className="text-lg md:text-xl font-bold text-[#7B1129]">{stat.number}</div>
                      <p className="text-[11px] text-neutral-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What Makes Us Unique */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-900">
              What Makes Us{" "}
              <span className="bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">Unique</span> in
              London
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Sri Lankan Master Instructors",
                  desc: "Learn from teachers with deep roots in Sri Lankan classical dance and international stage experience.",
                },
                {
                  title: "Culture & Community",
                  desc: "A welcoming home for Sri Lankan families and London's diverse community passionate about traditional art.",
                },
                {
                  title: "Performances Across London",
                  desc: "Opportunities to perform at cultural festivals, events, and theatres across London.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="scroll-reveal group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 px-6 py-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#7B1129]/80"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="pointer-events-none absolute inset-x-0 -top-8 h-20 bg-gradient-to-b from-[#7B1129]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7B1129]">
                    <Sparkles className="h-4 w-4" />
                    Highlight
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Community */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-8">
            {/* Timeline */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-900">
                Our Journey in{" "}
                <span className="bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">London</span>
              </h2>
              <div className="relative border-l border-neutral-200 pl-6 space-y-6">
                {[
                  {
                    year: "2010",
                    title: "First Classes in London",
                    desc: "We began with small weekend classes for Sri Lankan children and families.",
                  },
                  {
                    year: "2015",
                    title: "Stage Performances",
                    desc: "Our students performed at cultural festivals and embassy events across London.",
                  },
                  {
                    year: "2020",
                    title: "Online & Hybrid Programs",
                    desc: "We introduced online classes connecting students from different London areas.",
                  },
                  {
                    year: "Today",
                    title: "Growing Cultural Hub",
                    desc: "We now welcome dancers from many backgrounds who share a love for Kandyan dance.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-[#7B1129]/60 bg-white" />
                    <div className="rounded-2xl bg-white/90 border border-neutral-200 px-4 py-3 shadow-sm hover:border-[#7B1129]/70 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7B1129] mb-1">
                        <CalendarDays className="h-3 w-3" />
                        {step.year}
                      </div>
                      <h3 className="text-sm font-semibold text-neutral-900 mb-1">{step.title}</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community / London-focus Card */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#7B1129]/15 via-transparent to-black/20 blur-2xl" />
              <div className="relative rounded-3xl bg-white/95 border border-neutral-200 shadow-xl px-6 py-8 md:px-8 md:py-9">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7B1129]/10">
                    <Users className="h-5 w-5 text-[#7B1129]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900">A Home for Kandyan Dance in London</h2>
                    <p className="text-xs text-neutral-600">
                      For Sri Lankans abroad, London artists, and curious beginners.
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-4">
                  Whether you were born in Sri Lanka, grew up in London, or are discovering Kandyan dance for the first
                  time, our studio is a space where you can connect, learn, and belong.
                </p>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-4">
                  Classes are held in easily accessible locations in London, with options for weekend, evening, and
                  online sessions to suit your lifestyle in London.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {["London", "Online"].map((city) => (
                    <span
                      key={city}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-medium text-neutral-700"
                    >
                      {city} Classes
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-neutral-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-900">
            Get in <span className="bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Details Card */}
            <div className="rounded-3xl bg-gradient-to-br from-white to-[#fdf5f7] border border-neutral-200 p-8 shadow-lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Ceylon Dancers</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#7B1129] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Address</p>
                    <p className="text-sm text-neutral-700">London, London, United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-[#7B1129] mt-1 flex-shrink-0 flex items-center justify-center">📞</div>
                  <div>
                    <p className="font-semibold text-neutral-900">Phone</p>
                    <p className="text-sm text-neutral-700">+44 7498 905311</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-[#7B1129] mt-1 flex-shrink-0 flex items-center justify-center">✉️</div>
                  <div>
                    <p className="font-semibold text-neutral-900">Email</p>
                    <p className="text-sm text-neutral-700">itsmesithumini@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#7B1129]/10 to-white border border-neutral-200 p-8 shadow-lg">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Visit Us</h3>
              <p className="text-neutral-700 mb-6">
                Experience authentic Kandyan dance training with our dedicated instructors in London. Whether you're a
                beginner or advanced dancer, we have classes to suit your level.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-[#7B1129] text-white rounded-lg font-semibold hover:bg-[#5a0820] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
