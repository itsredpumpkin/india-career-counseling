import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBlogPost,
  useAddCourse,
  useAddTestimonial,
  useAdminLogin,
  useAdminLogout,
  useAdminSession,
  useDeleteBlogPost,
  useDeleteContact,
  useDeleteCourse,
  useDeleteTestimonial,
  useListBlogPosts,
  useListContacts,
  useListCourses,
  useListTestimonials,
  useMarkContactRead,
  useUpdateBlogPost,
  useUpdateCourse,
  useUpdateTestimonial,
} from "@/hooks/useBackend";
import type {
  BlogPost,
  ContactSubmission,
  Course,
  Testimonial,
} from "@/types/icc";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  CheckCircle,
  Eye,
  FileText,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Pencil,
  PlusCircle,
  Shield,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginPrompt() {
  const adminLogin = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin.mutate(
      { username, password },
      {
        onSuccess: () => toast.success("Welcome back, Admin!"),
        onError: (err: Error) =>
          toast.error(err.message || "Invalid credentials"),
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Header strip */}
          <div
            className="h-2 w-full"
            style={{
              background: "linear-gradient(90deg, #8DC63F, #1A5200, #8DC63F)",
            }}
          />

          <div className="p-8">
            {/* Logo + branding */}
            <div className="flex flex-col items-center mb-8">
              <img
                src="/assets/icc_colouredasset_14-019d8820-934a-762d-bd71-da9cd9e5193e.png"
                alt="ICC Logo"
                className="h-16 w-auto object-contain mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl text-foreground">
                  Admin Portal
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                India Career Counseling — Management Panel
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="pl-10"
                    autoComplete="username"
                    data-ocid="admin-username-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                    data-ocid="admin-password-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary text-primary-foreground font-semibold h-11 text-base"
                disabled={adminLogin.isPending || !username || !password}
                data-ocid="admin-login-btn"
              >
                {adminLogin.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Sign In to Admin Panel
                  </span>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              This panel is restricted to authorized administrators only.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Confirm Delete Dialog ─────────────────────────────────────────────────────

function ConfirmDeleteDialog({
  open,
  title,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-destructive">Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <strong>{title}</strong>? This action
          cannot be undone.
        </p>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            data-ocid="confirm-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            data-ocid="confirm-delete-btn"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Dashboard Tab ─────────────────────────────────────────────────────────────

function DashboardSection() {
  const { data: courses = [] } = useListCourses();
  const { data: posts = [] } = useListBlogPosts();
  const { data: testimonials = [] } = useListTestimonials();
  const { data: contacts = [] } = useListContacts();

  const unread = (contacts as ContactSubmission[]).filter(
    (c) => !c.isRead,
  ).length;

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-foreground mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={courses.length}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={FileText}
          label="Blog Posts"
          value={posts.length}
          color="bg-accent/10 text-accent"
        />
        <StatCard
          icon={Star}
          label="Testimonials"
          value={testimonials.length}
          color="bg-secondary/10 text-secondary-foreground"
        />
        <StatCard
          icon={Mail}
          label={`Inquiries (${unread} new)`}
          value={contacts.length}
          color="bg-destructive/10 text-destructive"
        />
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-5">
        <h3 className="font-semibold text-sm text-foreground mb-3">
          Recent Inquiries
        </h3>
        {(contacts as ContactSubmission[]).length === 0 ? (
          <p className="text-muted-foreground text-sm">No inquiries yet.</p>
        ) : (
          <div className="space-y-2">
            {(contacts as ContactSubmission[]).slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 text-sm py-2 border-b border-border last:border-0"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${c.isRead ? "bg-border" : "bg-primary"}`}
                />
                <span className="font-medium text-foreground truncate">
                  {c.name}
                </span>
                <span className="text-muted-foreground truncate min-w-0 flex-1">
                  {c.email}
                </span>
                <Badge
                  variant={c.isRead ? "outline" : "default"}
                  className="text-xs shrink-0"
                >
                  {c.isRead ? "Read" : "New"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Courses Section ───────────────────────────────────────────────────────────

const EMPTY_COURSE: Omit<Course, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  stream: "",
  duration: "",
  level: "",
  fees: 0,
  eligibility: "",
  colleges: [],
  highlights: [],
  careerProspects: [],
};

function CourseForm({
  initial,
  onSave,
  onClose,
  loading,
}: {
  initial: Omit<Course, "id" | "createdAt" | "updatedAt">;
  onSave: (data: Omit<Course, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState(initial);

  const set = (field: string, value: string | number) =>
    setForm((p) => ({ ...p, [field]: value }));

  const setList = (field: string, val: string) =>
    setForm((p) => ({
      ...p,
      [field]: val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));

  return (
    <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. B.Tech Computer Science"
          />
        </div>
        <div>
          <Label>Stream</Label>
          <Input
            value={form.stream}
            onChange={(e) => set("stream", e.target.value)}
            placeholder="Engineering"
          />
        </div>
        <div>
          <Label>Level</Label>
          <Input
            value={form.level}
            onChange={(e) => set("level", e.target.value)}
            placeholder="UG / PG / Diploma"
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
            placeholder="4 years"
          />
        </div>
        <div>
          <Label>Fees (₹/year)</Label>
          <Input
            type="number"
            value={form.fees}
            onChange={(e) => set("fees", Number(e.target.value))}
            placeholder="150000"
          />
        </div>
        <div className="col-span-2">
          <Label>Eligibility</Label>
          <Input
            value={form.eligibility}
            onChange={(e) => set("eligibility", e.target.value)}
            placeholder="10+2 with PCM, min 60%"
          />
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            placeholder="Course overview..."
          />
        </div>
        <div className="col-span-2">
          <Label>Colleges (comma-separated)</Label>
          <Input
            value={form.colleges.join(", ")}
            onChange={(e) => setList("colleges", e.target.value)}
            placeholder="IIT Delhi, NIT Trichy..."
          />
        </div>
        <div className="col-span-2">
          <Label>Highlights (comma-separated)</Label>
          <Input
            value={form.highlights.join(", ")}
            onChange={(e) => setList("highlights", e.target.value)}
            placeholder="Industry ready curriculum, placements..."
          />
        </div>
        <div className="col-span-2">
          <Label>Career Prospects (comma-separated)</Label>
          <Input
            value={form.careerProspects.join(", ")}
            onChange={(e) => setList("careerProspects", e.target.value)}
            placeholder="Software Engineer, Data Scientist..."
          />
        </div>
      </div>
      <DialogFooter className="gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground"
          disabled={loading || !form.title}
          onClick={() => onSave(form)}
          data-ocid="course-save-btn"
        >
          {loading ? "Saving..." : "Save Course"}
        </Button>
      </DialogFooter>
    </div>
  );
}

function CoursesSection() {
  const { data: courses = [] } = useListCourses();
  const addCourse = useAddCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Course | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const handleAdd = (data: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
    addCourse.mutate(data, {
      onSuccess: () => {
        toast.success("Course added!");
        setShowAdd(false);
      },
      onError: () => toast.error("Failed to add course"),
    });
  };

  const handleUpdate = (
    data: Omit<Course, "id" | "createdAt" | "updatedAt">,
  ) => {
    if (!editItem) return;
    updateCourse.mutate(
      { id: editItem.id, data },
      {
        onSuccess: () => {
          toast.success("Course updated!");
          setEditItem(null);
        },
        onError: () => toast.error("Failed to update course"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteCourse.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Course deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete course"),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">
          Courses ({courses.length})
        </h2>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground"
          onClick={() => setShowAdd(true)}
          data-ocid="add-course-btn"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> Add Course
        </Button>
      </div>

      {(courses as Course[]).length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin-courses-empty"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No courses yet</p>
          <p className="text-sm mt-1">Click "Add Course" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(courses as Course[]).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-4"
              data-ocid={`admin-course-item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {c.title}
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {c.stream}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {c.level}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ₹{(c.fees / 1000).toFixed(0)}K/yr · {c.duration}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditItem(c)}
                  data-ocid={`admin-course-edit.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteTarget(c)}
                  data-ocid={`admin-course-delete.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <CourseForm
            initial={EMPTY_COURSE}
            onSave={handleAdd}
            onClose={() => setShowAdd(false)}
            loading={addCourse.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editItem && (
            <CourseForm
              initial={{
                title: editItem.title,
                description: editItem.description,
                stream: editItem.stream,
                duration: editItem.duration,
                level: editItem.level,
                fees: editItem.fees,
                eligibility: editItem.eligibility,
                colleges: editItem.colleges,
                highlights: editItem.highlights,
                careerProspects: editItem.careerProspects,
              }}
              onSave={handleUpdate}
              onClose={() => setEditItem(null)}
              loading={updateCourse.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ─── Blog Posts Section ────────────────────────────────────────────────────────

const EMPTY_POST: Omit<BlogPost, "id" | "publishedAt" | "updatedAt"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  author: "",
  category: "",
  tags: [],
  imageUrl: "",
};

function BlogPostForm({
  initial,
  onSave,
  onClose,
  loading,
}: {
  initial: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">;
  onSave: (data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (field: string, val: string) =>
    setForm((p) => ({ ...p, [field]: val }));
  const setList = (field: string, val: string) =>
    setForm((p) => ({
      ...p,
      [field]: val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));

  return (
    <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Blog post title"
          />
        </div>
        <div>
          <Label>Slug</Label>
          <Input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="blog-post-slug"
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="Career Advice"
          />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="col-span-2">
          <Label>Excerpt</Label>
          <Textarea
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={2}
            placeholder="Short summary..."
          />
        </div>
        <div className="col-span-2">
          <Label>Content</Label>
          <Textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            rows={5}
            placeholder="Full article content..."
          />
        </div>
        <div className="col-span-2">
          <Label>Tags (comma-separated)</Label>
          <Input
            value={form.tags.join(", ")}
            onChange={(e) => setList("tags", e.target.value)}
            placeholder="career, engineering, tips"
          />
        </div>
      </div>
      <DialogFooter className="gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground"
          disabled={loading || !form.title}
          onClick={() => onSave(form)}
          data-ocid="blog-save-btn"
        >
          {loading ? "Saving..." : "Save Post"}
        </Button>
      </DialogFooter>
    </div>
  );
}

function BlogSection() {
  const { data: posts = [] } = useListBlogPosts();
  const addPost = useAddBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const handleAdd = (
    data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">,
  ) => {
    addPost.mutate(data, {
      onSuccess: () => {
        toast.success("Blog post added!");
        setShowAdd(false);
      },
      onError: () => toast.error("Failed to add post"),
    });
  };

  const handleUpdate = (
    data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">,
  ) => {
    if (!editItem) return;
    updatePost.mutate(
      { id: editItem.id, data },
      {
        onSuccess: () => {
          toast.success("Post updated!");
          setEditItem(null);
        },
        onError: () => toast.error("Failed to update post"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deletePost.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Post deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete post"),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">
          Blog Posts ({posts.length})
        </h2>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground"
          onClick={() => setShowAdd(true)}
          data-ocid="add-blog-btn"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> Add Post
        </Button>
      </div>

      {(posts as BlogPost[]).length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin-blog-empty"
        >
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No blog posts yet</p>
          <p className="text-sm mt-1">
            Click "Add Post" to publish your first article.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(posts as BlogPost[]).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-4"
              data-ocid={`admin-blog-item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {p.title}
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    {p.author}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {p.category}
                  </Badge>
                  {p.tags.slice(0, 2).map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditItem(p)}
                  data-ocid={`admin-blog-edit.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteTarget(p)}
                  data-ocid={`admin-blog-delete.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Blog Post</DialogTitle>
          </DialogHeader>
          <BlogPostForm
            initial={EMPTY_POST}
            onSave={handleAdd}
            onClose={() => setShowAdd(false)}
            loading={addPost.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          {editItem && (
            <BlogPostForm
              initial={{
                slug: editItem.slug,
                title: editItem.title,
                excerpt: editItem.excerpt,
                content: editItem.content,
                author: editItem.author,
                category: editItem.category,
                tags: editItem.tags,
                imageUrl: editItem.imageUrl,
              }}
              onSave={handleUpdate}
              onClose={() => setEditItem(null)}
              loading={updatePost.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ─── Testimonials Section ──────────────────────────────────────────────────────

const EMPTY_TESTIMONIAL: Omit<Testimonial, "id" | "createdAt"> = {
  studentName: "",
  course: "",
  college: "",
  year: "",
  message: "",
  rating: 5,
  avatarUrl: "",
};

function TestimonialForm({
  initial,
  onSave,
  onClose,
  loading,
}: {
  initial: Omit<Testimonial, "id" | "createdAt">;
  onSave: (data: Omit<Testimonial, "id" | "createdAt">) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (field: string, val: string | number) =>
    setForm((p) => ({ ...p, [field]: val }));

  return (
    <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Student Name</Label>
          <Input
            value={form.studentName}
            onChange={(e) => set("studentName", e.target.value)}
            placeholder="Rahul Sharma"
          />
        </div>
        <div>
          <Label>Rating (1–5)</Label>
          <Input
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) =>
              set("rating", Math.min(5, Math.max(1, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <Label>Course</Label>
          <Input
            value={form.course}
            onChange={(e) => set("course", e.target.value)}
            placeholder="B.Tech CSE"
          />
        </div>
        <div>
          <Label>College</Label>
          <Input
            value={form.college}
            onChange={(e) => set("college", e.target.value)}
            placeholder="IIT Bombay"
          />
        </div>
        <div>
          <Label>Year</Label>
          <Input
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            placeholder="2024"
          />
        </div>
        <div>
          <Label>Avatar URL</Label>
          <Input
            value={form.avatarUrl}
            onChange={(e) => set("avatarUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="col-span-2">
          <Label>Message</Label>
          <Textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            rows={3}
            placeholder="Student testimonial..."
          />
        </div>
      </div>
      <DialogFooter className="gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground"
          disabled={loading || !form.studentName}
          onClick={() => onSave(form)}
          data-ocid="testimonial-save-btn"
        >
          {loading ? "Saving..." : "Save Testimonial"}
        </Button>
      </DialogFooter>
    </div>
  );
}

function TestimonialsSection() {
  const { data: testimonials = [] } = useListTestimonials();
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  const handleAdd = (data: Omit<Testimonial, "id" | "createdAt">) => {
    addTestimonial.mutate(data, {
      onSuccess: () => {
        toast.success("Testimonial added!");
        setShowAdd(false);
      },
      onError: () => toast.error("Failed to add testimonial"),
    });
  };

  const handleUpdate = (data: Omit<Testimonial, "id" | "createdAt">) => {
    if (!editItem) return;
    updateTestimonial.mutate(
      { id: editItem.id, data },
      {
        onSuccess: () => {
          toast.success("Testimonial updated!");
          setEditItem(null);
        },
        onError: () => toast.error("Failed to update testimonial"),
      },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteTestimonial.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Testimonial deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">
          Testimonials ({testimonials.length})
        </h2>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground"
          onClick={() => setShowAdd(true)}
          data-ocid="add-testimonial-btn"
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> Add Testimonial
        </Button>
      </div>

      {(testimonials as Testimonial[]).length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin-testimonials-empty"
        >
          <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No testimonials yet</p>
          <p className="text-sm mt-1">
            Add student success stories to build trust.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(testimonials as Testimonial[]).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl p-4 border border-border flex items-center gap-4"
              data-ocid={`admin-testimonial-item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">
                {t.studentName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">
                  {t.studentName}
                </p>
                <div className="flex gap-2 mt-1 flex-wrap items-center">
                  <span className="text-xs text-muted-foreground truncate">
                    {t.college}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {t.course}
                  </Badge>
                  <span className="text-xs text-primary flex items-center gap-0.5">
                    {"★".repeat(t.rating)}
                    <span className="text-muted-foreground">
                      {"★".repeat(5 - t.rating)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditItem(t)}
                  data-ocid={`admin-testimonial-edit.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteTarget(t)}
                  data-ocid={`admin-testimonial-delete.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Testimonial</DialogTitle>
          </DialogHeader>
          <TestimonialForm
            initial={EMPTY_TESTIMONIAL}
            onSave={handleAdd}
            onClose={() => setShowAdd(false)}
            loading={addTestimonial.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          {editItem && (
            <TestimonialForm
              initial={{
                studentName: editItem.studentName,
                course: editItem.course,
                college: editItem.college,
                year: editItem.year,
                message: editItem.message,
                rating: editItem.rating,
                avatarUrl: editItem.avatarUrl,
              }}
              onSave={handleUpdate}
              onClose={() => setEditItem(null)}
              loading={updateTestimonial.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.studentName ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ─── Inquiries Section ─────────────────────────────────────────────────────────

function InquiriesSection() {
  const { data: contacts = [] } = useListContacts();
  const markRead = useMarkContactRead();
  const deleteContact = useDeleteContact();
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const list = (contacts as ContactSubmission[]).filter(
    (c) => filter === "all" || !c.isRead,
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteContact.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Inquiry deleted");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">
          Inquiries ({contacts.length})
          {list.filter((c) => !c.isRead).length > 0 && (
            <Badge className="ml-2 text-xs gradient-primary text-primary-foreground border-0">
              {list.filter((c) => !c.isRead).length} new
            </Badge>
          )}
        </h2>
        <div className="flex gap-2" data-ocid="inquiry-filter">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            data-ocid="filter-all-btn"
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            data-ocid="filter-unread-btn"
          >
            Unread
          </Button>
        </div>
      </div>

      {list.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin-contacts-empty"
        >
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">
            No inquiries{filter === "unread" ? " unread" : ""}
          </p>
          <p className="text-sm mt-1">Student inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-card rounded-xl p-4 border flex items-start gap-4 ${c.isRead ? "border-border" : "border-primary/40 bg-primary/5"}`}
              data-ocid={`admin-contact-item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-semibold text-sm text-foreground">
                    {c.name}
                  </span>
                  {!c.isRead && (
                    <Badge className="text-xs gradient-primary text-primary-foreground border-0">
                      New
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {c.service}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {c.email} · {c.phone}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {c.message}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                {!c.isRead && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      markRead.mutate(c.id);
                      toast.success("Marked as read");
                    }}
                    data-ocid={`admin-contact-read.${i + 1}`}
                    aria-label="Mark as read"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteTarget(c)}
                  data-ocid={`admin-contact-delete.${i + 1}`}
                  aria-label="Delete inquiry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

type AdminSection =
  | "dashboard"
  | "courses"
  | "blog"
  | "testimonials"
  | "inquiries";

const NAV_ITEMS: {
  id: AdminSection;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "inquiries", label: "Inquiries", icon: Mail },
];

function Sidebar({
  active,
  onSelect,
  onLogout,
  unreadCount,
}: {
  active: AdminSection;
  onSelect: (s: AdminSection) => void;
  onLogout: () => void;
  unreadCount: number;
}) {
  return (
    <aside className="w-64 bg-secondary shrink-0 flex flex-col h-full min-h-screen">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/icc_colouredasset_14-019d8820-934a-762d-bd71-da9cd9e5193e.png"
            alt="ICC"
            className="h-8 w-auto object-contain"
          />
          <div>
            <p className="font-display font-bold text-sm text-secondary-foreground leading-tight">
              ICC Admin
            </p>
            <p className="text-xs text-sidebar-foreground/60 leading-tight">
              Management Panel
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1" data-ocid="admin-sidebar-nav">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
              active === id
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-border/50 hover:text-sidebar-foreground"
            }`}
            data-ocid={`admin-nav-${id}`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
            {id === "inquiries" && unreadCount > 0 && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5 leading-none">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-smooth"
          data-ocid="admin-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Admin Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { data: token } = useAdminSession();
  const adminLogout = useAdminLogout();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data: contacts = [] } = useListContacts();
  const unreadCount = (contacts as ContactSubmission[]).filter(
    (c) => !c.isRead,
  ).length;

  if (!token) return <LoginPrompt />;

  const handleLogout = () => {
    adminLogout.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        toast.success("Logged out successfully");
      },
    });
  };

  const sections: Record<AdminSection, React.ReactNode> = {
    dashboard: <DashboardSection />,
    courses: <CoursesSection />,
    blog: <BlogSection />,
    testimonials: <TestimonialsSection />,
    inquiries: <InquiriesSection />,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-secondary border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <img
            src="/assets/icc_colouredasset_14-019d8820-934a-762d-bd71-da9cd9e5193e.png"
            alt="ICC"
            className="h-7 w-auto object-contain"
          />
          <span className="font-display font-bold text-sm text-secondary-foreground">
            ICC Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="text-secondary-foreground"
          aria-label="Open sidebar"
          data-ocid="mobile-sidebar-open"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="absolute top-4 right-4 text-sidebar-foreground/60 hover:text-sidebar-foreground z-10"
                  aria-label="Close sidebar"
                  data-ocid="mobile-sidebar-close"
                >
                  <X className="w-5 h-5" />
                </button>
                <Sidebar
                  active={activeSection}
                  onSelect={(s) => {
                    setActiveSection(s);
                    setMobileSidebarOpen(false);
                  }}
                  onLogout={handleLogout}
                  unreadCount={unreadCount}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop layout */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            active={activeSection}
            onSelect={setActiveSection}
            onLogout={handleLogout}
            unreadCount={unreadCount}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h1 className="font-display font-bold text-base text-foreground capitalize">
                {activeSection === "dashboard"
                  ? "Dashboard"
                  : activeSection === "blog"
                    ? "Blog Posts"
                    : activeSection.charAt(0).toUpperCase() +
                      activeSection.slice(1)}
              </h1>
              <p className="text-xs text-muted-foreground">
                India Career Counseling
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 border border-border px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono">admin</span>
              </div>
            </div>
          </div>

          {/* Section content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {sections[activeSection]}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
