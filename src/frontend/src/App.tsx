import {
  RouterProvider,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Route as RootRoute } from "./routes/__root";

import AboutPage from "./routes/about";
import AdminPage from "./routes/admin";
import BlogPage from "./routes/blog";
import BlogPostPage from "./routes/blog/$slug";
import ContactPage from "./routes/contact";
import CoursesPage from "./routes/courses";
import CourseDetailPage from "./routes/courses/$courseId";
// Lazy imports for pages
import HomePage from "./routes/index";
import ServicesPage from "./routes/services";
import CareerCounselingPage from "./routes/services/career-counseling";
import DiplomaPlacementPage from "./routes/services/diploma-placement";
import EntranceExamPage from "./routes/services/entrance-exam";
import StreamSelectionPage from "./routes/services/stream-selection";
import StudyAbroadPage from "./routes/services/study-abroad";
import TestimonialsPage from "./routes/testimonials";

const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/about",
  component: AboutPage,
});
const servicesRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/services",
  component: ServicesPage,
});
const careerCounselingRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/services/career-counseling",
  component: CareerCounselingPage,
});
const streamSelectionRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/services/stream-selection",
  component: StreamSelectionPage,
});
const entranceExamRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/services/entrance-exam",
  component: EntranceExamPage,
});
const studyAbroadRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/services/study-abroad",
  component: StudyAbroadPage,
});
const diploamPlacementRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/services/diploma-placement",
  component: DiplomaPlacementPage,
});
const coursesRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/courses",
  component: CoursesPage,
});
const courseDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/courses/$courseId",
  component: CourseDetailPage,
});
const blogRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/blog",
  component: BlogPage,
});
const blogPostRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/blog/$slug",
  component: BlogPostPage,
});
const testimonialsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/testimonials",
  component: TestimonialsPage,
});
const contactRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/contact",
  component: ContactPage,
});
const adminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = RootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  careerCounselingRoute,
  streamSelectionRoute,
  entranceExamRoute,
  studyAbroadRoute,
  diploamPlacementRoute,
  coursesRoute,
  courseDetailRoute,
  blogRoute,
  blogPostRoute,
  testimonialsRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
