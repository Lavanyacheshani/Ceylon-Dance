"use client"

import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Clock, MapPin, Users, Sparkles, Star } from "lucide-react"

const CLASSES = [
  {
    id: "beginner",
    name: "Beginner Level",
    description: "Perfect for newcomers. Learn basic movements, rhythms, and fundamental techniques in a supportive space.",
    level: "Beginner",
    duration: "8 weeks",
    price: 20,
    schedule: "Mon & Wed · 18:30",
    maxStudents: 20,
    city: "Paris",
    spotsLeft: 8,
  },
  {
    id: "intermediate",
    name: "Intermediate Level",
    description: "Build on your basics. Master more complex movements, turns, and traditional choreography.",
    level: "Intermediate",
    duration: "10 weeks",
    price: 25,
    schedule: "Tue & Thu · 19:00",
    maxStudents: 15,
    city: "Lyon",
    spotsLeft: 4,
  },
  {
    id: "advanced",
    name: "Advanced Level",
    description: "Refine intricate techniques, stamina, and stage performance for serious dancers.",
    level: "Advanced",
    duration: "12 weeks",
    price: 30,
    schedule: "Sat & Sun · 10:00",
    maxStudents: 12,
    city: "Paris",
    spotsLeft: 3,
  },
  {
    id: "professional",
    name: "Professional Training",
    description: "Intensive daily training for aspiring professional performers and future instructors.",
    level: "Professional",
    duration: "16 weeks",
    price: 35,
    schedule: "Daily · 14:00 – 17:00",
    maxStudents: 8,
    city: "Marseille",
    spotsLeft: 2,
  },
]

const LEVEL_FILTERS = ["All", "Beginner", "Intermediate", "Advanced", "Professional"] as const
type LevelFilter = (typeof LEVEL_FILTERS)[number]

export default function Classes() {
  const [activeFilter, setActiveFilter] = useState<LevelFilter>("All")
  const [cityFilter, setCityFilter] = useState<string>("All")

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(CLASSES.map((c) => c.city)))],
    []
  )

  const filteredClasses = useMemo(
    () =>
      CLASSES.filter((c) => {
        const levelMatch = activeFilter === "All" || c.level === activeFilter
        const cityMatch = cityFilter === "All" || c.city === cityFilter
        return levelMatch && cityMatch
      }),
    [activeFilter, cityFilter]
  )

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-4">
              <Sparkles className="h-4 w-4" />
              Kandyan Classes · France
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              Choose Your Kandyan Dance Journey
            </h1>
            <p className="text-base md:text-lg text-neutral-700 max-w-2xl">
              From first steps to professional stages, our structured programs guide you through the authentic art of
              Kandyan dance, right here in France.
            </p>
          </section>

          {/* Filters */}
          <section className="mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Filter Classes
              </p>
              <div className="flex flex-wrap gap-2">
                {LEVEL_FILTERS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveFilter(level)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200
                      ${activeFilter === level
                        ? "bg-[#7B1129] text-white border-[#7B1129] shadow-md shadow-[#7B1129]/40"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-[#7B1129]/50 hover:text-[#7B1129]"
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-2">
                City
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setCityFilter(city)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200
                    ${cityFilter === city
                        ? "bg-black text-white border-black shadow-md shadow-black/30"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-black/60 hover:text-black"
                      }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Small info bar */}
          <section className="mb-10">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Star className="h-4 w-4 text-[#f5b400]" />
                <span>Small groups · Focused attention</span>
              </div>
              <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Clock className="h-4 w-4 text-[#7B1129]" />
                <span>Evening & weekend-friendly schedules</span>
              </div>
              <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Users className="h-4 w-4 text-black" />
                <span>Beginner-friendly & performance tracks</span>
              </div>
            </div>
          </section>

          {/* Classes Grid */}
          <section>
            {filteredClasses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/80 px-6 py-10 text-center text-sm text-neutral-600">
                No classes match your current filters. Try selecting a different level or city.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredClasses.map((course, idx) => (
                  <article
                    key={course.id}
                    className="group relative rounded-3xl border border-neutral-200 bg-white/90 shadow-sm overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#7B1129]/70"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    {/* Glow border */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#7B1129]/20 via-transparent to-black/25" />

                    {/* Header strip */}
                    <div className="relative px-6 pt-5 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-neutral-900">
                          {course.name}
                        </h2>
                        <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B1129]">
                          {course.level} · {course.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-neutral-500">Spots left</p>
                        <p className="text-sm font-bold text-[#7B1129]">
                          {course.spotsLeft} / {course.maxStudents}
                        </p>
                      </div>
                    </div>

                    {/* Image / Accent bar */}
                    <div className="relative mt-4 mx-6 h-32 overflow-hidden rounded-2xl bg-gradient-to-r from-black via-[#7B1129] to-black">
                      <div className="absolute inset-0 opacity-60">
                        <img
                          src={`/kandyan-class-${course.id}.jpg`}
                          alt={course.name}
                          className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                      <div className="relative z-10 h-full w-full flex items-center justify-between px-4 text-xs text-white">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.schedule}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {course.city}, France
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                            Duration
                          </p>
                          <p className="text-xs font-semibold">{course.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="relative px-6 pb-6 pt-5">
                      <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="mb-4 grid grid-cols-2 gap-3 text-xs text-neutral-600">
                        <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-2">
                          <p className="font-semibold text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                            Duration
                          </p>
                          <p className="text-sm text-neutral-900">{course.duration}</p>
                        </div>
                        <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-2">
                          <p className="font-semibold text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                            Group Size
                          </p>
                          <p className="text-sm text-neutral-900">
                            Max {course.maxStudents} students
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            Tuition (Full Program)
                          </p>
                          <p className="text-xl font-bold bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
                            € {course.price.toLocaleString("fr-FR")}
                          </p>
                        </div>
                        <div className="text-right text-[11px] text-neutral-500">
                          <p>Billed once per term</p>
                          <p className="text-neutral-400">Payment plans available</p>
                        </div>
                      </div>

                      <Link
                        href={`/register?course=${course.id}`}
                        className="relative mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#7B1129] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#7B1129]/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#911634]"
                      >
                        Enroll in {course.level} Class
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
