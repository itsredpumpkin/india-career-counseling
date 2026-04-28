module {
  // --- Admin Session ---
  public type AdminSession = {
    username : Text;
    expiresAt : Int; // nanoseconds timestamp
  };

  // --- Mutable counters and flags (passed as a record to avoid var mixin params) ---
  public type AppCounters = {
    var nextSubmissionId : Nat;
    var nextCourseId : Nat;
    var nextPostId : Nat;
    var nextTestimonialId : Nat;
    var seeded : Bool;
  };

  // --- Contact Form Submission ---
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    courseInterested : Text;
    message : Text;
    submittedAt : Int;
    var isRead : Bool;
  };

  public type ContactSubmissionPublic = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    courseInterested : Text;
    message : Text;
    submittedAt : Int;
    isRead : Bool;
  };

  public type ContactSubmissionInput = {
    name : Text;
    phone : Text;
    email : Text;
    courseInterested : Text;
    message : Text;
  };

  // --- Courses ---
  public type CourseStream = {
    #Engineering;
    #Medical;
    #Management;
    #Law;
    #Commerce;
    #Science;
    #Arts;
    #Other;
  };

  public type CourseLevel = {
    #Diploma;
    #Bachelor;
    #Master;
    #PhD;
  };

  public type CourseType = {
    #FullTime;
    #PartTime;
  };

  public type Course = {
    id : Nat;
    name : Text;
    stream : CourseStream;
    level : CourseLevel;
    courseType : CourseType;
    duration : Text;
    feesINR : Nat;
    description : Text;
    eligibility : Text;
    careerProspects : [Text];
    partnerCollegesCount : Nat;
    isActive : Bool;
  };

  public type CourseInput = {
    name : Text;
    stream : CourseStream;
    level : CourseLevel;
    courseType : CourseType;
    duration : Text;
    feesINR : Nat;
    description : Text;
    eligibility : Text;
    careerProspects : [Text];
    partnerCollegesCount : Nat;
    isActive : Bool;
  };

  // --- Blog Posts ---
  public type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    author : Text;
    publishDate : Int;
    category : Text;
    imageUrl : Text;
    isDraft : Bool;
    tags : [Text];
  };

  public type BlogPostInput = {
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    author : Text;
    publishDate : Int;
    category : Text;
    imageUrl : Text;
    isDraft : Bool;
    tags : [Text];
  };

  // --- Testimonials ---
  public type Testimonial = {
    id : Nat;
    studentName : Text;
    courseStream : Text;
    achievement : Text;
    starRating : Nat;
    quote : Text;
    isFeatured : Bool;
    isActive : Bool;
  };

  public type TestimonialInput = {
    studentName : Text;
    courseStream : Text;
    achievement : Text;
    starRating : Nat;
    quote : Text;
    isFeatured : Bool;
    isActive : Bool;
  };
};
