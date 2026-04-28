import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronRight,
  FileText,
  Globe,
  Home,
  Plane,
} from "lucide-react";
import { motion } from "motion/react";

const COUNTRIES = [
  {
    flag: "🇺🇸",
    name: "United States",
    shortName: "USA",
    desc: "MIT, Stanford, Harvard, Caltech. World's best STEM and research programs.",
    intake: "September / January",
    popular: ["Computer Science", "Engineering", "Business", "Medicine"],
    visa: "F-1 Student Visa",
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    shortName: "UK",
    desc: "Oxford, Cambridge, Imperial, UCL. 1-year Master's programs save time & money.",
    intake: "September / January",
    popular: ["Law", "Finance", "Engineering", "Arts & Design"],
    visa: "Student Visa (Tier 4)",
  },
  {
    flag: "🇨🇦",
    name: "Canada",
    shortName: "Canada",
    desc: "Post-study work permit up to 3 years. Toronto, UBC, McGill — diverse & welcoming.",
    intake: "September / January",
    popular: ["IT & Cybersecurity", "MBA", "Nursing", "Engineering"],
    visa: "Study Permit",
  },
  {
    flag: "🇦🇺",
    name: "Australia",
    shortName: "Australia",
    desc: "Melbourne, Sydney, ANU. Strong research culture and part-time work allowed.",
    intake: "February / July",
    popular: ["Mining Engineering", "Business", "IT", "Health Sciences"],
    visa: "Student Visa (Subclass 500)",
  },
  {
    flag: "🇩🇪",
    name: "Germany",
    shortName: "Germany",
    desc: "Free / low-cost tuition at public universities. TU Munich, Heidelberg — world-class engineering.",
    intake: "April / October",
    popular: ["Engineering", "Automotive", "Research", "Architecture"],
    visa: "Student Visa (National Visa D)",
  },
  {
    flag: "🇳🇿",
    name: "New Zealand",
    shortName: "New Zealand",
    desc: "Safe, scenic and student-friendly. University of Auckland, Otago. PR pathway available.",
    intake: "February / July",
    popular: ["Agriculture", "IT", "Nursing", "Tourism & Hospitality"],
    visa: "Student Visa",
  },
  {
    flag: "🇸🇬",
    name: "Singapore",
    shortName: "Singapore",
    desc: "NUS & NTU in global top 15. Proximity to India with English-medium education.",
    intake: "August / January",
    popular: [
      "Finance",
      "Computer Science",
      "Business Analytics",
      "Engineering",
    ],
    visa: "Student's Pass",
  },
  {
    flag: "🇮🇪",
    name: "Ireland",
    shortName: "Ireland",
    desc: "Tech hub of Europe. Trinity College Dublin, UCD. 2-year post-study work visa.",
    intake: "September / January",
    popular: ["Data Analytics", "Pharma", "Finance", "Computer Science"],
    visa: "Study Visa (D Visa)",
  },
];

const INDIA_SERVICES = [
  {
    icon: "🏛️",
    title: "Central University Admissions",
    desc: "CUET guidance for Delhi University, JNU, BHU, Hyderabad Central, Jamia Millia and other top central universities.",
    exams: ["CUET UG", "CUET PG", "JNU Entrance"],
  },
  {
    icon: "🎓",
    title: "State University Admissions",
    desc: "Complete support for state board-based admissions, state CET exams, and counseling rounds for government and aided colleges.",
    exams: ["MHT-CET", "AP-EAPCET", "TS-EAMCET", "KCET", "WBJEE"],
  },
  {
    icon: "🏢",
    title: "Private Institution Admissions",
    desc: "Shortlisting and application management for top private universities including Manipal, Amity, LPU, SRM, Ashoka, and Flame.",
    exams: ["MAHE", "SRMJEEE", "LPUNEST", "SET"],
  },
];

const ADDITIONAL_SERVICES = [
  {
    icon: Plane,
    title: "Visa Support",
    desc: "End-to-end visa application assistance including documentation checklist, DS-160, biometrics scheduling, and mock visa interview practice.",
  },
  {
    icon: FileText,
    title: "SOP & LOR Help",
    desc: "Expert guidance to craft a compelling Statement of Purpose and Letters of Recommendation that stand out to admission committees.",
  },
  {
    icon: BookOpen,
    title: "Scholarship Guidance",
    desc: "Research and apply for merit scholarships, country-specific awards (Chevening, Fulbright, DAAD, Erasmus), and university grants.",
  },
  {
    icon: Globe,
    title: "Pre-Departure Guidance",
    desc: "Accommodation search, forex assistance, health insurance, bank account setup, and cultural orientation before you fly out.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Profile Assessment",
    desc: "Evaluate academic scores, test scores, work experience and career goals.",
  },
  {
    step: "02",
    title: "University Shortlisting",
    desc: "Research 8–12 universities based on fit, ranking, budget and acceptance rate.",
  },
  {
    step: "03",
    title: "Test Preparation",
    desc: "IELTS/TOEFL/GRE/SAT coaching if needed to meet score requirements.",
  },
  {
    step: "04",
    title: "SOP & Applications",
    desc: "Craft compelling essays and submit polished applications on time.",
  },
  {
    step: "05",
    title: "Visa & Pre-departure",
    desc: "Visa coaching, accommodation, insurance, and orientation briefing.",
  },
];

export default function StudyAbroadPage() {
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
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
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
              Study in India & Abroad
            </span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl">✈️</span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mt-4 mb-4">
              Study in India & Abroad
            </h1>
            <p className="text-secondary-foreground/75 max-w-2xl mx-auto text-lg leading-relaxed">
              Comprehensive guidance for admissions across 8 destination
              countries — and top institutions across India. From application to
              visa, we handle it all.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth shadow-lg"
                data-ocid="abroad-hero-cta"
              >
                Start My Journey <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-secondary-foreground/30 text-secondary-foreground font-semibold hover:bg-white/10 transition-smooth"
              >
                View Destinations
              </a>
            </div>
          </motion.div>
          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-3xl mx-auto"
          >
            {[
              { value: "8+", label: "Destination Countries" },
              { value: "500+", label: "Students Placed Abroad" },
              { value: "95%", label: "Visa Success Rate" },
              { value: "₹50L+", label: "Scholarships Secured" },
            ].map((stat) => (
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

      {/* Destination Countries */}
      <section id="destinations" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Top Study Abroad Destinations
            </h2>
            <p className="text-muted-foreground">
              We guide students to the best universities in 8 countries
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COUNTRIES.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card rounded-2xl p-5 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground">
                      {country.name}
                    </h3>
                    <span className="text-xs text-primary font-semibold">
                      Intake: {country.intake}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {country.desc}
                </p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">
                    Popular Programs:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {country.popular.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-2">
                  🛂 {country.visa}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study in India */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Study in India Admissions
            </h2>
            <p className="text-muted-foreground">
              Expert support for admissions across India's top institutions
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {INDIA_SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
              >
                <div className="text-4xl mb-3">{svc.icon}</div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {svc.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.exams.map((e) => (
                    <span
                      key={e}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Additional Support Services
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADDITIONAL_SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-elevated transition-smooth"
              >
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <svc.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-foreground">
              Our 5-Step Process
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border text-center hover:border-primary/40 hover:shadow-elevated transition-smooth"
              >
                <div className="text-3xl font-display font-extrabold text-primary/30 mb-2">
                  {p.step}
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility note */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">ℹ️</span>
              <div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  Eligibility Requirements
                </h3>
                <ul className="space-y-1.5">
                  {[
                    "Minimum 60% in Class 12 for most international programs",
                    "IELTS 6.0–7.0 or TOEFL 80–100 for English-medium universities",
                    "GRE/GMAT scores required for US/UK graduate programs",
                    "Financial proof / bank statements for visa application",
                  ].map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
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
              Ready to Study Abroad or in India?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our experts have helped 500+ students secure admissions worldwide.
              Book a free consultation today.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
                data-ocid="abroad-cta"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
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
