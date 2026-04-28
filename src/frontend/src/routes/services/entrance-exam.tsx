import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  Home,
  Monitor,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";

type ExamCategory = {
  category: string;
  emoji: string;
  color: string;
  exams: { name: string; fullForm: string; desc: string }[];
};

const EXAM_CATEGORIES: ExamCategory[] = [
  {
    category: "Medical",
    emoji: "🏥",
    color: "border-l-4 border-l-red-400/70",
    exams: [
      {
        name: "NEET-UG",
        fullForm: "National Eligibility cum Entrance Test",
        desc: "MBBS, BDS, BAMS, BHMS admissions across India",
      },
      {
        name: "AIIMS",
        fullForm: "All India Institute of Medical Sciences",
        desc: "Premier medical institutions — AIIMS Delhi, Mumbai, Jodhpur, etc.",
      },
      {
        name: "JIPMER",
        fullForm: "Jawaharlal Institute of Post Graduate Medical Education",
        desc: "JIPMER Puducherry & Karaikal MBBS admissions",
      },
      {
        name: "AFMC",
        fullForm: "Armed Forces Medical College",
        desc: "MBBS at AFMC Pune for defense medical careers",
      },
    ],
  },
  {
    category: "Engineering",
    emoji: "⚙️",
    color: "border-l-4 border-l-primary/70",
    exams: [
      {
        name: "JEE Mains",
        fullForm: "Joint Entrance Examination Mains",
        desc: "NITs, IIITs, GFTIs — 31 lakh+ students appear annually",
      },
      {
        name: "JEE Advanced",
        fullForm: "Joint Entrance Examination Advanced",
        desc: "IIT admissions — top 2.5 lakh JEE Mains qualifiers eligible",
      },
      {
        name: "BITSAT",
        fullForm: "BITS Admission Test",
        desc: "BITS Pilani, Goa, Hyderabad — all engineering & science programs",
      },
      {
        name: "VITEEE",
        fullForm: "VIT Engineering Entrance Exam",
        desc: "VIT Vellore, Chennai, Bhopal, Amaravati admissions",
      },
      {
        name: "SRMJEEE",
        fullForm: "SRM Joint Engineering Entrance Exam",
        desc: "SRM Institute of Science & Technology admissions",
      },
    ],
  },
  {
    category: "Management",
    emoji: "📊",
    color: "border-l-4 border-l-accent/70",
    exams: [
      {
        name: "CAT",
        fullForm: "Common Admission Test",
        desc: "IIMs and 100+ top MBA colleges accept CAT scores",
      },
      {
        name: "XAT",
        fullForm: "Xavier Aptitude Test",
        desc: "XLRI Jamshedpur and 150+ management institutes",
      },
      {
        name: "MAT",
        fullForm: "Management Aptitude Test",
        desc: "AIMA-conducted; accepted by 600+ MBA colleges",
      },
      {
        name: "CMAT",
        fullForm: "Common Management Admission Test",
        desc: "NTA-conducted national MBA entrance exam",
      },
      {
        name: "SNAP",
        fullForm: "Symbiosis National Aptitude Test",
        desc: "15 Symbiosis institutes including SIBM Pune",
      },
      {
        name: "GMAT",
        fullForm: "Graduate Management Admission Test",
        desc: "For MBA programs globally including IIMs (PGPX)",
      },
    ],
  },
  {
    category: "Law, Government & Other",
    emoji: "⚖️",
    color: "border-l-4 border-l-yellow-500/70",
    exams: [
      {
        name: "CLAT",
        fullForm: "Common Law Admission Test",
        desc: "25 National Law Universities across India",
      },
      {
        name: "UPSC CSE",
        fullForm: "Union Public Service Commission Civil Services",
        desc: "IAS, IPS, IFS and central government services",
      },
      {
        name: "SSC CGL/CHSL",
        fullForm: "Staff Selection Commission",
        desc: "Group B and C posts in central government departments",
      },
      {
        name: "NDA",
        fullForm: "National Defence Academy",
        desc: "Army, Navy, Air Force — for class 12 students",
      },
      {
        name: "NATA",
        fullForm: "National Aptitude Test in Architecture",
        desc: "For B.Arch admissions in architecture colleges",
      },
    ],
  },
  {
    category: "International Exams",
    emoji: "🌍",
    color: "border-l-4 border-l-green-500/70",
    exams: [
      {
        name: "IELTS",
        fullForm: "International English Language Testing System",
        desc: "UK, Canada, Australia, New Zealand immigration & study",
      },
      {
        name: "TOEFL",
        fullForm: "Test of English as a Foreign Language",
        desc: "Primarily for US university admissions",
      },
      {
        name: "GRE",
        fullForm: "Graduate Record Examination",
        desc: "For MS, MBA and PhD programs in the US & Europe",
      },
      {
        name: "SAT",
        fullForm: "Scholastic Assessment Test",
        desc: "US undergraduate admissions; accepted by 2,000+ universities",
      },
      {
        name: "GMAT",
        fullForm: "Graduate Management Admission Test",
        desc: "Global MBA programs; Indian business schools too",
      },
    ],
  },
];

const COACHING_HIGHLIGHTS = [
  {
    icon: Monitor,
    title: "Interactive Live Classes",
    desc: "Engaging online and offline classroom sessions with whiteboards, live doubt-solving, and recorded lectures for revision.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Study Material",
    desc: "Topic-wise notes, previous year papers (10+ years), chapter-wise practice sets, and formula sheets prepared by IIT/AIIMS alumni.",
  },
  {
    icon: BarChart3,
    title: "Regular Practice Tests",
    desc: "Weekly chapter tests, monthly mock exams, and full-length simulation tests with detailed analytics and national rank prediction.",
  },
  {
    icon: UserCheck,
    title: "Personalized Mentoring",
    desc: "Dedicated mentor for each student — weekly 1:1 calls to review progress, resolve doubts, and keep motivation high throughout preparation.",
  },
];

const STATS = [
  { value: "500+", label: "IIT Selections" },
  { value: "1,200+", label: "NEET Qualifiers" },
  { value: "95%", label: "Pass Rate" },
  { value: "50+", label: "Expert Faculty" },
];

export default function EntranceExamPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section
        className="py-24 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.08 280) 0%, oklch(0.22 0.1 280) 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-secondary-foreground/60 mb-8">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-primary transition-smooth"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/services"
              className="hover:text-primary transition-smooth"
            >
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-medium">
              Entrance Exam Preparation
            </span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl">📝</span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mt-4 mb-4">
              Entrance Exam Preparation
            </h1>
            <p className="text-secondary-foreground/75 max-w-2xl mx-auto text-lg leading-relaxed">
              Expert coaching for NEET, JEE, CLAT, CAT, UPSC, IELTS, TOEFL, GRE
              — and every major competitive exam that opens doors to your dream
              career.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth shadow-lg"
                data-ocid="exam-hero-cta"
              >
                Start Preparation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#exams"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-secondary-foreground/30 text-secondary-foreground font-semibold hover:bg-white/10 transition-smooth"
              >
                View Exam List
              </a>
            </div>
          </motion.div>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-extrabold text-2xl md:text-3xl text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-secondary-foreground/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exam Categories */}
      <section id="exams" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Exams We Cover
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive preparation for all major competitive exams — from
              medical to management to international certifications
            </p>
          </motion.div>
          <div className="space-y-10">
            {EXAM_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {cat.category}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.exams.map((exam, i) => (
                    <motion.div
                      key={exam.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className={`bg-card rounded-xl p-5 border border-border ${cat.color} hover:shadow-elevated transition-smooth`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-display font-bold text-base text-foreground">
                          {exam.name}
                        </h4>
                        <span className="text-xs text-primary font-semibold whitespace-nowrap shrink-0 mt-0.5">
                          {cat.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground italic mb-2">
                        {exam.fullForm}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exam.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Our Coaching Approach
            </h2>
            <p className="text-muted-foreground">
              We don't just teach — we build exam-ready champions
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACHING_HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <h.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {h.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              Ready to Crack Your Dream Exam?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get a free personalized study plan from our IIT/AIIMS alumni
              faculty. Limited seats per batch.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
                data-ocid="exam-cta"
              >
                Get Free Study Plan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-smooth"
              >
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
