import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Types "../types/icc-data";

module {

  // ---- Session Auth Helpers ----

  // Simple hash: combine username + timestamp digits into a deterministic token text
  public func generateToken(username : Text, now : Int, salt : Nat) : Text {
    let t = now.toText();
    let s = salt.toText();
    username # "-" # t # "-" # s
  };

  public func isValidSession(
    sessions : Map.Map<Text, Types.AdminSession>,
    token : Text,
  ) : Bool {
    switch (sessions.get(token)) {
      case (?session) {
        let now = Time.now();
        now < session.expiresAt
      };
      case null false;
    }
  };

  public func requireAdmin(
    sessions : Map.Map<Text, Types.AdminSession>,
    token : Text,
  ) {
    if (not isValidSession(sessions, token)) {
      Runtime.trap("Unauthorized: invalid or expired session token")
    }
  };

  // ---- Contact Submissions ----

  public func submitContact(
    submissions : List.List<Types.ContactSubmission>,
    nextId : Nat,
    input : Types.ContactSubmissionInput,
  ) : Nat {
    let id = nextId;
    let sub : Types.ContactSubmission = {
      id;
      name = input.name;
      phone = input.phone;
      email = input.email;
      courseInterested = input.courseInterested;
      message = input.message;
      submittedAt = Time.now();
      var isRead = false;
    };
    submissions.add(sub);
    id
  };

  public func getSubmissions(
    submissions : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmissionPublic] {
    let arr = submissions.toArray();
    arr.map<Types.ContactSubmission, Types.ContactSubmissionPublic>(
      func(s) {
        {
          id = s.id;
          name = s.name;
          phone = s.phone;
          email = s.email;
          courseInterested = s.courseInterested;
          message = s.message;
          submittedAt = s.submittedAt;
          isRead = s.isRead;
        }
      }
    )
  };

  public func markSubmissionRead(
    submissions : List.List<Types.ContactSubmission>,
    id : Nat,
  ) : Bool {
    var found = false;
    submissions.forEach(func(s) {
      if (s.id == id) {
        s.isRead := true;
        found := true;
      }
    });
    found
  };

  public func deleteSubmission(
    submissions : List.List<Types.ContactSubmission>,
    id : Nat,
  ) : Bool {
    let before = submissions.size();
    let filtered = submissions.filter(func(s) { s.id != id });
    submissions.clear();
    submissions.append(filtered);
    submissions.size() < before
  };

  // ---- Courses ----

  public func createCourse(
    courses : List.List<Types.Course>,
    nextId : Nat,
    input : Types.CourseInput,
  ) : Nat {
    let id = nextId;
    let course : Types.Course = {
      id;
      name = input.name;
      stream = input.stream;
      level = input.level;
      courseType = input.courseType;
      duration = input.duration;
      feesINR = input.feesINR;
      description = input.description;
      eligibility = input.eligibility;
      careerProspects = input.careerProspects;
      partnerCollegesCount = input.partnerCollegesCount;
      isActive = input.isActive;
    };
    courses.add(course);
    id
  };

  public func getCourse(
    courses : List.List<Types.Course>,
    id : Nat,
  ) : ?Types.Course {
    courses.find(func(c) { c.id == id })
  };

  public func listCourses(
    courses : List.List<Types.Course>,
    activeOnly : Bool,
  ) : [Types.Course] {
    if (activeOnly) {
      courses.filter(func(c) { c.isActive }).toArray()
    } else {
      courses.toArray()
    }
  };

  public func updateCourse(
    courses : List.List<Types.Course>,
    id : Nat,
    input : Types.CourseInput,
  ) : Bool {
    var found = false;
    courses.mapInPlace(func(c) {
      if (c.id == id) {
        found := true;
        {
          id = c.id;
          name = input.name;
          stream = input.stream;
          level = input.level;
          courseType = input.courseType;
          duration = input.duration;
          feesINR = input.feesINR;
          description = input.description;
          eligibility = input.eligibility;
          careerProspects = input.careerProspects;
          partnerCollegesCount = input.partnerCollegesCount;
          isActive = input.isActive;
        }
      } else { c }
    });
    found
  };

  public func deleteCourse(
    courses : List.List<Types.Course>,
    id : Nat,
  ) : Bool {
    let before = courses.size();
    let filtered = courses.filter(func(c) { c.id != id });
    courses.clear();
    courses.append(filtered);
    courses.size() < before
  };

  // ---- Blog Posts ----

  public func createBlogPost(
    posts : List.List<Types.BlogPost>,
    nextId : Nat,
    input : Types.BlogPostInput,
  ) : Nat {
    let id = nextId;
    let post : Types.BlogPost = {
      id;
      title = input.title;
      slug = input.slug;
      excerpt = input.excerpt;
      content = input.content;
      author = input.author;
      publishDate = input.publishDate;
      category = input.category;
      imageUrl = input.imageUrl;
      isDraft = input.isDraft;
      tags = input.tags;
    };
    posts.add(post);
    id
  };

  public func getBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
  ) : ?Types.BlogPost {
    posts.find(func(p) { p.id == id })
  };

  public func getBlogPostBySlug(
    posts : List.List<Types.BlogPost>,
    slug : Text,
  ) : ?Types.BlogPost {
    posts.find(func(p) { p.slug == slug })
  };

  public func listBlogPosts(
    posts : List.List<Types.BlogPost>,
    publishedOnly : Bool,
  ) : [Types.BlogPost] {
    if (publishedOnly) {
      posts.filter(func(p) { not p.isDraft }).toArray()
    } else {
      posts.toArray()
    }
  };

  public func updateBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
    input : Types.BlogPostInput,
  ) : Bool {
    var found = false;
    posts.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        {
          id = p.id;
          title = input.title;
          slug = input.slug;
          excerpt = input.excerpt;
          content = input.content;
          author = input.author;
          publishDate = input.publishDate;
          category = input.category;
          imageUrl = input.imageUrl;
          isDraft = input.isDraft;
          tags = input.tags;
        }
      } else { p }
    });
    found
  };

  public func deleteBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
  ) : Bool {
    let before = posts.size();
    let filtered = posts.filter(func(p) { p.id != id });
    posts.clear();
    posts.append(filtered);
    posts.size() < before
  };

  // ---- Testimonials ----

  public func createTestimonial(
    testimonials : List.List<Types.Testimonial>,
    nextId : Nat,
    input : Types.TestimonialInput,
  ) : Nat {
    let id = nextId;
    let t : Types.Testimonial = {
      id;
      studentName = input.studentName;
      courseStream = input.courseStream;
      achievement = input.achievement;
      starRating = input.starRating;
      quote = input.quote;
      isFeatured = input.isFeatured;
      isActive = input.isActive;
    };
    testimonials.add(t);
    id
  };

  public func getTestimonial(
    testimonials : List.List<Types.Testimonial>,
    id : Nat,
  ) : ?Types.Testimonial {
    testimonials.find(func(t) { t.id == id })
  };

  public func listTestimonials(
    testimonials : List.List<Types.Testimonial>,
    activeOnly : Bool,
    featuredOnly : Bool,
  ) : [Types.Testimonial] {
    testimonials.filter(func(t) {
      (not activeOnly or t.isActive) and (not featuredOnly or t.isFeatured)
    }).toArray()
  };

  public func updateTestimonial(
    testimonials : List.List<Types.Testimonial>,
    id : Nat,
    input : Types.TestimonialInput,
  ) : Bool {
    var found = false;
    testimonials.mapInPlace(func(t) {
      if (t.id == id) {
        found := true;
        {
          id = t.id;
          studentName = input.studentName;
          courseStream = input.courseStream;
          achievement = input.achievement;
          starRating = input.starRating;
          quote = input.quote;
          isFeatured = input.isFeatured;
          isActive = input.isActive;
        }
      } else { t }
    });
    found
  };

  public func deleteTestimonial(
    testimonials : List.List<Types.Testimonial>,
    id : Nat,
  ) : Bool {
    let before = testimonials.size();
    let filtered = testimonials.filter(func(t) { t.id != id });
    testimonials.clear();
    testimonials.append(filtered);
    testimonials.size() < before
  };

  // ---- Sample Data Seeding ----

  public func seedSampleData(
    courses : List.List<Types.Course>,
    posts : List.List<Types.BlogPost>,
    testimonials : List.List<Types.Testimonial>,
    nextCourseId : Nat,
    nextPostId : Nat,
    nextTestimonialId : Nat,
  ) : (Nat, Nat, Nat) {
    // Seed 3 courses
    ignore createCourse(courses, nextCourseId, {
      name = "B.Tech Computer Science Engineering";
      stream = #Engineering;
      level = #Bachelor;
      courseType = #FullTime;
      duration = "4 Years";
      feesINR = 800000;
      description = "A comprehensive undergraduate program covering software engineering, algorithms, data structures, and modern computing paradigms.";
      eligibility = "10+2 with Physics, Chemistry, Mathematics. Minimum 60% aggregate. Valid JEE score.";
      careerProspects = ["Software Engineer", "Data Scientist", "System Architect", "Product Manager", "Tech Lead"];
      partnerCollegesCount = 45;
      isActive = true;
    });
    ignore createCourse(courses, nextCourseId + 1, {
      name = "MBBS – Bachelor of Medicine and Surgery";
      stream = #Medical;
      level = #Bachelor;
      courseType = #FullTime;
      duration = "5.5 Years";
      feesINR = 5000000;
      description = "India's most prestigious medical degree covering all aspects of human medicine, surgery, and clinical practice.";
      eligibility = "10+2 with Physics, Chemistry, Biology. Minimum 50% aggregate. Valid NEET score.";
      careerProspects = ["General Physician", "Specialist Doctor", "Surgeon", "Medical Researcher", "Hospital Administrator"];
      partnerCollegesCount = 30;
      isActive = true;
    });
    ignore createCourse(courses, nextCourseId + 2, {
      name = "MBA – Master of Business Administration";
      stream = #Management;
      level = #Master;
      courseType = #FullTime;
      duration = "2 Years";
      feesINR = 1200000;
      description = "A flagship postgraduate management program with specialisations in Finance, Marketing, HR, and Operations.";
      eligibility = "Bachelor's degree in any discipline with minimum 50% marks. Valid CAT/MAT/XAT score.";
      careerProspects = ["Business Manager", "Marketing Director", "Financial Analyst", "Consultant", "Entrepreneur"];
      partnerCollegesCount = 60;
      isActive = true;
    });

    // Seed 3 blog posts
    ignore createBlogPost(posts, nextPostId, {
      title = "Top 10 Engineering Colleges in India 2024";
      slug = "top-10-engineering-colleges-india-2024";
      excerpt = "Explore the best engineering institutions in India ranked by placement records, infrastructure, and faculty quality.";
      content = "India has some of the finest engineering colleges in the world. From IITs to NITs, the options are vast. In this article, we explore the top 10 engineering colleges based on NIRF rankings, placement records, and student satisfaction scores. Whether you are targeting IIT Bombay or VIT Vellore, this guide will help you make an informed decision about your engineering career.";
      author = "ICC Editorial Team";
      publishDate = 1704067200000000000;
      category = "Engineering";
      imageUrl = "/assets/dsc_7796_1-019dd4b7-9dce-74fc-b529-c065bc67687c.jpg";
      isDraft = false;
      tags = ["Engineering", "College Rankings", "IIT", "NIT", "Career"];
    });
    ignore createBlogPost(posts, nextPostId + 1, {
      title = "How to Prepare for NEET 2024 – Complete Strategy";
      slug = "neet-2024-preparation-strategy";
      excerpt = "A step-by-step guide to cracking NEET with the right study plan, resources, and mindset.";
      content = "NEET is the gateway to India's top medical colleges. With lakhs of students competing for limited seats, preparation strategy matters enormously. This guide covers topic-wise weightage, recommended books, mock test schedules, and tips from toppers. Start early, practice consistently, and stay focused on your goal of becoming a doctor.";
      author = "Dr. Priya Sharma";
      publishDate = 1706745600000000000;
      category = "Medical";
      imageUrl = "/assets/dsc_7850_1-019dd4b7-ca66-7279-9a10-6b72d0c1f852.jpg";
      isDraft = false;
      tags = ["NEET", "Medical", "Exam Preparation", "Study Tips"];
    });
    ignore createBlogPost(posts, nextPostId + 2, {
      title = "MBA vs. PGDM – Which is Right for You?";
      slug = "mba-vs-pgdm-which-is-right-for-you";
      excerpt = "Confused between MBA and PGDM? Here's a detailed comparison to help you choose the right management programme.";
      content = "Both MBA and PGDM are popular management qualifications in India, but they differ significantly in structure, recognition, and career outcomes. An MBA is awarded by universities and is regulated by UGC, while PGDM is a diploma offered by autonomous institutes like IIMs. This article breaks down the differences in curriculum, fees, placements, and industry acceptance to help you make the best choice for your management career.";
      author = "Amit Verma, Career Counsellor";
      publishDate = 1709424000000000000;
      category = "Management";
      imageUrl = "/assets/dsc_7782_1-019dd4b7-cc48-74d8-858a-de3a5531fc11.jpg";
      isDraft = false;
      tags = ["MBA", "PGDM", "Management", "Career Guidance"];
    });

    // Seed 3 testimonials
    ignore createTestimonial(testimonials, nextTestimonialId, {
      studentName = "Rahul Mehta";
      courseStream = "Engineering";
      achievement = "Secured admission to IIT Delhi, B.Tech CSE";
      starRating = 5;
      quote = "ICC's counsellors helped me identify the right engineering branch based on my aptitude. Their mock interview sessions and college selection guidance were invaluable. I got into my dream college!";
      isFeatured = true;
      isActive = true;
    });
    ignore createTestimonial(testimonials, nextTestimonialId + 1, {
      studentName = "Priya Patel";
      courseStream = "Medical";
      achievement = "NEET Score 680/720, MBBS at AIIMS Bhopal";
      starRating = 5;
      quote = "The personalised study plan from ICC made all the difference. They understood my weak areas and helped me work on them systematically. Cracking NEET with such a high score was a dream come true.";
      isFeatured = true;
      isActive = true;
    });
    ignore createTestimonial(testimonials, nextTestimonialId + 2, {
      studentName = "Anjali Singh";
      courseStream = "Management";
      achievement = "Placed at Deloitte after MBA from IIM Lucknow";
      starRating = 5;
      quote = "ICC guided me through CAT preparation, college shortlisting, and WAT/PI rounds. Their industry connections and real-world insights gave me a competitive edge. Highly recommend to any MBA aspirant!";
      isFeatured = false;
      isActive = true;
    });

    (nextCourseId + 3, nextPostId + 3, nextTestimonialId + 3)
  };
};
