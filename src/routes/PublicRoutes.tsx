import { Routes, Route } from 'react-router-dom';
import { HomeView } from '../views/HomeView';
import { ArchiveView } from '../views/ArchiveView';
import { AboutView } from '../views/AboutView';
import { EducationView } from '../views/EducationView';
import { Project } from '../types';

interface PublicRoutesProps {
  setSelectedProject: (project: Project) => void;
}

export function PublicRoutes({ setSelectedProject }: PublicRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<HomeView setSelectedProject={setSelectedProject} setCurrentView={() => {}} />} />
      <Route path="/archives" element={<ArchiveView setSelectedProject={setSelectedProject} setCurrentView={() => {}} />} />
      <Route path="/about" element={<AboutView setCurrentView={() => {}} />} />
      <Route path="/education" element={<EducationView />} />
    </Routes>
  );
}


