import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-studio-bg text-studio-text">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <Outlet />
      </div>
    </div>
  );
}

