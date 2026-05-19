import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import type { AdminSidebarItem } from '../../types/admin';

export function SidebarItem({
  item,
  isActive,
  collapsed,
  onSelect,
}: {
  item: AdminSidebarItem;
  isActive: boolean;
  collapsed: boolean;
  onSelect?: () => void;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="relative"
    >
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_50%_50%,rgba(255,255,255,0.18),rgba(255,255,255,0)_60%)]"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}

      <Link
        to={item.href}
        onClick={onSelect}
        className={cn(
          'relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-white/5',
          isActive ? 'text-white' : 'text-white/70'
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon size={18} className={cn(isActive ? 'text-brand-accent' : 'text-white/60')} />
        </div>

        {!collapsed && (
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            {item.label}
          </span>
        )}
      </Link>
    </motion.div>
  );
}

