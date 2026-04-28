import List "mo:core/List";
import Map "mo:core/Map";
import Types "types/icc-data";
import IccDataApi "mixins/icc-data-api";
import Lib "lib/icc-data";

actor {
  // Admin session store: token -> AdminSession
  let sessions = Map.empty<Text, Types.AdminSession>();

  // Domain collections
  let submissions  = List.empty<Types.ContactSubmission>();
  let courses      = List.empty<Types.Course>();
  let posts        = List.empty<Types.BlogPost>();
  let testimonials = List.empty<Types.Testimonial>();

  // Mutable counters and seeding flag
  let counters : Types.AppCounters = {
    var nextSubmissionId  = 0;
    var nextCourseId      = 0;
    var nextPostId        = 0;
    var nextTestimonialId = 0;
    var seeded            = false;
  };

  // Auto-seed sample data on first deploy
  do {
    let (nc, np, nt) = Lib.seedSampleData(
      courses, posts, testimonials,
      counters.nextCourseId, counters.nextPostId, counters.nextTestimonialId
    );
    counters.nextCourseId      := nc;
    counters.nextPostId        := np;
    counters.nextTestimonialId := nt;
    counters.seeded            := true;
  };

  include IccDataApi(
    sessions,
    submissions,
    courses,
    posts,
    testimonials,
    counters,
  );
};
