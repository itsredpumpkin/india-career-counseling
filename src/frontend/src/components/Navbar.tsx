import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Career Counseling", href: "/services/career-counseling" },
      { label: "Stream Selection", href: "/services/stream-selection" },
      { label: "Entrance Exam Prep", href: "/services/entrance-exam" },
      { label: "Study Abroad", href: "/services/study-abroad" },
      { label: "Diploma & Placement", href: "/services/diploma-placement" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity, login, clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menus on any route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [currentPath]);

  const handleAuth = async () => {
    if (identity) {
      await clear();
      queryClient.clear();
    } else {
      await login();
    }
  };

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-elevated border-b border-secondary-foreground/10"
          : "bg-card border-b border-border/40"
      }`}
      data-ocid="navbar"
    >
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground py-1.5 px-4 text-xs hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            📞{" "}
            <a
              href="tel:+918294023905"
              className="hover:text-primary transition-smooth"
            >
              +91 8294023905
            </a>
            {" | "}
            <a
              href="tel:+919606030954"
              className="hover:text-primary transition-smooth"
            >
              +91 9606030954
            </a>
          </span>
          <span>
            📧{" "}
            <a
              href="mailto:indiacareerc@gmail.com"
              className="hover:text-primary transition-smooth"
            >
              indiacareerc@gmail.com
            </a>
          </span>
        </div>
        <span className="font-medium text-primary">
          🎓 Free Counseling Session – Book Now!
        </span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group" data-ocid="nav-logo">
            <img
              src="/assets/icc_colouredasset_14-019d8820-934a-762d-bd71-da9cd9e5193e.png"
              alt="India Career Counseling"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-smooth"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            data-ocid="nav-desktop"
          >
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-primary/10 hover:text-primary ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : scrolled
                          ? "text-secondary-foreground"
                          : "text-foreground"
                    }`}
                    data-ocid="nav-services-toggle"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-elevated border border-border py-1.5 animate-slide-in-up z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-smooth"
                          data-ocid={`nav-service-${child.href.split("/").pop()}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-primary/10 hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : scrolled
                        ? "text-secondary-foreground"
                        : "text-foreground"
                  }`}
                  data-ocid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Auth Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className={`px-4 py-2 text-sm font-semibold border border-primary rounded-lg hover:bg-primary/10 transition-smooth ${scrolled ? "text-primary" : "text-primary"}`}
              data-ocid="nav-book-session"
            >
              Free Session
            </Link>
            <button
              type="button"
              onClick={handleAuth}
              className="px-4 py-2 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-smooth shadow-subtle"
              data-ocid="nav-auth-btn"
            >
              {identity ? "Logout" : "Admin Login"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className={`lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth ${scrolled ? "text-secondary-foreground" : "text-foreground"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            data-ocid="nav-hamburger"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden bg-card border-t border-border py-3 px-4 animate-slide-in-up shadow-elevated"
          data-ocid="nav-mobile-menu"
        >
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-smooth"
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="ml-4 border-l-2 border-primary/30 pl-3 mt-1 space-y-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-primary/10 hover:text-primary ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          {/* Mobile contact info */}
          <div className="mt-3 pt-3 border-t border-border space-y-1.5 pb-2">
            <a
              href="tel:+918294023905"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              📞 +91 8294023905
            </a>
            <a
              href="tel:+919606030954"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              📞 +91 9606030954
            </a>
            <a
              href="mailto:indiacareerc@gmail.com"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              📧 indiacareerc@gmail.com
            </a>
          </div>
          <div className="pt-1 border-t border-border space-y-2">
            <Link
              to="/contact"
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-primary border border-primary rounded-lg"
            >
              Free Counseling Session
            </Link>
            <button
              type="button"
              onClick={handleAuth}
              className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground"
            >
              {identity ? "Logout" : "Admin Login"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
