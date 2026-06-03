export type AdminRouteKey =
  | 'dashboard'
  | 'projects'
  | 'projectLocations'
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

