import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useListCourses } from "@/hooks/useBackend";
import type { Course } from "@/types/icc";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Filter,
  GraduationCap,
  IndianRupee,
  Search,
  Timer,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Static fallback courses ──────────────────────────────────────────────────
const SAMPLE_COURSES: Course[] = [
  {
    id: "btech-cs",
    title: "B.Tech Computer Science",
    stream: "Engineering",
    level: "Bachelor",
    duration: "4 Years",
    fees: 150000,
    eligibility: "10+2 with PCM, JEE Main score required",
    description:
      "India's most sought-after engineering degree focusing on software, algorithms, AI, and emerging technologies.",
    colleges: [
      "IIT Bombay",
      "IIT Delhi",
      "NIT Trichy",
      "BITS Pilani",
      "VIT Vellore",
      "SRM University",
    ],
    highlights: [
      "JEE Main / Advanced required",
      "Avg package ₹20–60 LPA at IITs",
      "AI, ML, Cloud specializations",
    ],
    careerProspects: [
      "Software Engineer",
      "Data Scientist",
      "AI/ML Engineer",
      "Product Manager",
      "Startup Founder",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "mbbs",
    title: "MBBS",
    stream: "Medical",
    level: "Bachelor",
    duration: "5.5 Years",
    fees: 800000,
    eligibility: "10+2 with PCB, NEET UG required",
    description:
      "Bachelor of Medicine & Surgery — the primary medical degree in India, producing qualified doctors with comprehensive clinical training.",
    colleges: [
      "AIIMS Delhi",
      "CMC Vellore",
      "JIPMER Pondicherry",
      "KMC Manipal",
      "AFMC Pune",
    ],
    highlights: [
      "NEET UG required",
      "1-year compulsory internship",
      "Govt seats highly subsidized",
    ],
    careerProspects: [
      "General Physician",
      "Specialist Doctor",
      "Surgeon",
      "Medical Researcher",
      "Public Health Officer",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "mba",
    title: "MBA",
    stream: "Management",
    level: "Master",
    duration: "2 Years",
    fees: 300000,
    eligibility: "Any bachelor's degree, 50% marks, CAT/XAT/MAT required",
    description:
      "Master of Business Administration — the flagship management degree. IIM graduates earn among the highest salaries in India.",
    colleges: [
      "IIM Ahmedabad",
      "IIM Bangalore",
      "ISB Hyderabad",
      "XLRI Jamshedpur",
      "FMS Delhi",
    ],
    highlights: [
      "CAT / XAT / GMAT required",
      "Avg package at IIM-A: ₹35+ LPA",
      "Global exchange programs",
    ],
    careerProspects: [
      "Management Consultant",
      "Investment Banker",
      "Marketing Manager",
      "Product Manager",
      "Finance Analyst",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "llb",
    title: "LLB",
    stream: "Law",
    level: "Bachelor",
    duration: "3 Years",
    fees: 80000,
    eligibility: "Graduation in any discipline, minimum 45% marks",
    description:
      "Bachelor of Laws — a prestigious degree leading to careers in advocacy, corporate law, judiciary, and public policy.",
    colleges: [
      "NLSIU Bangalore",
      "NALSAR Hyderabad",
      "NLU Delhi",
      "NUJS Kolkata",
      "NLU Jodhpur",
    ],
    highlights: [
      "CLAT / AILET for NLUs",
      "NLU grads earn ₹15–30 LPA",
      "Corporate & IPR law in demand",
    ],
    careerProspects: [
      "Advocate",
      "Corporate Lawyer",
      "Public Prosecutor",
      "Legal Advisor",
      "Judge",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "bpharm",
    title: "B.Pharm",
    stream: "Science",
    level: "Bachelor",
    duration: "4 Years",
    fees: 120000,
    eligibility: "10+2 with PCB/PCM, minimum 50% marks",
    description:
      "Bachelor of Pharmacy — a professional degree for careers in pharmaceutical industry, hospital pharmacy, and drug research.",
    colleges: [
      "Manipal Pharmacy College",
      "JSS Pharmacy College",
      "ICT Mumbai",
      "Amrita School of Pharmacy",
      "Bombay College of Pharmacy",
    ],
    highlights: [
      "High demand in pharma industry",
      "Research & quality control roles",
      "MNC pharma excellent salaries",
    ],
    careerProspects: [
      "Clinical Pharmacist",
      "Drug Inspector",
      "Research Scientist",
      "Hospital Pharmacist",
      "Regulatory Affairs",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "barch",
    title: "B.Arch",
    stream: "Arts",
    level: "Bachelor",
    duration: "5 Years",
    fees: 200000,
    eligibility: "10+2 with Math, NATA / JEE Paper 2 required",
    description:
      "Bachelor of Architecture — a creative and technical degree that trains students in architectural design, urban planning, and sustainable construction.",
    colleges: [
      "SPA Delhi",
      "CEPT Ahmedabad",
      "IIT Roorkee",
      "NIT Trichy",
      "Jadavpur University",
    ],
    highlights: [
      "NATA entrance exam required",
      "Design + technical blend",
      "Urban planning career path",
    ],
    careerProspects: [
      "Architect",
      "Urban Planner",
      "Interior Designer",
      "Project Manager",
      "Sustainability Consultant",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "bca",
    title: "BCA",
    stream: "Engineering",
    level: "Bachelor",
    duration: "3 Years",
    fees: 60000,
    eligibility: "10+2 with Mathematics (any stream), 45% marks",
    description:
      "Bachelor of Computer Applications — focused on software development, programming, and IT management without engineering entrance requirements.",
    colleges: [
      "Symbiosis Institute Pune",
      "Christ University Bangalore",
      "Amity University",
      "Manipal University",
      "VIT Vellore",
    ],
    highlights: [
      "No engineering entrance required",
      "Strong IT sector placement",
      "Gateway to MCA or MBA",
    ],
    careerProspects: [
      "Software Developer",
      "Web Developer",
      "App Developer",
      "Database Admin",
      "Business Analyst",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "bsc-physics",
    title: "B.Sc Physics",
    stream: "Science",
    level: "Bachelor",
    duration: "3 Years",
    fees: 40000,
    eligibility: "10+2 with PCM, minimum 50% marks",
    description:
      "Bachelor of Science in Physics — foundational degree for research, academia, and emerging technology roles in quantum computing and photonics.",
    colleges: [
      "IISc Bangalore",
      "Hindu College Delhi",
      "St. Stephen's Delhi",
      "Miranda House Delhi",
      "Fergusson College Pune",
    ],
    highlights: [
      "Foundation for IIT JAM / GATE",
      "Research at IISc, TIFR",
      "Government sector opportunities",
    ],
    careerProspects: [
      "Research Scientist",
      "Data Analyst",
      "Science Teacher",
      "Quantum Computing",
      "Environmental Scientist",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "phd-engineering",
    title: "Ph.D Engineering",
    stream: "Engineering",
    level: "PhD",
    duration: "3–5 Years",
    fees: 250000,
    eligibility: "M.Tech/M.E. with 60% marks, GATE/UGC-NET required",
    description:
      "Doctor of Philosophy in Engineering — the highest academic degree focusing on cutting-edge research in specialized engineering domains.",
    colleges: [
      "IIT Bombay",
      "IIT Delhi",
      "IIT Madras",
      "IISc Bangalore",
      "IIT Kharagpur",
    ],
    highlights: [
      "GATE scholarship ₹31,000/month",
      "Publications in top journals",
      "Industry R&D collaboration",
    ],
    careerProspects: [
      "University Professor",
      "DRDO/ISRO Scientist",
      "R&D Lead",
      "Patent Consultant",
      "Innovation Director",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "diploma-aviation",
    title: "Diploma Aviation",
    stream: "Engineering",
    level: "Diploma",
    duration: "1 Year",
    fees: 180000,
    eligibility: "10+2 with PCM, English proficiency required",
    description:
      "Diploma in Aviation Management & Operations — trains students for roles in airline operations, ground handling, and airport management.",
    colleges: [
      "Indira Gandhi Institute of Aeronautics",
      "Air Hostess Academy Delhi",
      "Frankfinn Institute",
      "IATA Training",
      "AAI Training Academy",
    ],
    highlights: [
      "Fast-track career in aviation",
      "Airport & airline operations",
      "Cabin crew pathway",
    ],
    careerProspects: [
      "Ground Staff",
      "Cabin Crew",
      "Airport Operations",
      "Travel Coordinator",
      "Airline Ticketing Agent",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "diploma-hospitality",
    title: "Diploma Hospitality",
    stream: "Arts",
    level: "Diploma",
    duration: "1 Year",
    fees: 90000,
    eligibility: "10+2 (any stream), communication skills preferred",
    description:
      "Diploma in Hospitality Management — prepares students for rewarding careers in hotel management, event planning, and tourism.",
    colleges: [
      "IHM Delhi",
      "IHM Mumbai",
      "Welcomgroup Graduate School",
      "Manipal School of Hospitality",
      "Oberoi Centre of Learning",
    ],
    highlights: [
      "Fast placement in 5-star hotels",
      "International career scope",
      "Hands-on training",
    ],
    careerProspects: [
      "Hotel Manager",
      "Event Coordinator",
      "Chef",
      "Tourism Officer",
      "F&B Manager",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "bba",
    title: "BBA",
    stream: "Management",
    level: "Bachelor",
    duration: "3 Years",
    fees: 100000,
    eligibility: "10+2 (any stream), minimum 50% marks",
    description:
      "Bachelor of Business Administration — builds foundational skills in management, marketing, finance, and entrepreneurship.",
    colleges: [
      "Christ University Bangalore",
      "Symbiosis Pune",
      "Amity University",
      "NMIMS Mumbai",
      "Delhi University",
    ],
    highlights: [
      "MBA pathway after BBA",
      "Practical business exposure",
      "Internship programs",
    ],
    careerProspects: [
      "Business Analyst",
      "Marketing Executive",
      "HR Manager",
      "Operations Manager",
      "Entrepreneur",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "mtech",
    title: "M.Tech",
    stream: "Engineering",
    level: "Master",
    duration: "2 Years",
    fees: 150000,
    eligibility: "B.Tech/B.E. with 60% marks, GATE required for IITs/NITs",
    description:
      "Master of Technology — the premier postgraduate engineering degree. IIT M.Tech holders receive GATE scholarships and excellent R&D opportunities.",
    colleges: [
      "IIT Bombay",
      "IIT Delhi",
      "IIT Madras",
      "NIT Trichy",
      "IIIT Hyderabad",
    ],
    highlights: [
      "GATE scholarship ₹12,400/month",
      "AI, VLSI, Robotics specializations",
      "R&D roles in PSUs & MNCs",
    ],
    careerProspects: [
      "Research Engineer",
      "University Professor",
      "DRDO/ISRO Scientist",
      "AI/ML Engineer",
      "Patent Consultant",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "md-medicine",
    title: "MD Medicine",
    stream: "Medical",
    level: "Master",
    duration: "3 Years",
    fees: 1000000,
    eligibility: "MBBS degree, NEET PG required",
    description:
      "Doctor of Medicine (MD) — postgraduate medical specialization training doctors to become expert clinicians and medical specialists.",
    colleges: [
      "AIIMS Delhi",
      "PGI Chandigarh",
      "CMC Vellore",
      "JIPMER Pondicherry",
      "KEM Mumbai",
    ],
    highlights: [
      "NEET PG required",
      "Specialist status after MD",
      "Stipend during residency",
    ],
    careerProspects: [
      "Medical Specialist",
      "Consultant Doctor",
      "Medical Professor",
      "Clinical Researcher",
      "Hospital Director",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  {
    id: "mca",
    title: "MCA",
    stream: "Engineering",
    level: "Master",
    duration: "2 Years",
    fees: 80000,
    eligibility: "BCA / B.Sc CS/IT / Any graduate with Math, 55% marks",
    description:
      "Master of Computer Applications — advanced postgraduate degree for software development and IT management roles in top tech companies.",
    colleges: [
      "NIT Trichy",
      "NIT Warangal",
      "JNU Delhi",
      "Pune University",
      "Hyderabad Central University",
    ],
    highlights: [
      "NIMCET for NIT admissions",
      "High IT sector placements",
      "Management + technical blend",
    ],
    careerProspects: [
      "Senior Software Developer",
      "IT Project Manager",
      "Cloud Engineer",
      "Data Engineer",
      "Technical Lead",
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
];

const STREAMS = [
  "All",
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Commerce",
  "Science",
  "Arts",
];
const LEVELS = ["All", "Diploma", "Bachelor", "Master", "PhD"];
const TYPES = ["All", "Full-time", "Part-time"];

const PAGE_SIZE = 9;

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const STREAM_COLORS: Record<string, string> = {
  Engineering:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
  Medical:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800",
  Management:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800",
  Law: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
  Commerce:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
  Science:
    "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800",
  Arts: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-800",
};

const LEVEL_ICONS: Record<string, string> = {
  Diploma: "🎖️",
  Bachelor: "🎓",
  Master: "🏅",
  PhD: "🔬",
};

function CourseCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  index: number;
}

function CourseCard({ course, index }: CourseCardProps) {
  const streamColor =
    STREAM_COLORS[course.stream] ??
    "bg-muted text-muted-foreground border-border";
  const levelIcon = LEVEL_ICONS[course.level] ?? "📚";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="h-full"
    >
      <div className="group bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col">
        {/* Stream + Level */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${streamColor}`}
          >
            {course.stream}
          </span>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <span>{levelIcon}</span>
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-3 group-hover:text-primary transition-colors duration-200">
          {course.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 font-semibold text-primary">
            <IndianRupee className="w-3.5 h-3.5" />
            {formatINR(course.fees)}/yr
          </span>
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            {course.colleges.length} colleges
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {course.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/courses/$courseId"
          params={{ courseId: course.id }}
          data-ocid={`course-card-${course.id}`}
        >
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
            size="sm"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [streamFilter, setStreamFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: backendCourses, isLoading } = useListCourses();
  const allCourses: Course[] =
    backendCourses && (backendCourses as Course[]).length > 0
      ? (backendCourses as Course[])
      : SAMPLE_COURSES;

  function setFilter(key: "stream" | "level" | "type", value: string) {
    if (key === "stream") setStreamFilter(value);
    if (key === "level") setLevelFilter(value);
    if (key === "type") setTypeFilter(value);
    setCurrentPage(1);
  }
  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q);
      const matchStream = streamFilter === "All" || c.stream === streamFilter;
      const matchLevel = levelFilter === "All" || c.level === levelFilter;
      return matchQ && matchStream && matchLevel;
    });
  }, [allCourses, searchQuery, streamFilter, levelFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const hasFilters =
    streamFilter !== "All" ||
    levelFilter !== "All" ||
    typeFilter !== "All" ||
    searchQuery !== "";

  function clearFilters() {
    setSearchQuery("");
    setStreamFilter("All");
    setLevelFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  }

  return (
    <div>
      {/* ── Hero banner ── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.08 280) 0%, oklch(0.22 0.1 280) 60%, oklch(0.18 0.12 40) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.62 0.25 60)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.68 0.22 50)" }}
        />

        <div className="container mx-auto px-4 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30 mb-5">
              📚 Explore All Programs
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-secondary-foreground mb-4 leading-tight">
              Find Your Perfect
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.62 0.25 60), oklch(0.75 0.2 55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Career Path
              </span>
            </h1>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
              Explore{" "}
              <span className="text-primary font-semibold">
                {SAMPLE_COURSES.length}+ programs
              </span>{" "}
              across Engineering, Medical, Management, Law, Science, Arts and
              more. Expert counseling included.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            {[
              { label: "Courses Listed", value: "100+" },
              { label: "Partner Colleges", value: "500+" },
              { label: "Students Placed", value: "10,000+" },
              { label: "Streams Covered", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-extrabold text-2xl text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-secondary-foreground/60 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filters ── */}
      <section className="bg-card border-b border-border sticky top-[104px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by course name or stream..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
                data-ocid="courses-search"
              />
            </div>

            <div className="flex gap-2.5 flex-wrap items-center">
              <Filter className="w-4 h-4 text-muted-foreground hidden md:block shrink-0" />

              {/* Stream filter */}
              <select
                value={streamFilter}
                onChange={(e) => setFilter("stream", e.target.value)}
                className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="courses-stream-filter"
              >
                {STREAMS.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Streams" : s}
                  </option>
                ))}
              </select>

              {/* Level filter */}
              <select
                value={levelFilter}
                onChange={(e) => setFilter("level", e.target.value)}
                className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="courses-level-filter"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l === "All" ? "All Levels" : l}
                  </option>
                ))}
              </select>

              {/* Type filter */}
              <select
                value={typeFilter}
                onChange={(e) => setFilter("type", e.target.value)}
                className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="courses-type-filter"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t === "All" ? "All Types" : t}
                  </option>
                ))}
              </select>

              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                  data-ocid="courses-clear-filters"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Course grid ── */}
      <section className="py-12 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              program{filtered.length !== 1 ? "s" : ""} found
            </p>
            {hasFilters && (
              <div className="flex flex-wrap gap-2">
                {streamFilter !== "All" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => setFilter("stream", "All")}
                  >
                    {streamFilter}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {levelFilter !== "All" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => setFilter("level", "All")}
                  >
                    {levelFilter}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
                data-ocid="courses-empty"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to see more results
                </p>
                <Button onClick={clearFilters} data-ocid="courses-reset-btn">
                  Reset Filters
                </Button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="wait">
                  {paginated.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    data-ocid="courses-prev-page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </Button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pg = i + 1;
                      return (
                        <button
                          // biome-ignore lint/suspicious/noArrayIndexKey: static pagination buttons
                          key={i}
                          type="button"
                          onClick={() => setCurrentPage(pg)}
                          className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                            currentPage === pg
                              ? "gradient-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          }`}
                          data-ocid={`courses-page-${pg}`}
                        >
                          {pg}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    data-ocid="courses-next-page"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="font-display font-extrabold text-3xl text-foreground mb-3">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our expert counselors help thousands of students every year find
              the perfect program based on aptitude, interest, and career goals.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground px-8"
                data-ocid="courses-cta-counselor"
              >
                Talk to a Counselor — Free!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
