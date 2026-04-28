import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Home,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const STREAMS = [
  {
    name: "Science (PCM)",
    emoji: "⚗️",
    fullName: "Physics, Chemistry, Mathematics",
    careers: [
      "Engineering (IIT/NIT)",
      "Architecture (NATA)",
      "Computer Science",
      "Defense & NDA",
      "Research & Aerospace",
    ],
    exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "NATA"],
    color: "bg-primary/10 border-primary/30",
    tag: "Most Chosen",
  },
  {
    name: "Science (PCB)",
    emoji: "🧬",
    fullName: "Physics, Chemistry, Biology",
    careers: [
      "MBBS / Doctor",
      "Dentistry (BDS)",
      "Pharmacy (B.Pharm)",
      "Veterinary Science",
      "Nursing & Allied Health",
    ],
    exams: ["NEET-UG", "AIIMS", "JIPMER", "AFMC", "BVSC"],
    color: "bg-accent/10 border-accent/30",
    tag: "High Demand",
  },
  {
    name: "Commerce",
    emoji: "📊",
    fullName: "Accountancy, Business Studies, Economics",
    careers: [
      "CA / CMA / CS",
      "MBA / Management",
      "Banking & Finance",
      "Economics & Statistics",
      "Entrepreneurship",
    ],
    exams: ["CAT", "CLAT", "CS Foundation", "CA Foundation", "BBA CET"],
    color: "bg-primary/10 border-primary/30",
    tag: "Growing Fast",
  },
  {
    name: "Arts / Humanities",
    emoji: "🎨",
    fullName: "History, Geography, Political Science, Psychology",
    careers: [
      "Law (LLB/CLAT)",
      "Journalism & Mass Media",
      "Fashion & Interior Design",
      "Psychology & Social Work",
      "Civil Services (IAS/IPS)",
    ],
    exams: ["CLAT", "UCEED", "NIFT", "UPSC", "CEED"],
    color: "bg-accent/10 border-accent/30",
    tag: "Diverse Options",
  },
];

const BOARDS = [
  {
    name: "CBSE",
    desc: "Central Board of Secondary Education. Nationally recognized, ideal for competitive exam preparation.",
    advantage: "Best for JEE, NEET aspirants",
  },
  {
    name: "ICSE",
    desc: "Indian Certificate of Secondary Education. Strong focus on English and analytical skills.",
    advantage: "Strong language & analytical foundation",
  },
  {
    name: "IB (International Baccalaureate)",
    desc: "Globally recognized curriculum for students planning to study abroad.",
    advantage: "Best for international university admissions",
  },
  {
    name: "State Boards",
    desc: "Each state has its own curriculum, often aligned with local engineering and medical entrance exams.",
    advantage: "Local university admission advantage",
  },
];

const FACTORS = [
  "Academic performance and subject strengths",
  "Natural aptitude and preferred learning style",
  "Personal interests, hobbies, and passions",
  "Family expectations and financial planning",
  "Career market demand and future scope",
  "Long-term career goals and lifestyle preferences",
  "Geographic preferences for higher education",
  "Availability of top colleges for chosen stream",
];

export default function StreamSelectionPage() {
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
          <div className="absolute top-16 right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
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
            <span className="text-primary font-medium">Stream Selection</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl">📚</span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mt-4 mb-4">
              Stream Selection
            </h1>
            <p className="text-secondary-foreground/75 max-w-2xl mx-auto text-lg leading-relaxed">
              The most important academic decision of your life. Expert guidance
              for students in Classes 9–12 to choose the right stream, board,
              and career path.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth shadow-lg"
                data-ocid="stream-hero-cta"
              >
                Get Expert Guidance <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#boards"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-secondary-foreground/30 text-secondary-foreground font-semibold hover:bg-white/10 transition-smooth"
              >
                Explore Boards
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stream Options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Explore Your Stream Options
            </h2>
            <p className="text-muted-foreground">
              Each stream opens unique doors to exciting, rewarding career
              opportunities
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {STREAMS.map((stream, i) => (
              <motion.div
                key={stream.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 border ${stream.color} hover:shadow-elevated transition-smooth`}
              >
                {stream.tag && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {stream.tag}
                  </span>
                )}
                <div className="text-4xl mb-3">{stream.emoji}</div>
                <h3 className="font-display font-bold text-base text-foreground mb-1">
                  {stream.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {stream.fullName}
                </p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">
                    Career Options:
                  </p>
                  <ul className="space-y-1">
                    {stream.careers.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1.5">
                    Key Exams:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {stream.exams.map((e) => (
                      <span
                        key={e}
                        className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Guidance */}
      <section id="boards" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Board Guidance
            </h2>
            <p className="text-muted-foreground">
              Choosing the right board is as crucial as choosing the right
              stream
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BOARDS.map((board, i) => (
              <motion.div
                key={board.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
                  <span className="font-display font-extrabold text-xs text-primary-foreground">
                    {board.name.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  {board.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {board.desc}
                </p>
                <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                  ✓ {board.advantage}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Consider + Career Path Mapping */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                What We Consider During Counseling
              </h2>
              <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                Our counselors evaluate multiple factors to recommend the best
                stream-board combination tailored specifically to you:
              </p>
              <ul className="space-y-3">
                {FACTORS.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 border border-border shadow-subtle"
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-3">
                  Career Path Mapping
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We don't just recommend a stream — we map out the complete
                  journey: from stream choice → board → entrance exams → college
                  options → career prospects → salary expectations.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This 360° career path mapping ensures you know exactly where
                  you're headed and what steps to take next.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-primary/5 rounded-2xl p-6 border border-primary/20"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <h3 className="font-display font-bold text-base text-foreground">
                    Parent-Student Joint Counseling
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We strongly encourage parents to attend our sessions. Many
                  stream conflicts arise from miscommunication between parents
                  and students. Our counselors bridge this gap with honest,
                  data-backed discussions to help families make aligned
                  decisions.
                </p>
                <p className="text-xs text-primary font-semibold mt-3">
                  Parent sessions available on weekends — no extra charge.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              Confused About Stream Selection?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Talk to our experts today. Free first session for all students in
              Class 8–12.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
                data-ocid="stream-cta"
              >
                Book Free Counseling <ArrowRight className="w-4 h-4" />
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
