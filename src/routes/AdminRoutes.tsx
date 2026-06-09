import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { Dashboard } from '../pages/admin/Dashboard';
import { Projects } from '../pages/admin/Projects';
import { ProjectLocations } from '../pages/admin/ProjectLocations';
import {HomeCarousel} from '../pages/HomeCarousel'
import { AddProject } from '../pages/admin/AddProject';
import { EditProject } from '../pages/admin/EditProject';
import { Media } from '../pages/admin/Media';
import { ProjectBreakdown } from '../pages/admin/ProjectBreakdown';
import { Themes } from '../pages/admin/Themes';
import { Analytics } from '../pages/admin/Analytics';
import { Settings } from '../pages/admin/Settings';
import { Login } from '../pages/admin/Login';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="project-locations" element={<ProjectLocations />} />
 <Route
  path="homepage-carousel"
  element={<HomeCarousel />}
/>
        <Route path="project-breakdown" element={<ProjectBreakdown />} />
        <Route path="projects/add" element={<AddProject />} />
        <Route path="projects/edit/:id" element={<EditProject />} />
        <Route path="media" element={<Media />} />
        <Route path="themes" element={<Themes />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

