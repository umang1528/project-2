import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

interface MainLayoutProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function MainLayout({ isMenuOpen, setIsMenuOpen }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-studio-bg text-studio-text selection:bg-brand-accent/20">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="pt-24 min-h-[calc(100vh-6rem)]">
        <Outlet />
      </main>
    </div>
  );
}
