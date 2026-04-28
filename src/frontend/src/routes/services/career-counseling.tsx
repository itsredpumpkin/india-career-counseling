import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  ChevronRight,
  Compass,
  Home,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const TARGET_GROUPS = [
  {
    icon: "📘",
    group: "Class 8–10 Students",
    desc: "Early career exploration and stream selection guidance before 10th board exams.",
  },
  {
    icon: "📗",
    group: "Class 11–12 Students",
    desc: "Entrance exam planning, college shortlisting, and career path clarification.",
  },
  {
    icon: "🎓",
    group: "Graduates & Post-Graduates",
    desc: "Higher studies guidance, competitive exam strategy, and first job placement support.",
  },
  {
    icon: "💼",
    group: "Working Professionals",
    desc: "Career switch counseling, upskilling pathways, and professional re-orientation.",
  },
];

const STEPS = [
  {
    step: "01",
    icon: Brain,
    title: "Psychometric Assessment",
    desc: "Complete a scientifically validated psychometric test covering personality, aptitude, and cognitive abilities to understand your baseline profile.",
  },
  {
    step: "02",
    icon: Target,
    title: "Interest & SWOT Mapping",
    desc: "Deep-dive into your interests, strengths, weaknesses, opportunities, and threats to build a clear picture of your potential.",
  },
  {
    step: "03",
    icon: Users,
    title: "One-on-One Counseling Session",
    desc: "A dedicated 60-minute session with a senior career counselor to discuss your goals, challenges, and aspirations in detail.",
  },
  {
    step: "04",
    icon: Compass,
    title: "Personalized Career Roadmap",
    desc: "Receive a written career roadmap with specific action steps, timelines, milestones, and recommended institutions.",
  },
  {
    step: "05",
    icon: BarChart3,
    title: "Follow-up & Progress Tracking",
    desc: "Regular follow-up sessions every 3 months to review progress, address challenges, and refine the plan as needed.",
  },
];

const BENEFITS = [
  "Clarity on the right career path aligned with your strengths",
  "Confidence to make informed academic and career decisions",
  "Elimination of confusion from too many career options",
  "Reduction in peer pressure and parental conflicts",
  "Time saved by avoiding wrong course/college choices",
  "Access to expert networks and alumni mentors",
  "Structured action plan with measurable milestones",
  "Lifelong career development support",
];

const CAREERS = [
  "Engineering & Technology",
  "Medicine & Healthcare",
  "Law & Legal Services",
  "Management & MBA",
  "Arts, Design & Media",
  "Science & Research",
  "Commerce & Finance",
  "Teaching & Education",
  "Government & Civil Services",
  "Entrepreneurship & Startups",
  "Aviation & Hospitality",
  "Defense & Armed Forces",
];

export default function CareerCounselingPage() {
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
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
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
            <span className="text-primary font-medium">Career Counseling</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl">🎯</span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mt-4 mb-4">
              Career Counseling
            </h1>
            <p className="text-secondary-foreground/75 max-w-2xl mx-auto text-lg leading-relaxed">
              Personalized career guidance using psychometric testing, interest
              mapping, and SWOT analysis to help you discover and pursue your
              true career path.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth shadow-lg"
                data-ocid="career-hero-cta"
              >
                Book Free Session <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#process"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-secondary-foreground/30 text-secondary-foreground font-semibold hover:bg-white/10 transition-smooth"
              >
                See Our Process
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Psychometric Testing",
                desc: "Scientifically validated assessments covering personality type, aptitude, emotional intelligence, and career alignment index.",
                stat: "30+ Parameters",
              },
              {
                icon: Lightbulb,
                title: "Interest & Aptitude Mapping",
                desc: "Deep interest profiling combined with aptitude analysis to identify careers where you will naturally thrive and succeed.",
                stat: "15+ Career Streams",
              },
              {
                icon: BarChart3,
                title: "SWOT Analysis",
                desc: "Honest evaluation of your Strengths, Weaknesses, Opportunities, and Threats relative to your target career paths.",
                stat: "98% Accuracy",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-elevated transition-smooth"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wide">
                  {card.stat}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Who Should Seek Counseling?
            </h2>
            <p className="text-muted-foreground">
              Our programs are tailored for every stage of the academic and
              professional journey
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TARGET_GROUPS.map((tg, i) => (
              <motion.div
                key={tg.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth text-center"
              >
                <div className="text-4xl mb-3">{tg.icon}</div>
                <h3 className="font-display font-bold text-sm text-foreground mb-2">
                  {tg.group}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tg.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section id="process" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Our 5-Step Counseling Process
            </h2>
            <p className="text-muted-foreground">
              A systematic, proven approach to career clarity
            </p>
          </motion.div>
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-border z-0" />
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
                >
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-3">
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-display font-extrabold text-primary/30 mb-1">
                    {s.step}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                Benefits of Career Counseling
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Investing in professional career counseling early in your
                academic journey can save years of uncertainty and thousands of
                rupees in wrong course fees.
              </p>
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border shadow-subtle"
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-5">
                Career Streams We Cover
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {CAREERS.map((career) => (
                  <span
                    key={career}
                    className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 hover:bg-primary/20 transition-smooth"
                  >
                    {career}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "I was completely confused between Engineering and Medicine.
                  After ICC's counseling, I chose Computer Science and I've
                  never been happier." — Priya Sharma, IIT Delhi
                </p>
              </div>
            </motion.div>
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
              Start Your Career Discovery Today
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              First session is completely free. No strings attached. Our expert
              counselors are ready to guide you.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
                data-ocid="career-cta"
              >
                Book Free Session <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-smooth"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
