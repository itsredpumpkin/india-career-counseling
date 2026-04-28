import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CourseInput {
    careerProspects: Array<string>;
    partnerCollegesCount: bigint;
    stream: CourseStream;
    duration: string;
    name: string;
    description: string;
    feesINR: bigint;
    isActive: boolean;
    level: CourseLevel;
    eligibility: string;
    courseType: CourseType;
}
export interface Course {
    id: bigint;
    careerProspects: Array<string>;
    partnerCollegesCount: bigint;
    stream: CourseStream;
    duration: string;
    name: string;
    description: string;
    feesINR: bigint;
    isActive: boolean;
    level: CourseLevel;
    eligibility: string;
    courseType: CourseType;
}
export interface Testimonial {
    id: bigint;
    starRating: bigint;
    studentName: string;
    quote: string;
    achievement: string;
    isActive: boolean;
    courseStream: string;
    isFeatured: boolean;
}
export interface ContactSubmissionPublic {
    id: bigint;
    name: string;
    submittedAt: bigint;
    isRead: boolean;
    email: string;
    message: string;
    phone: string;
    courseInterested: string;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishDate: bigint;
    slug: string;
    tags: Array<string>;
    author: string;
    isDraft: boolean;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface BlogPostInput {
    title: string;
    content: string;
    publishDate: bigint;
    slug: string;
    tags: Array<string>;
    author: string;
    isDraft: boolean;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface TestimonialInput {
    starRating: bigint;
    studentName: string;
    quote: string;
    achievement: string;
    isActive: boolean;
    courseStream: string;
    isFeatured: boolean;
}
export interface ContactSubmissionInput {
    name: string;
    email: string;
    message: string;
    phone: string;
    courseInterested: string;
}
export enum CourseLevel {
    PhD = "PhD",
    Bachelor = "Bachelor",
    Diploma = "Diploma",
    Master = "Master"
}
export enum CourseStream {
    Law = "Law",
    Arts = "Arts",
    Engineering = "Engineering",
    Commerce = "Commerce",
    Management = "Management",
    Medical = "Medical",
    Science = "Science",
    Other = "Other"
}
export enum CourseType {
    PartTime = "PartTime",
    FullTime = "FullTime"
}
export interface backendInterface {
    adminCreateBlogPost(token: string, input: BlogPostInput): Promise<bigint>;
    adminCreateCourse(token: string, input: CourseInput): Promise<bigint>;
    adminCreateTestimonial(token: string, input: TestimonialInput): Promise<bigint>;
    adminDeleteBlogPost(token: string, id: bigint): Promise<boolean>;
    adminDeleteCourse(token: string, id: bigint): Promise<boolean>;
    adminDeleteTestimonial(token: string, id: bigint): Promise<boolean>;
    adminLogin(username: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogout(token: string): Promise<void>;
    adminSeedSampleData(token: string): Promise<string>;
    adminUpdateBlogPost(token: string, id: bigint, input: BlogPostInput): Promise<boolean>;
    adminUpdateCourse(token: string, id: bigint, input: CourseInput): Promise<boolean>;
    adminUpdateTestimonial(token: string, id: bigint, input: TestimonialInput): Promise<boolean>;
    deleteContactSubmission(token: string, id: bigint): Promise<boolean>;
    getBlogPostById(id: bigint): Promise<BlogPost | null>;
    getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
    getBlogPosts(publishedOnly: boolean): Promise<Array<BlogPost>>;
    getContactSubmissions(token: string): Promise<Array<ContactSubmissionPublic>>;
    getCourseById(id: bigint): Promise<Course | null>;
    getCourses(activeOnly: boolean): Promise<Array<Course>>;
    getTestimonialById(id: bigint): Promise<Testimonial | null>;
    getTestimonials(activeOnly: boolean, featuredOnly: boolean): Promise<Array<Testimonial>>;
    markContactSubmissionRead(token: string, id: bigint): Promise<boolean>;
    submitContactForm(input: ContactSubmissionInput): Promise<bigint>;
    validateAdminSession(token: string): Promise<boolean>;
}
