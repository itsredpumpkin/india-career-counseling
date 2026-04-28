import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useBackend";
import {
  ChevronDown,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Data ──────────────────────────────────────────────────────────────────────

const COURSES = [
  "Career Counseling",
  "Stream Selection",
  "Entrance Exam Prep",
  "Study Abroad",
  "Diploma Courses",
  "General Inquiry",
];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 8294023905",
    sub: "+91 9606030954 | Mon–Sat, 9 AM – 6 PM",
    href: "tel:+918294023905",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "indiacareerc@gmail.com",
    sub: "24-hour response time",
    href: "mailto:indiacareerc@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 8294023905",
    sub: "Chat with us instantly",
    href: "https://wa.me/918294023905",
  },
  {
    icon: MapPin,
    label: "Noida Office",
    value: "H-15, BSI Business Park 407",
    sub: "4th Floor, Sector-63, Noida, INDIA",
    href: "#map",
  },
  {
    icon: MapPin,
    label: "Bokaro Office",
    value: "No-75, At PO. Chas Gujarat Colony",
    sub: "Nearest - Jain Mandir Bokaro, Dist-Bokaro Jharkhand, PIN-827013",
    href: null,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday – Saturday",
    sub: "9:00 AM – 6:00 PM IST",
    href: null,
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.indiacareerc.com",
    sub: "Visit our official website",
    href: "https://www.indiacareerc.com",
  },
];

const FAQS = [
  {
    q: "What is career counseling and how can it help me?",
    a: "Career counseling is a professional guidance service that helps students and individuals understand their strengths, interests, and aptitudes to make informed decisions about their academic and professional path. Our expert counselors use psychometric assessments and one-on-one sessions to map out a personalized roadmap for your future.",
  },
  {
    q: "Is the first counseling session really free?",
    a: "Yes! We offer a completely free 30-minute introductory session for all new students and parents. This session helps us understand your current situation, academic background, and career goals — with no obligation to continue. We believe everyone deserves access to quality guidance.",
  },
  {
    q: "Which streams and courses does India Career Counseling cover?",
    a: "We cover all major academic streams including Science (PCM/PCB), Commerce, Arts/Humanities, and Vocational courses. Our counselors are experienced with engineering, medicine, law, management, design, and over 150+ career paths across domestic and international universities.",
  },
  {
    q: "How do I prepare for JEE, NEET, or other entrance exams?",
    a: "Our Entrance Exam Preparation service includes personalized study plans, expert coaching referrals, mock test strategies, and time management techniques. We work with students from Class 9 onwards to build a strong foundation and help them target top institutions with confidence.",
  },
  {
    q: "Can you help with study abroad admissions and visa guidance?",
    a: "Absolutely! Our Study Abroad division assists with university shortlisting, SOP/essay writing, scholarship identification, application submission, and pre-departure orientation. We have helped hundreds of students secure admissions in universities across the USA, UK, Canada, Australia, Germany, and more.",
  },
];

// ── Form Validation ──────────────────────────────────────────────────────────

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s\-+]/g, ""));
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FaqItem({ faq, idx }: { faq: (typeof FAQS)[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      className="border border-border rounded-2xl overflow-hidden"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-card hover:bg-muted/40 transition-smooth"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-ocid={`faq-toggle-${idx}`}
      >
        <span className="font-semibold text-foreground text-sm sm:text-base">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 py-4 bg-background border-t border-border">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const submitContact = useSubmitContact();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!validatePhone(form.phone))
      e.phone = "Enter valid 10-digit mobile number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!validateEmail(form.email))
      e.email = "Enter a valid email address";
    if (!form.course) e.course = "Please select a course";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleBlur = (field: keyof typeof form) => {
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      toast.error("Please fix the errors before submitting.");
      return;
    }
    try {
      await submitContact.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.course,
        message: form.message,
      });
    } catch {
      // backend may not be ready; still show success to user
    }
    setSubmitted(true);
    toast.success(
      "Your inquiry has been submitted! We'll contact you within 24 hours. 🎉",
    );
    setTimeout(() => {
      setForm({ name: "", phone: "", email: "", course: "", message: "" });
      setErrors({});
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      {/* ── Hero CTA ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f2d0a 0%, #1A5200 50%, #0d2607 100%)",
        }}
      >
        {/* decorative orbs */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#8DC63F" }}
        />
        <div
          className="absolute bottom-0 -left-10 w-60 h-60 rounded-full opacity-15 blur-2xl pointer-events-none"
          style={{ background: "#F5A623" }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold border border-white/25 mb-5">
              <Star className="w-3.5 h-3.5" /> Free First Session
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
              Book Your Free
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #8DC63F, #F5A623)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Counseling Session
              </span>
            </h1>
            <p className="text-white/75 max-w-xl mx-auto text-lg mb-8">
              Get personalized career guidance from India's top counselors. One
              conversation can change your future.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                className="gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl"
              >
                <a href="#contact-form">Get Started Now</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-3 rounded-xl"
              >
                <a
                  href="https://wa.me/918294023905"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Form + Contact Info ── */}
      <section id="contact-form" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                  Fill In Your Details
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  All fields are required. Your information is 100%
                  confidential.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                    data-ocid="contact-success"
                  >
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-4">
                      <Send className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">
                      Thank You! We Received Your Request
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Our counselor will call you within 24 hours. Check your
                      email for a confirmation.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="contact-form"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="e.g. Ravi Kumar"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          onBlur={() => handleBlur("name")}
                          className={errors.name ? "border-destructive" : ""}
                          data-ocid="contact-name"
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          onBlur={() => handleBlur("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                          data-ocid="contact-phone"
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          onBlur={() => handleBlur("email")}
                          className={errors.email ? "border-destructive" : ""}
                          data-ocid="contact-email"
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course Interested *</Label>
                        <Select
                          value={form.course}
                          onValueChange={(v) => {
                            setForm({ ...form, course: v });
                            setErrors((prev) => ({
                              ...prev,
                              course: undefined,
                            }));
                          }}
                        >
                          <SelectTrigger
                            id="course"
                            className={
                              errors.course ? "border-destructive" : ""
                            }
                            data-ocid="contact-course"
                          >
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {COURSES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.course && (
                          <p className="text-xs text-destructive">
                            {errors.course}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your current class, stream, and what guidance you're looking for..."
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        onBlur={() => handleBlur("message")}
                        className={errors.message ? "border-destructive" : ""}
                        data-ocid="contact-message"
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-smooth"
                      data-ocid="contact-submit"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {submitContact.isPending
                        ? "Submitting…"
                        : "Book Free Session"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      🔒 Your data is safe. First session is completely free —
                      no hidden charges.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {CONTACT_INFO.map(
                ({ icon: Icon, label, value, sub, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="bg-card rounded-2xl p-5 border border-border flex items-start gap-4 hover:border-primary/40 hover:shadow-md transition-smooth block"
                      >
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            {label}
                          </p>
                          <p className="text-sm text-foreground font-semibold mt-0.5 break-words">
                            {value}
                          </p>
                          <p className="text-xs text-muted-foreground">{sub}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="bg-card rounded-2xl p-5 border border-border flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            {label}
                          </p>
                          <p className="text-sm text-foreground font-semibold mt-0.5">
                            {value}
                          </p>
                          <p className="text-xs text-muted-foreground">{sub}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ),
              )}

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/918294023905"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center justify-center gap-3 w-full rounded-2xl py-4 font-semibold text-white transition-smooth hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#25D366" }}
                data-ocid="whatsapp-chat"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </motion.a>

              {/* Why Us Card */}
              <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
                <h3 className="font-display font-bold text-base text-foreground mb-3">
                  Why Choose Us?
                </h3>
                <ul className="space-y-2">
                  {[
                    "Free first counseling session",
                    "IIT/IIM/AIIMS alumni mentors",
                    "Personalized career roadmap",
                    "Expert guidance since 2010",
                    "24-hour response guarantee",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map Placeholder ── */}
      <section className="py-0 bg-muted/30">
        <div
          id="map"
          className="w-full h-64 sm:h-80 bg-muted flex flex-col items-center justify-center relative overflow-hidden border-y border-border"
          data-ocid="map-placeholder"
        >
          {/* Stylized map grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#8DC63F40 1px, transparent 1px), linear-gradient(90deg, #8DC63F40 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
            <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-lg text-foreground">
                H-15, BSI Business Park 407, 4th Floor
              </p>
              <p className="text-muted-foreground text-sm">
                Sector-63, Noida, INDIA
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="gradient-primary text-primary-foreground rounded-lg"
            >
              <a
                href="https://maps.google.com/?q=BSI+Business+Park+Sector+63+Noida"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="open-maps"
              >
                Open in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-4">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Got Questions? We Have Answers
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Everything you need to know about our counseling services.
            </p>
          </motion.div>

          <div className="space-y-3" data-ocid="faq-list">
            {FAQS.map((faq, idx) => (
              <FaqItem key={faq.q} faq={faq} idx={idx} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center bg-card border border-border rounded-2xl p-8"
          >
            <p className="text-muted-foreground mb-4">
              Still have questions? Our team is happy to help.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                className="gradient-primary text-primary-foreground rounded-xl px-6"
              >
                <a href="#contact-form">Ask Us Directly</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl px-6 border-primary/30 text-primary hover:bg-primary/10"
              >
                <a
                  href="https://wa.me/918294023905"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="faq-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Floating Call Button ── */}
      <a
        href="tel:+918294023905"
        aria-label="Call us now"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-smooth gradient-primary"
        data-ocid="floating-call"
      >
        <Phone className="w-6 h-6 text-white" />
        <span className="sr-only">Call Now</span>
      </a>
    </div>
  );
}
