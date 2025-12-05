"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Sparkles, MapPin, X, Camera } from "lucide-react"

type Category = "All" | "Performances" | "Classes" | "Costumes" | "Events"

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Main Performance Night",
    category: "Performances" as Category,
    location: "Paris, France",
    src: "/29.jpg",
  },
  {
    id: 2,
    title: "Group Class Session",
    category: "Classes" as Category,
    location: "Lyon, France",
    src: "/40.jpeg",
  },
  {
    id: 3,
    title: "Traditional Kandyan Costume",
    category: "Costumes" as Category,
    location: "Studio, Paris",
    src: "/12.jpg",
  },
  {
    id: 4,
    title: "Graceful Solo Movement",
    category: "Performances" as Category,
    location: "Marseille, France",
    src: "/13.jpg",
  },
  {
    id: 5,
    title: "Cultural Event Performance",
    category: "Events" as Category,
    location: "Cultural Festival, Paris",
    src: "/18.jpg",
  },
  {
    id: 6,
    title: "Traditional Session",
    category: "Events" as Category,
    location: "Community Center, Lyon",
    src: "/19.jpg",
  },
]

const CATEGORIES: Category[] = ["All", "Performances", "Classes", "Costumes", "Events"]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [activeItem, setActiveItem] = useState<(typeof GALLERY_ITEMS)[number] | null>(null)

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-b from-white via-[#fdf5f7] to-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7B1129]/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7B1129] mb-4">
              <Sparkles className="h-4 w-4" />
              Ceylon Dance Company · Gallery
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7B1129] to-black bg-clip-text text-transparent">
              Moments from France
            </h1>
            <p className="text-sm md:text-base text-neutral-700 max-w-2xl">
              Explore performances, classes, costumes, and cultural events that bring the spirit of Sri Lankan Kandyan
              dance to France.
            </p>
          </section>

          {/* Filters */}
          <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Filter by category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200
                      ${activeCategory === cat
                        ? "bg-[#7B1129] text-white border-[#7B1129] shadow-md shadow-[#7B1129]/40"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-[#7B1129]/50 hover:text-[#7B1129]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-neutral-500">
              Showing{" "}
              <span className="font-semibold text-[#7B1129]">
                {filteredItems.length}
              </span>{" "}
              {filteredItems.length === 1 ? "moment" : "moments"}
            </div>
          </section>

          {/* Small info bar */}
          <section className="mb-10">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Camera className="h-4 w-4 text-[#7B1129]" />
                <span>Captured from real performances and classes in France</span>
              </div>
              <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <MapPin className="h-4 w-4 text-black" />
                <span>Paris · Lyon · Marseille · More</span>
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section>
            {filteredItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/80 px-6 py-10 text-center text-sm text-neutral-600">
                No images in this category yet. Please choose another filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#7B1129]/70"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:from-black/80 group-hover:via-black/40" />
                    </div>

                    {/* Text overlay */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                      <div className="flex justify-between">
                        <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div className="text-left">
                          <h3 className="text-base md:text-lg font-semibold text-white drop-shadow-md">
                            {item.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-white/80">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <div className="pointer-events-none rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#7B1129] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                          View
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <button
            type="button"
            className="absolute top-4 right-4 md:top-8 md:right-8 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            onClick={() => setActiveItem(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-w-5xl w-full mx-4 bg-black/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-72 sm:h-96 md:h-[420px] bg-black">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 mb-2">
                    <Camera className="h-3.5 w-3.5" />
                    {activeItem.category}
                  </p>
                  <h2 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">
                    {activeItem.title}
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{activeItem.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between text-[11px] md:text-xs text-white/80">
              <span>
                Ceylon Dance Company · UK · Preserving Sri Lankan heritage on European stages.
              </span>
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#7B1129] hover:bg-white transition-colors"
                onClick={() => setActiveItem(null)}
              >
                Close
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
