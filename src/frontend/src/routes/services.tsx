import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    title: "Career Counseling",
    href: "/services/career-counseling",
    emoji: "🎯",
    desc: "One-on-one psychometric testing, interest mapping, and SWOT analysis to discover your ideal career path with expert mentors.",
    features: [
      "Psychometric & aptitude assessment",
      "Interest & SWOT analysis",
      "Personalized career roadmap",
      "Expert mentor-led sessions",
    ],
    color: "from-primary/15 to-primary/5",
    badge: "Most Popular",
  },
  {
    title: "Stream Selection",
    href: "/services/stream-selection",
    emoji: "📚",
    desc: "Make the most crucial academic decision after 10th class with expert guidance for Science, Commerce, or Arts streams.",
    features: [
      "Science / Commerce / Arts analysis",
      "CBSE, ICSE, IB & State board guidance",
      "Career path mapping",
      "Parent-student joint counseling",
    ],
    color: "from-accent/15 to-accent/5",
    badge: null,
  },
  {
    title: "Entrance Exam Preparation",
    href: "/services/entrance-exam",
    emoji: "📝",
    desc: "Structured coaching for NEET, JEE, CLAT, CAT, UPSC, IELTS, TOEFL, and all major competitive examinations.",
    features: [
      "Medical, Engineering & Management exams",
      "International exams: IELTS, TOEFL, GRE, SAT",
      "Personalized study plans",
      "Mock tests & performance analytics",
    ],
    color: "from-primary/10 to-accent/10",
    badge: null,
  },
  {
    title: "Study in India & Abroad",
    href: "/services/study-abroad",
    emoji: "✈️",
    desc: "End-to-end guidance for studying in USA, UK, Canada, Australia, Germany and more — plus India university admissions.",
    features: [
      "8 top destination countries",
      "Central & state university admissions",
      "SOP, LOR & Visa support",
      "Pre-departure orientation",
    ],
    color: "from-accent/10 to-primary/10",
    badge: null,
  },
  {
    title: "Diploma Courses & Placements",
    href: "/services/diploma-placement",
    emoji: "🎓",
    desc: "Industry-aligned vocational diploma programs in Aviation, Hospitality, IT, Nursing and more — with 100% placement guarantee.",
    features: [
      "Aviation, Hospitality & Nursing diplomas",
      "IT, Digital Marketing & Logistics",
      "100% Job Placement Guarantee",
      "Internships with partner companies",
    ],
    color: "from-primary/15 to-accent/5",
    badge: "100% Placement",
  },
];

const STATS = [
  { value: "5,000+", label: "Students Counseled" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Partner Institutions" },
];

export default function ServicesPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section
        className="py-24 relative"
        style={{
          background: "linear-gradient(135deg, #071a02 0%, #1A5200 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
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
            <span className="text-primary font-medium">Our Services</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30 mb-4">
              Comprehensive Career Guidance
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mb-4">
              Our Services
            </h1>
            <p className="text-secondary-foreground/75 max-w-2xl mx-auto text-lg">
              From stream selection to study abroad — expert guidance at every
              step of your educational journey.
            </p>
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

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose the service that matches your current stage and future
              ambitions
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={service.href}
                  className={`group relative block p-7 rounded-2xl bg-gradient-to-br ${service.color} border border-border hover:border-primary/40 hover:shadow-elevated transition-smooth h-full`}
                  data-ocid={`service-card-${i}`}
                >
                  {service.badge && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {service.badge}
                    </span>
                  )}
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-smooth inline-block">
                    {service.emoji}
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-auto">
                    Explore Service{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ICC */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              Why Choose India Career Counseling?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏆",
                title: "15+ Years Experience",
                desc: "Trusted by thousands of students and parents across India.",
              },
              {
                icon: "👨‍🎓",
                title: "Expert Counselors",
                desc: "IIT/IIM alumni and industry professionals guiding your path.",
              },
              {
                icon: "📍",
                title: "Personalized Approach",
                desc: "Every student's roadmap is unique, never one-size-fits-all.",
              },
              {
                icon: "🤝",
                title: "End-to-End Support",
                desc: "From assessment to admission — we stay by your side.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-elevated transition-smooth"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
              Not sure which service fits you?
            </h2>
            <p className="text-muted-foreground mb-6">
              Book a free discovery session and let our experts guide you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
              data-ocid="services-cta"
            >
              Book Free Session <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
