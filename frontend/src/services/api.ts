// src/services/api.ts
import axios, { InternalAxiosRequestConfig } from "axios";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
  UserUpdateData,
  Portfolio,
  PortfolioCreateData,
  Project,
  ProjectCreateData,
  Certificate,
  CertificateCreateData,
} from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for authentication
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data: RegisterData) =>
    api.post<AuthResponse>("/auth/register", data),

  login: (data: LoginData) => api.post<AuthResponse>("/auth/login", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put("/auth/change-passwd", data),

  forgotPassword: (data: { email: string }) =>
    api.post("/auth/forgot-passwd", data),

  resetPassword: (data: { token: string; password: string }) =>
    api.post("/auth/reset-passwd", data),
};

export const userService = {
  getProfile: () => api.get<User>("/users/profile"),

  updateProfile: (data: UserUpdateData) =>
    api.put<User>("/users/profile", data),
};

export const portfolioService = {
  getAll: () => api.get<Portfolio[]>("/portfolios"),

  getById: (id: number) => api.get<Portfolio>(`/portfolios/${id}`),

  create: (data: PortfolioCreateData) =>
    api.post<Portfolio>("/portfolios", data),

  update: (id: number, data: Partial<PortfolioCreateData>) =>
    api.put<Portfolio>(`/portfolios/${id}`, data),

  delete: (id: number) => api.delete(`/portfolios/${id}`),

  linkProjects: (id: number, projectIds: number[]) =>
    api.patch(`/portfolios/${id}/projects`, { projectIds }),

  linkCertificates: (id: number, certificateIds: number[]) =>
    api.patch(`/portfolios/${id}/certificates`, { certificateIds }),

  resetShareableLink: (id: number) =>
    api.patch<Portfolio>(`/portfolios/${id}/reset-shareable-link`),
};

export const projectService = {
  getAll: () => api.get<Project[]>("/projects"),

  getById: (id: number) => api.get<Project>(`/projects/${id}`),

  create: (data: ProjectCreateData) => api.post<Project>("/projects", data),

  update: (id: number, data: Partial<ProjectCreateData>) =>
    api.put<Project>(`/projects/${id}`, data),

  delete: (id: number) => api.delete(`/projects/${id}`),
};

export const certificateService = {
  getAll: () => api.get<Certificate[]>("/certificates"),

  getById: (id: number) => api.get<Certificate>(`/certificates/${id}`),

  create: (data: CertificateCreateData) =>
    api.post<Certificate>("/certificates", data),

  update: (id: number, data: Partial<CertificateCreateData>) =>
    api.put<Certificate>(`/certificates/${id}`, data),

  delete: (id: number) => api.delete(`/certificates/${id}`),
};

export default api;
