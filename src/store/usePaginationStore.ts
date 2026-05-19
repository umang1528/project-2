import { create } from 'zustand';

interface PaginationStore {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  page: 1,
  limit: 6,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  reset: () => set({ page: 1, limit: 6 }),
}));
