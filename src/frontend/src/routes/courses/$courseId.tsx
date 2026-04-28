import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourse } from "@/hooks/useBackend";
import type { Course } from "@/types/icc";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  GraduationCap,
  IndianRupee,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

// ── Sample course data (mirrors courses.tsx fallback) ─────────────────────────
const COURSE_DETAIL: Record<
  string,
  Course & {
    entrance: string;
    feesBreakdown: { label: string; amount: number }[];
    overview: string;
  }
> = {
  "btech-cs": {
    id: "btech-cs",
    title: "B.Tech Computer Science",
    stream: "Engineering",
    level: "Bachelor",
    duration: "4 Years",
    fees: 150000,
    eligibility:
      "10+2 with PCM, minimum 75% for IITs; JEE Main/Advanced required",
    description:
      "B.Tech Computer Science is India's most sought-after undergraduate engineering degree. Students gain deep expertise in software engineering, algorithms, data structures, artificial intelligence, and cloud computing. Top IITs produce graduates who go on to lead the world's most innovative tech companies.",
    overview:
      "4-year full-time program covering core CS fundamentals + industry electives in AI, ML, Cybersecurity, and Cloud. Includes mandatory 6-month industry internship.",
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
      "Average package ₹20–60 LPA at IITs",
      "AI, ML, Cloud specializations available",
      "Strong startup ecosystem at premier institutes",
      "Research collaborations with top global universities",
    ],
    careerProspects: [
      "Software Engineer",
      "Data Scientist",
      "AI/ML Engineer",
      "Product Manager",
      "Startup Founder",
      "Cloud Architect",
      "Cybersecurity Analyst",
    ],
    entrance: "JEE Main & JEE Advanced",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 100000 },
      { label: "Hostel & Mess (per year)", amount: 30000 },
      { label: "Books & Study Material", amount: 10000 },
      { label: "Lab & Examination Fee", amount: 10000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  mbbs: {
    id: "mbbs",
    title: "MBBS",
    stream: "Medical",
    level: "Bachelor",
    duration: "5.5 Years",
    fees: 800000,
    eligibility: "10+2 with PCB, minimum 50% marks; NEET UG compulsory",
    description:
      "MBBS (Bachelor of Medicine and Bachelor of Surgery) is India's primary medical degree, providing comprehensive clinical and theoretical training. The course includes 4.5 years of academics plus a mandatory 1-year rotating internship across major clinical departments.",
    overview:
      "5.5-year program (4.5 years academics + 1-year internship) with clinical rotations in Medicine, Surgery, Obstetrics, Pediatrics, and more.",
    colleges: [
      "AIIMS Delhi",
      "CMC Vellore",
      "JIPMER Pondicherry",
      "KMC Manipal",
      "AFMC Pune",
    ],
    highlights: [
      "NEET UG required (government and private)",
      "Government MBBS seats highly subsidized (₹10,000–50,000 total)",
      "Mandatory 1-year internship included",
      "Can specialize via MD/MS after NEET PG",
      "AIIMS and JIPMER conduct separate exams",
    ],
    careerProspects: [
      "General Physician",
      "Specialist Doctor",
      "Surgeon",
      "Medical Researcher",
      "Public Health Officer",
      "Medical Professor",
      "Hospital Administrator",
    ],
    entrance: "NEET UG",
    feesBreakdown: [
      { label: "Tuition Fee — Govt (per year)", amount: 20000 },
      { label: "Tuition Fee — Private (per year)", amount: 700000 },
      { label: "Clinical Rotation Fees", amount: 50000 },
      { label: "Hostel & Living (per year)", amount: 30000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  mba: {
    id: "mba",
    title: "MBA",
    stream: "Management",
    level: "Master",
    duration: "2 Years",
    fees: 300000,
    eligibility:
      "Any bachelor's degree with 50% marks; CAT/XAT/MAT score required",
    description:
      "Master of Business Administration is India's flagship management degree. The IIMs produce graduates with exceptional analytical, leadership, and strategic thinking skills. The program combines case-study learning, live projects, and industry mentorship.",
    overview:
      "2-year full-time postgraduate program with specializations in Finance, Marketing, Operations, HR, and Strategy. Strong alumni and recruiter network.",
    colleges: [
      "IIM Ahmedabad",
      "IIM Bangalore",
      "ISB Hyderabad",
      "XLRI Jamshedpur",
      "FMS Delhi",
    ],
    highlights: [
      "CAT / XAT / GMAT score required",
      "Average package at IIM-A: ₹35+ LPA",
      "Global exchange programs at partner universities",
      "Entrepreneurship incubators on campus",
      "Access to world-class faculty and research",
    ],
    careerProspects: [
      "Management Consultant",
      "Investment Banker",
      "Marketing Manager",
      "Product Manager",
      "Finance Analyst",
      "Entrepreneur",
      "Strategy Director",
    ],
    entrance: "CAT / XAT / GMAT",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 250000 },
      { label: "Hostel & Mess (per year)", amount: 30000 },
      { label: "Books & Case Material", amount: 10000 },
      { label: "Activity & Alumni Fee", amount: 10000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  llb: {
    id: "llb",
    title: "LLB",
    stream: "Law",
    level: "Bachelor",
    duration: "3 Years",
    fees: 80000,
    eligibility:
      "Graduation in any discipline, minimum 45% marks; CLAT for NLUs",
    description:
      "Bachelor of Laws is a prestigious degree that leads to careers in advocacy, corporate law, judiciary, and public policy. NLU graduates are among the highest-paid lawyers in India.",
    overview:
      "3-year postgraduate law degree with moot courts, internships at law firms, and specializations in Corporate Law, Criminal Law, and IPR.",
    colleges: [
      "NLSIU Bangalore",
      "NALSAR Hyderabad",
      "NLU Delhi",
      "NUJS Kolkata",
      "NLU Jodhpur",
    ],
    highlights: [
      "CLAT / AILET for NLUs",
      "NLU graduates earn ₹15–30 LPA at top firms",
      "Corporate, IPR, and Criminal law tracks",
      "Judiciary exam pathways",
      "Moot court championships build advocacy skills",
    ],
    careerProspects: [
      "Advocate",
      "Corporate Lawyer",
      "Public Prosecutor",
      "Legal Advisor",
      "Judge",
      "Legal Journalist",
      "Policy Consultant",
    ],
    entrance: "CLAT / AILET",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 60000 },
      { label: "Hostel & Mess (per year)", amount: 15000 },
      { label: "Bar Council Registration", amount: 3000 },
      { label: "Library & Resource Fee", amount: 2000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  bpharm: {
    id: "bpharm",
    title: "B.Pharm",
    stream: "Science",
    level: "Bachelor",
    duration: "4 Years",
    fees: 120000,
    eligibility: "10+2 with PCB/PCM, minimum 50% marks",
    description:
      "Bachelor of Pharmacy is a professional degree that prepares students for careers in pharmaceutical manufacturing, clinical pharmacy, drug research, and regulatory affairs.",
    overview:
      "4-year full-time program with labs in Pharmaceutical Chemistry, Pharmacology, Pharmaceutics, and Pharmacognosy. Includes industry training.",
    colleges: [
      "Manipal Pharmacy College",
      "JSS Pharmacy College",
      "ICT Mumbai",
      "Amrita School of Pharmacy",
      "Bombay College of Pharmacy",
    ],
    highlights: [
      "High demand in ₹3L crore Indian pharma industry",
      "Research & quality control laboratory work",
      "Can pursue M.Pharm and PhD",
      "MNC pharma companies offer excellent packages",
      "Regulatory affairs is a growing career",
    ],
    careerProspects: [
      "Clinical Pharmacist",
      "Drug Inspector",
      "Research Scientist",
      "Hospital Pharmacist",
      "Regulatory Affairs",
      "Pharma Sales Representative",
      "Quality Control Manager",
    ],
    entrance: "NEET (recommended) / State PET",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 90000 },
      { label: "Lab & Equipment Fee", amount: 15000 },
      { label: "Hostel (per year)", amount: 12000 },
      { label: "Books & Material", amount: 3000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  barch: {
    id: "barch",
    title: "B.Arch",
    stream: "Arts",
    level: "Bachelor",
    duration: "5 Years",
    fees: 200000,
    eligibility: "10+2 with Mathematics; NATA or JEE Paper 2 required",
    description:
      "Bachelor of Architecture is a creative and technical degree combining design aesthetics with structural engineering knowledge. Graduates shape India's built environment.",
    overview:
      "5-year full-time program with studios, site visits, and electives in Urban Planning, Sustainable Design, and Interior Architecture.",
    colleges: [
      "SPA Delhi",
      "CEPT Ahmedabad",
      "IIT Roorkee",
      "NIT Trichy",
      "Jadavpur University",
    ],
    highlights: [
      "NATA / JEE Paper-2 required",
      "Design studios every semester",
      "Urban planning electives",
      "Collaboration with real construction projects",
      "Strong demand in Tier-1 cities",
    ],
    careerProspects: [
      "Architect",
      "Urban Planner",
      "Interior Designer",
      "Project Manager",
      "Sustainability Consultant",
      "Landscape Architect",
      "Real Estate Developer",
    ],
    entrance: "NATA / JEE Paper 2",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 150000 },
      { label: "Studio & Software Fee", amount: 25000 },
      { label: "Site Visits & Travel", amount: 15000 },
      { label: "Hostel (per year)", amount: 10000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  bca: {
    id: "bca",
    title: "BCA",
    stream: "Engineering",
    level: "Bachelor",
    duration: "3 Years",
    fees: 60000,
    eligibility: "10+2 with Mathematics (any stream), 45% marks",
    description:
      "Bachelor of Computer Applications is a professional undergraduate degree focused on software development, database management, and IT project management — without requiring engineering entrance exams.",
    overview:
      "3-year program covering programming, databases, networking, web development, and software engineering. Good bridge to MCA or MBA(IT).",
    colleges: [
      "Symbiosis Institute Pune",
      "Christ University Bangalore",
      "Amity University",
      "Manipal University",
      "VIT Vellore",
    ],
    highlights: [
      "No engineering entrance exam required",
      "Strong placement in IT sector",
      "Perfect gateway to MCA or MBA",
      "Emerging tech curriculum (AI, Cloud)",
      "Affordable fees vs B.Tech",
    ],
    careerProspects: [
      "Software Developer",
      "Web Developer",
      "App Developer",
      "Database Administrator",
      "IT Support Engineer",
      "Business Analyst",
      "System Administrator",
    ],
    entrance: "No entrance (merit-based)",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 45000 },
      { label: "Lab & Practical Fee", amount: 8000 },
      { label: "Hostel (per year)", amount: 5000 },
      { label: "Books & Study Material", amount: 2000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  "bsc-physics": {
    id: "bsc-physics",
    title: "B.Sc Physics",
    stream: "Science",
    level: "Bachelor",
    duration: "3 Years",
    fees: 40000,
    eligibility: "10+2 with PCM, minimum 50% marks",
    description:
      "Bachelor of Science in Physics provides deep understanding of fundamental laws governing the universe, from classical mechanics to quantum physics and relativity.",
    overview:
      "3-year program with lab work in optics, electronics, nuclear physics, and computational physics. Strong base for IIT JAM, CSIR-NET, and GATE.",
    colleges: [
      "IISc Bangalore",
      "Hindu College Delhi",
      "St. Stephen's Delhi",
      "Miranda House Delhi",
      "Fergusson College Pune",
    ],
    highlights: [
      "Foundation for IIT JAM / GATE exams",
      "Research opportunities at IISc and TIFR",
      "Government sector DRDO/DAE/ISRO pathways",
      "Affordable at state universities",
      "Strong base for M.Sc, PhD, and quantum tech careers",
    ],
    careerProspects: [
      "Research Scientist",
      "Data Analyst",
      "Science Teacher/Professor",
      "Quantum Computing Specialist",
      "Environmental Scientist",
      "DRDO Scientist",
      "Biotech Professional",
    ],
    entrance: "Merit / CUET",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 25000 },
      { label: "Lab & Practical Fee", amount: 8000 },
      { label: "Library & Resources", amount: 4000 },
      { label: "Hostel (per year)", amount: 3000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  "phd-engineering": {
    id: "phd-engineering",
    title: "Ph.D Engineering",
    stream: "Engineering",
    level: "PhD",
    duration: "3–5 Years",
    fees: 250000,
    eligibility:
      "M.Tech / M.E. with minimum 60% marks; GATE / UGC-NET required",
    description:
      "Doctor of Philosophy in Engineering is the highest academic degree, focused on original research and innovation in cutting-edge engineering domains like AI, Robotics, VLSI, and Quantum Engineering.",
    overview:
      "3–5 year research program with thesis, publications, and seminars. Fellowship stipend of ₹31,000/month available at IITs under GATE.",
    colleges: [
      "IIT Bombay",
      "IIT Delhi",
      "IIT Madras",
      "IISc Bangalore",
      "IIT Kharagpur",
    ],
    highlights: [
      "GATE scholarship of ₹31,000/month at IITs",
      "Publications in top-tier international journals",
      "Industry R&D collaboration with DRDO, ISRO, TCS Research",
      "Patent filing opportunities",
      "Post-doc positions globally",
    ],
    careerProspects: [
      "University Professor",
      "DRDO / ISRO Scientist",
      "R&D Lead",
      "Patent Consultant",
      "Innovation Director",
      "Visiting Researcher (Global)",
      "Technology Policy Advisor",
    ],
    entrance: "GATE / UGC-NET",
    feesBreakdown: [
      { label: "Registration Fee (one-time)", amount: 20000 },
      { label: "Annual Research Fee", amount: 60000 },
      { label: "Lab & Equipment Access", amount: 100000 },
      { label: "Conference & Publication", amount: 70000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  "diploma-aviation": {
    id: "diploma-aviation",
    title: "Diploma Aviation",
    stream: "Engineering",
    level: "Diploma",
    duration: "1 Year",
    fees: 180000,
    eligibility: "10+2 with PCM; English proficiency required",
    description:
      "Diploma in Aviation Management trains students for careers in airline ground operations, cabin crew, ticketing, and airport management — one of India's fastest-growing sectors.",
    overview:
      "1-year intensive program covering aviation safety, ground handling, passenger services, DGCA regulations, and airline hospitality.",
    colleges: [
      "Indira Gandhi Institute of Aeronautics",
      "Frankfinn Institute",
      "AAI Training Academy",
      "Air Hostess Academy Delhi",
      "IATA Training",
    ],
    highlights: [
      "India's fastest-growing aviation market",
      "Practical simulator training",
      "DGCA regulatory knowledge",
      "Airlines offer direct campus placements",
      "Cabin crew pathway with grooming training",
    ],
    careerProspects: [
      "Cabin Crew",
      "Ground Staff",
      "Airport Operations Manager",
      "Travel Coordinator",
      "Airline Ticketing Agent",
      "Cargo Handling Specialist",
      "Aviation Safety Officer",
    ],
    entrance: "Direct admission / Aptitude test",
    feesBreakdown: [
      { label: "Course Fee (total)", amount: 150000 },
      { label: "Uniform & Equipment", amount: 15000 },
      { label: "Simulation Training", amount: 10000 },
      { label: "Certification Fee", amount: 5000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  "diploma-hospitality": {
    id: "diploma-hospitality",
    title: "Diploma Hospitality",
    stream: "Arts",
    level: "Diploma",
    duration: "1 Year",
    fees: 90000,
    eligibility: "10+2 (any stream); good communication skills preferred",
    description:
      "Diploma in Hospitality Management prepares students for exciting careers in 5-star hotels, event management, and tourism — a sunrise industry with global scope.",
    overview:
      "1-year program covering food production, front office, housekeeping, F&B service, and event coordination with industry internships.",
    colleges: [
      "IHM Delhi",
      "IHM Mumbai",
      "Welcomgroup Graduate School",
      "Manipal School of Hospitality",
      "Oberoi Centre of Learning",
    ],
    highlights: [
      "Fast placement in 5-star hotel chains",
      "International career opportunities (cruise ships, global hotels)",
      "Hands-on training in model kitchens and mock hotels",
      "Oberoi, Taj, Marriott campus placements",
      "Global certification options (City & Guilds)",
    ],
    careerProspects: [
      "Hotel Manager",
      "Event Coordinator",
      "Chef / Head Chef",
      "Tourism Officer",
      "F&B Manager",
      "Cruise Ship Crew",
      "Restaurant Manager",
    ],
    entrance: "Direct admission / Written test",
    feesBreakdown: [
      { label: "Course Fee (total)", amount: 70000 },
      { label: "Uniform & Grooming Kit", amount: 8000 },
      { label: "Kitchen Lab Materials", amount: 7000 },
      { label: "Certification & Exam Fee", amount: 5000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  bba: {
    id: "bba",
    title: "BBA",
    stream: "Management",
    level: "Bachelor",
    duration: "3 Years",
    fees: 100000,
    eligibility: "10+2 (any stream), minimum 50% marks",
    description:
      "Bachelor of Business Administration builds foundational business skills in management, marketing, finance, and entrepreneurship — the ideal launchpad for an MBA.",
    overview:
      "3-year undergraduate program with specializations in Marketing, Finance, HR, and International Business. Live industry projects and internships included.",
    colleges: [
      "Christ University Bangalore",
      "Symbiosis Pune",
      "Amity University",
      "NMIMS Mumbai",
      "Delhi University",
    ],
    highlights: [
      "Perfect gateway to top MBA programs",
      "Practical business case study approach",
      "Mandatory summer internship in Year 2",
      "Entrepreneurship cell and startup funding",
      "Affordable entry into management education",
    ],
    careerProspects: [
      "Business Analyst",
      "Marketing Executive",
      "HR Manager",
      "Operations Manager",
      "Sales Manager",
      "Entrepreneur",
      "Banking Officer",
    ],
    entrance: "IPMAT / DU JAT / Direct",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 70000 },
      { label: "Hostel & Mess (per year)", amount: 20000 },
      { label: "Books & Case Material", amount: 5000 },
      { label: "Activity & Sports Fee", amount: 5000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  mtech: {
    id: "mtech",
    title: "M.Tech",
    stream: "Engineering",
    level: "Master",
    duration: "2 Years",
    fees: 150000,
    eligibility: "B.Tech/B.E. with 60% marks; GATE required for IITs/NITs",
    description:
      "Master of Technology is the premier postgraduate engineering degree. GATE scholars at IITs receive monthly stipends and access to world-class research labs.",
    overview:
      "2-year full-time postgraduate research program with thesis component. Specializations include AI/ML, VLSI, Robotics, Thermal, Structural Engineering.",
    colleges: [
      "IIT Bombay",
      "IIT Delhi",
      "IIT Madras",
      "NIT Trichy",
      "IIIT Hyderabad",
    ],
    highlights: [
      "GATE scholarship ₹12,400/month at IITs",
      "Specializations: AI, VLSI, Robotics, Thermal, Civil",
      "R&D roles at DRDO, ISRO, MNC labs",
      "Strong IIT alumni network",
      "Pathway to PhD and academia",
    ],
    careerProspects: [
      "Research Engineer",
      "University Professor",
      "DRDO / ISRO Scientist",
      "AI / ML Engineer",
      "Embedded Systems Engineer",
      "Patent Consultant",
      "Technical Program Manager",
    ],
    entrance: "GATE",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 100000 },
      { label: "Research & Lab Fee", amount: 25000 },
      { label: "Hostel & Mess (per year)", amount: 20000 },
      { label: "Books & Conference", amount: 5000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  "md-medicine": {
    id: "md-medicine",
    title: "MD Medicine",
    stream: "Medical",
    level: "Master",
    duration: "3 Years",
    fees: 1000000,
    eligibility: "MBBS degree; NEET PG compulsory",
    description:
      "Doctor of Medicine (MD) is the postgraduate medical specialization degree, training MBBS graduates to become expert clinicians in Internal Medicine, Cardiology, Pulmonology, and more.",
    overview:
      "3-year clinical residency program with ward duty, patient management, research presentations, and NEET-PG-ranked seat allocation.",
    colleges: [
      "AIIMS Delhi",
      "PGI Chandigarh",
      "CMC Vellore",
      "JIPMER Pondicherry",
      "KEM Mumbai",
    ],
    highlights: [
      "NEET PG score determines seat allocation",
      "Monthly residency stipend of ₹60,000–1,00,000",
      "Specialist status after MD",
      "Superspeciality pathways via DM/MCh",
      "Govt MD seats have very low fees",
    ],
    careerProspects: [
      "Medical Specialist",
      "Senior Consultant",
      "Medical Professor",
      "Clinical Researcher",
      "Hospital Director",
      "Public Health Expert",
      "Medical Journalist",
    ],
    entrance: "NEET PG",
    feesBreakdown: [
      { label: "Tuition — Govt (3 years)", amount: 50000 },
      { label: "Tuition — Private (per year)", amount: 900000 },
      { label: "Clinical Rotation Charges", amount: 30000 },
      { label: "Exam & Thesis Submission", amount: 20000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
  mca: {
    id: "mca",
    title: "MCA",
    stream: "Engineering",
    level: "Master",
    duration: "2 Years",
    fees: 80000,
    eligibility: "BCA / B.Sc CS/IT / Any graduate with Math; minimum 55% marks",
    description:
      "Master of Computer Applications is an advanced postgraduate degree preparing students for senior software development, IT architecture, and technology management roles.",
    overview:
      "2-year program with advanced programming, system design, cloud computing, and capstone project. NIMCET for NIT admissions.",
    colleges: [
      "NIT Trichy",
      "NIT Warangal",
      "JNU Delhi",
      "Pune University",
      "Hyderabad Central University",
    ],
    highlights: [
      "NIMCET for NIT MCA admissions",
      "High placement at TCS, Infosys, Wipro, startups",
      "Management + technical skills blend",
      "Advanced DSA, system design focus",
      "Good alternative to B.Tech for non-engineering grads",
    ],
    careerProspects: [
      "Senior Software Developer",
      "IT Project Manager",
      "System Architect",
      "Cloud Engineer",
      "Data Engineer",
      "Technical Lead",
      "DevOps Engineer",
    ],
    entrance: "NIMCET / State MCA",
    feesBreakdown: [
      { label: "Tuition Fee (per year)", amount: 55000 },
      { label: "Lab & Software Access", amount: 10000 },
      { label: "Hostel (per year)", amount: 10000 },
      { label: "Books & Material", amount: 5000 },
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
  },
};

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const STREAM_GRADIENT: Record<string, string> = {
  Engineering:
    "linear-gradient(135deg, oklch(0.15 0.08 260) 0%, oklch(0.22 0.12 260) 100%)",
  Medical:
    "linear-gradient(135deg, oklch(0.15 0.08 15) 0%, oklch(0.22 0.12 15) 100%)",
  Management:
    "linear-gradient(135deg, oklch(0.15 0.08 300) 0%, oklch(0.22 0.12 300) 100%)",
  Law: "linear-gradient(135deg, oklch(0.15 0.08 50) 0%, oklch(0.22 0.1 50) 100%)",
  Science:
    "linear-gradient(135deg, oklch(0.15 0.08 180) 0%, oklch(0.22 0.12 180) 100%)",
  Arts: "linear-gradient(135deg, oklch(0.15 0.08 330) 0%, oklch(0.22 0.12 330) 100%)",
};

function PageSkeleton() {
  return (
    <div>
      <div className="py-24 bg-secondary">
        <div className="container mx-auto px-4 space-y-4">
          <Skeleton className="h-4 w-32 bg-muted/30" />
          <Skeleton className="h-12 w-2/3 bg-muted/30" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-24 bg-muted/30" />
            <Skeleton className="h-5 w-24 bg-muted/30" />
            <Skeleton className="h-5 w-32 bg-muted/30" />
          </div>
        </div>
      </div>
      <div className="py-16 container mx-auto px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-8 w-48" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const { courseId } = useParams({ from: "/courses/$courseId" });
  const { data: backendCourse, isLoading } = useGetCourse(courseId);

  const course =
    backendCourse && (backendCourse as Course).id
      ? {
          ...(backendCourse as Course),
          entrance: "Contact counselor for details",
          feesBreakdown: [
            {
              label: "Annual Fees",
              amount: (backendCourse as Course).fees,
            },
          ],
          overview: (backendCourse as Course).description,
        }
      : COURSE_DETAIL[courseId];

  if (isLoading) return <PageSkeleton />;

  if (!course) {
    return (
      <div className="py-40 text-center" data-ocid="course-not-found">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Course Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The course you are looking for doesn't exist or has been removed.
        </p>
        <Link to="/courses">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to All Courses
          </Button>
        </Link>
      </div>
    );
  }

  const bgGradient =
    STREAM_GRADIENT[course.stream] ??
    "linear-gradient(135deg, oklch(0.15 0.08 280) 0%, oklch(0.22 0.1 280) 100%)";

  const totalFees = course.feesBreakdown.reduce((s, f) => s + f.amount, 0);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: bgGradient }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.62 0.25 60)" }}
        />
        <div
          className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.68 0.22 50)" }}
        />

        <div className="container mx-auto px-4 relative">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-secondary-foreground/60 hover:text-primary text-sm mb-6 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" /> All Courses
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                {course.stream}
              </span>
              <span className="text-xs text-secondary-foreground/60 font-medium">
                {course.level} • {course.duration}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mb-4 leading-tight">
              {course.title}
            </h1>

            <p className="text-secondary-foreground/70 max-w-2xl text-lg leading-relaxed mb-6">
              {course.overview ?? course.description}
            </p>

            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-secondary-foreground/70 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/70 text-sm">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/70 text-sm">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">
                  From {formatINR(course.fees)}/year
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/70 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span>{course.colleges.length} Partner Colleges</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  About This Program
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {course.description}
                </p>
              </motion.div>

              {/* Eligibility */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-muted/30 rounded-2xl p-6 border border-border"
              >
                <h2 className="font-display font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Eligibility Criteria
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {course.eligibility}
                </p>
                {course.entrance && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                    📝 Entrance Exam:{" "}
                    {(course as typeof course & { entrance: string }).entrance}
                  </div>
                )}
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Program Highlights
                </h2>
                <ul className="space-y-3">
                  {course.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Fees Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Fees Structure (INR)
                </h2>
                <div className="rounded-2xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left p-4 font-semibold text-foreground">
                          Fee Component
                        </th>
                        <th className="text-right p-4 font-semibold text-foreground">
                          Amount (INR)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.feesBreakdown.map((fee, i) => (
                        <tr
                          // biome-ignore lint/suspicious/noArrayIndexKey: static fee breakdown
                          key={i}
                          className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-4 text-muted-foreground">
                            {fee.label}
                          </td>
                          <td className="p-4 text-right font-semibold text-foreground">
                            {formatINR(fee.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-primary/5 border-t-2 border-primary/20">
                        <td className="p-4 font-bold text-foreground">
                          Total (Approx.)
                        </td>
                        <td className="p-4 text-right font-extrabold text-primary text-base">
                          {formatINR(totalFees)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * Fees are indicative. Actual fees vary by institution.
                  Contact our counselors for exact figures.
                </p>
              </motion.div>

              {/* Career Prospects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-primary" />
                  Career Prospects
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {course.careerProspects.map((c, i) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/25 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Partner Colleges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Top Partner Colleges
                  <span className="text-sm font-normal text-muted-foreground">
                    ({course.colleges.length} institutions)
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.colleges.map((college, i) => (
                    <motion.div
                      key={college}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {college}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5">
              {/* Quick info card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-md sticky top-[120px]"
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-5">
                  Quick Info
                </h3>
                <dl className="space-y-4">
                  {[
                    { label: "Duration", value: course.duration },
                    { label: "Level", value: course.level },
                    { label: "Stream", value: course.stream },
                    {
                      label: "Starting Fees",
                      value: `${formatINR(course.fees)}/yr`,
                    },
                    {
                      label: "Entrance Exam",
                      value:
                        (course as typeof course & { entrance?: string })
                          .entrance ?? "Varies",
                    },
                    {
                      label: "Partner Colleges",
                      value: String(course.colleges.length),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-2 pb-3 border-b border-border/50 last:border-0 last:pb-0"
                    >
                      <dt className="text-xs text-muted-foreground font-medium uppercase tracking-wide shrink-0">
                        {item.label}
                      </dt>
                      <dd className="text-sm text-foreground font-semibold text-right">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* CTAs */}
                <div className="mt-6 space-y-3">
                  <Link to="/contact" data-ocid="course-apply-cta">
                    <Button
                      className="w-full gradient-primary text-primary-foreground font-semibold gap-2"
                      size="lg"
                    >
                      <BookOpen className="w-4 h-4" />
                      Apply Now
                    </Button>
                  </Link>
                  <Link to="/contact" data-ocid="course-counselor-cta">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      size="lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Talk to Counselor
                    </Button>
                  </Link>
                  <a href="tel:+911800123456" data-ocid="course-phone-cta">
                    <Button
                      variant="ghost"
                      className="w-full gap-2 text-muted-foreground"
                      size="sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call: 1800-123-4567 (Free)
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  🎓 Free counseling — no commitment required
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related CTA ── */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display font-extrabold text-3xl text-foreground mb-3">
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our expert counselors will help you understand admission
              requirements, scholarship options, and the best colleges for your
              profile — completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gradient-primary text-primary-foreground px-8 gap-2"
                  data-ocid="course-detail-bottom-apply"
                >
                  <BookOpen className="w-4 h-4" /> Apply Now
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  data-ocid="course-detail-browse-more"
                >
                  <ArrowLeft className="w-4 h-4" /> Browse More Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
