import { useListBlogPosts } from "@/hooks/useBackend";
import type { BlogPost } from "@/types/icc";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "top-10-careers-science-students-after-12th",
    title: "Top 10 Careers for Science Students After 12th",
    excerpt:
      "Explore the best career paths for science students — from Engineering and Medicine to Space Science and Data Science. Your PCM/PCB choices open doors to a world of opportunity.",
    content: "",
    author: "Dr. Priya Sharma",
    category: "Career Guidance",
    tags: ["Science", "Engineering", "Medicine", "Data Science", "Career"],
    imageUrl: "/assets/generated/blog-science-careers.dim_800x500.jpg",
    publishedAt: BigInt(1743897600000),
    updatedAt: BigInt(1743897600000),
  },
  {
    id: "2",
    slug: "study-abroad-vs-study-india-which-better",
    title: "Study Abroad vs Study in India – Which One Is Better?",
    excerpt:
      "A cost-by-cost, quality-by-quality comparison of studying in India versus abroad. We break down fees in INR, career outcomes, cultural exposure, and long-term ROI.",
    content: "",
    author: "Rajesh Kumar",
    category: "Study Abroad",
    tags: ["Study Abroad", "India Education", "Comparison", "Career ROI"],
    imageUrl: "/assets/generated/blog-study-abroad.dim_800x500.jpg",
    publishedAt: BigInt(1743811200000),
    updatedAt: BigInt(1743811200000),
  },
  {
    id: "3",
    slug: "how-to-crack-neet-one-attempt",
    title: "How to Crack NEET in One Attempt",
    excerpt:
      "A detailed 12-month NEET preparation roadmap with monthly milestones, subject prioritization, mock test strategy and expert tips from toppers.",
    content: "",
    author: "Sunita Patel",
    category: "Entrance Exams",
    tags: ["NEET", "Medical Entrance", "Preparation", "12-Month Plan"],
    imageUrl: "/assets/generated/blog-neet-prep.dim_800x500.jpg",
    publishedAt: BigInt(1743724800000),
    updatedAt: BigInt(1743724800000),
  },
  {
    id: "4",
    slug: "top-skills-2025-job-market",
    title: "Top Skills for 2025 Job Market",
    excerpt:
      "The job market is evolving fast. Here are the skills every student must develop — AI literacy, data analysis, communication, leadership, and digital marketing.",
    content: "",
    author: "Dr. Priya Sharma",
    category: "Career Guidance",
    tags: ["Skills", "Job Market", "AI", "Leadership", "2025"],
    imageUrl: "/assets/generated/blog-job-skills.dim_800x500.jpg",
    publishedAt: BigInt(1743638400000),
    updatedAt: BigInt(1743638400000),
  },
  {
    id: "5",
    slug: "top-10-careers-commerce-students-2025",
    title: "Top 10 Careers for Commerce Students in 2025",
    excerpt:
      "From CA to E-commerce, MBA to Banking — commerce graduates have more options than ever. Discover the best career paths and salary expectations in INR.",
    content: "",
    author: "Rajesh Kumar",
    category: "Career Guidance",
    tags: ["Commerce", "CA", "MBA", "Banking", "Finance"],
    imageUrl: "/assets/generated/blog-commerce-careers.dim_800x500.jpg",
    publishedAt: BigInt(1743552000000),
    updatedAt: BigInt(1743552000000),
  },
  {
    id: "6",
    slug: "choose-right-stream-after-class-10",
    title: "How to Choose the Right Stream After Class 10",
    excerpt:
      "Science, Commerce, or Arts — the decision after Class 10 shapes your entire future. A complete guide with aptitude considerations, career mapping, and expert advice.",
    content: "",
    author: "Sunita Patel",
    category: "Stream Selection",
    tags: ["Class 10", "Stream Selection", "Science", "Commerce", "Arts"],
    imageUrl: "/assets/generated/blog-stream-selection.dim_800x500.jpg",
    publishedAt: BigInt(1743465600000),
    updatedAt: BigInt(1743465600000),
  },
  {
    id: "7",
    slug: "neet-preparation-12-month-roadmap",
    title: "NEET Preparation: A 12-Month Roadmap",
    excerpt:
      "Month-by-month NEET study plan designed by medical educators. Covers Biology, Physics, Chemistry priorities with revision schedules and mock test timelines.",
    content: "",
    author: "Dr. Priya Sharma",
    category: "Entrance Exams",
    tags: ["NEET", "Medical", "Study Plan", "Roadmap", "Preparation"],
    imageUrl: "/assets/generated/blog-neet-roadmap.dim_800x500.jpg",
    publishedAt: BigInt(1743379200000),
    updatedAt: BigInt(1743379200000),
  },
  {
    id: "8",
    slug: "top-scholarships-indian-students-study-abroad",
    title: "Top Scholarships for Indian Students to Study Abroad",
    excerpt:
      "DAAD, Commonwealth, Fulbright, Erasmus, JN Tata, Inlaks — detailed scholarship guide with eligibility criteria, amounts in INR/USD, and application timelines.",
    content: "",
    author: "Rajesh Kumar",
    category: "Study Abroad",
    tags: [
      "Scholarships",
      "Study Abroad",
      "Fulbright",
      "DAAD",
      "Financial Aid",
    ],
    imageUrl: "/assets/generated/blog-scholarships.dim_800x500.jpg",
    publishedAt: BigInt(1743292800000),
    updatedAt: BigInt(1743292800000),
  },
  {
    id: "9",
    slug: "job-ready-diplomas-100-percent-placement-2025",
    title: "Job-Ready Diplomas with 100% Placement – 2025 Guide",
    excerpt:
      "Aviation, Hospitality, Nursing, IT — diploma programs that guarantee placement with starting salaries ranging from ₹2.5 LPA to ₹8 LPA. Complete 2025 guide.",
    content: "",
    author: "Sunita Patel",
    category: "Diploma Courses",
    tags: ["Diploma", "Placement", "Aviation", "Hospitality", "IT"],
    imageUrl: "/assets/generated/blog-diplomas.dim_800x500.jpg",
    publishedAt: BigInt(1743206400000),
    updatedAt: BigInt(1743206400000),
  },
];

const CATEGORIES = [
  "All",
  "Career Guidance",
  "Study Abroad",
  "Entrance Exams",
  "Stream Selection",
  "Diploma Courses",
];

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readTime(content: string): string {
  const words = content.split(/\s+/).length;
  const mins = Math.max(5, Math.ceil(words / 200));
  return `${mins} min read`;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group flex flex-col bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-smooth overflow-hidden h-full"
        data-ocid={`blog-post-${index}`}
      >
        <div className="overflow-hidden h-44 bg-muted relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/hero-students.dim_1200x700.jpg";
            }}
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
            {post.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-bold text-base text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
            Read More <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const { data: backendPosts } = useListBlogPosts();
  const allPosts: BlogPost[] =
    backendPosts && backendPosts.length > 0
      ? (backendPosts as BlogPost[])
      : SAMPLE_POSTS;

  const filtered =
    active === "All" ? allPosts : allPosts.filter((p) => p.category === active);

  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.08 280) 0%, oklch(0.22 0.1 280) 60%, oklch(0.18 0.12 50) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-8 left-10 w-56 h-56 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-8 right-10 w-40 h-40 rounded-full bg-accent blur-2xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30 mb-5">
              <BookOpen className="w-4 h-4" /> Blog & Resources
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-secondary-foreground mb-4 leading-tight">
              Career Insights &amp; Expert Guides
            </h1>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
              Expert articles, NEET/JEE strategies, stream selection advice, and
              scholarship guidance for Indian students and parents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-5 bg-card border-b border-border sticky top-[104px] z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                  active === cat
                    ? "gradient-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
                data-ocid={`blog-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="group grid md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-smooth bg-card"
                data-ocid="blog-featured"
              >
                <div className="md:col-span-3 overflow-hidden h-64 md:h-80 relative">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/generated/hero-students.dim_1200x700.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/40" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    ★ Featured
                  </span>
                </div>
                <div className="md:col-span-2 p-7 flex flex-col justify-center">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                    {featured.category}
                  </span>
                  <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3 line-clamp-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-5">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {readTime(featured.excerpt)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {rest.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20" data-ocid="blog-empty">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Get Career Guidance In Your Inbox
            </h2>
            <p className="text-muted-foreground mb-6">
              Join 10,000+ students and parents receiving weekly career tips,
              exam updates, and scholarship alerts.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
              data-ocid="blog-cta"
            >
              Book Free Counseling Session <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
