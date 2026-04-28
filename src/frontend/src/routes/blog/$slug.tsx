import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react";
import { motion } from "motion/react";

interface PostData {
  title: string;
  author: string;
  authorBio: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string;
  tags: string[];
  relatedSlugs: string[];
}

const POSTS: Record<string, PostData> = {
  "top-10-careers-science-students-after-12th": {
    title: "Top 10 Careers for Science Students After 12th",
    author: "Dr. Priya Sharma",
    authorBio:
      "Dr. Priya Sharma is a senior career counselor with 15+ years of experience guiding science students across India. She holds a PhD in Educational Psychology from Delhi University.",
    category: "Career Guidance",
    date: "April 6, 2026",
    readTime: "9 min read",
    imageUrl: "/assets/generated/blog-science-careers.dim_800x500.jpg",
    tags: ["Science", "PCM", "PCB", "Engineering", "Medicine", "Data Science"],
    relatedSlugs: [
      "choose-right-stream-after-class-10",
      "how-to-crack-neet-one-attempt",
      "neet-preparation-12-month-roadmap",
    ],
    content: `Science students in India have always had a distinct advantage — the sheer breadth and depth of career paths available to them is unmatched. Whether you studied Physics-Chemistry-Mathematics (PCM) or Physics-Chemistry-Biology (PCB), the doors to some of the most rewarding careers in the 21st century are open to you.

**1. Engineering (PCM) — The Classic Path**

Engineering remains one of the most sought-after careers for science students. With JEE Main and Advanced as the gateway, students can pursue B.Tech in branches like Computer Science, Mechanical, Electrical, Civil, or Chemical Engineering from IITs, NITs, and top private universities. Starting salaries range from ₹4 LPA (core engineering) to ₹25 LPA+ (top tech companies). Specializations like AI/ML, Robotics, and VLSI are particularly in demand.

**2. Medicine (PCB) — A Noble Calling**

MBBS through NEET is the dream of millions of Indian students. With approximately 1 lakh MBBS seats across government and private medical colleges, competition is intense but achievable with the right preparation. Beyond MBBS, specializations like Cardiology, Neurosurgery, and Oncology offer salaries of ₹15–80 LPA. Alternative medical paths include BDS (Dentistry), BAMS (Ayurveda), BHMS (Homeopathy), and BPT (Physiotherapy).

**3. Data Science & Artificial Intelligence (PCM)**

The hottest career of the decade. Data scientists analyze vast datasets to drive business decisions. Companies pay ₹8–30 LPA for fresh graduates from top institutions. Required skills: Python, statistics, machine learning frameworks. Entry routes: B.Tech CS with AI/ML specialization, or B.Sc Data Science from institutions like IISc, CMI, or ISI Kolkata.

**4. Research & Academia**

If you have genuine curiosity and love for fundamentals, a career in research through IISc, TIFR, IISERs, or CSIR labs is deeply fulfilling. BSc → MSc → PhD pathway leads to positions with salaries of ₹60,000–1,50,000/month at national labs and universities. The PM Research Fellowship offers ₹70,000-80,000/month for PhD at IITs and IISc.

**5. Space Science & ISRO (PCM)**

India's space program is expanding rapidly. ISRO recruits engineers and scientists through direct campus placements at IITs/NITs/RECs and through ICRB exams. Starting salary: ₹56,000–70,000/month with exceptional job security. Private space startups like Agnikul, Skyroot, and Pixxel also hire aggressively.

**6. Pharmacy & Pharmaceutical Sciences (PCB)**

B.Pharm and M.Pharm graduates work in drug development, quality control, regulatory affairs, and clinical research. India's pharmaceutical industry is the world's third-largest by volume. Salaries range from ₹3–8 LPA entry-level to ₹15–40 LPA for senior R&D roles at companies like Sun Pharma, Cipla, Dr. Reddy's.

**7. Biotechnology & Life Sciences (PCB)**

Biotechnology is exploding with opportunities in bioinformatics, genetic engineering, clinical trials, and agri-biotech. Top institutes: IIT Bombay, IIT Delhi, JNU, Manipal. The COVID-19 pandemic highlighted the critical importance of biotech professionals. Entry-level salary: ₹3–6 LPA, senior roles: ₹15–50 LPA.

**8. Environmental Science & Sustainability (PCM/PCB)**

Climate change is creating massive demand for environmental scientists, sustainability consultants, and green energy specialists. B.Sc/M.Sc in Environmental Science from institutions like Delhi School of Economics or TERI University. Companies like Tata Power, Adani Green, and global consulting firms hire actively. Salary range: ₹4–15 LPA.

**9. Architecture & Urban Planning (PCM)**

JEE (AAT) or NATA score opens doors to B.Arch from top schools including IITs, NIT Trichy, School of Planning & Architecture. Architects with 5+ years experience earn ₹8–25 LPA. Urban planners working with smart city projects and government bodies earn ₹6–18 LPA.

**10. Statistics & Actuarial Science (PCM)**

Statisticians are crucial for insurance, banking, healthcare, and government policy. ISI Kolkata, CMI Chennai, and BITS Pilani offer excellent statistics programs. Actuarial professionals with 5+ exams cleared can earn ₹15–50 LPA. The Institute of Actuaries of India (IAI) certifies professionals in this niche but highly rewarding field.

**How ICC Guides Science Students**

At India Career Counseling, our counselors use psychometric assessments and academic performance data to map each student to the most suitable career path. We don't believe in one-size-fits-all advice — every student's strengths are unique. Book your free session today.`,
  },

  "study-abroad-vs-study-india-which-better": {
    title: "Study Abroad vs Study in India – Which One Is Better?",
    author: "Rajesh Kumar",
    authorBio:
      "Rajesh Kumar is an international education consultant with expertise in university admissions across 20+ countries. He has helped 500+ students secure admissions in top global universities.",
    category: "Study Abroad",
    date: "April 5, 2026",
    readTime: "11 min read",
    imageUrl: "/assets/generated/blog-study-abroad.dim_800x500.jpg",
    tags: [
      "Study Abroad",
      "India Education",
      "Cost Comparison",
      "Career ROI",
      "INR",
    ],
    relatedSlugs: [
      "top-scholarships-indian-students-study-abroad",
      "top-10-careers-science-students-after-12th",
      "top-skills-2025-job-market",
    ],
    content: `One of the most common questions we receive at ICC is: "Should I study in India or go abroad?" There's no universal answer — the right choice depends on your finances, career goals, family situation, and personal aspirations. Let us break it down objectively.

**Cost Comparison: The Numbers That Matter**

Studying in India at a top institution:
- IIT/NIT B.Tech: ₹2–10 lakhs total fees (4 years)
- IIM MBA: ₹23–30 lakhs (2 years)
- Private medical college MBBS: ₹40–80 lakhs (5.5 years)
- Private engineering (Tier-1): ₹8–15 lakhs (4 years)

Studying Abroad (USD to INR at ₹83/USD):
- USA BS degree: ₹83–1.66 crores per year (top universities)
- USA MS degree: ₹50–83 lakhs per year
- UK BSc/BA: ₹20–40 lakhs per year
- Germany (public universities): ₹50,000–2 lakhs per year (near-free!)
- Canada: ₹25–50 lakhs per year
- Australia: ₹20–40 lakhs per year

**Quality of Education: The Truth**

India's top institutions — IITs, IIMs, IISc, AIIMS — are genuinely world-class. IIT graduates compete with MIT and Stanford graduates on equal footing in global tech companies. The quality gap between India's top 10 institutions and top global universities is negligible for STEM subjects.

However, for liberal arts, social sciences, design, and emerging fields, global universities often have a clear edge in curriculum breadth, research infrastructure, and interdisciplinary exposure.

**Career Outcomes: Where Do You Land?**

India pathway:
- IIT CS graduate: ₹15–45 LPA domestic, $70,000-120,000 in USA with visa sponsorship
- IIM MBA graduate: ₹15–35 LPA domestic
- AIIMS MBBS: Government hospital salary ₹60,000-1,20,000/month + private practice

Abroad pathway (staying there):
- US MS CS graduate at top-50 university: $90,000–120,000/year starting
- US MBA (top-10): $150,000–200,000/year starting
- UK graduate: £35,000–55,000/year starting

Abroad pathway (returning to India):
- Significant premium at MNCs and startups: 20–40% higher than domestic degree holders
- Access to senior management roles faster
- Global network advantage

**Cultural Exposure & Personal Growth**

This is where studying abroad wins clearly. Living independently in a foreign country at 18-22 develops resilience, adaptability, cross-cultural communication, and global perspective that's hard to replicate. These "soft" advantages often translate to leadership potential and career acceleration.

**The Hidden Costs of Studying Abroad**

- Visa fees: ₹15,000–25,000 per application
- Air travel: ₹60,000–1,20,000 roundtrip annually
- Living expenses: ₹60,000–1,20,000/month in major cities
- Health insurance: ₹1–3 lakhs/year
- Emotional cost: homesickness, isolation, cultural adjustment

**When Should You Choose India?**

- You have secured admission to IIT/IIM/AIIMS or equivalent top institution
- Financial constraints make abroad unsustainable even with loans
- You want to build a career in India-specific domains (government, local startups, regional businesses)
- Family responsibilities require proximity

**When Should You Choose Abroad?**

- You have a clear career goal that requires international credentials (global consulting, international research, specific industries)
- You have scholarships or fellowships covering 50%+ costs
- You're targeting Germany/Scandinavia where quality education is near-free
- You want to settle abroad long-term
- Your India option is a mediocre institution

**ICC's Recommendation**

The best choice is always the best institution you can access — regardless of geography. A mediocre foreign university is not worth ₹1 crore over a Tier-1 Indian institution. But a scholarship to a top-50 global university might be worth the investment for the right career.

Our counselors help you build a complete cost-benefit analysis for your specific situation. Book a free session to get personalized guidance.`,
  },

  "how-to-crack-neet-one-attempt": {
    title: "How to Crack NEET in One Attempt",
    author: "Sunita Patel",
    authorBio:
      "Sunita Patel is a medical entrance exam specialist with 12 years of coaching experience. She has mentored 200+ NEET qualifiers including students who secured All-India Ranks in the top 1000.",
    category: "Entrance Exams",
    date: "April 4, 2026",
    readTime: "12 min read",
    imageUrl: "/assets/generated/blog-neet-prep.dim_800x500.jpg",
    tags: ["NEET", "Medical Entrance", "Preparation Strategy", "12-Month Plan"],
    relatedSlugs: [
      "neet-preparation-12-month-roadmap",
      "top-10-careers-science-students-after-12th",
      "choose-right-stream-after-class-10",
    ],
    content: `Cracking NEET in a single attempt is achievable — but it demands strategic preparation, consistent effort, and smart revision. With 20+ lakh aspirants competing for approximately 1 lakh MBBS seats, you need to be in the top 5-8% to secure a government medical college seat. Here's your complete blueprint.

**Understanding NEET 2025-26**

NEET-UG tests 180 questions across:
- Physics: 45 questions (180 marks)
- Chemistry: 45 questions (180 marks)
- Botany: 45 questions (180 marks)
- Zoology: 45 questions (180 marks)
- Total: 720 marks | Marking: +4 correct, -1 wrong

Government MBBS cutoff (General): ~620-650/720
Top AIIMS Delhi cutoff: ~680+/720

**Month 1-2: Foundation Building**

Start by deeply understanding the NCERT textbooks for Classes 11 and 12. NEET is fundamentally an NCERT exam — 70-80% of questions directly come from or are based on NCERT content.

Priority subjects in order:
1. Biology (Botany + Zoology) — 90/180 questions, most scoring
2. Chemistry (Physical + Organic + Inorganic) — 45 questions
3. Physics — 45 questions, most conceptually challenging

Action plan:
- Read NCERT Biology line by line, making margin notes
- Solve NCERT exemplar problems for Chemistry
- Master Physics formulas with derivations

**Month 3-4: Concept Reinforcement**

- Complete NCERT line-by-line reading at least twice
- Begin H.C. Verma for Physics concepts
- Start VK Jaiswal for Inorganic Chemistry
- Solomon & Fryhle for Organic Chemistry reactions

Topics to prioritize:
- Cell Biology & Genetics (Botany) — 15-18 questions annually
- Plant Physiology — 8-10 questions
- Human Physiology — 15-18 questions
- Ecology & Environment — 8-10 questions

**Month 5-6: Reference Books & Depth**

- NCERT Biology diagrams — redraw every diagram from memory
- Organic Chemistry named reactions — create mnemonic devices
- Physics: electrostatics, magnetism, optics get 10-12 questions each

Mistake to avoid: Don't attempt too many reference books. NCERT + one reference per subject is sufficient.

**Month 7-8: MCQ Practice & Chapter Tests**

- Solve 100+ MCQs daily
- Chapter-wise tests from previous years (2015-2025)
- Identify weak chapters using error logs

Recommended MCQ banks:
- MTG NCERT at Your Fingertips (Biology)
- Errorless Chemistry
- DC Pandey Physics for NEET

**Month 9-10: Mock Tests Begin**

Start full-length mock tests every weekend:
- Test 1: Don't worry about time
- Test 2-4: Practice time management (180 questions in 200 minutes)
- Analyze every wrong answer — understand WHY you got it wrong

Target scores for mocks:
- Month 9: 480-520/720
- Month 10: 540-580/720
- Month 11: 580-620/720
- Week before exam: 620-660/720

**Month 11: Intensive Revision**

- Revise all Biology diagrams + important tables
- Complete Chemistry formula sheets
- Physics high-yield chapters only
- Focus on topics where you can gain 5-10 marks with revision

**Month 12: Final Preparation**

Last 30 days strategy:
- Solve 2 full mocks per week
- Revise NCERT Biology daily (Biology = 50% of NEET)
- Don't start any new topics
- Sleep 7-8 hours — memory consolidation is crucial
- Maintain exam-day routine from week 2

**The 3 Biggest NEET Mistakes to Avoid**

1. Ignoring NCERT Biology: Every AIIMS topper will tell you — NCERT is the Bible. Don't skip a single line.
2. Weak time management: Practice completing the paper in 170 minutes, keeping 30 for revision.
3. Guessing randomly: With negative marking, only attempt questions you're 60%+ confident about.

**ICC's NEET Counseling Support**

Our NEET specialists provide personalized study plans, mock test analysis, and college counseling post-result. We've helped students from ₹85 NEET marks secure MBBS admission through strategic college selection. Book your free session today.`,
  },

  "top-skills-2025-job-market": {
    title: "Top Skills for 2025 Job Market",
    author: "Dr. Priya Sharma",
    authorBio:
      "Dr. Priya Sharma is a career development expert and certified psychometric counselor who tracks employment trends across India's major industries.",
    category: "Career Guidance",
    date: "April 3, 2026",
    readTime: "8 min read",
    imageUrl: "/assets/generated/blog-job-skills.dim_800x500.jpg",
    tags: ["Skills", "AI Literacy", "Data Analysis", "Leadership", "2025 Jobs"],
    relatedSlugs: [
      "top-10-careers-science-students-after-12th",
      "top-10-careers-commerce-students-2025",
      "job-ready-diplomas-100-percent-placement-2025",
    ],
    content: `The Indian job market in 2025 is more competitive and more dynamic than ever. With AI reshaping industries, globalization accelerating, and companies seeking "T-shaped" professionals — broad knowledge with deep expertise — students who develop the right skills have a massive advantage. Here are the most in-demand skills today.

**1. AI Literacy & Prompt Engineering**

You don't need to be an AI engineer to benefit from AI. Every professional in every field needs to know how to use AI tools effectively. This includes:
- Using ChatGPT, Claude, Gemini for productivity
- Prompt engineering for specific business tasks
- Understanding AI limitations and hallucinations
- No-code AI tools like Make, Zapier AI, Notion AI

Salary premium for AI-literate professionals: 15-30% above peers.

**2. Data Analysis & Visualization**

Data is the new oil, but only if you can refine it. Companies need professionals who can analyze data and communicate insights clearly. Core skills:
- Excel/Google Sheets advanced functions
- SQL for database queries
- Python (Pandas, NumPy) for analysis
- Tableau or Power BI for visualization

Entry-level data analysts earn ₹4–8 LPA. Senior analysts with 3+ years earn ₹12–25 LPA.

**3. Digital Marketing & SEO**

With every business going online, digital marketing professionals are in extreme demand. Key skills:
- Search Engine Optimization (SEO)
- Google Ads & Meta Ads management
- Content Marketing & Social Media Strategy
- Email Marketing automation
- Analytics (Google Analytics 4)

Freelance digital marketers earn ₹50,000–2,00,000/month. Full-time roles: ₹4–15 LPA depending on specialization.

**4. Communication & Business Writing**

Surprisingly underrated — the ability to communicate clearly (written and verbal) is the #1 soft skill cited by Indian employers. This means:
- Professional email writing
- Report and proposal preparation
- Public speaking and presentation
- Negotiation fundamentals
- Active listening

Communication skills training can increase career advancement speed by 40% according to a LinkedIn India survey.

**5. Financial Literacy & Excel Modeling**

Every business function — HR, marketing, operations, sales — benefits from financial literacy. Understanding P&L statements, cash flow basics, and building financial models in Excel makes you indispensable.

Specific skills valued:
- Financial statement analysis
- Budget preparation
- DCF valuation basics
- Cost-benefit analysis

**6. Leadership & Emotional Intelligence**

Technical skills get you the job; leadership skills get you promoted. Companies increasingly screen for:
- Team leadership & motivation
- Conflict resolution
- Empathy and emotional regulation
- Decision-making under uncertainty
- Mentoring junior team members

IIMs and top MBA programs dedicate 30% of curriculum to these skills for good reason.

**7. UX/UI Design Thinking**

Even non-designers benefit from understanding user experience principles. Product managers, marketers, and entrepreneurs with design thinking skills build better products and campaigns. Tools: Figma, Adobe XD. The process: empathize, define, ideate, prototype, test.

Entry-level UI/UX designers: ₹4–8 LPA. Senior UX leads: ₹18–40 LPA.

**8. Project Management (PMP/Agile)**

As companies adopt remote work and cross-functional teams, project management skills are crucial. Agile/Scrum methodology is used by 85% of tech companies. PMI certification adds ₹2–5 LPA to salary. Tools: Jira, Trello, Asana, Monday.com.

**Developing These Skills as a Student**

- Enroll in MOOCs: Coursera, edX, NPTEL (free IIT courses), LinkedIn Learning
- Build a portfolio: GitHub for coding, Behance for design, Medium for writing
- Certifications: Google Digital Marketing, AWS Cloud Practitioner, HubSpot Content Marketing
- Internships: Even 2-month internships provide more real-world skill development than theory

ICC's Career Skills Assessment maps your current skill set against industry requirements and provides a personalized skill development roadmap. Book your free assessment today.`,
  },

  "top-10-careers-commerce-students-2025": {
    title: "Top 10 Careers for Commerce Students in 2025",
    author: "Rajesh Kumar",
    authorBio:
      "Rajesh Kumar is a commerce education specialist who has guided 1000+ students toward careers in finance, accounting, and business management.",
    category: "Career Guidance",
    date: "April 2, 2026",
    readTime: "10 min read",
    imageUrl: "/assets/generated/blog-commerce-careers.dim_800x500.jpg",
    tags: ["Commerce", "CA", "MBA", "Banking", "Finance", "E-commerce"],
    relatedSlugs: [
      "choose-right-stream-after-class-10",
      "top-skills-2025-job-market",
      "job-ready-diplomas-100-percent-placement-2025",
    ],
    content: `Commerce is no longer just about CA and banking. The explosion of fintech, e-commerce, and the startup ecosystem has created hundreds of exciting career paths for commerce graduates. Here are the top 10 careers for commerce students in 2025, with realistic salary expectations in INR.

**1. Chartered Accountancy (CA)**

The gold standard of commerce careers. After passing ICAI's Foundation, Intermediate, and Final exams (3-5 years), CA graduates start at ₹7–12 LPA at Big 4 accounting firms (Deloitte, PwC, EY, KPMG). CFOs with CA background earn ₹50 lakhs–2 crore annually. Pass rate for CA Final: ~15-20% per attempt — it demands dedication but rewards generously.

**2. Chartered Financial Analyst (CFA)**

The globally recognized investment finance certification. 3 levels of exams, typically 2-4 years to complete. CFA charterholders at investment banks, asset management companies, and hedge funds earn ₹12–50 LPA. The CFA Institute has 175,000+ members globally; India is the 3rd largest CFA market.

**3. MBA from IIM/Top B-Schools**

Post CAT/XAT/GMAT exam, an MBA from IIM Ahmedabad, Bangalore, Calcutta, or equivalent opens doors to consulting (McKinsey, BCG, Bain), investment banking, and senior management. IIM-A average placement package: ₹35 LPA. The investment (₹23-30 lakhs fees) typically pays back within 2-3 years.

**4. Investment Banking & Finance**

Investment bankers help companies raise capital, execute mergers & acquisitions, and advise on financial strategy. Entry through B.Com + MBA Finance. Starting salary at mid-tier IB firms: ₹6–10 LPA, top-tier: ₹15–25 LPA. VP level (5-7 years): ₹40–80 LPA.

**5. E-Commerce & Retail Management**

India's e-commerce industry is a ₹6.5 lakh crore market growing at 25% annually. Companies like Amazon India, Flipkart, Meesho, and Nykaa hire commerce graduates for roles in category management, supply chain, seller ecosystem, and finance. Starting salary: ₹4–8 LPA with rapid growth trajectory.

**6. Banking & Financial Services (BFSI)**

IBPS PO/Clerk and SBI PO exams provide access to government banking careers with exceptional job security. Starting salary: ₹35,000–50,000/month. Private banking careers at HDFC, ICICI, Axis offer ₹4–8 LPA with performance incentives. Relationship managers at private banks earn ₹6–15 LPA.

**7. Company Secretary (CS)**

Company Secretaries handle legal compliance, corporate governance, and regulatory filings. ICSI certification takes 2-3 years. CS professionals in listed companies earn ₹8–25 LPA. The government's push for corporate governance has dramatically increased demand.

**8. Tax Consulting & GST Advisor**

India's complex tax landscape creates permanent demand for tax professionals. GST consultants, income tax advisors, and transfer pricing specialists are in high demand. Independent tax consultants earn ₹5–20 lakhs annually. Big 4 tax partners earn ₹1–3 crore annually.

**9. Actuarial Science**

Actuaries assess and manage financial risk for insurance companies, banks, and pension funds. IAI certification takes 7-10 years but starting salaries are exceptional: ₹8–15 LPA fresh, ₹25–60 LPA with 5+ years. India has a significant shortage of qualified actuaries — demand far exceeds supply.

**10. Financial Technology (Fintech)**

The intersection of finance and technology. Roles include product management, financial analysis, risk management, and business development at companies like Zerodha (₹2,000 crore revenue), Paytm, CRED, Razorpay. Entry-level roles: ₹5–10 LPA with ESOPs that can be worth millions at exits.

**ICC's Commerce Career Guidance**

Our counselors help you map your specific strengths — analytical ability, communication skills, risk appetite, time horizon — to the commerce career that will maximize your potential. Book a free session to get your personalized Commerce Career Roadmap.`,
  },

  "choose-right-stream-after-class-10": {
    title: "How to Choose the Right Stream After Class 10",
    author: "Sunita Patel",
    authorBio:
      "Sunita Patel is an academic counselor specializing in stream selection for Class 10 students. She has conducted 3,000+ one-on-one counseling sessions across India.",
    category: "Stream Selection",
    date: "April 1, 2026",
    readTime: "9 min read",
    imageUrl: "/assets/generated/blog-stream-selection.dim_800x500.jpg",
    tags: [
      "Class 10",
      "Stream Selection",
      "Science",
      "Commerce",
      "Arts",
      "Aptitude",
    ],
    relatedSlugs: [
      "top-10-careers-science-students-after-12th",
      "top-10-careers-commerce-students-2025",
      "top-skills-2025-job-market",
    ],
    content: `Choosing between Science, Commerce, and Arts after Class 10 is the first major academic fork in the road. This decision influences which entrance exams you can take, which colleges accept you, and which careers become accessible. Yet most students make this choice based on peer pressure, parental expectations, or vague notions of "prestige." Let's break this down rationally.

**The Myth of Stream Hierarchy**

Let us address this directly: Science is NOT superior to Commerce or Arts. This outdated belief leads thousands of students into the wrong stream every year, causing academic stress, poor performance, and misaligned careers. Each stream has exceptional career opportunities — the key is matching the stream to your aptitude and interests.

**Science Stream (PCM or PCB)**

Choose Science PCM if:
- You genuinely enjoy Mathematics and Physics
- You're aiming for Engineering, Architecture, or Data Science
- You scored 80%+ in Math and 75%+ in Science in Class 10

Choose Science PCB if:
- Biology fascinates you more than Mathematics
- You aspire to become a Doctor, Physiotherapist, Nutritionist, or Biotechnologist
- You scored 80%+ in Science and have interest in life sciences

Warning signs you may struggle with Science:
- You find Class 10 Math tedious or confusing
- You dislike labs, experiments, or detailed scientific reading
- You only chose Science because "it keeps all options open"

**Commerce Stream**

Choose Commerce if:
- Numbers make sense to you but Calculus doesn't excite you
- You're entrepreneurially minded or interested in business
- Finance, banking, marketing, or management appeals to you
- You scored well in Math but also love Economics/Social Studies

Commerce + Math is more versatile than Commerce without Math — keep Math if you can.

Career doors: CA, MBA, Investment Banking, E-commerce, Business Analytics, Fintech.

**Arts/Humanities Stream**

Grossly underrated in India. Arts is the right choice if:
- You excel in language, history, social studies, or political science
- Creative fields appeal: journalism, design, film, content creation
- You aim for law (NLU entrance CLAT), civil services (IAS/IPS), or psychology
- You think critically, enjoy debates, and love writing

Arts graduates from top colleges earn as much as Science/Commerce counterparts. IAS officers, journalists, lawyers, psychologists, and filmmakers — many studied Arts.

**The Aptitude Test Approach**

ICC uses psychometric tests including:
- **Interest Inventory**: Maps your natural curiosity areas
- **Aptitude Battery**: Tests verbal, numerical, spatial, and reasoning ability
- **Personality Assessment**: Identifies whether you're analytical, creative, social, or entrepreneurial

Based on these assessments, we provide data-driven stream recommendations that remove guesswork.

**Practical Checklist**

Before deciding, honestly answer:
1. Which Class 10 subjects did you genuinely enjoy? (Not just score well in)
2. What activities do you do voluntarily in free time?
3. Can you visualize yourself doing the future career for 40 years?
4. What do people who know you well say you're naturally good at?
5. Does your chosen stream have multiple careers you'd be happy with?

**What If You Choose Wrong?**

It's not the end. Options exist:
- Change stream after Class 11 (before Board exams): possible in most schools
- Bridge courses after Class 12: some professional programs accept alternate stream backgrounds
- Open University pathways: IGNOU and others offer flexible entry

ICC's Stream Selection Counseling includes a 90-minute session with a certified counselor, psychometric assessment, parent briefing, and a written Stream Recommendation Report. Book your session today.`,
  },

  "neet-preparation-12-month-roadmap": {
    title: "NEET Preparation: A 12-Month Roadmap",
    author: "Dr. Priya Sharma",
    authorBio:
      "Dr. Priya Sharma has been designing NEET preparation curricula for over a decade. Her students have secured admissions at AIIMS Delhi, JIPMER, and top government medical colleges across India.",
    category: "Entrance Exams",
    date: "March 31, 2026",
    readTime: "14 min read",
    imageUrl: "/assets/generated/blog-neet-roadmap.dim_800x500.jpg",
    tags: ["NEET", "Medical", "Month-by-Month Plan", "Study Schedule", "AIIMS"],
    relatedSlugs: [
      "how-to-crack-neet-one-attempt",
      "top-10-careers-science-students-after-12th",
      "choose-right-stream-after-class-10",
    ],
    content: `A systematic 12-month plan is the single biggest differentiator between students who crack NEET in their first attempt and those who spend years retaking it. Here is our expert-designed, month-by-month roadmap for NEET 2026 aspirants starting preparation in June 2025.

**Before Month 1: Foundation Assessment**

Before starting, honestly assess your current level:
- Attempt a previous year NEET paper under timed conditions
- Note your scores in each subject
- Identify your top 3 weakest chapters in each subject

This baseline assessment will personalize your preparation.

**Month 1 (June): Biology Foundations**

Focus: Cell Biology, Biomolecules, Cell Cycle
- Read NCERT Class 11 Biology, Chapters 1-8 (twice)
- Draw all diagrams without referring to books
- Start a Biology mistake notebook
- Daily MCQs: 30 Biology questions

Target: Complete Diversity in Living World + Structural Organization

Key tip: Biology accounts for 50% of NEET marks. It must be your strongest subject, not an afterthought.

**Month 2 (July): Chemistry Kick-off**

Focus: Physical Chemistry — Mole Concept, Atomic Structure, Chemical Bonding
- NCERT Chemistry Class 11 Chapters 1-6
- VK Jaiswal for Inorganic, P. Bahadur for Physical
- Practice numerical problems daily (30 minutes)
- Connect concepts to real-world examples for retention

**Month 3 (August): Physics Fundamentals**

Focus: Mechanics — Motion, Laws of Motion, Work-Energy, Gravitation
- H.C. Verma Volume 1 (conceptual reading + solved examples)
- NCERT Physics Class 11 Chapters 1-8
- Create a formula sheet — update daily
- Physics requires understanding over memorization — take time with derivations

**Month 4 (September): Human Physiology (Biology)**

Focus: Plant Physiology + Animal Kingdom
- NCERT Biology Class 11 Chapters 17-22
- Human Physiology is the highest-yield Biology topic
- Create flowcharts for processes: digestion, circulation, respiration
- MTG Fingertips for MCQ practice

Milestone: Complete 50% of Class 11 Biology by month end.

**Month 5 (October): Chemistry Deep Dive**

Focus: Organic Chemistry — Hydrocarbons, Haloalkanes, Alcohols
- NCERT Chemistry Chapters on Organic compounds
- Named reactions are testable — make a dedicated list
- Solomon & Fryhle for conceptual organic chemistry
- 50 Organic Chemistry MCQs daily

**Month 6 (November): Physics Advanced**

Focus: Electrostatics, Current Electricity, Magnetic Effects
- Class 12 Physics Chapters 1-5 (NCERT)
- These chapters contribute 15-18 marks to NEET annually
- Draw circuit diagrams and practice problem-solving
- DC Pandey for practice questions

Mid-year target: Score 400+ in any full mock test

**Month 7 (December): Class 12 Biology**

Focus: Genetics & Evolution, Reproduction, Ecology
- NCERT Class 12 Biology Chapters 1-8 (complete)
- Genetics is complex but highly rewarding — invest time
- Ecology + Environment: 5-8 marks, easier if studied systematically
- Previous year questions: Chapters 1-8

**Month 8 (January): Full Class 12 Completion**

Focus: Biotechnology, Microbes, Biodiversity
- Complete NCERT Class 12 Biology (all chapters)
- Biotechnology: 2-3 questions annually — study diagrams carefully
- Environmental issues: current affairs connection helps retention
- Revision of Class 11 Biology: 2-hour weekly sessions

**Month 9 (February): First Full Mock Season**

- 2 full mocks per week (Thursday + Sunday)
- Detailed analysis of every wrong answer
- Maintain an error log — don't repeat mistakes
- Target score: 480-530/720
- Identify and attack weak chapters immediately

**Month 10 (March): Weakness Attack**

- Allocate 60% of study time to identified weak areas
- Revise Chemistry Inorganic: NCERT line-by-line (most direct questions)
- Physics: Focus on Modern Physics, Optics (easy marks often left on table)
- Continue 2 mocks weekly

Target score: 540-580/720

**Month 11 (April): Speed & Accuracy**

- 3 full mocks per week
- Time targets: Biology in 60 min, Chemistry in 45 min, Physics in 60 min (leaving 35 min revision)
- Revise all Biology diagrams: 30 diagrams minimum
- Complete Chemistry formula revision
- Do NOT start new topics

Target score: 580-620/720

**Month 12 (May — Final Month):**

Week 1-2:
- 2 mocks + intensive revision of personal weak spots
- NCERT Biology final reading (complete book in 3 days — you should be able to by now)
- Chemistry revision: complete all reactions and equations

Week 3:
- Light revision only
- Previous year questions from 2020-2025
- Sleep schedule: 10:30 PM – 6:00 AM strictly

Week 4 (Exam week):
- Day before: Light reading, early dinner, 8 hours sleep
- Exam day: Carry all documents, arrive 45 minutes early, stay calm
- Strategy: Biology first (easiest to score), Chemistry, then Physics last

**ICC's NEET Support Package**

Our NEET program includes personalized study plans, bi-weekly mock test analysis sessions, doubt clearing with medical educators, and post-result college counseling. We support students from Day 1 through admission. Book your free consultation today.`,
  },

  "top-scholarships-indian-students-study-abroad": {
    title: "Top Scholarships for Indian Students to Study Abroad",
    author: "Rajesh Kumar",
    authorBio:
      "Rajesh Kumar has helped 500+ Indian students secure scholarships to study at universities in USA, UK, Germany, Australia, and Canada. He specializes in scholarship essay coaching and interview preparation.",
    category: "Study Abroad",
    date: "March 30, 2026",
    readTime: "10 min read",
    imageUrl: "/assets/generated/blog-scholarships.dim_800x500.jpg",
    tags: [
      "Scholarships",
      "Study Abroad",
      "DAAD",
      "Fulbright",
      "Commonwealth",
      "Erasmus",
    ],
    relatedSlugs: [
      "study-abroad-vs-study-india-which-better",
      "top-skills-2025-job-market",
      "top-10-careers-science-students-after-12th",
    ],
    content: `Studying abroad costs ₹50 lakhs to ₹2 crore depending on the destination and institution. Scholarships can make this dream accessible or even free. Here's your comprehensive guide to the best scholarships available for Indian students in 2025-26.

**1. DAAD (German Academic Exchange Service)**

Country: Germany
Value: Full tuition + ₹1,20,000–1,80,000/month stipend (varies by program)
Eligibility: Bachelor's degree with 60%+, IELTS/TOEFL for English programs; German language proficiency for German-language programs

Germany offers world-class engineering, sciences, and management education, often tuition-free at public universities. DAAD scholarships top up living expenses. Fields: Engineering, Sciences, Economics, Arts, Social Sciences.

Application: daad.de — annual deadlines typically October-November for following year.

**2. Commonwealth Scholarships**

Countries: UK, Canada, Australia, New Zealand, and other Commonwealth nations
Value: Full tuition + monthly stipend (₹1,00,000–1,50,000/month) + airfare
Eligibility: Indian citizens, Bachelor's degree with minimum 55-60% marks, strong academic record

Administered by the Commonwealth Scholarship Commission. Focuses on students from low-income backgrounds who demonstrate potential for change in their home country. Competition is intense — over 10,000 applications for ~300 scholarships annually.

**3. Fulbright-Nehru Fellowship**

Country: USA
Value: Full tuition + ₹1,50,000–2,00,000/month living allowance + health insurance
Eligibility: Bachelor's degree, minimum 2 years work experience for some programs, TOEFL/GRE required

The most prestigious US government scholarship. Covers Master's, PhD, and Research fellowships. Strong emphasis on leadership potential and ability to contribute to US-India relations. About 200 Indian fellows selected annually.

Application deadline: July 15 annually. Results: December-January.

**4. Erasmus Mundus Scholarship**

Countries: Multiple EU countries (France, Netherlands, Spain, Germany, Italy, etc.)
Value: Full tuition + ₹1,00,000–1,25,000/month stipend + travel allowance
Eligibility: Bachelor's degree, program-specific requirements

Unique feature: You study at 2-3 European universities in different countries over 1-2 years. Exceptional for building a pan-European professional network. Joint master's degree from multiple EU universities. Highly competitive with acceptance rates of 5-15%.

**5. JN Tata Endowment**

Country: Any abroad destination
Value: ₹10 lakhs–15 lakhs (loan scholarship, partially converted to gift upon return to India)
Eligibility: Indian citizen, first-class in graduation, already admitted to a recognized foreign university

One of India's oldest and most prestigious private scholarship programs established in 1892. Covers studies in any field worldwide. Recipients must return to India and contribute to the country's development — this is monitored.

Application: jntataendowment.org — deadline typically January.

**6. Inlaks Shivdasani Foundation**

Country: USA, UK, Europe
Value: Up to $100,000 USD (₹83 lakhs) for Master's programs
Eligibility: Indian citizen under 30, exceptional academic record, already admitted to top global university

One of the most generous private Indian scholarships. Focuses on students with extraordinary academic and extracurricular achievement. 25-30 scholarships awarded annually across all disciplines.

Competition: Extremely high. Successful applicants typically have 90%+ academics + significant achievements in their field.

**7. Australia Awards**

Country: Australia
Value: Full tuition + living allowance (~₹2,50,000/month) + health insurance + airfare
Eligibility: Indian citizens, Bachelor's with 65%+, not currently in Australia

Australia's flagship scholarship program for developing nations. Focuses on development-related fields: public health, education, governance, economics, agriculture. Recipients must return to India for at least 2 years after graduation.

**8. Gates Cambridge Scholarship**

Country: UK (Cambridge University only)
Value: Full cost of studying at Cambridge + living allowance
Eligibility: Any field, accepted by Cambridge, exceptional profile

One of the most prestigious and competitive scholarships globally. Only 80 international scholars per year from worldwide. Successful applicants typically have perfect or near-perfect academics + demonstrated leadership + research publications.

**ICC's Scholarship Application Support**

Our study abroad team provides:
- Profile evaluation and scholarship shortlisting
- Personal statement and essay coaching
- Interview preparation (mock interviews)
- Document compilation and review
- Admission application support

We've helped students from small towns across India win scholarships to Oxford, MIT, ETH Zurich, and NUS. Book your free scholarship consultation today.`,
  },

  "job-ready-diplomas-100-percent-placement-2025": {
    title: "Job-Ready Diplomas with 100% Placement – 2025 Guide",
    author: "Sunita Patel",
    authorBio:
      "Sunita Patel tracks India's diploma and vocational education landscape and has counseled 800+ students toward placement-guaranteed diploma programs across Aviation, Hospitality, Healthcare, and IT.",
    category: "Diploma Courses",
    date: "March 29, 2026",
    readTime: "10 min read",
    imageUrl: "/assets/generated/blog-diplomas.dim_800x500.jpg",
    tags: [
      "Diploma",
      "100% Placement",
      "Aviation",
      "Hospitality",
      "Nursing",
      "IT",
    ],
    relatedSlugs: [
      "top-skills-2025-job-market",
      "top-10-careers-commerce-students-2025",
      "choose-right-stream-after-class-10",
    ],
    content: `Not every student needs a 4-year degree to build a successful career. Specialized diploma programs — particularly in Aviation, Hospitality, Nursing, and IT — offer faster routes to employment with competitive salaries. India's growing economy creates massive demand for skilled professionals in these sectors. Here's your complete 2025 guide.

**Aviation Diploma Programs**

Duration: 6 months – 2 years
Eligibility: 10+2 (any stream), age 17-26 for cabin crew, height and medical requirements
Starting Salary: ₹2.5 LPA – ₹6 LPA (domestic), ₹8 LPA – ₹18 LPA (international airlines)

Top Programs:
1. Diploma in Air Hostess / Cabin Crew Training — 6 months to 1 year. IndiGo, SpiceJet, Air India, Vistara hire directly from placement programs. Requirements: 10+2, good English, height (min 157cm for female, 170cm for male), clear complexion.

2. Diploma in Airport Ground Operations — Ground handling, check-in, baggage management. BCAS security clearance required. Salary: ₹2.5–4.5 LPA.

3. Diploma in Aviation Management (1 year) — For students aiming at airline operations, revenue management, cargo handling. Post-graduates of aviation management programs earn ₹4–8 LPA.

Top Aviation Training Institutes: Frankfinn Institute, IATA Training, Aptech Aviation, Air Hostess Academy (AHA), National Aviation College.

**Hospitality & Hotel Management Diplomas**

Duration: 6 months – 3 years
Eligibility: 10+2 (any stream), personality-focused selection
Starting Salary: ₹2.5 LPA – ₹5 LPA (India), $25,000–40,000/year (international)

Top Programs:
1. Diploma in Hotel Management (3 years) — From NCHMCT-affiliated institutes. Covers front office, housekeeping, F&B, kitchen management. The Oberoi, ITC Hotels, Marriott, Hyatt are top recruiters.

2. Diploma in Food & Beverage Service (1 year) — Specialized in restaurant and banquet operations. Rising star chefs and F&B managers start here.

3. Diploma in Culinary Arts (1-2 years) — For aspiring chefs. IHM Mumbai, Welcomgroup Graduate School, Culinary Academy of India are premier institutes. Celebrity chefs command ₹15–50 LPA; even entry-level chef de parties earn ₹3.5–6 LPA.

Growth path: Diploma → F&B Supervisor (₹4-6 LPA) → Restaurant Manager (₹8-15 LPA) → F&B Director (₹20-40 LPA) → Hotel General Manager (₹40-80 LPA).

**Nursing & Healthcare Diplomas**

Duration: 2-3 years
Eligibility: 10+2 with Physics, Chemistry, Biology; minimum 45% marks
Starting Salary: ₹2 LPA – ₹5 LPA (India), ₹25,000–45,000/month (Middle East/UK after recognition)

Top Programs:
1. General Nursing & Midwifery (GNM — 3.5 years) — India's most popular nursing qualification. Over 1 lakh hospitals and healthcare facilities hire GNM nurses. Government hospital Grade A Nurse starting salary: ₹35,000–45,000/month.

2. Auxiliary Nurse & Midwife (ANM — 2 years) — Primary health center level nursing. Excellent for rural healthcare careers and government jobs via state nursing councils.

3. Diploma in Medical Lab Technology (DMLT — 2 years) — Lab technicians are critical but often overlooked. Pathology labs, hospitals, diagnostic centers. Salary: ₹2.5–5 LPA with growth to ₹8–15 LPA at senior levels.

4. Diploma in Pharmacy (D.Pharm — 2 years) — Community pharmacy practice. Own a pharmacy after 2 years with registration. Pharmacy owners earn ₹5–20 lakhs/year.

International Nursing Opportunity: NCLEX (USA licensing exam) and NMC (UK) registration opens opportunities with salaries of ₹35–60 lakhs/year equivalent for Indian nurses abroad.

**IT & Technology Diplomas**

Duration: 6 months – 2 years
Eligibility: 10+2 (Science/Math preferred), some programs accept any stream
Starting Salary: ₹2.5 LPA – ₹8 LPA depending on specialization

Top Programs:
1. Diploma in Full Stack Web Development (6-12 months) — HTML, CSS, JavaScript, React, Node.js, databases. Bootcamp-style programs from Masai School, Newton School, Scaler. Starting salary: ₹3.5–7 LPA. Companies hire directly from these programs.

2. Diploma in Data Science & Analytics (1 year) — Python, SQL, machine learning basics. NIIT, Simplilearn, upGrad offer placement-backed programs. Starting salary: ₹4–8 LPA.

3. Diploma in Cybersecurity (1 year) — Ethical hacking, network security, VAPT. CEH, CompTIA Security+ certifications add value. Starting salary: ₹4–8 LPA; senior security analysts earn ₹20–50 LPA.

4. Diploma in Cloud Computing & DevOps (6-12 months) — AWS, Azure, GCP certifications included. One of the fastest-growing fields. AWS Certified Solutions Architect holders earn ₹6–15 LPA at entry level.

**Choosing the Right Diploma Program**

Key questions to evaluate any program:
1. What is the actual placement rate? (Ask for last 2 years' data, not just claims)
2. Who are the partner recruiters? (Google logos mean nothing without a signed placement agreement)
3. What is the average package placed? (Not the highest package)
4. Is the institute approved by relevant authorities? (AICTE, INC for nursing, DGCA for aviation)
5. What does the fee include? (Uniform, tools, certifications, exam fees)

ICC's Diploma Career Counseling service evaluates your aptitude, financial situation, and career goals to recommend the right diploma track and institute. We have verified partnerships with 150+ placement-focused institutes across India. Book your free session today.`,
  },
};

// Slug to metadata mapping for related post display
const POST_META: Record<
  string,
  { title: string; category: string; date: string }
> = {
  "top-10-careers-science-students-after-12th": {
    title: "Top 10 Careers for Science Students After 12th",
    category: "Career Guidance",
    date: "April 6, 2026",
  },
  "study-abroad-vs-study-india-which-better": {
    title: "Study Abroad vs Study in India – Which One Is Better?",
    category: "Study Abroad",
    date: "April 5, 2026",
  },
  "how-to-crack-neet-one-attempt": {
    title: "How to Crack NEET in One Attempt",
    category: "Entrance Exams",
    date: "April 4, 2026",
  },
  "top-skills-2025-job-market": {
    title: "Top Skills for 2025 Job Market",
    category: "Career Guidance",
    date: "April 3, 2026",
  },
  "top-10-careers-commerce-students-2025": {
    title: "Top 10 Careers for Commerce Students in 2025",
    category: "Career Guidance",
    date: "April 2, 2026",
  },
  "choose-right-stream-after-class-10": {
    title: "How to Choose the Right Stream After Class 10",
    category: "Stream Selection",
    date: "April 1, 2026",
  },
  "neet-preparation-12-month-roadmap": {
    title: "NEET Preparation: A 12-Month Roadmap",
    category: "Entrance Exams",
    date: "March 31, 2026",
  },
  "top-scholarships-indian-students-study-abroad": {
    title: "Top Scholarships for Indian Students to Study Abroad",
    category: "Study Abroad",
    date: "March 30, 2026",
  },
  "job-ready-diplomas-100-percent-placement-2025": {
    title: "Job-Ready Diplomas with 100% Placement – 2025 Guide",
    category: "Diploma Courses",
    date: "March 29, 2026",
  },
};

function renderContent(content: string) {
  return content.split("\n\n").map((para, i) => {
    const key = `p-${i}`;
    if (para.startsWith("**") && para.endsWith("**") && !para.includes("\n")) {
      return (
        <h2
          key={key}
          className="font-display font-bold text-xl md:text-2xl text-foreground mt-10 mb-4 pb-2 border-b border-border"
        >
          {para.replace(/\*\*/g, "")}
        </h2>
      );
    }
    if (para.startsWith("- ") || /^\d+\./.test(para)) {
      const items = para.split("\n").filter(Boolean);
      return (
        <ul key={key} className="space-y-2 mb-5 ml-5">
          {items.map((item) => (
            <li
              key={`${key}-li-${item.substring(0, 20).replace(/\s/g, "")}`}
              className="text-muted-foreground text-sm leading-relaxed list-disc marker:text-primary"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled static content
              dangerouslySetInnerHTML={{
                __html: item
                  .replace(/^[\d\.\-\s]+/, "")
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          ))}
        </ul>
      );
    }
    // Render inline bold
    const html = para
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
    return (
      <p
        key={key}
        className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled static content
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

export default function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = POSTS[slug];

  if (!post) {
    return (
      <div className="py-40 text-center">
        <div className="text-6xl mb-6">📄</div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-3">
          Article Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          This article may have been moved or doesn't exist.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero header */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.08 280) 0%, oklch(0.22 0.1 280) 60%, oklch(0.18 0.12 50) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-6 left-12 w-48 h-48 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-4 right-8 w-36 h-36 rounded-full bg-accent blur-2xl" />
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary text-sm mb-7 transition-smooth"
            data-ocid="blog-back-link"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30 mb-4">
              <BookOpen className="w-3 h-3" />
              {post.category}
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mt-2 mb-5 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-foreground/60">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main article */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-56 md:h-72 object-cover rounded-2xl mb-8 border border-border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/generated/hero-students.dim_1200x700.jpg";
                }}
              />

              <article className="prose-custom">
                {renderContent(post.content)}
              </article>

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-primary/10 hover:text-primary transition-smooth cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author bio */}
              <div className="mt-8 p-6 rounded-2xl bg-muted/50 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {post.author}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                      {post.authorBio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* CTA */}
              <div className="p-6 rounded-2xl gradient-subtle border border-primary/20 sticky top-[120px]">
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  Get Expert Guidance
                </h3>
                <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                  Confused about your career? Book a free 30-minute session with
                  our certified counselors.
                </p>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-smooth"
                  data-ocid="blog-sidebar-cta"
                >
                  Book Free Session <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Related articles */}
              {post.relatedSlugs.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {post.relatedSlugs.map((rSlug) => {
                      const meta = POST_META[rSlug];
                      if (!meta) return null;
                      return (
                        <Link
                          key={rSlug}
                          to="/blog/$slug"
                          params={{ slug: rSlug }}
                          className="block p-3.5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow transition-smooth group"
                          data-ocid={`related-post-${rSlug}`}
                        >
                          <span className="text-xs text-primary font-medium block mb-1">
                            {meta.category}
                          </span>
                          <p className="text-xs text-foreground font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {meta.title}
                          </p>
                          <span className="text-xs text-muted-foreground mt-1 block">
                            {meta.date}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
