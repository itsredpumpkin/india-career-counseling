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
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Phone,
  PlusCircle,
  Search,
  Shield,
  Star,
  Trash2,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Brand Colors ──────────────────────────────────────────────────────────────
const SAFFRON = "#FF6B00";
const NAVY = "#1A237E";

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginPrompt() {
  const adminLogin = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    adminLogin.mutate(
      { username, password },
      {
        onSuccess: () => toast.success("Welcome back, Admin!"),
        onError: (err: Error) => setError(err.message || "Invalid credentials"),
      },
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #2E3B8C 50%, #1A237E 100%)`,
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {(["c0", "c1", "c2", "c3", "c4", "c5"] as const).map((key, i) => (
          <div
            key={key}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              background: SAFFRON,
              top: `${-20 + i * 15}%`,
              right: `${-10 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Top accent bar */}
        <div
          className="h-1.5 rounded-t-2xl w-full"
          style={{
            background: `linear-gradient(90deg, ${SAFFRON}, #FF9500, ${SAFFRON})`,
          }}
        />

        <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className="px-8 pt-8 pb-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${NAVY} 0%, #2a3494 100%)`,
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${SAFFRON}, #FF9500)`,
              }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              ICC Admin Portal
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              India Career Counseling — Management Panel
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="admin-username"
                  className="text-sm font-semibold"
                  style={{ color: NAVY }}
                >
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter admin username"
                    className="pl-10 h-11 border-2 focus:border-[#FF6B00] transition-colors"
                    style={{ borderColor: error ? "#ef4444" : undefined }}
                    autoComplete="username"
                    data-ocid="admin-username-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="admin-password"
                  className="text-sm font-semibold"
                  style={{ color: NAVY }}
                >
                  Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter admin password"
                    className="pl-10 pr-16 h-11 border-2 focus:border-[#FF6B00] transition-colors"
                    style={{ borderColor: error ? "#ef4444" : undefined }}
                    autoComplete="current-password"
                    data-ocid="admin-password-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-1"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5"
                  data-ocid="admin-login-error"
                >
                  <X className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)`,
                }}
                disabled={adminLogin.isPending || !username || !password}
                data-ocid="admin-login-btn"
              >
                {adminLogin.isPending ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2.5">
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
          <DialogTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <strong className="text-foreground">{title}</strong>? This cannot be
          undone.
        </p>
        <DialogFooter className="gap-2 mt-2">
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
  accent,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  accent: string;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
        style={{ background: accent }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold" style={{ color: NAVY }}>
            {value}
          </p>
          {badge && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: SAFFRON }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Search Input ──────────────────────────────────────────────────────────────

function SearchInput({
  value,
  onChange,
  placeholder,
  ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  ocid: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 h-9 text-sm bg-gray-50 border-gray-200 focus:bg-white"
        data-ocid={ocid}
      />
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  count,
  onAdd,
  addLabel,
  addOcid,
  search,
  onSearch,
  searchOcid,
  searchPlaceholder,
}: {
  title: string;
  count: number;
  onAdd: () => void;
  addLabel: string;
  addOcid: string;
  search: string;
  onSearch: (v: string) => void;
  searchOcid: string;
  searchPlaceholder: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="flex items-center gap-2 flex-1">
        <h2 className="font-bold text-xl" style={{ color: NAVY }}>
          {title}
        </h2>
        <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <SearchInput
          value={search}
          onChange={onSearch}
          placeholder={searchPlaceholder}
          ocid={searchOcid}
        />
        <Button
          size="sm"
          className="text-white font-semibold shadow-sm hover:shadow-md transition-all shrink-0"
          style={{ background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)` }}
          onClick={onAdd}
          data-ocid={addOcid}
        >
          <PlusCircle className="w-4 h-4 mr-1.5" /> {addLabel}
        </Button>
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  description,
  ocid,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  ocid: string;
}) {
  return (
    <div className="text-center py-16 text-muted-foreground" data-ocid={ocid}>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20"
        style={{ background: NAVY }}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
}

// ─── Row Actions ──────────────────────────────────────────────────────────────

function RowActions({
  onEdit,
  onDelete,
  editOcid,
  deleteOcid,
}: {
  onEdit: () => void;
  onDelete: () => void;
  editOcid: string;
  deleteOcid: string;
}) {
  return (
    <div className="flex gap-1.5 shrink-0">
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
        onClick={onEdit}
        data-ocid={editOcid}
        aria-label="Edit"
      >
        <Pencil className="w-3.5 h-3.5" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        onClick={onDelete}
        data-ocid={deleteOcid}
        aria-label="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

// ─── Dashboard Section ─────────────────────────────────────────────────────────

function DashboardSection() {
  const { data: courses = [] } = useListCourses();
  const { data: posts = [] } = useListBlogPosts();
  const { data: testimonials = [] } = useListTestimonials();
  const { data: contacts = [] } = useListContacts();
  const unread = (contacts as ContactSubmission[]).filter(
    (c) => !c.isRead,
  ).length;

  const recentContacts = (contacts as ContactSubmission[])
    .slice()
    .reverse()
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-2xl mb-1" style={{ color: NAVY }}>
          Dashboard Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Welcome back, Admin! Here's what's happening.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={GraduationCap}
          label="Total Courses"
          value={courses.length}
          accent={NAVY}
        />
        <StatCard
          icon={FileText}
          label="Blog Posts"
          value={posts.length}
          accent="#2563EB"
        />
        <StatCard
          icon={Star}
          label="Testimonials"
          value={testimonials.length}
          accent="#7C3AED"
        />
        <StatCard
          icon={Mail}
          label="Total Inquiries"
          value={contacts.length}
          accent={SAFFRON}
          badge={unread > 0 ? `${unread} new` : undefined}
        />
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <TrendingUp className="w-5 h-5" style={{ color: SAFFRON }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: NAVY }}>
              Response Rate
            </p>
            <p className="text-xs text-muted-foreground">
              {contacts.length > 0
                ? `${Math.round(((contacts.length - unread) / contacts.length) * 100)}% replied`
                : "No inquiries yet"}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <Users className="w-5 h-5" style={{ color: NAVY }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: NAVY }}>
              Content Items
            </p>
            <p className="text-xs text-muted-foreground">
              {courses.length + posts.length + testimonials.length} total
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-purple-500" />
          <div>
            <p className="font-semibold text-sm" style={{ color: NAVY }}>
              Unread Inquiries
            </p>
            <p className="text-xs text-muted-foreground">
              {unread} need attention
            </p>
          </div>
        </div>
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div
          className="px-5 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "#f0f0f0" }}
        >
          <h3 className="font-bold text-sm" style={{ color: NAVY }}>
            Recent Inquiries
          </h3>
          {unread > 0 && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: SAFFRON }}
            >
              {unread} unread
            </span>
          )}
        </div>
        {recentContacts.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            No inquiries yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentContacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm"
                  style={{ background: c.isRead ? "#94a3b8" : SAFFRON }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {c.email}
                  </p>
                </div>
                <Badge
                  variant={c.isRead ? "outline" : "default"}
                  className="text-xs shrink-0"
                  style={
                    c.isRead
                      ? {}
                      : { background: SAFFRON, color: "white", border: "none" }
                  }
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
    <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1">
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
            rows={2}
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
          className="text-white font-semibold"
          style={{ background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)` }}
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
  const [search, setSearch] = useState("");

  const filtered = (courses as Course[]).filter(
    (c) =>
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.stream.toLowerCase().includes(search.toLowerCase()),
  );

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
      <SectionHeader
        title="Courses"
        count={courses.length}
        onAdd={() => setShowAdd(true)}
        addLabel="Add Course"
        addOcid="add-course-btn"
        search={search}
        onSearch={setSearch}
        searchOcid="course-search-input"
        searchPlaceholder="Search by name or stream..."
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={search ? "No courses match your search" : "No courses yet"}
          description={
            search
              ? "Try a different search term"
              : 'Click "Add Course" to get started.'
          }
          ocid="admin-courses-empty"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                data-ocid={`admin-course-item.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
                  style={{ background: NAVY }}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {c.title}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap items-center">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                      style={{ background: NAVY }}
                    >
                      {c.stream}
                    </span>
                    <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                      {c.level}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ₹{(c.fees / 1000).toFixed(0)}K/yr · {c.duration}
                    </span>
                  </div>
                </div>
                <RowActions
                  onEdit={() => setEditItem(c)}
                  onDelete={() => setDeleteTarget(c)}
                  editOcid={`admin-course-edit.${i + 1}`}
                  deleteOcid={`admin-course-delete.${i + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>Add New Course</DialogTitle>
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
            <DialogTitle style={{ color: NAVY }}>Edit Course</DialogTitle>
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
    <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1">
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
          <Label>Tags (comma-separated)</Label>
          <Input
            value={form.tags.join(", ")}
            onChange={(e) => setList("tags", e.target.value)}
            placeholder="career, tips"
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
      </div>
      <DialogFooter className="gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="text-white font-semibold"
          style={{ background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)` }}
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
  const [search, setSearch] = useState("");

  const filtered = (posts as BlogPost[]).filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()),
  );

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
      <SectionHeader
        title="Blog Posts"
        count={posts.length}
        onAdd={() => setShowAdd(true)}
        addLabel="Add Post"
        addOcid="add-blog-btn"
        search={search}
        onSearch={setSearch}
        searchOcid="blog-search-input"
        searchPlaceholder="Search by title or author..."
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={search ? "No posts match your search" : "No blog posts yet"}
          description={
            search
              ? "Try a different search term"
              : 'Click "Add Post" to publish your first article.'
          }
          ocid="admin-blog-empty"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                data-ocid={`admin-blog-item.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#EFF6FF" }}
                >
                  <FileText className="w-5 h-5" style={{ color: "#2563EB" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {p.title}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap items-center">
                    <span className="text-xs text-muted-foreground">
                      {p.author}
                    </span>
                    <span className="text-xs bg-gray-100 text-muted-foreground px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <RowActions
                  onEdit={() => setEditItem(p)}
                  onDelete={() => setDeleteTarget(p)}
                  editOcid={`admin-blog-edit.${i + 1}`}
                  deleteOcid={`admin-blog-delete.${i + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>Add Blog Post</DialogTitle>
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
            <DialogTitle style={{ color: NAVY }}>Edit Blog Post</DialogTitle>
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
    <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1">
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
          <Label>Avatar URL (optional)</Label>
          <Input
            value={form.avatarUrl}
            onChange={(e) => set("avatarUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="col-span-2">
          <Label>Testimonial Message</Label>
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
          className="text-white font-semibold"
          style={{ background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)` }}
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
  const [search, setSearch] = useState("");

  const filtered = (testimonials as Testimonial[]).filter(
    (t) =>
      !search ||
      t.studentName.toLowerCase().includes(search.toLowerCase()) ||
      t.college.toLowerCase().includes(search.toLowerCase()),
  );

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
      <SectionHeader
        title="Testimonials"
        count={testimonials.length}
        onAdd={() => setShowAdd(true)}
        addLabel="Add Testimonial"
        addOcid="add-testimonial-btn"
        search={search}
        onSearch={setSearch}
        searchOcid="testimonial-search-input"
        searchPlaceholder="Search by name or college..."
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Star}
          title={
            search ? "No testimonials match your search" : "No testimonials yet"
          }
          description={
            search
              ? "Try a different search term"
              : "Add student success stories to build trust."
          }
          ocid="admin-testimonials-empty"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                data-ocid={`admin-testimonial-item.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm"
                  style={{ background: SAFFRON }}
                >
                  {t.studentName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {t.studentName}
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap items-center">
                    <span className="text-xs text-muted-foreground truncate">
                      {t.college}
                    </span>
                    <span className="text-xs bg-gray-100 text-muted-foreground px-2 py-0.5 rounded-full">
                      {t.course}
                    </span>
                    <span className="text-xs" style={{ color: SAFFRON }}>
                      {"★".repeat(t.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - t.rating)}
                      </span>
                    </span>
                  </div>
                </div>
                <RowActions
                  onEdit={() => setEditItem(t)}
                  onDelete={() => setDeleteTarget(t)}
                  editOcid={`admin-testimonial-edit.${i + 1}`}
                  deleteOcid={`admin-testimonial-delete.${i + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>Add Testimonial</DialogTitle>
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
            <DialogTitle style={{ color: NAVY }}>Edit Testimonial</DialogTitle>
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

function ContactDetailModal({
  contact,
  onClose,
}: {
  contact: ContactSubmission | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!contact} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="contact-detail-dialog">
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2"
            style={{ color: NAVY }}
          >
            <MessageSquare className="w-5 h-5" style={{ color: SAFFRON }} />
            Inquiry Details
          </DialogTitle>
        </DialogHeader>
        {contact && (
          <div className="space-y-4">
            {/* Student info */}
            <div
              className="rounded-xl p-4"
              style={{
                background: `linear-gradient(135deg, ${NAVY}10, ${NAVY}05)`,
                border: `1px solid ${NAVY}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)`,
                  }}
                >
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-foreground">{contact.name}</p>
                  <Badge
                    className="text-xs mt-0.5"
                    style={
                      contact.isRead
                        ? {}
                        : {
                            background: SAFFRON,
                            color: "white",
                            border: "none",
                          }
                    }
                    variant={contact.isRead ? "outline" : "default"}
                  >
                    {contact.isRead ? "Read" : "New Inquiry"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail
                    className="w-4 h-4 shrink-0"
                    style={{ color: SAFFRON }}
                  />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:underline truncate"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone
                    className="w-4 h-4 shrink-0"
                    style={{ color: SAFFRON }}
                  />
                  <a href={`tel:${contact.phone}`} className="hover:underline">
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Service & message */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Service
                </span>
                <span className="text-xs bg-gray-100 text-foreground px-2 py-0.5 rounded-full font-medium">
                  {contact.service || "General"}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Message
                </p>
                <div className="bg-gray-50 rounded-xl p-3.5 text-sm text-foreground leading-relaxed border border-gray-100">
                  {contact.message || "No message provided."}
                </div>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            data-ocid="contact-detail-close-btn"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InquiriesSection() {
  const { data: contacts = [] } = useListContacts();
  const markRead = useMarkContactRead();
  const deleteContact = useDeleteContact();
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(
    null,
  );
  const [viewTarget, setViewTarget] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");

  const allContacts = contacts as ContactSubmission[];
  const unread = allContacts.filter((c) => !c.isRead).length;

  const filtered = allContacts.filter((c) => {
    if (filter === "unread" && c.isRead) return false;
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const handleView = (c: ContactSubmission) => {
    setViewTarget(c);
    if (!c.isRead) markRead.mutate(c.id);
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <h2 className="font-bold text-xl" style={{ color: NAVY }}>
            Contact Inquiries
          </h2>
          <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
            {allContacts.length}
          </span>
          {unread > 0 && (
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
              style={{ background: SAFFRON }}
            >
              {unread} unread
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email..."
            ocid="inquiry-search-input"
          />
          <div
            className="flex items-center gap-1 shrink-0"
            data-ocid="inquiry-filter"
          >
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="h-9 text-xs"
              style={
                filter === "all"
                  ? { background: NAVY, color: "white", border: "none" }
                  : {}
              }
              data-ocid="filter-all-btn"
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className="h-9 text-xs"
              style={
                filter === "unread"
                  ? { background: SAFFRON, color: "white", border: "none" }
                  : {}
              }
              data-ocid="filter-unread-btn"
            >
              Unread
            </Button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Mail}
          title={
            search || filter === "unread"
              ? "No inquiries match your filter"
              : "No inquiries yet"
          }
          description="Student inquiries will appear here."
          ocid="admin-contacts-empty"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-4 px-5 py-4 transition-colors ${!c.isRead ? "bg-orange-50/50" : "hover:bg-gray-50"}`}
                data-ocid={`admin-contact-item.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm"
                  style={{ background: c.isRead ? "#94a3b8" : SAFFRON }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">
                      {c.name}
                    </span>
                    {!c.isRead && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: SAFFRON }}
                      >
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {c.email} · {c.phone}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {c.message}
                  </p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs font-medium hover:text-[#FF6B00] hover:border-[#FF6B00] transition-colors"
                    onClick={() => handleView(c)}
                    data-ocid={`admin-contact-view.${i + 1}`}
                    aria-label="View details"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
        </div>
      )}

      <ContactDetailModal
        contact={viewTarget}
        onClose={() => setViewTarget(null)}
      />
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
  { id: "courses", label: "Courses", icon: GraduationCap },
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
    <aside
      className="w-64 shrink-0 flex flex-col h-full min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${NAVY} 0%, #1e2b8a 100%)`,
      }}
    >
      {/* Logo area */}
      <div
        className="p-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-md"
            style={{
              background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)`,
            }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-white leading-tight">
              ICC Admin
            </p>
            <p
              className="text-xs leading-tight"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Management Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5" data-ocid="admin-sidebar-nav">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white shadow-md"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)`,
                    }
                  : {}
              }
              data-ocid={`admin-nav-${id}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {id === "inquiries" && unreadCount > 0 && (
                <span
                  className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full leading-none"
                  style={
                    isActive
                      ? { background: "rgba(255,255,255,0.3)", color: "white" }
                      : { background: SAFFRON, color: "white" }
                  }
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-white/50 hover:text-red-400 hover:bg-red-500/10"
          data-ocid="admin-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
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

  const sectionLabels: Record<AdminSection, string> = {
    dashboard: "Dashboard",
    courses: "Courses",
    blog: "Blog Posts",
    testimonials: "Testimonials",
    inquiries: "Inquiries",
  };

  const sections: Record<AdminSection, React.ReactNode> = {
    dashboard: <DashboardSection />,
    courses: <CoursesSection />,
    blog: <BlogSection />,
    testimonials: <TestimonialsSection />,
    inquiries: <InquiriesSection />,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top saffron accent bar */}
      <div
        className="h-1 w-full shrink-0"
        style={{
          background: `linear-gradient(90deg, ${SAFFRON}, #FF9500, ${SAFFRON})`,
        }}
      />

      {/* Mobile header */}
      <div
        className="lg:hidden flex items-center justify-between px-4 py-3 border-b"
        style={{ background: NAVY, borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${SAFFRON}, #FF8C00)`,
            }}
          >
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm text-white">ICC Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="text-white/70 hover:text-white transition-colors p-1"
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
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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
                  className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
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
        <div className="hidden lg:block sticky top-0 h-screen">
          <Sidebar
            active={activeSection}
            onSelect={setActiveSection}
            onLogout={handleLogout}
            unreadCount={unreadCount}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Top bar */}
          <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <div>
              <h1 className="font-bold text-base" style={{ color: NAVY }}>
                {sectionLabels[activeSection]}
              </h1>
              <p className="text-xs text-muted-foreground">
                India Career Counseling
              </p>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveSection("inquiries")}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-90"
                  style={{ background: SAFFRON }}
                  data-ocid="topbar-unread-badge"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {unreadCount} new
                </button>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                <CheckCircle
                  className="w-3.5 h-3.5"
                  style={{ color: SAFFRON }}
                />
                <span className="font-medium">admin</span>
              </div>
            </div>
          </div>

          {/* Section content */}
          <div className="flex-1 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
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
