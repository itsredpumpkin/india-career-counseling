import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Types "../types/icc-data";
import Lib "../lib/icc-data";

mixin (
  sessions : Map.Map<Text, Types.AdminSession>,
  submissions : List.List<Types.ContactSubmission>,
  courses : List.List<Types.Course>,
  posts : List.List<Types.BlogPost>,
  testimonials : List.List<Types.Testimonial>,
  counters : Types.AppCounters,
) {
  // Admin credentials
  let ADMIN_USERNAME : Text = "admin";
  let ADMIN_PASSWORD : Text = "ICC@Admin2024";
  // Session TTL: 24 hours in nanoseconds
  let SESSION_TTL_NS : Int = 86_400_000_000_000;

  // ---- Admin Authentication ----

  public shared func adminLogin(username : Text, password : Text) : async { #ok : Text; #err : Text } {
    if (username == ADMIN_USERNAME and password == ADMIN_PASSWORD) {
      let now = Time.now();
      let salt = Int.abs(now).toNat() % 999999;
      let token = Lib.generateToken(username, now, salt);
      let session : Types.AdminSession = {
        username;
        expiresAt = now + SESSION_TTL_NS;
      };
      sessions.add(token, session);
      #ok(token)
    } else {
      #err("Invalid username or password")
    }
  };

  public shared func adminLogout(token : Text) : async () {
    sessions.remove(token)
  };

  public query func validateAdminSession(token : Text) : async Bool {
    Lib.isValidSession(sessions, token)
  };

  // ---- Contact Form (Public submit, admin read/delete) ----

  public shared func submitContactForm(input : Types.ContactSubmissionInput) : async Nat {
    let id = counters.nextSubmissionId;
    counters.nextSubmissionId += 1;
    Lib.submitContact(submissions, id, input)
  };

  public query func getContactSubmissions(token : Text) : async [Types.ContactSubmissionPublic] {
    Lib.requireAdmin(sessions, token);
    Lib.getSubmissions(submissions)
  };

  public shared func markContactSubmissionRead(token : Text, id : Nat) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.markSubmissionRead(submissions, id)
  };

  public shared func deleteContactSubmission(token : Text, id : Nat) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.deleteSubmission(submissions, id)
  };

  // ---- Courses (Public read, admin CRUD) ----

  public query func getCourses(activeOnly : Bool) : async [Types.Course] {
    Lib.listCourses(courses, activeOnly)
  };

  public query func getCourseById(id : Nat) : async ?Types.Course {
    Lib.getCourse(courses, id)
  };

  public shared func adminCreateCourse(token : Text, input : Types.CourseInput) : async Nat {
    Lib.requireAdmin(sessions, token);
    let id = counters.nextCourseId;
    counters.nextCourseId += 1;
    Lib.createCourse(courses, id, input)
  };

  public shared func adminUpdateCourse(token : Text, id : Nat, input : Types.CourseInput) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.updateCourse(courses, id, input)
  };

  public shared func adminDeleteCourse(token : Text, id : Nat) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.deleteCourse(courses, id)
  };

  // ---- Blog Posts (Public read, admin CRUD) ----

  public query func getBlogPosts(publishedOnly : Bool) : async [Types.BlogPost] {
    Lib.listBlogPosts(posts, publishedOnly)
  };

  public query func getBlogPostById(id : Nat) : async ?Types.BlogPost {
    Lib.getBlogPost(posts, id)
  };

  public query func getBlogPostBySlug(slug : Text) : async ?Types.BlogPost {
    Lib.getBlogPostBySlug(posts, slug)
  };

  public shared func adminCreateBlogPost(token : Text, input : Types.BlogPostInput) : async Nat {
    Lib.requireAdmin(sessions, token);
    let id = counters.nextPostId;
    counters.nextPostId += 1;
    Lib.createBlogPost(posts, id, input)
  };

  public shared func adminUpdateBlogPost(token : Text, id : Nat, input : Types.BlogPostInput) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.updateBlogPost(posts, id, input)
  };

  public shared func adminDeleteBlogPost(token : Text, id : Nat) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.deleteBlogPost(posts, id)
  };

  // ---- Testimonials (Public read, admin CRUD) ----

  public query func getTestimonials(activeOnly : Bool, featuredOnly : Bool) : async [Types.Testimonial] {
    Lib.listTestimonials(testimonials, activeOnly, featuredOnly)
  };

  public query func getTestimonialById(id : Nat) : async ?Types.Testimonial {
    Lib.getTestimonial(testimonials, id)
  };

  public shared func adminCreateTestimonial(token : Text, input : Types.TestimonialInput) : async Nat {
    Lib.requireAdmin(sessions, token);
    let id = counters.nextTestimonialId;
    counters.nextTestimonialId += 1;
    Lib.createTestimonial(testimonials, id, input)
  };

  public shared func adminUpdateTestimonial(token : Text, id : Nat, input : Types.TestimonialInput) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.updateTestimonial(testimonials, id, input)
  };

  public shared func adminDeleteTestimonial(token : Text, id : Nat) : async Bool {
    Lib.requireAdmin(sessions, token);
    Lib.deleteTestimonial(testimonials, id)
  };

  // ---- Sample Data (admin trigger) ----

  public shared func adminSeedSampleData(token : Text) : async Text {
    Lib.requireAdmin(sessions, token);
    if (counters.seeded) {
      return "Already seeded"
    };
    let (nc, np, nt) = Lib.seedSampleData(
      courses, posts, testimonials,
      counters.nextCourseId, counters.nextPostId, counters.nextTestimonialId
    );
    counters.nextCourseId := nc;
    counters.nextPostId := np;
    counters.nextTestimonialId := nt;
    counters.seeded := true;
    "Sample data seeded successfully"
  };
};
