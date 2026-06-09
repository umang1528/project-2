export type AdminRouteKey =
  | 'dashboard'
  | 'projects'
  | 'projectLocations'
  | 'homepage-carousel'
  | 'projectBreakdown'
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

