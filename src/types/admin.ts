export type AdminRouteKey =
  | 'dashboard'
  | 'projects'
  | 'media'
  | 'themes'
  | 'analytics'
  | 'settings';

export interface AdminSidebarItem {
  key: AdminRouteKey;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

