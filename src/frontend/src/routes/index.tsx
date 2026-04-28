import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Camera,
  CheckCircle,
  ChevronRight,
  Globe,
  GraduationCap,
  Phone,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Years Experience", value: 10, suffix: "+", icon: Award },
  { label: "Students Guided", value: 5000, suffix: "+", icon: Users },
  { label: "Partner Colleges", value: 200, suffix: "+", icon: BookOpen },
  { label: "Success Rate", value: 95, suffix: "%", icon: TrendingUp },
];

const TAGLINES = [
  "Career Counseling",
  "Study in India & Abroad",
  "Coaching for Entrance Exams",
  "Diploma Training & Placement",
];

const NAV_CARDS = [
  {
    icon: "🎯",
    title: "Career Counseling",
    desc: "Personalized roadmaps crafted by expert counselors for your unique strengths.",
    href: "/services/career-counseling",
    color: "from-[#8DC63F]/20 to-[#8DC63F]/5",
    border: "group-hover:border-[#8DC63F]/40",
  },
  {
    icon: "📚",
    title: "Subject & Stream Selection",
    desc: "Choose the right stream after 10th & 12th with confidence and clarity.",
    href: "/services/stream-selection",
    color: "from-[#1A5200]/20 to-[#1A5200]/5",
    border: "group-hover:border-[#1A5200]/40",
  },
  {
    icon: "📝",
    title: "Entrance Exam Preparation",
    desc: "Structured coaching for JEE, NEET, CLAT, CAT and all major exams.",
    href: "/services/entrance-exam",
    color: "from-[#8DC63F]/15 to-[#8DC63F]/5",
    border: "group-hover:border-[#8DC63F]/50",
  },
  {
    icon: "✈️",
    title: "Study Abroad & India Admissions",
    desc: "Complete guidance: universities, SOP, visa, scholarships worldwide.",
    href: "/services/study-abroad",
    color: "from-[#1A5200]/15 to-[#8DC63F]/10",
    border: "group-hover:border-primary/40",
  },
  {
    icon: "🏆",
    title: "Aviation / Hospitality / Nursing",
    desc: "Diploma programs with 100% placement support in top institutions.",
    href: "/services/diploma-placement",
    color: "from-[#8DC63F]/20 to-[#1A5200]/10",
    border: "group-hover:border-[#8DC63F]/40",
  },
  {
    icon: "💼",
    title: "100% Placement Support",
    desc: "Industry connections ensuring every student lands their dream role.",
    href: "/services/diploma-placement",
    color: "from-[#1A5200]/20 to-[#8DC63F]/10",
    border: "group-hover:border-[#1A5200]/50",
  },
];

const WHY_CHOOSE = [
  {
    icon: Award,
    title: "Certified Counselors",
    desc: "All our counselors are certified with proven track records of student success.",
  },
  {
    icon: TrendingUp,
    title: "10+ Years Experience",
    desc: "Over a decade of guiding thousands of students toward their dream careers.",
  },
  {
    icon: Globe,
    title: "200+ Partner Colleges",
    desc: "Strong network of premier colleges across India and 20+ countries abroad.",
  },
  {
    icon: Phone,
    title: "Online & Offline Support",
    desc: "Flexible modes: in-person sessions, video calls, or chat — your choice.",
  },
  {
    icon: Zap,
    title: "Career Fairs & Workshops",
    desc: "Regular events connecting students with recruiters and top institutions.",
  },
  {
    icon: CheckCircle,
    title: "Full Transparency in Process",
    desc: "No hidden fees, no surprises — every step is clearly communicated.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    course: "B.Tech Computer Science",
    college: "IIT Delhi",
    message:
      "ICC helped me crack JEE with a 99 percentile. The personalized counseling sessions were truly life-changing. I knew exactly which path to take!",
    rating: 5,
    avatar: "PS",
    color: "from-[#8DC63F] to-[#5fa020]",
  },
  {
    name: "Rohan Gupta",
    course: "MBBS",
    college: "AIIMS Bangalore",
    message:
      "The stream selection guidance from ICC was spot-on. Now I'm living my dream of becoming a doctor. The counselors genuinely care about your future.",
    rating: 5,
    avatar: "RG",
    color: "from-[#1A5200] to-[#2E7D32]",
  },
];

const BLOG_POSTS = [
  {
    title: "JEE 2025: Complete Preparation Strategy for Class 12 Students",
    category: "Entrance Exams",
    date: "Mar 15, 2025",
    excerpt:
      "A comprehensive 6-month study plan covering all subjects with tips from IIT toppers and ICC expert mentors.",
    slug: "jee-2025-preparation-strategy",
  },
  {
    title: "Study Abroad in 2025: Top 5 Countries for Indian Students",
    category: "Study Abroad",
    date: "Mar 8, 2025",
    excerpt:
      "Explore the best study destinations with scholarship opportunities, visa processes, and career outcomes for Indian graduates.",
    slug: "study-abroad-top-countries-2025",
  },
  {
    title: "After 12th Science: Engineering vs Medicine vs Pure Sciences",
    category: "Stream Selection",
    date: "Feb 28, 2025",
    excerpt:
      "An honest comparison of career paths, salary prospects, and work-life balance across the three major science streams.",
    slug: "after-12th-science-career-comparison",
  },
];

// ─── AnimatedCounter ────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start = Math.min(start + step, target);
            setCount(Math.floor(start));
            if (start >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ─── TaglineRow ─────────────────────────────────────────────────────────────

function TaglineRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45 }}
      className="flex flex-wrap gap-2 justify-center md:justify-start"
    >
      {TAGLINES.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border"
          style={{
            background: "rgba(141,198,63,0.15)",
            borderColor: "rgba(141,198,63,0.4)",
            color: "#b8e05a",
          }}
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─── Gallery Preview Data ────────────────────────────────────────────────────

const GALLERY_PREVIEW = [
  {
    src: "/assets/whatsapp_image_2023-05-16_at_12.44.59_pm_2-019dd4b7-84a9-7229-ac72-000c6206d46e.jpeg",
    caption: "Educators Meet 2023",
    tall: true,
  },
  {
    src: "/assets/dsc_7808_2-019dd4b7-cc82-7238-bdf4-d8fa4b95d8bf.jpg",
    caption: "Counselling Workshop",
    tall: false,
  },
  {
    src: "/assets/dsc_7856_1-019dd4b7-ccc4-74c3-b9d5-7f48b1debaa4.jpg",
    caption: "Awards Ceremony",
    tall: false,
  },
  {
    src: "/assets/dsc_7836_1-019dd4b7-ccc8-7298-aa06-74bfa51a180b.jpg",
    caption: "Student Orientation",
    tall: true,
  },
  {
    src: "/assets/dsc_8082_1-019dd4b7-ccc6-736a-954f-193fd6b1e364.jpg",
    caption: "Annual Conference",
    tall: false,
  },
  {
    src: "/assets/dsc_7796-019dd4b8-38a7-71f2-a54b-5b9acc43aa92.jpg",
    caption: "Career Counseling",
    tall: false,
  },
];

// ─── HomePage ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #071a02 0%, #0f2d06 45%, #1A5200 75%, #2E7D32 100%)",
        }}
      >
        {/* Hero background image overlay */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated gradient orbs */}
        <div
          className="absolute top-10 right-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #8DC63F 0%, transparent 70%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #F5A623 0%, transparent 70%)",
            animation: "pulse 6s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #8DC63F 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto lg:mx-0 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border"
                style={{
                  background: "rgba(141,198,63,0.15)",
                  borderColor: "rgba(141,198,63,0.4)",
                  color: "#b8e05a",
                }}
              >
                🇮🇳 India's Trusted Career Counseling Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-white"
            >
              Unleash Your Potential.{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #8DC63F, #F5A623)",
                }}
              >
                Choose the Right Path
              </span>{" "}
              with Expert Guidance.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/75 max-w-2xl"
            >
              India's Trusted Career &amp; Study Abroad Counseling Platform —
              Stream selection, entrance exam coaching, and study abroad
              guidance all under one roof.
            </motion.p>

            {/* Taglines */}
            <TaglineRow />

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #8DC63F, #5fa020)",
                  boxShadow: "0 4px 24px rgba(141,198,63,0.4)",
                }}
                data-ocid="hero-cta-primary"
              >
                <GraduationCap className="w-5 h-5" />
                Book a Free Career Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base border-2 border-white/30 text-white hover:bg-white/10 transition-smooth backdrop-blur-sm"
                data-ocid="hero-cta-secondary"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start"
            >
              {[
                "JEE/NEET Experts",
                "IIT/IIM Alumni Mentors",
                "Free First Session",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-white/65"
                >
                  <CheckCircle
                    className="w-4 h-4"
                    style={{ color: "#8DC63F" }}
                  />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Animated Stats ──────────────────────────────────── */}
      <section
        className="bg-card border-y border-border py-14"
        data-ocid="stats-section"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(141,198,63,0.2), rgba(141,198,63,0.05))",
                    border: "1px solid rgba(141,198,63,0.25)",
                  }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: "#8DC63F" }} />
                </div>
                <div
                  className="font-display font-extrabold text-3xl md:text-4xl"
                  style={{ color: "#8DC63F" }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Nav Cards ─────────────────────────────────── */}
      <section className="py-20 bg-background" data-ocid="nav-cards-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="font-semibold text-sm uppercase tracking-widest"
              style={{ color: "#8DC63F" }}
            >
              Our Services
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mt-2 text-foreground">
              What We Offer
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Comprehensive guidance programs for every stage of your academic
              and career journey
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAV_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={card.href}
                  className={`group flex flex-col p-6 rounded-2xl bg-gradient-to-br ${card.color} border border-border ${card.border} hover:shadow-lg transition-all duration-300 h-full`}
                  data-ocid={`nav-card-${i}`}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {card.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {card.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "#8DC63F" }}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose ICC ──────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(180deg, #071a02 0%, #1A5200 100%)",
        }}
        data-ocid="why-choose-section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="font-semibold text-sm uppercase tracking-widest"
              style={{ color: "#F5A623" }}
            >
              Why India Career Counseling
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mt-2 text-white">
              Why Choose ICC?
            </h2>
            <p className="text-white/65 mt-3 max-w-xl mx-auto">
              We go beyond guidance — we build futures with integrity,
              expertise, and heart
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                whileHover={{ scale: 1.02 }}
                className="flex gap-4 p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "rgba(141,198,63,0.25)",
                    border: "1px solid rgba(141,198,63,0.4)",
                  }}
                >
                  <item.icon className="w-5 h-5" style={{ color: "#8DC63F" }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────── */}
      <section className="py-20 bg-muted/30" data-ocid="testimonials-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="font-semibold text-sm uppercase tracking-widest"
              style={{ color: "#8DC63F" }}
            >
              Success Stories
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mt-2 text-foreground">
              Students Who Made It
            </h2>
            <p className="text-muted-foreground mt-3">
              Real stories from real students who trusted ICC to shape their
              futures
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-7 border border-border shadow-sm hover:shadow-lg transition-all duration-300"
                data-ocid={`testimonial-card-${i}`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 bg-gradient-to-br ${t.color}`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">
                      {t.name}
                    </p>
                    <p
                      className="text-xs font-semibold mt-0.5"
                      style={{ color: "#8DC63F" }}
                    >
                      {t.course} · {t.college}
                    </p>
                    <div className="flex gap-0.5 mt-1.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={`star-${t.name}-${j}`}
                          className="w-3.5 h-3.5 fill-current"
                          style={{ color: "#F5A623" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  "{t.message}"
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-smooth hover:bg-primary/10 text-foreground"
              style={{ borderColor: "#8DC63F", color: "#8DC63F" }}
              data-ocid="testimonials-view-all"
            >
              Read All Success Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Blog Preview ────────────────────────────────────── */}
      <section className="py-20 bg-background" data-ocid="blog-preview-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span
                className="font-semibold text-sm uppercase tracking-widest"
                style={{ color: "#8DC63F" }}
              >
                Career Insights
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mt-1 text-foreground">
                Latest from Our Blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-smooth hover:gap-3"
              style={{ color: "#8DC63F" }}
              data-ocid="blog-view-all"
            >
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full"
                  data-ocid={`blog-card-${i}`}
                >
                  {/* Color header */}
                  <div
                    className="h-3 w-full"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(90deg, #8DC63F, #5fa020)"
                          : "linear-gradient(90deg, #1A5200, #2E7D32)",
                    }}
                  />
                  <div className="p-6 flex flex-col h-[calc(100%-12px)]">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-3"
                      style={{
                        background: "rgba(141,198,63,0.12)",
                        color: "#8DC63F",
                      }}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-display font-bold text-base text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <span
                        className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: "#8DC63F" }}
                      >
                        Read{" "}
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Events Gallery ──────────────────────────────────── */}
      <section
        className="py-20 bg-muted/30"
        data-ocid="gallery-preview-section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span
                className="font-semibold text-sm uppercase tracking-widest flex items-center gap-1.5"
                style={{ color: "#8DC63F" }}
              >
                <Camera className="w-4 h-4" />
                Our Events
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mt-1 text-foreground">
                ICC in Action
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Real moments from ICC counselling fairs, educator meets and
                student success celebrations — 2023
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-smooth hover:gap-3"
              style={{ color: "#8DC63F" }}
              data-ocid="gallery-view-all"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_PREVIEW.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${photo.tall ? "row-span-2" : ""}`}
                style={{ aspectRatio: photo.tall ? "3/4" : "4/3" }}
                data-ocid={`home-gallery-photo.${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-semibold">
                    {photo.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #071a02 0%, #1A5200 50%, #0d3300 100%)",
        }}
        data-ocid="cta-section"
      >
        {/* Decorative accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, #8DC63F, #F5A623, #8DC63F)",
          }}
        />
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "#8DC63F" }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border mb-2"
              style={{
                background: "rgba(141,198,63,0.15)",
                borderColor: "rgba(141,198,63,0.4)",
                color: "#b8e05a",
              }}
            >
              <Briefcase className="w-4 h-4" /> Free Career Consultation
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">
              Ready to Shape Your Future?
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto">
              Take the first step — book a FREE 30-minute career session with
              our certified counselors. No commitment, just clarity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white shadow-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #8DC63F, #5fa020)",
                  boxShadow: "0 4px 24px rgba(141,198,63,0.45)",
                }}
                data-ocid="cta-book-session"
              >
                <GraduationCap className="w-5 h-5" />
                Book a Free Career Session
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 border-white/25 text-white hover:bg-white/10 transition-smooth"
                data-ocid="cta-talk-counselor"
              >
                <Phone className="w-5 h-5" /> Talk to a Counselor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
