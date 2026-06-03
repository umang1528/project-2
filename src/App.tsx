import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { HomeView } from './views/HomeView';
import { Projects } from './views/Projects';
import { ProjectDetails } from './views/ProjectDetails';
import { EducationView } from './views/EducationView';
import { AboutView } from './views/AboutView';
import { Footer } from './components/layout/Footer';
import { AdminRoutes } from './routes/AdminRoutes';

export default function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-studio-bg text-studio-text font-sans selection:bg-brand-accent/20 overflow-x-hidden">
      <Routes>
        <Route path="/" element={<MainLayout isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}>
          <Route index element={<HomeView />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetails />} />
          <Route path="education" element={<EducationView />} />
          <Route path="about" element={<AboutView />} />
        </Route>
      </Routes>

      <AdminRoutes />

      {location.pathname === '/' && <Footer />}
    </div>
  );
}

