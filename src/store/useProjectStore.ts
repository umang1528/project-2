import { create } from 'zustand';
import { projectApi } from '../api/project.api';
import { Project } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  relatedProjects: Project[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
  filters: {
    category: string;
    search: string;
    sort: string;
  };
  fetchProjects: (page?: number, override?: boolean) => Promise<void>;
  loadMoreProjects: () => Promise<void>;
  fetchProjectBySlug: (slug: string) => Promise<void>;
  clearProjects: () => void;
  createProject: (payload: FormData) => Promise<Project | null>;
  updateProject: (id: string, payload: FormData) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<boolean>;
  setFilters: (filters: Partial<ProjectState['filters']>) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  relatedProjects: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 100,
  },
  filters: {
    category: '',
    search: '',
    sort: 'latest',
  },
  fetchProjects: async (page = 1, override = false) => {
    const { filters, pagination } = get();
    set({ loading: true, error: null });

    try {
      const response = await projectApi.getProjects({
        page,
        limit: pagination.limit,
        category: filters.category || undefined,
        search: filters.search || undefined,
        sort: filters.sort || undefined,
      });

      const payload = response.data?.data || {};
      const projects = payload.projects || [];
      const paginationData = payload.pagination || {};

      set({
        projects: override ? projects : [...(override ? [] : get().projects), ...projects],
        pagination: {
          currentPage: paginationData.currentPage || page,
          totalPages: paginationData.totalPages || 1,
          totalCount: paginationData.totalCount || 0,
          limit: pagination.limit,
        },
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error: 'Unable to load projects.' });
    }
  },
  loadMoreProjects: async () => {
    const { pagination } = get();
    if (pagination.currentPage >= pagination.totalPages) return;
    const nextPage = pagination.currentPage + 1;
    await get().fetchProjects(nextPage);
  },
  fetchProjectBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const response = await projectApi.getProject(slug);
      const payload = response.data?.data || {};
      set({ currentProject: payload.project || null, relatedProjects: payload.relatedProjects || [], loading: false });
    } catch (error) {
      set({ currentProject: null, relatedProjects: [], loading: false, error: 'Project not found.' });
    }
  },
  clearProjects: () => {
    set({ projects: [], currentProject: null, relatedProjects: [], pagination: { currentPage: 1, totalPages: 1, totalCount: 0, limit: 6 }, loading: false, error: null });
  },
  createProject: async (payload: FormData) => {
    try {
      const response = await projectApi.createProject(payload);
      const project = response.data?.data;
      if (project) {
        set((state) => ({ projects: [project, ...state.projects] }));
      }
      return project || null;
    } catch (error) {
      set({ error: 'Failed to create project.' });
      return null;
    }
  },
  updateProject: async (id: string, payload: FormData) => {
    try {
      const response = await projectApi.updateProject(id, payload);
      const project = response.data?.data;
      if (project) {
        set((state) => ({ projects: state.projects.map((item) => ((item._id || String(item.id)) === id ? project : item)) }));
      }
      return project || null;
    } catch (error) {
      set({ error: 'Failed to update project.' });
      return null;
    }
  },
  deleteProject: async (id: string) => {
    try {
      await projectApi.deleteProject(id);
      set((state) => ({ projects: state.projects.filter((project) => (project._id || String(project.id)) !== id) }));
      return true;
    } catch (error) {
      set({ error: 'Failed to delete project.' });
      return false;
    }
  },
  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },
}));
