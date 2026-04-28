import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Camera,
  CheckCircle,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: "Expert Counselors",
    desc: "Our team holds advanced degrees and certifications in education psychology and career guidance.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Personalized Roadmaps",
    desc: "Every student receives a custom plan aligned with their strengths, goals, and aspirations.",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Global Opportunities",
    desc: "Access curated study abroad programs in 40+ countries with dedicated visa assistance.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Proven Track Record",
    desc: "5000+ successful placements in top Indian and international institutions since 2012.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Student-First Approach",
    desc: "No commissions, no quotas — only unbiased advice for the best outcome for every student.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Certified & Trusted",
    desc: "Fully accredited by AICTE, UGC, and ISO 9001:2015 certified for quality service delivery.",
  },
];

const TEAM = [
  {
    name: "Dr. Priya Sharma",
    role: "Career Counselor",
    bio: "PhD in Education Psychology from Delhi University with 14 years of guiding students through career crossroads. Specializes in aptitude mapping and STEM pathways.",
    image: "/assets/dsc_7796_1-019dd4b7-9dce-74fc-b529-c065bc67687c.jpg",
    badge: "14+ Years Experience",
  },
  {
    name: "Rajesh Kumar",
    role: "Academic Director",
    bio: "Former IIT Bombay faculty member turned education strategist. Expert in engineering entrance exams, JEE, NEET coaching strategy, and college selection.",
    image: "/assets/dsc_7808_1-019dd4b7-ccd8-745c-9889-673475ede07a.jpg",
    badge: "IIT Alumni",
  },
  {
    name: "Sunita Patel",
    role: "Study Abroad Specialist",
    bio: "Certified international education consultant with partnerships across 40+ universities in the US, UK, Canada, and Australia. Helped 1200+ students secure global admissions.",
    image: "/assets/dsc_7850_1-019dd4b7-ca66-7279-9a10-6b72d0c1f852.jpg",
    badge: "1200+ Placements",
  },
];

const MILESTONES = [
  {
    year: "2012",
    title: "Founded",
    desc: "ICC was established in New Delhi with a mission to democratize quality career guidance for every Indian student.",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    year: "2015",
    title: "First 500 Students",
    desc: "Crossed the 500-student milestone with counseling services spanning 12 cities across North India.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    year: "2018",
    title: "National Recognition",
    desc: "Awarded 'Best Education Consultancy' by the National Education Forum and expanded to 25 cities.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    year: "2020",
    title: "Online Counseling Launched",
    desc: "Pioneered virtual counseling sessions, serving students remotely across India during a pivotal time.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    year: "2024",
    title: "5000+ Students Milestone",
    desc: "Celebrated guiding over 5000 students into their dream institutions in India and abroad.",
    icon: <Star className="w-5 h-5" />,
  },
];

const PARTNERS = [
  {
    name: "AICTE",
    desc: "All India Council for Technical Education",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    name: "UGC",
    desc: "University Grants Commission",
    icon: <GraduationCap className="w-8 h-8" />,
  },
  {
    name: "CBSE",
    desc: "CBSE Affiliated School Network",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    name: "ISO 9001",
    desc: "ISO 9001:2015 Certified",
    icon: <CheckCircle className="w-8 h-8" />,
  },
  {
    name: "NASSCOM",
    desc: "NASSCOM Technology Partner",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    name: "British Council",
    desc: "British Council Authorised Agent",
    icon: <Globe className="w-8 h-8" />,
  },
];

const STATS = [
  {
    value: "5000+",
    label: "Students Guided",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    value: "12+",
    label: "Years of Excellence",
    icon: <Award className="w-6 h-6" />,
  },
  {
    value: "40+",
    label: "Global Universities",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: <Star className="w-6 h-6" />,
  },
];

// All 18 ICC event photos
const GALLERY_PHOTOS = [
  {
    src: "/assets/whatsapp_image_2023-05-16_at_12.44.59_pm_2-019dd4b7-84a9-7229-ac72-000c6206d46e.jpeg",
    caption: "ICC Counselling Fair 2023 — Educators Meet",
  },
  {
    src: "/assets/whatsapp_image_2023-05-16_at_12.44.59_pm_1-019dd4b7-850f-706d-8590-6949cf6a57b6.jpeg",
    caption: "ICC Counselling Fair 2023 — Group Session",
  },
  {
    src: "/assets/whatsapp_image_2023-05-16_at_12.44.59_pm-019dd4b7-85dd-76de-bfdc-e6a017cf48eb.jpeg",
    caption: "ICC Career Guidance Event 2023",
  },
  {
    src: "/assets/dsc_7796_1-019dd4b7-9dce-74fc-b529-c065bc67687c.jpg",
    caption: "ICC Student Counselling Session",
  },
  {
    src: "/assets/dsc_7850_1-019dd4b7-ca66-7279-9a10-6b72d0c1f852.jpg",
    caption: "ICC Educators Meet — Panel Discussion",
  },
  {
    src: "/assets/dsc_7782_1-019dd4b7-cc48-74d8-858a-de3a5531fc11.jpg",
    caption: "ICC Career Fair — Student Interaction",
  },
  {
    src: "/assets/dsc_7808_2-019dd4b7-cc82-7238-bdf4-d8fa4b95d8bf.jpg",
    caption: "ICC Counselling Workshop 2023",
  },
  {
    src: "/assets/dsc_7856_1-019dd4b7-ccc4-74c3-b9d5-7f48b1debaa4.jpg",
    caption: "ICC Awards & Recognition Ceremony",
  },
  {
    src: "/assets/dsc_8082_1-019dd4b7-ccc6-736a-954f-193fd6b1e364.jpg",
    caption: "ICC Annual Counselling Conference",
  },
  {
    src: "/assets/dsc_7836_1-019dd4b7-ccc8-7298-aa06-74bfa51a180b.jpg",
    caption: "ICC Success Story — Student Orientation",
  },
  {
    src: "/assets/dsc_7808_1-019dd4b7-ccd8-745c-9889-673475ede07a.jpg",
    caption: "ICC Career Guidance Seminar",
  },
  {
    src: "/assets/dsc_7850-019dd4b8-345c-7020-a654-5fd6f3bc3603.jpg",
    caption: "ICC Educators Meet — Networking",
  },
  {
    src: "/assets/dsc_7808-019dd4b8-3456-76ab-9c8c-e7ded77b717d.jpg",
    caption: "ICC Counselling Fair — Expert Talk",
  },
  {
    src: "/assets/dsc_7856-019dd4b8-3831-7407-bf89-e63f4d756bab.jpg",
    caption: "ICC Student Interaction Session",
  },
  {
    src: "/assets/dsc_7796-019dd4b8-38a7-71f2-a54b-5b9acc43aa92.jpg",
    caption: "ICC Career Counseling — One-on-One",
  },
  {
    src: "/assets/dsc_8082-019dd4b8-3a89-730a-a7bc-9de1374841d9.jpg",
    caption: "ICC Annual Event Highlights",
  },
  {
    src: "/assets/dsc_7836-019dd4b8-3aec-74e9-9db3-4cfe60891b88.jpg",
    caption: "ICC Mentors & Students Gathering",
  },
  {
    src: "/assets/dsc_7782-019dd4b8-3bad-77c6-a0ff-6fb1ffd3b426.jpg",
    caption: "ICC Career Fair 2023 — Exhibition Floor",
  },
];

// ─── Animation Hook ────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Reusable bits ────────────────────────────────────────────────────────────

function SectionLabel({
  icon,
  children,
}: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4">
      {icon}
      {children}
    </span>
  );
}

function SectionHeading({
  children,
  sub,
}: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">
        {children}
      </h2>
      {sub && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden min-h-[500px] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, #071a02 0%, #1A5200 60%, #2E7D32 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-primary/20" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('/assets/dsc_7836_1-019dd4b7-ccc8-7298-aa06-74bfa51a180b.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <Badge
            variant="outline"
            className="border-primary/60 text-primary bg-primary/20 mb-5 text-xs tracking-widest uppercase"
          >
            About ICC
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-card leading-tight mb-6">
            Shaping Futures,{" "}
            <span className="text-primary">One Student at a Time</span>
          </h1>
          <p className="text-card/80 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            India Career Counseling (ICC) is a leading education and career
            consultancy dedicated to empowering students with clarity,
            confidence, and a custom roadmap for their future. With over a
            decade of experience, we've helped thousands of students make
            informed decisions about academics, careers, and global study
            opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                data-ocid="about-hero-cta-contact"
              >
                Get Free Counseling
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-card/40 text-card hover:bg-card/10 font-semibold px-8"
                data-ocid="about-hero-cta-courses"
              >
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section
      className="py-16 bg-background border-b border-border/40"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon }, i) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
              }}
              data-ocid={`stat-${i}`}
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-1">
                {icon}
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold text-secondary">
                {value}
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionLabel icon={<Target className="w-3.5 h-3.5" />}>
            Our Purpose
          </SectionLabel>
        </div>
        <SectionHeading sub="Two guiding principles that shape everything we do at ICC.">
          Vision &amp; Mission
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Star className="w-8 h-8 text-primary" />,
              label: "Our Vision",
              heading: "Inspiring Global Professionals",
              text: "To be India's most reliable education partner, inspiring the next generation of global professionals.",
              delay: 0,
            },
            {
              icon: <Target className="w-8 h-8 text-primary" />,
              label: "Our Mission",
              heading: "Career-First Guidance",
              text: "Personalized, transparent, and career-first guidance through every academic milestone.",
              delay: 150,
            },
          ].map(({ icon, label, heading, text, delay }) => (
            <Card
              key={label}
              className="p-8 border border-border/60 shadow-sm hover:shadow-md hover:border-primary/40 transition-smooth group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-smooth shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    {label}
                  </p>
                  <h3 className="text-xl font-display font-bold text-secondary mb-2">
                    {heading}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionLabel icon={<CheckCircle className="w-3.5 h-3.5" />}>
            Why Choose ICC
          </SectionLabel>
        </div>
        <SectionHeading sub="We go beyond advice — we walk alongside every student, every step of the way.">
          The ICC Advantage
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon, title, desc }, i) => (
            <Card
              key={title}
              className="p-6 border border-border/50 hover:border-primary/40 hover:shadow-lg transition-smooth group cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms`,
              }}
              data-ocid={`benefit-card-${i}`}
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-smooth text-primary">
                {icon}
              </div>
              <h3 className="font-display font-bold text-secondary text-lg mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionLabel icon={<Users className="w-3.5 h-3.5" />}>
            Our Team
          </SectionLabel>
        </div>
        <SectionHeading sub="Meet the passionate experts behind ICC's success stories.">
          The Minds Behind Your Future
        </SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map(({ name, role, bio, image, badge }, i) => (
            <Card
              key={name}
              className="overflow-hidden border border-border/50 hover:border-primary/40 hover:shadow-xl transition-smooth group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.6s ease ${i * 130}ms, transform 0.6s ease ${i * 130}ms`,
              }}
              data-ocid={`team-card-${i}`}
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground text-xs font-semibold">
                  {badge}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-secondary text-xl mb-0.5">
                  {name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Photo Gallery Section ─────────────────────────────────────────────────────

function PhotoGallerySection() {
  const { ref, inView } = useInView(0.1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((idx) =>
      idx !== null
        ? (idx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        : null,
    );
  const nextPhoto = () =>
    setLightboxIndex((idx) =>
      idx !== null ? (idx + 1) % GALLERY_PHOTOS.length : null,
    );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((idx) =>
          idx !== null
            ? (idx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
            : null,
        );
      if (e.key === "ArrowRight")
        setLightboxIndex((idx) =>
          idx !== null ? (idx + 1) % GALLERY_PHOTOS.length : null,
        );
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  return (
    <section
      className="py-20 bg-muted/30"
      ref={ref}
      data-ocid="gallery-section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionLabel icon={<Camera className="w-3.5 h-3.5" />}>
            Our Events
          </SectionLabel>
        </div>
        <SectionHeading sub="Real moments from our counselling fairs, educator meets, and student success celebrations.">
          ICC Events Gallery 2023
        </SectionHeading>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 w-full text-left"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.95)",
                transition: `opacity 0.5s ease ${(i % 8) * 60}ms, transform 0.5s ease ${(i % 8) * 60}ms`,
              }}
              onClick={() => openLightbox(i)}
              data-ocid={`gallery-photo.${i + 1}`}
              aria-label={`View ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-card text-xs font-medium leading-tight">
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <dialog
            open
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 w-full h-full max-w-none m-0 border-0"
            onClick={closeLightbox}
            onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
            data-ocid="gallery-lightbox"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 rounded-full p-2 z-10"
              aria-label="Close lightbox"
              data-ocid="gallery-lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 text-white/80 hover:text-white bg-black/40 rounded-full p-3 z-10 text-2xl font-bold"
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div
              className="max-w-4xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_PHOTOS[lightboxIndex].src}
                alt={GALLERY_PHOTOS[lightboxIndex].caption}
                className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
              />
              <p className="text-center text-white/80 text-sm mt-3">
                {GALLERY_PHOTOS[lightboxIndex].caption}
              </p>
              <p className="text-center text-white/50 text-xs mt-1">
                {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 text-white/80 hover:text-white bg-black/40 rounded-full p-3 z-10 text-2xl font-bold"
              aria-label="Next photo"
            >
              ›
            </button>
          </dialog>
        )}
      </div>
    </section>
  );
}

function TimelineSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-20 bg-secondary overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel icon={<TrendingUp className="w-3.5 h-3.5" />}>
            Our Journey
          </SectionLabel>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-card mb-3">
            A Decade of Impact
          </h2>
          <p className="text-card/70 max-w-xl mx-auto text-base">
            From a small consultation firm to India's trusted career partner —
            every milestone fuels our next leap.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />
          <div className="space-y-10">
            {MILESTONES.map(({ year, title, desc, icon }, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={year}
                  className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-6`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? "translateX(0)"
                      : isEven
                        ? "translateX(-28px)"
                        : "translateX(28px)",
                    transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                  }}
                >
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                    {icon}
                  </div>
                  <div
                    className={`ml-20 md:ml-0 ${isEven ? "md:mr-[calc(50%+1.5rem)] md:text-right" : "md:ml-[calc(50%+1.5rem)]"} max-w-xs`}
                  >
                    <Card className="p-5 border border-card/20 bg-card/10 backdrop-blur-sm">
                      <p className="text-primary font-bold text-2xl font-display mb-0.5">
                        {year}
                      </p>
                      <h4 className="text-card font-semibold text-base mb-1">
                        {title}
                      </h4>
                      <p className="text-card/70 text-sm leading-relaxed">
                        {desc}
                      </p>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionLabel icon={<Award className="w-3.5 h-3.5" />}>
            Certified &amp; Affiliated
          </SectionLabel>
        </div>
        <SectionHeading sub="ICC is recognized and affiliated with India's leading education regulatory bodies and global institutions.">
          Our Certifications &amp; Affiliations
        </SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {PARTNERS.map(({ name, desc, icon }, i) => (
            <Card
              key={name}
              className="p-5 flex flex-col items-center text-center gap-3 border border-border/50 hover:border-primary/40 hover:shadow-md transition-smooth group cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.92)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
              }}
              data-ocid={`partner-card-${i}`}
            >
              <div className="text-primary group-hover:scale-110 transition-smooth">
                {icon}
              </div>
              <div>
                <p className="font-display font-bold text-secondary text-sm leading-tight">
                  {name}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5 leading-tight">
                  {desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, inView } = useInView();
  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-2xl p-10 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #071a02, #1A5200, #8DC63F)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <Badge
              variant="outline"
              className="border-primary/60 text-primary bg-primary/20 mb-5 text-xs tracking-widest uppercase"
            >
              <MapPin className="w-3 h-3 mr-1" /> Free Consultation
            </Badge>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-card mb-4 leading-tight">
              Ready to Shape Your Future?
            </h2>
            <p className="text-card/80 max-w-xl mx-auto text-lg mb-8 leading-relaxed">
              Book a free one-on-one session with an ICC expert today. No
              pressure, just clarity about your best academic path forward.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 text-base shadow-lg"
                  data-ocid="about-cta-contact"
                >
                  Book Free Counseling
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-card/40 text-card hover:bg-card/10 font-semibold px-8 text-base"
                  data-ocid="about-cta-services"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <VisionMissionSection />
      <WhyChooseSection />
      <TeamSection />
      <PhotoGallerySection />
      <TimelineSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
}
