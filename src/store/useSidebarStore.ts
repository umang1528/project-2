import { create } from 'zustand';

interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
  theme: 'dark' | 'light';
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
  toggleMobileOpen: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  mobileOpen: false,
  theme: 'dark',
  setCollapsed: (collapsed) => set({ collapsed }),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setMobileOpen: (open) => set({ mobileOpen: open }),
  toggleMobileOpen: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));

