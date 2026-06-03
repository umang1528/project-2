import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/layout/Navbar';

interface MainLayoutProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function MainLayout({
  isMenuOpen,
  setIsMenuOpen,
}: MainLayoutProps) {

  return (

    <div className="min-h-screen bg-studio-bg text-studio-text selection:bg-brand-accent/20">

      {/* NAVBAR */}

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* PAGE CONTENT */}

      <main className="min-h-screen">

        <Outlet />

      </main>

    </div>

  );
}