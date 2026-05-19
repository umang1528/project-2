import { motion } from 'motion/react';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit3, Trash2, Eye, Plus } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';
import { useProjectStore } from '../../store/useProjectStore';

export function Projects() {
  const { projects, loading, error, fetchProjects, deleteProject } = useProjectStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects(1, true);
  }, [fetchProjects]);

  const dataRows = useMemo(() => projects.map((project) => ({
    id: project._id || String(project.id),
    title: project.title,
    category: project.category,
    views: project.views || 0,
    createdAt: new Date(project.createdAt).toLocaleDateString(),
    status: project.status,
    slug: project.slug,
  })), [projects]);

  return (
    <PageContainer
      title="Projects"
      subtitle="Manage every portfolio launch, client case study and gallery experience from a single cinematic admin panel."
      headerAction={(
        <button
          type="button"
          onClick={() => navigate('/admin/projects/add')}
          className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Project
        </button>
      )}
    >
      <div className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-[0.3em] text-studio-text/40 bg-black/10">
          <span className="col-span-3">Project</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2">Views</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Created</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-white/60">Loading projects…</div>
        ) : error ? (
          <div className="px-6 py-12 text-center text-red-400">{error}</div>
        ) : dataRows.length === 0 ? (
          <div className="px-6 py-12 text-center text-white/60">No projects found yet.</div>
        ) : (
          dataRows.map((row) => (
            <div key={row.id} className="grid grid-cols-12 gap-4 border-t border-white/10 px-6 py-4 items-center text-sm text-white/80">
              <div className="col-span-3 font-semibold">{row.title}</div>
              <div className="col-span-2">{row.category}</div>
              <div className="col-span-2">{row.views}</div>
              <div className="col-span-2 text-brand-accent uppercase">{row.status}</div>
              <div className="col-span-2">{row.createdAt}</div>
              <div className="col-span-1 flex justify-end items-center gap-2">
                <button onClick={() => navigate(`/admin/projects/edit/${row.id}`)} className="text-white/70 hover:text-white transition-colors">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => deleteProject(row.id)} className="text-red-400 hover:text-red-200 transition-colors">
                  <Trash2 size={18} />
                </button>
                <Link to={`/projects/${row.slug}`} className="text-white/70 hover:text-white transition-colors">
                  <Eye size={18} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </PageContainer>
  );
}
