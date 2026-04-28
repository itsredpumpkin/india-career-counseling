import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Career Counseling", href: "/services/career-counseling" },
  { label: "Stream Selection", href: "/services/stream-selection" },
  { label: "Entrance Exam Prep", href: "/services/entrance-exam" },
  { label: "Study Abroad", href: "/services/study-abroad" },
  { label: "Diploma & Placement", href: "/services/diploma-placement" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/assets/icc_colouredasset_14-019d8820-934a-762d-bd71-da9cd9e5193e.png"
                alt="India Career Counseling"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              Empowering India's students with expert career guidance, stream
              selection, entrance exam coaching, and study abroad support since
              2010.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-secondary-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-smooth hover:text-primary"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-smooth flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-smooth flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-secondary-foreground/70">
                  H-15, BSI Business Park 407, 4th Floor, Sector-63, Noida,
                  INDIA
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+918595027085"
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-smooth"
                  >
                    +91 8595027085
                  </a>
                  <a
                    href="tel:+918967600330"
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-smooth"
                  >
                    +91 8967600330
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:indiacareerc@gmail.com"
                  className="text-sm text-secondary-foreground/70 hover:text-primary transition-smooth"
                >
                  indiacareerc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://wa.me/918595027085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-foreground/70 hover:text-primary transition-smooth"
                >
                  WhatsApp: +91 8595027085
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth"
                data-ocid="footer-cta"
              >
                Book Free Session →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10 py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-secondary-foreground/50">
          <p>© {year} India Career Counseling. All rights reserved.</p>
          <p className="text-center">
            Built &amp; design by{" "}
            <span className="text-primary font-semibold">
              Red Pumpkin Marketing
            </span>
          </p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
