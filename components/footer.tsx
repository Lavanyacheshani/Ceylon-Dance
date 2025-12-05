"use client"

import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-[#7B1129] via-[#5A0E1E] to-black text-white pt-20 pb-10 overflow-hidden">
      {/* Soft glowing background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] left-0 w-80 h-80 bg-black/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-wide">Kandyan Dance Academy</h3>
            <p className="text-white/80 leading-relaxed text-sm">
              Preserving Sri Lanka’s rich cultural heritage through master-level Kandyan dance training,
              professional programs, and passionate community engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", link: "/about" },
                { name: "Classes", link: "/classes" },
                { name: "Register", link: "/register" },
                { name: "Gallery", link: "/gallery" },
                { name: "Contact Us", link: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    className="relative inline-block transition-all duration-300 text-white/80 hover:text-white"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-white transition-all duration-300 group-hover:w-full hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-white/70" /> info@kandyandance.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-white/70" /> +94 123 456 789
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-white/70" /> Colombo, Sri Lanka
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/10"
                >
                  <Icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/60">
            © {currentYear} Kandyan Dance Academy — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
