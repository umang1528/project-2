import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Project, ViewType } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProjectModal } from './components/project/ProjectModal';
import { HomeView } from './views/HomeView';
import { ArchiveView } from './views/ArchiveView';
import { AboutView } from './views/AboutView';
import { EducationView } from './views/EducationView';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'archives':
        return (
          <ArchiveView 
            setSelectedProject={setSelectedProject} 
            setCurrentView={setCurrentView} 
          />
        );
      case 'education':
        return <EducationView />;
      case 'about':
        return <AboutView setCurrentView={setCurrentView} />;
      default:
        return (
          <HomeView 
            setSelectedProject={setSelectedProject} 
            setCurrentView={setCurrentView} 
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-studio-bg text-studio-text font-sans selection:bg-brand-accent/20 overflow-x-hidden">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main>
        {renderView()}
      </main>

      {currentView === 'home' && <Footer />}
    </div>
  );
}
