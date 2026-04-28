import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Home,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

type DiplomaProgram = {
  category: string;
  emoji: string;
  programs: {
    name: string;
    duration: string;
    fees: string;
    eligibility: string;
    placement: string;
  }[];
};

const DIPLOMA_CATEGORIES: DiplomaProgram[] = [
  {
    category: "Aviation",
    emoji: "✈️",
    programs: [
      {
        name: "Cabin Crew Training",
        duration: "6 Months",
        fees: "₹80,000",
        eligibility: "12th Pass, Height 157cm+",
        placement: "Indigo, SpiceJet, Air India",
      },
      {
        name: "Airport Ground Staff",
        duration: "3 Months",
        fees: "₹45,000",
        eligibility: "12th Pass",
        placement: "GMR, CISF, Airlines",
      },
      {
        name: "Air Ticketing & Reservation",
        duration: "3 Months",
        fees: "₹35,000",
        eligibility: "12th Pass, Basic Computer",
        placement: "Travel Agencies, GDS Operators",
      },
    ],
  },
  {
    category: "Hospitality Management",
    emoji: "🏨",
    programs: [
      {
        name: "Hotel Management (Diploma)",
        duration: "1 Year",
        fees: "₹60,000",
        eligibility: "10th/12th Pass",
        placement: "Marriott, Taj, Oberoi Hotels",
      },
      {
        name: "Food & Beverage Service",
        duration: "6 Months",
        fees: "₹30,000",
        eligibility: "10th Pass",
        placement: "Restaurants, Caterers, Airlines",
      },
      {
        name: "Housekeeping & Front Desk",
        duration: "3 Months",
        fees: "₹20,000",
        eligibility: "10th Pass",
        placement: "Hotels, Resorts, Cruise Ships",
      },
    ],
  },
  {
    category: "Nursing & Healthcare",
    emoji: "🏥",
    programs: [
      {
        name: "Nursing Assistant (CNA)",
        duration: "6 Months",
        fees: "₹40,000",
        eligibility: "10th Pass, Science preferred",
        placement: "Hospitals, Clinics, ICUs",
      },
      {
        name: "Medical Lab Technician",
        duration: "1 Year",
        fees: "₹55,000",
        eligibility: "12th Science",
        placement: "Diagnostic Labs, Hospitals",
      },
      {
        name: "Healthcare Support Staff",
        duration: "3 Months",
        fees: "₹25,000",
        eligibility: "10th Pass",
        placement: "Hospitals, Old Age Homes",
      },
    ],
  },
  {
    category: "IT & Digital Marketing",
    emoji: "💻",
    programs: [
      {
        name: "Diploma in Computer Applications (DCA)",
        duration: "1 Year",
        fees: "₹25,000",
        eligibility: "10th Pass",
        placement: "IT Firms, BPOs, Govt Offices",
      },
      {
        name: "Digital Marketing Professional",
        duration: "6 Months",
        fees: "₹30,000",
        eligibility: "12th Pass",
        placement: "Agencies, E-Commerce, Startups",
      },
      {
        name: "Tally & Accounting Software",
        duration: "3 Months",
        fees: "₹15,000",
        eligibility: "10th Pass, Commerce preferred",
        placement: "CAs, SMEs, Retail Chains",
      },
    ],
  },
  {
    category: "Supply Chain & Logistics",
    emoji: "🚚",
    programs: [
      {
        name: "Logistics & Supply Chain Management",
        duration: "6 Months",
        fees: "₹35,000",
        eligibility: "12th Pass",
        placement: "Amazon, Flipkart, DHL, DTDC",
      },
      {
        name: "Warehouse & Inventory Management",
        duration: "3 Months",
        fees: "₹20,000",
        eligibility: "10th Pass",
        placement: "E-Commerce, FMCG Companies",
      },
    ],
  },
  {
    category: "BPO & Customer Care",
    emoji: "🎧",
    programs: [
      {
        name: "BPO & Call Center Training",
        duration: "1 Month",
        fees: "₹10,000",
        eligibility: "12th Pass, English Communication",
        placement: "Wipro BPS, Concentrix, Teleperformance",
      },
      {
        name: "Customer Relationship Management",
        duration: "3 Months",
        fees: "₹18,000",
        eligibility: "12th Pass",
        placement: "Banks, Insurance, Telecom",
      },
    ],
  },
];

const WHY_CHOOSE = [
  {
    icon: Award,
    title: "100% Job Placement Guarantee",
    desc: "We guarantee placement support for every enrolled student. If you complete the program, we ensure you get placed — or we refund your fees.",
    highlight: "Placement Guaranteed",
  },
  {
    icon: Users,
    title: "Soft Skills & Interview Training",
    desc: "Dedicated modules on communication, group discussion, personality development, and mock HR/technical interview preparation.",
    highlight: "20+ Hours Training",
  },
  {
    icon: Briefcase,
    title: "Internships with Partner Companies",
    desc: "Live internship opportunities with 100+ partner companies across aviation, hospitality, IT and healthcare sectors — before you graduate.",
    highlight: "100+ Partners",
  },
  {
    icon: TrendingUp,
    title: "Industry-Aligned Curriculum",
    desc: "Courses designed with industry partners to ensure every skill taught is immediately applicable on the job. Updated every year.",
    highlight: "Updated Annually",
  },
];

const PLACEMENT_COMPANIES = [
  "Air India",
  "IndiGo",
  "SpiceJet",
  "Taj Hotels",
  "Marriott",
  "OYO",
  "Apollo Hospitals",
  "Wipro BPS",
  "Concentrix",
  "Amazon",
  "Flipkart",
  "DHL",
  "DTDC",
  "HDFC Bank",
];

export default function DiplomaPlacementPage() {
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
              Diploma Courses & Placements
            </span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl">🎓</span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mt-4 mb-4">
              Diploma Courses & Placements
            </h1>
            <p className="text-secondary-foreground/75 max-w-2xl mx-auto text-lg leading-relaxed">
              Industry-aligned vocational diploma programs in Aviation,
              Hospitality, IT, Nursing, Logistics and more — with a{" "}
              <span className="text-primary font-bold">
                100% Job Placement Guarantee.
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth shadow-lg"
                data-ocid="diploma-hero-cta"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#programs"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-secondary-foreground/30 text-secondary-foreground font-semibold hover:bg-white/10 transition-smooth"
              >
                Browse Programs
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
            {[
              { value: "100%", label: "Placement Guarantee" },
              { value: "100+", label: "Hiring Partners" },
              { value: "15+", label: "Diploma Programs" },
              { value: "2,000+", label: "Students Placed" },
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

      {/* Why Choose */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Why Choose Our Diploma Programs?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-3">
                  {item.highlight}
                </span>
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diploma Programs */}
      <section id="programs" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Our Diploma Programs
            </h2>
            <p className="text-muted-foreground">
              Skill-based programs designed with industry partners for
              guaranteed employment
            </p>
          </motion.div>
          <div className="space-y-12">
            {DIPLOMA_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {cat.category}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.programs.map((prog, i) => (
                    <motion.div
                      key={prog.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-card rounded-2xl p-5 border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth"
                    >
                      <h4 className="font-display font-bold text-sm text-foreground mb-3">
                        {prog.name}
                      </h4>
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Duration
                          </span>
                          <span className="font-semibold text-foreground">
                            {prog.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Program Fees
                          </span>
                          <span className="font-bold text-primary text-sm">
                            {prog.fees}
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-xs gap-2">
                          <span className="text-muted-foreground shrink-0">
                            Eligibility
                          </span>
                          <span className="font-medium text-foreground text-right">
                            {prog.eligibility}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-border pt-2.5 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          Hiring: {prog.placement}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              Our Hiring Partners
            </h2>
            <p className="text-muted-foreground text-sm">
              100+ companies actively recruit from our diploma programs
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {PLACEMENT_COMPANIES.map((company) => (
              <span
                key={company}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-smooth"
              >
                {company}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              +90 more companies
            </span>
          </motion.div>
        </div>
      </section>

      {/* Fee Note */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <h3 className="font-display font-bold text-base text-foreground mb-3">
              Fee & Admission Details
            </h3>
            <ul className="space-y-2">
              {[
                "Fees quoted are for the full program — no hidden charges",
                "EMI options available: 3–6 months interest-free",
                "10% sibling / early-bird discount applicable",
                "Admission open throughout the year — batch starts monthly",
                "GST applicable as per Government norms",
              ].map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
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
              Jumpstart Your Career Today
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              100% placement assistance for all enrolled students. Speak to our
              counselor to find the right diploma for your goals.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
                data-ocid="diploma-cta"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
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
