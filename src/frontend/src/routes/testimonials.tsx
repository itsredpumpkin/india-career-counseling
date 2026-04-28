import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListTestimonials } from "@/hooks/useBackend";
import type { Testimonial } from "@/types/icc";
import { Link } from "@tanstack/react-router";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Globe,
  Quote,
  Star,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Sample fallback data ────────────────────────────────────────────────────

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    studentName: "Rohit Malhotra",
    course: "Aviation Diploma",
    college: "IndiGo Airlines — Aviation Graduate",
    year: "2024",
    message:
      "Thanks to ICC, I got placed in a top aviation company after my diploma. The counselors really understood my passion for flying.",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "2",
    studentName: "Nikita Singh",
    course: "International Studies",
    college: "University of Toronto, Canada",
    year: "2024",
    message:
      "Their counseling helped me find my true passion and get into a top Canadian university! The visa guidance was exceptional.",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "3",
    studentName: "Arjun Patel",
    course: "B.Tech Computer Science",
    college: "IIT Bombay",
    year: "2023",
    message:
      "ICC's JEE coaching strategy was exactly what I needed. I cracked JEE Advanced in my first attempt!",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "4",
    studentName: "Priya Mehta",
    course: "MBBS",
    college: "AIIMS Delhi",
    year: "2023",
    message:
      "The NEET preparation roadmap from ICC was a game-changer. I got into AIIMS in my first attempt.",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "5",
    studentName: "Rahul Gupta",
    course: "MBA Finance",
    college: "IIM Ahmedabad",
    year: "2023",
    message:
      "From stream selection to MBA admission, ICC guided me at every step. Worth every rupee!",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "6",
    studentName: "Ananya Sharma",
    course: "Masters in Business",
    college: "University of Melbourne, Australia",
    year: "2024",
    message:
      "I was confused about studying abroad but ICC made the entire process smooth. Now studying at University of Melbourne!",
    rating: 4,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "7",
    studentName: "Vikram Singh",
    course: "Hotel Management Diploma",
    college: "Taj Hotels & Resorts — Placed",
    year: "2023",
    message:
      "The diploma program at ICC with 100% placement guarantee delivered on its promise. Now working at Taj Hotels.",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "8",
    studentName: "Sneha Reddy",
    course: "B.Tech",
    college: "IIT Madras",
    year: "2024",
    message:
      "As a commerce student who wanted to switch to science, ICC's stream guidance was invaluable.",
    rating: 4,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "9",
    studentName: "Amit Kumar",
    course: "MSc Data Science",
    college: "University of Edinburgh, UK",
    year: "2023",
    message:
      "Got a scholarship to study in UK thanks to ICC's application guidance. They helped me with SOP and interviews.",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: "10",
    studentName: "Kavitha Nair",
    course: "CA Final",
    college: "ICAI — Institute of Chartered Accountants",
    year: "2024",
    message:
      "ICC helped me choose commerce confidently and mapped out the CA journey clearly from the start.",
    rating: 5,
    avatarUrl: "",
    createdAt: BigInt(0),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

type BadgeConfig = { icon: typeof Trophy; label: string; color: string };

const BADGE_MAP: Array<[string, BadgeConfig]> = [
  [
    "IIT",
    {
      icon: Trophy,
      label: "IIT Graduate",
      color: "bg-amber-100 text-amber-800 border-amber-200",
    },
  ],
  [
    "AIIMS",
    {
      icon: Award,
      label: "AIIMS Graduate",
      color: "bg-rose-100 text-rose-800 border-rose-200",
    },
  ],
  [
    "IIM",
    {
      icon: Trophy,
      label: "IIM Graduate",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
  ],
  [
    "Canada",
    {
      icon: Globe,
      label: "Studying Abroad",
      color: "bg-sky-100 text-sky-800 border-sky-200",
    },
  ],
  [
    "Australia",
    {
      icon: Globe,
      label: "Studying Abroad",
      color: "bg-sky-100 text-sky-800 border-sky-200",
    },
  ],
  [
    ", UK",
    {
      icon: Globe,
      label: "Studying Abroad",
      color: "bg-sky-100 text-sky-800 border-sky-200",
    },
  ],
  [
    "Taj",
    {
      icon: Award,
      label: "Placed at Taj Hotels",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
  ],
  [
    "ICAI",
    {
      icon: Award,
      label: "CA Qualified",
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
  ],
];

function getAchievementBadge(college: string): BadgeConfig {
  for (const [key, cfg] of BADGE_MAP) {
    if (college.includes(key)) return cfg;
  }
  return {
    icon: Award,
    label: "Top Achiever",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-orange-500 to-rose-500",
  "from-indigo-600 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
  "from-violet-500 to-indigo-600",
  "from-rose-500 to-pink-600",
  "from-teal-500 to-emerald-600",
  "from-blue-600 to-indigo-700",
  "from-orange-600 to-amber-500",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({
  rating,
  size = "sm",
}: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${cls} ${s <= rating ? "fill-[#FF6B00] text-[#FF6B00]" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
}

// ─── Carousel Card ───────────────────────────────────────────────────────────

function CarouselCard({
  testimonial,
  index,
  isActive,
  direction,
}: {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
  direction: "left" | "right";
}) {
  const badge = getAchievementBadge(testimonial.college);
  const BadgeIcon = badge.icon;

  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
        isActive
          ? "opacity-100 translate-x-0 scale-100 z-10"
          : `opacity-0 ${direction === "right" ? "translate-x-12" : "-translate-x-12"} scale-95 z-0 pointer-events-none`
      }`}
    >
      <div className="h-full flex flex-col bg-card rounded-2xl border border-border shadow-xl p-6 md:p-10">
        {/* Top row */}
        <div className="flex justify-between items-start mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: "rgba(255,107,0,0.12)" }}
          >
            <Quote className="w-6 h-6" style={{ color: "#FF6B00" }} />
          </div>
          <StarRating rating={testimonial.rating} size="md" />
        </div>

        {/* Message */}
        <p className="text-base md:text-xl leading-relaxed text-foreground/90 flex-1 mb-8 italic font-body">
          "{testimonial.message}"
        </p>

        {/* Student info */}
        <div className="flex items-center gap-4 pt-5 border-t border-border">
          <div
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md`}
          >
            {getInitials(testimonial.studentName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-lg truncate">
              {testimonial.studentName}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {testimonial.course}
            </p>
          </div>
          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border flex-shrink-0 ${badge.color}`}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Progress Dots ───────────────────────────────────────────────────────────

function ProgressDots({
  total,
  current,
  onSelect,
}: { total: number; current: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: dot index is meaningful here
          key={`dot-${i}`}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          className="rounded-full transition-all duration-300"
          style={
            i === current
              ? { width: 32, height: 10, background: "#FF6B00" }
              : {
                  width: 10,
                  height: 10,
                  background: "var(--border-color, #e2e8f0)",
                }
          }
        />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const { data: backendData, isLoading } = useListTestimonials();
  const testimonials: Testimonial[] =
    backendData && (backendData as Testimonial[]).length > 0
      ? (backendData as Testimonial[])
      : SAMPLE_TESTIMONIALS;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, dir?: "left" | "right") => {
    setDirection(dir ?? (idx > current ? "right" : "left"));
    setCurrent((idx + testimonials.length) % testimonials.length);
  };

  const prev = () => goTo(current - 1, "left");
  const next = () => goTo(current + 1, "right");

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setDirection("right");
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Banner ── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1A237E 0%, #0D1660 45%, #1A237E 75%, #2d1a6e 100%)",
        }}
        data-ocid="testimonials-hero"
      >
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#FF6B00", transform: "translate(-45%, -45%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "#FF6B00", transform: "translate(35%, 35%)" }}
        />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              className="mb-5 text-sm px-5 py-1.5 border font-semibold"
              style={{
                background: "rgba(255,107,0,0.2)",
                color: "#FF6B00",
                borderColor: "rgba(255,107,0,0.4)",
              }}
            >
              Real Students. Real Results.
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-5 leading-tight">
              Student Success Stories
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Thousands of students have transformed their careers with ICC.
              Hear their stories and let them inspire yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section
        className="py-10 border-b border-border"
        style={{ background: "rgba(255,107,0,0.04)" }}
        data-ocid="testimonials-stats"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-border max-w-2xl mx-auto">
            {[
              {
                value: "5,000+",
                label: "Students Guided",
                sub: "Across India & Abroad",
              },
              {
                value: "95%",
                label: "Success Rate",
                sub: "Admissions & Placements",
              },
              {
                value: "4.9/5",
                label: "Average Rating",
                sub: "3,200+ verified reviews",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1 px-4 py-2 text-center"
              >
                <span
                  className="text-3xl md:text-5xl font-display font-bold"
                  style={{ color: "#FF6B00" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm md:text-base font-semibold text-foreground">
                  {stat.label}
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Carousel Section ── */}
      <section
        className="py-16 md:py-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        data-ocid="testimonials-carousel"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground">
              Verified reviews from students who achieved their dreams with ICC
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Carousel track */}
            <div
              className="relative"
              style={{ minHeight: 340 }}
              data-ocid="carousel-track"
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: "#FF6B00",
                          animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                testimonials.map((t, i) => (
                  <CarouselCard
                    key={t.id}
                    testimonial={t}
                    index={i}
                    isActive={i === current}
                    direction={direction}
                  />
                ))
              )}
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                data-ocid="carousel-prev"
                type="button"
                className="w-11 h-11 rounded-full border border-border bg-card shadow-sm flex items-center justify-center transition-smooth hover:shadow-md hover:border-primary hover:text-primary"
                style={{ cursor: "pointer" }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <ProgressDots
                total={testimonials.length}
                current={current}
                onSelect={(i) => goTo(i)}
              />

              <button
                onClick={next}
                aria-label="Next testimonial"
                data-ocid="carousel-next"
                type="button"
                className="w-11 h-11 rounded-full border border-border bg-card shadow-sm flex items-center justify-center transition-smooth hover:shadow-md hover:border-primary hover:text-primary"
                style={{ cursor: "pointer" }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-3">
              {current + 1} of {testimonials.length} — Auto-scrolling every 3
              seconds
            </p>
          </div>
        </div>
      </section>

      {/* ── Grid Section ── */}
      <section className="py-16 bg-muted/30" data-ocid="testimonials-grid">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display font-bold text-center mb-10 text-foreground"
          >
            All Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => {
              const badge = getAchievementBadge(t.college);
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-smooth"
                  data-ocid={`testimonial-card-${t.id}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
                    >
                      {getInitials(t.studentName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {t.studentName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.course}
                      </p>
                    </div>
                    <StarRating rating={t.rating} />
                  </div>

                  <p className="text-sm text-foreground/80 line-clamp-3 italic mb-3">
                    "{t.message}"
                  </p>

                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}
                  >
                    <BadgeIcon className="w-3 h-3" />
                    {badge.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #1A237E 0%, #2d1a6e 100%)",
        }}
        data-ocid="testimonials-cta"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Join 5,000+ students who transformed their careers with expert ICC
              guidance. Get a personalised counseling session today — absolutely
              free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="font-semibold px-8 text-white border-0 shadow-lg hover:opacity-90 transition-smooth"
                  style={{ background: "#FF6B00" }}
                  data-ocid="cta-book-session"
                >
                  Book Free Counseling Session
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold px-8 text-white border-white/40 bg-white/10 hover:bg-white/20 transition-smooth"
                  data-ocid="cta-explore-courses"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
