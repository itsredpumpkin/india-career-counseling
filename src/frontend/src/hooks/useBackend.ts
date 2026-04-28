import { type Backend, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor<Backend>(createActor);
}

// ─── Admin Auth (localStorage-based) ─────────────────────────────────────────

const ADMIN_TOKEN_KEY = "icc_admin_token";
const ADMIN_EXPIRES_KEY = "icc_admin_expires";

export function getAdminToken(): string | null {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const expires = localStorage.getItem(ADMIN_EXPIRES_KEY);
  if (!token || !expires) return null;
  if (Date.now() > Number(expires)) {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_EXPIRES_KEY);
    return null;
  }
  return token;
}

export function setAdminToken(token: string, expiresIn = 8 * 60 * 60 * 1000) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_EXPIRES_KEY, String(Date.now() + expiresIn));
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_EXPIRES_KEY);
}

// Admin login: validate against hardcoded credentials (username=admin, password=ICC@Admin2024)
// Since backend is minimal, we validate locally and store a session token
export function useAdminLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      // Validate credentials
      if (username !== "admin" || password !== "ICC@Admin2024") {
        throw new Error("Invalid username or password");
      }
      // Generate a session token
      const token = btoa(`${username}:${Date.now()}:icc-admin-session`);
      setAdminToken(token);
      return { token, username };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-session"] });
    },
  });
}

export function useAdminLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      clearAdminToken();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-session"] });
      qc.clear();
    },
  });
}

export function useAdminSession() {
  return useQuery({
    queryKey: ["admin-session"],
    queryFn: () => getAdminToken(),
    staleTime: 30_000,
  });
}

// ─── Contacts ────────────────────────────────────────────────────────────────

export function useListContacts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as Record<string, () => Promise<unknown[]>>
      ).listContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (d: unknown) => Promise<unknown>>
      ).submitContact(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useMarkContactRead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (id: string) => Promise<unknown>>
      ).markContactRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useDeleteContact() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (id: string) => Promise<unknown>>
      ).deleteContact(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

// ─── Courses ─────────────────────────────────────────────────────────────────

export function useListCourses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as Record<string, () => Promise<unknown[]>>
      ).listCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourse(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      if (!actor) return null;
      return (
        actor as unknown as Record<string, (id: string) => Promise<unknown>>
      ).getCourse(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddCourse() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (d: unknown) => Promise<unknown>>
      ).addCourse(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useUpdateCourse() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<
          string,
          (id: string, d: unknown) => Promise<unknown>
        >
      ).updateCourse(id, data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useDeleteCourse() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (id: string) => Promise<unknown>>
      ).deleteCourse(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export function useListBlogPosts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as Record<string, () => Promise<unknown[]>>
      ).listBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPost(slug: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      if (!actor) return null;
      return (
        actor as unknown as Record<string, (s: string) => Promise<unknown>>
      ).getBlogPost(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useAddBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (d: unknown) => Promise<unknown>>
      ).addBlogPost(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog"] }),
  });
}

export function useUpdateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<
          string,
          (id: string, d: unknown) => Promise<unknown>
        >
      ).updateBlogPost(id, data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (id: string) => Promise<unknown>>
      ).deleteBlogPost(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog"] }),
  });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export function useListTestimonials() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as Record<string, () => Promise<unknown[]>>
      ).listTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (d: unknown) => Promise<unknown>>
      ).addTestimonial(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<
          string,
          (id: string, d: unknown) => Promise<unknown>
        >
      ).updateTestimonial(id, data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as Record<string, (id: string) => Promise<unknown>>
      ).deleteTestimonial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}
