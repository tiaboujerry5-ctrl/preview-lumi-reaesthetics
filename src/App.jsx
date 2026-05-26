
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "./lib/utils"
import { ArrowRight, Phone, Mail, MapPin, ChevronDown, Menu, X, Star, Check } from "lucide-react"

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const buttonVariants = {
  primary: "inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a96e] text-white font-semibold px-7 py-3 hover:bg-[#b8883e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-2 disabled:opacity-50 min-h-[44px]",
  ghost: "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#c9a96e] text-[#c9a96e] font-semibold px-7 py-3 hover:bg-[#c9a96e] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] min-h-[44px]",
}

function PrimaryButton({ children, className, href, onClick, type = "button" }) {
  const Tag = href ? "a" : "button"
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
      <Tag href={href} onClick={onClick} type={type} className={cn(buttonVariants.primary, className)} target={href && href.startsWith("http") ? "_blank" : undefined} rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </Tag>
    </motion.div>
  )
}

function GhostButton({ children, className, href, onClick }) {
  const Tag = href ? "a" : "button"
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-block">
      <Tag href={href} onClick={onClick} className={cn(buttonVariants.ghost, className)} target={href && href.startsWith("http") ? "_blank" : undefined} rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </Tag>
    </motion.div>
  )
}

const navLinks = [
  {
    label: "Treatments",
    groups: [
      {
        heading: "Injectables",
        links: [
          { label: "Anti-Wrinkle Injections", href: "#services" },
          { label: "Dermal Fillers", href: "#services" },
          { label: "Lip Enhancement", href: "#services" },
          { label: "Cheek Contouring", href: "#services" },
          { label: "PRP Hair Restoration", href: "#services" },
          { label: "Sculptra Collagen Boost", href: "#services" },
          { label: "Injections for Migraines", href: "#services" },
          { label: "Injections for Sweating", href: "#services" },
        ],
      },
      {
        heading: "Laser",
        links: [{ label: "Laser Hair Removal", href: "#services" }],
      },
      {
        heading: "Aesthetics",
        links: [
          { label: "Chemical Peels", href: "#services" },
          { label: "Microneedling", href: "#services" },
          { label: "Medical Facials", href: "#services" },
          { label: "Lash Lift & Tint", href: "#services" },
          { label: "Vampire Facial (PRP)", href: "#services" },
          { label: "Dermaplaning", href: "#services" },
          { label: "Hydradermabrasion", href: "#services" },
          { label: "Microdermabrasion", href: "#services" },
          { label: "Oxygen Super Facial", href: "#services" },
        ],
      },
      {
        heading: "Body",
        links: [
          { label: "CoolSculpting", href: "#services" },
          { label: "MiraDry", href: "#services" },
          { label: "Underarm Sweat Treatment", href: "#services" },
          { label: "Hyperhidrosis", href: "#services" },
        ],
      },
    ],
  },
  {
    label: "Products",
    groups: [
      {
        heading: "Skincare",
        links: [
          { label: "AlumierMD Skincare", href: "#contact" },
          { label: "Lash Lengthening Serums", href: "#contact" },
          { label: "EyEnvy", href: "#contact" },
          { label: "Latisse", href: "#contact" },
          { label: "Colorscience SPF", href: "#contact" },
        ],
      },
    ],
  },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <div className="fixed top-0 z-[60] w-full bg-[#c9a96e] text-white text-sm py-2 px-4 flex items-center justify-between">
        <span className="font-medium">Monthly Specials — New deals every month</span>
        <a href="tel:+17807500852" className="flex items-center gap-1 font-semibold hover:underline min-h-[44px] items-center">
          <Phone className="h-3.5 w-3.5" /> 780.512.0934
        </a>
      </div>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-9 z-50 w-full transition-all duration-300",
          scrolled ? "border-b border-[#c9a96e]/30 bg-white/90 backdrop-blur-xl shadow-sm" : "bg-white"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#" className="flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#c9a96e" />
              <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">LA</text>
            </svg>
            <div>
              <div className="font-bold text-lg leading-none text-[#2c2c2c]" style={{ fontFamily: "Georgia, serif" }}>Lumière</div>
              <div className="text-xs tracking-widest text-[#c9a96e] uppercase">Aesthetics</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((nav) => (
              <div key={nav.label} className="relative" onMouseEnter={() => setOpenDropdown(nav.label)} onMouseLeave={() => setOpenDropdown(null)}>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#2c2c2c] hover:text-[#c9a96e] rounded-full transition-colors min-h-[44px]">
                  {nav.label} <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", openDropdown === nav.label && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openDropdown === nav.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-1 bg-white border border-[#e8ddd0] rounded-2xl shadow-xl p-5 z-50 flex gap-8 min-w-[520px]"
                    >
                      {nav.groups.map((g) => (
                        <div key={g.heading} className="min-w-[140px]">
                          <div className="text-xs font-bold uppercase tracking-widest text-[#b8883e] mb-2">{g.heading}</div>
                          {g.links.map((l) => (
                            <a key={l.label} href={l.href} className="block text-sm text-[#2c2c2c] hover:text-[#c9a96e] py-1 transition-colors">{l.label}</a>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a href="#services" className="px-4 py-2 text-sm font-medium text-[#2c2c2c] hover:text-[#c9a96e] rounded-full transition-colors min-h-[44px] flex items-center">CoolSculpting</a>
            <a href="#services" className="px-4 py-2 text-sm font-medium text-[#2c2c2c] hover:text-[#c9a96e] rounded-full transition-colors min-h-[44px] flex items-center">Underarm Sweat</a>
            <a href="#specials" className="px-4 py-2 text-sm font-semibold text-[#b8883e] hover:text-[#c9a96e] rounded-full transition-colors min-h-[44px] flex items-center">Monthly Promos</a>
          </div>

          <div className="hidden lg:block">
            <PrimaryButton href="https://face.janeapp.com/">Book Now</PrimaryButton>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-full text-[#2c2c2c] hover:bg-[#f5f0eb] min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              key="menu"
              className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="absolute top-6 right-6 p-2 rounded-full bg-[#f5f0eb] min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5 text-[#2c2c2c]" />
              </motion.button>
              {["Home", "Services", "Specials", "About", "Gallery", "Contact"].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-3xl font-bold text-[#2c2c2c] hover:text-[#c9a96e] transition-colors"
                  style={{ fontFamily: "Georgia, serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <PrimaryButton href="https://face.janeapp.com/">Book Your Appointment</PrimaryButton>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    headline: "Reveal Your Most Radiant Self in Fort McMurray",
    sub: "A premier boutique medical aesthetics studio — where science, artistry, and expertise converge",
    cta: "Book Your Appointment",
  },
  {
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80",
    headline: "Complimentary Skin Consultations — In Person or Virtual",
    sub: "Receive expert, personalized advice from the comfort of your own home",
    cta: "Book Now",
  },
  {
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80",
    headline: "A Decade of Advanced Injectable Mastery",
    sub: "Led by Nurse Practitioner Serena Vance MN NP — precision, care, and natural results",
    cta: "Book Now",
  },
  {
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80",
    headline: "Freeze Stubborn Fat Without Going Under the Knife",
    sub: "CoolSculpting — clinically proven non-invasive body contouring that delivers lasting results",
    cta: "Book Now",
  },
  {
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80",
    headline: "Permanently Eliminate Underarm Sweat and Odour",
    sub: "MiraDry technology delivers transformative results — often in just one visit",
    cta: "Book Now",
  },
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -120])

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = heroSlides[current]

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          style={{ y }}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c2c2c]/75 via-[#2c2c2c]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 pt-32 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "content"}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#c9a96e]"
            >
              Lumière Aesthetics — Fort McMurray
            </motion.p>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "Georgia, serif" }}>
              {slide.headline}
            </h1>
            <p className="mb-8 text-lg text-white/85 leading-relaxed">{slide.sub}</p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="https://face.janeapp.com/">{slide.cta} <ArrowRight className="h-4 w-4" /></PrimaryButton>
              <GhostButton href="#contact" className="border-white text-white hover:bg-white hover:text-[#2c2c2c]">Free Consultation</GhostButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={cn("rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center", i === current ? "w-8 h-2.5 bg-[#c9a96e]" : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-white/20 p-3 text-white hover:bg-white/40 min-w-[44px] min-h-[44px] backdrop-blur-sm"
        onClick={() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        <ChevronDown className="h-5 w-5 rotate-90" />
      </motion.button>
      <motion.button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-white/20 p-3 text-white hover:bg-white/40 min-w-[44px] min-h-[44px] backdrop-blur-sm"
        onClick={() => setCurrent((c) => (c + 1) % heroSlides.length)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        <ChevronDown className="h-5 w-5 -rotate-90" />
      </motion.button>
    </section>
  )
}

const trustItems = [
  { icon: "✦", label: "Led by Serena Vance MN NP" },
  { icon: "✦", label: "10+ Years Injectable Experience" },
  { icon: "✦", label: "Free Skin Consultations" },
  { icon: "✦", label: "In-Person & Virtual Appointments" },
  { icon: "✦", label: "Boutique Medical Aesthetics Studio" },
]

function TrustBar() {
  return (
    <section className="bg-[#c9a96e] py-4 overflow-hidden">
      <div className="flex gap-10 items-center justify-center flex-wrap px-6 md:px-12">
        {trustItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 text-white font-medium text-sm whitespace-nowrap"
          >
            <Check className="h-4 w-4 flex-shrink-0" />
            {item.label}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const services = [
  {
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    category: "Injectables",
    title: "Anti-Wrinkle Injections",
    description: "Smooth expression lines and restore a well-rested, refreshed appearance with precision anti-wrinkle treatments.",
  },
  {
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
    category: "Injectables",
    title: "Dermal Fillers",
    description: "Replenish lost facial volume, soften deep creases, and sculpt beautiful contours that look entirely natural.",
  },
  {
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    category: "Injectables",
    title: "Lip Enhancement",
    description: "Achieve beautifully defined, fuller lips with hyaluronic acid fillers tailored to your unique facial proportions.",
  },
  {
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    category: "Body",
    title: "CoolSculpting",
    description: "Target and permanently reduce stubborn fat pockets with FDA-cleared fat-freezing technology — no surgery required.",
  },
  {
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    category: "Body",
    title: "MiraDry",
    description: "Permanently eliminate underarm sweat and odour with a single, comfortable in-clinic session.",
  },
  {
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    category: "Aesthetics",
    title: "Chemical Peels",
    description: "Resurface and renew your complexion with professionally formulated chemical exfoliation treatments.",
  },
  {
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80",
    category: "Aesthetics",
    title: "Microneedling",
    description: "Stimulate your skin's natural collagen production for visibly firmer, smoother, and more even-toned skin.",
  },
  {
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
    category: "Laser",
    title: "Laser Hair Removal",
    description: "Achieve silky-smooth, hair-free skin with long-lasting laser hair reduction customized to your skin tone.",
  },
  {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    category: "Aesthetics",
    title: "Medical Facials",
    description: "Clinical-grade facial treatments designed to deeply cleanse, hydrate, and visibly transform your skin.",
  },
]

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4" style={{ fontFamily: "Georgia, serif" }}>Our Treatments</h2>
            <p className="text-lg text-[#6b6b6b] max-w-xl mx-auto">Comprehensive aesthetic services tailored to your unique goals and anatomy.</p>
          </div>
        </FadeUp>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-[#e8ddd0] bg-[#faf7f3] overflow-hidden group cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/40 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-[#c9a96e] px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">
                  {s.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#2c2c2c] mb-2" style={{ fontFamily: "Georgia, serif" }}>{s.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{s.description}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-[#c9a96e] hover:text-[#b8883e] transition-colors">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const specials = [
  {
    title: "Monthly Featured Specials",
    description: "Each month we curate exclusive discounts on our most sought-after treatments. New deals rotate monthly — check back often.",
    cta: "View Deals",
    href: "#contact",
    accent: "#c9a96e",
  },
  {
    title: "Laser Package Bundles",
    description: "Save significantly when you pre-purchase multi-session laser hair removal packages for face, body, or both.",
    cta: "See Packages",
    href: "#contact",
    accent: "#b8883e",
  },
  {
    title: "Skin Renewal Collection",
    description: "Our expertly curated combination treatment packages offer a complete skin reset — from deep peels to collagen induction.",
    cta: "Learn More",
    href: "#contact",
    accent: "#c9a96e",
  },
  {
    title: "Teen Clear Skin Membership",
    description: "A dedicated ongoing acne care program for teens — consistent clinical treatment and skincare guidance to achieve lasting clarity.",
    cta: "Get Started",
    href: "#contact",
    accent: "#b8883e",
  },
]

function Specials() {
  return (
    <section id="specials" className="py-20 md:py-28 bg-[#f5f0eb]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-2">Exclusive Offers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4" style={{ fontFamily: "Georgia, serif" }}>Current Specials & Packages</h2>
            <p className="text-lg text-[#6b6b6b] max-w-xl mx-auto">Exceptional deals designed to help you look and feel your absolute best.</p>
          </div>
        </FadeUp>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {specials.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl bg-white border border-[#e8ddd0] p-8"
            >
              <div className="h-1 w-16 rounded-full mb-5" style={{ backgroundColor: s.accent }} />
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-3" style={{ fontFamily: "Georgia, serif" }}>{s.title}</h3>
              <p className="text-[#6b6b6b] leading-relaxed mb-6">{s.description}</p>
              <GhostButton href={s.href}>{s.cta} <ArrowRight className="h-4 w-4" /></GhostButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote: "I was nervous about my first injectable treatment, but the team at Lumière made me feel completely at ease. My results are so natural — my colleagues just say I look refreshed, not done. Absolutely love it.",
    name: "Melissa T.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    treatment: "Anti-Wrinkle Injections",
  },
  {
    quote: "I came in for lip enhancement and left with the most beautiful, natural-looking lips. Serena took the time to understand exactly what I wanted and delivered beyond my expectations. Worth every penny.",
    name: "Danielle R.",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    treatment: "Lip Enhancement",
  },
  {
    quote: "CoolSculpting worked wonders on my stubborn lower belly area. I could see results within weeks and the process was comfortable and professional. The whole clinic experience is top tier — truly boutique.",
    name: "Jordan K.",
    avatar: "https://i.pravatar.cc/150?img=21",
    rating: 5,
    treatment: "CoolSculpting",
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-2">Client Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4" style={{ fontFamily: "Georgia, serif" }}>What Our Clients Say</h2>
            <p className="text-lg text-[#6b6b6b]">Real results from real people who trusted us with their confidence.</p>
          </div>
        </FadeUp>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-[#f5f0eb] border border-[#e8ddd0] p-10 md:p-14 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#c9a96e] text-[#c9a96e]" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-[#2c2c2c] leading-relaxed mb-8 italic" style={{ fontFamily: "Georgia, serif" }}>
              "{testimonials[active].quote}"
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <img src={testimonials[active].avatar} alt={testimonials[active].name} className="h-14 w-14 rounded-full object-cover border-2 border-[#c9a96e]" />
              <div className="font-bold text-[#2c2c2c]">{testimonials[active].name}</div>
              <div className="text-sm text-[#c9a96e] font-medium">{testimonials[active].treatment}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn("rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center", i === active ? "w-8 h-2.5 bg-[#c9a96e]" : "w-2.5 h-2.5 bg-[#e8ddd0] hover:bg-[#c9a96e]/50")}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80", alt: "Clinic treatment room", tall: true },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80", alt: "Injectable treatment", tall: false },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80", alt: "Skincare consultation", tall: false },
  { src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80", alt: "CoolSculpting session", tall: true },
  { src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80", alt: "MiraDry treatment", tall: false },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", alt: "Medical facial", tall: false },
]

function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#f5f0eb]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-2">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4" style={{ fontFamily: "Georgia, serif" }}>Transformations That Speak</h2>
            <p className="text-lg text-[#6b6b6b] max-w-xl mx-auto">A glimpse into the artistry and precision behind every treatment at Lumière.</p>
          </div>
        </FadeUp>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn("rounded-2xl overflow-hidden group relative", img.tall ? "row-span-1" : "row-span-1")}
            >
              <div className={cn("overflow-hidden", img.tall ? "h-80" : "h-60")}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white font-semibold text-sm">{img.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
                  alt="Serena Vance, Nurse Practitioner"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#c9a96e] text-white rounded-2xl p-5 shadow-xl max-w-[180px]">
                <div className="text-3xl font-bold" style={{ fontFamily: "Georgia, serif" }}>10+</div>
                <div className="text-sm mt-1 leading-snug">Years of Injectable Expertise</div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-2">Meet Your Practitioner</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-5" style={{ fontFamily: "Georgia, serif" }}>Serena Vance, MN NP</h2>
              <p className="text-[#6b6b6b] leading-relaxed mb-5 text-base">
                Serena is a board-certified Nurse Practitioner with a Master of Nursing degree and more than a decade of specialized experience in cosmetic injectables and medical aesthetics. Her philosophy centers on enhancing your natural features — never replacing them.
              </p>
              <p className="text-[#6b6b6b] leading-relaxed mb-8 text-base">
                Combining a deep understanding of facial anatomy with a genuine artist's eye, Serena creates results that are subtle, balanced, and uniquely yours. Every treatment begins with a thorough consultation to understand your goals and your face.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Master of Nursing (MN)", "Nurse Practitioner (NP)", "Advanced Injectable Certification", "CoolSculpting Certified"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#c9a96e] mt-1 flex-shrink-0" />
                    <span className="text-sm text-[#2c2c2c] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <PrimaryButton href="https://face.janeapp.com/">Book With Serena <ArrowRight className="h-4 w-4" /></PrimaryButton>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=1200&q=80"
          alt="CTA background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2c2c2c]/75" />
      </motion.div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 text-center">
        <FadeUp>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-3">Take the First Step</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
            Your Best Skin Is One Appointment Away
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Book a complimentary consultation — in person at our Fort McMurray studio or virtually from the comfort of home.
          </p>
          <PrimaryButton href="https://face.janeapp.com/" className="text-base px-10 py-4">
            Book Your Appointment <ArrowRight className="h-5 w-5" />
          </PrimaryButton>
        </FadeUp>
      </div>
    </section>
  )
}

const treatmentOptions = [
  "Anti-Wrinkle Injections",
  "Dermal Fillers",
  "Lip Enhancement",
  "Cheek Contouring",
  "CoolSculpting",
  "MiraDry",
  "Laser Hair Removal",
  "Chemical Peels",
  "Microneedling",
  "Medical Facials",
  "PRP Hair Restoration",
  "Sculptra",
  "Lash Lift and Tint",
  "Vampire Facial",
  "Dermaplaning",
  "Hydradermabrasion",
  "Other",
]

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "", message: "" })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Full name is required."
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email is required."
    if (!form.phone.trim()) e.phone = "Phone number is required."
    if (!form.treatment) e.treatment = "Please select a treatment."
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setToast({ message: "Your message was sent! We will be in touch shortly.", type: "success" })
    setForm({ name: "", email: "", phone: "", treatment: "", message: "" })
  }

  const inputClass = (field) => cn(
    "w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-[#2c2c2c] ring-offset-background placeholder:text-[#aaa]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-1",
    errors[field] ? "border-red-400 focus-visible:ring-red-400" : "border-[#e8ddd0]"
  )

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#f5f0eb]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a96e] mb-2">Connect With Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-4" style={{ fontFamily: "Georgia, serif" }}>Get in Touch</h2>
            <p className="text-lg text-[#6b6b6b] max-w-xl mx-auto">Reach out and our team will respond within one business day.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeUp>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#2c2c2c] mb-4" style={{ fontFamily: "Georgia, serif" }}>Lumière Aesthetics Studio</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[#2c2c2c]">Suite 8 — 210 Parsons Creek Drive</div>
                      <div className="text-[#6b6b6b] text-sm">Fort McMurray, Alberta T9K 0X3</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#c9a96e] flex-shrink-0" />
                    <a href="tel:+17805120934" className="font-medium text-[#2c2c2c] hover:text-[#c9a96e] transition-colors">
                      Call: 780.512.0934
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#c9a96e] flex-shrink-0" />
                    <a href="sms:+17805120934" className="font-medium text-[#2c2c2c] hover:text-[#c9a96e] transition-colors">
                      Text: 780.512.0934
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#c9a96e] flex-shrink-0" />
                    <a href="mailto:hello@lumiereymm.ca" className="font-medium text-[#2c2c2c] hover:text-[#c9a96e] transition-colors">
                      hello@lumiereymm.ca
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white border border-[#e8ddd0] p-6">
                <h4 className="font-bold text-[#2c2c2c] mb-3">Clinic Hours</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Wednesday", hours: "9:00 AM – 6:00 PM" },
                    { day: "Thursday – Friday", hours: "9:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-[#6b6b6b]">{h.day}</span>
                      <span className="font-medium text-[#2c2c2c]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <motion.a
                  href="https://facebook.com/lumiereymm"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-xl bg-white border border-[#e8ddd0] px-5 py-3 text-sm font-semibold text-[#2c2c2c] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors min-h-[44px]"
                >
                  Facebook
                </motion.a>
                <motion.a
                  href="https://instagram.com/lumiere.aesthetics.ymm"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-xl bg-white border border-[#e8ddd0] px-5 py-3 text-sm font-semibold text-[#2c2c2c] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors min-h-[44px]"
                >
                  Instagram
                </motion.a>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-3xl bg-white border border-[#e8ddd0] p-8 space-y-5 shadow-sm">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#2c2c2c]">Full Name</label>
                <input
                  className={inputClass("name")}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p className="text-xs text-red-500" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#2c2c2c]">Email Address</label>
                <input
                  type="email"
                  className={inputClass("email")}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p className="text-xs text-red-500" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#2c2c2c]">Phone Number</label>
                <input
                  type="tel"
                  className={inputClass("phone")}
                  placeholder="780-XXX-XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p className="text-xs text-red-500" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#2c2c2c]">Treatment of Interest</label>
                <select
                  className={inputClass("treatment")}
                  value={form.treatment}
                  onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                >
                  <option value="">Select a treatment...</option>
                  {treatmentOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.treatment && (
                    <motion.p className="text-xs text-red-500" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {errors.treatment}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#2c2c2c]">Message (Optional)</label>
                <textarea
                  rows={4}
                  className={cn(inputClass("message"), "resize-none")}
                  placeholder="Tell us about your goals or any questions you have..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <PrimaryButton type="submit" className="w-full justify-center text-base py-3.5">
                Send Message <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </form>
          </FadeUp>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#2c2c2c] text-white px-5 py-4 shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <Check className="h-4 w-4 text-[#c9a96e]" />
            <span className="text-sm font-semibold">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-1 opacity-70 hover:opacity-100 min-w-[24px] min-h-[24px]">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#c9a96e" />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">LA</text>
              </svg>
              <div>
                <div className="font-bold text-base leading-none" style={{ fontFamily: "Georgia, serif" }}>Lumière Aesthetics</div>
                <div className="text-xs text-[#c9a96e] tracking-widest uppercase mt-0.5">Fort McMurray</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              A premier boutique medical aesthetics studio dedicated to natural, science-backed results and exceptional client care.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/lumiereymm" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors min-h-[44px] flex items-center">FB</a>
              <a href="https://instagram.com/lumiere.aesthetics.ymm" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors min-h-[44px] flex items-center">IG</a>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c9a96e] mb-4">Injectables</div>
            <div className="space-y-2">
              {["Anti-Wrinkle Injections", "Dermal Fillers", "Lip Enhancement", "Cheek Contouring", "PRP Hair Restoration", "Sculptra", "Migraine Injections"].map((t) => (
                <a key={t} href="#services" className="block text-sm text-white/60 hover:text-[#c9a96e] transition-colors">{t}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c9a96e] mb-4">Aesthetics & Body</div>
            <div className="space-y-2">
              {["Chemical Peels", "Microneedling", "Medical Facials", "Laser Hair Removal", "CoolSculpting", "MiraDry", "Hydradermabrasion"].map((t) => (
                <a key={t} href="#services" className="block text-sm text-white/60 hover:text-[#c9a96e] transition-colors">{t}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c9a96e] mb-4">Contact</div>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                <span>Suite 8, 210 Parsons Creek Drive, Fort McMurray, AB T9K 0X3</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#c9a96e] flex-shrink-0" />
                <a href="tel:+17805120934" className="hover:text-[#c9a96e] transition-colors">780.512.0934</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#c9a96e] flex-shrink-0" />
                <a href="mailto:hello@lumiereymm.ca" className="hover:text-[#c9a96e] transition-colors">hello@lumiereymm.ca</a>
              </div>
              <div className="pt-2">
                <PrimaryButton href="https://face.janeapp.com/" className="text-sm px-5 py-2.5">Book Now</PrimaryButton>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Lumière Aesthetics. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Results may vary. All treatments performed by licensed practitioners.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-white text-[#2c2c2c]" style={{ fontFamily: "'Georgia', serif" }}>
      <Navbar />
      <main className="pt-[92px]">
        <Hero />
        <TrustBar />
        <Services />
        <Specials />
        <Testimonials />
        <About />
        <Gallery />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
