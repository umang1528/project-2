import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';
import { useProjectStore } from '../../store/useProjectStore';
import { Project } from '../../types';

function getProjectId(project: Project) {
  return project._id || String(project.id);
}

function getProjectImage(project: Project) {
  const thumbnail = project.thumbnail;
  if (typeof thumbnail === 'string') return thumbnail;
  if (thumbnail?.url) return thumbnail.url;
  return project.image || '';
}

export function ProjectLocations() {
  const { projects, loading, fetchProjects, updateProject } = useProjectStore();
  const [search, setSearch] = useState('');
  const [updatingIds, setUpdatingIds] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects(1, true);
  }, [fetchProjects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.title?.toLowerCase().includes(search.toLowerCase())
      ),
    [projects, search]
  );

  const homepageProjects = useMemo(
    () => filteredProjects.filter((project) => project.featured === false),
    [filteredProjects]
  );

  const projectsPage = useMemo(
    () => filteredProjects.filter((project) => project.featured === true),
    [filteredProjects]
  );

  const handleToggleLocation = async (project: Project) => {
    const projectId = getProjectId(project);
    if (updatingIds.includes(projectId)) return;

    setUpdatingIds((current) => [...current, projectId]);

    try {
      const payload = new FormData();
      payload.append('featured', String(!project.featured));
      await updateProject(projectId, payload);
    } finally {
      setUpdatingIds((current) => current.filter((id) => id !== projectId));
    }
  };

  return (
    <PageContainer
      title="Project Locations"
      subtitle="Route portfolio entries between the Homepage and Projects page with a dedicated admin location manager."
    >
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">Filter</div>
            <div className="relative max-w-lg">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project title"
                className="w-full rounded-full border border-white/10 bg-black/5 py-4 pl-12 pr-5 text-sm text-white outline-none transition focus:border-brand-accent"
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm uppercase tracking-[0.25em] text-white/70">
            Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'} across both locations
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2 mt-6">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.35em] text-white/40">Homepage Projects</p>
              <h3 className="text-2xl font-semibold text-white">{homepageProjects.length}</h3>
            </div>
            <div className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/70">
              Homepage cards
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-36 rounded-[24px] bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : homepageProjects.length === 0 ? (
              <div className="rounded-[24px] border border-white/10 bg-black/10 p-6 text-white/60">
                No homepage projects found.
              </div>
            ) : (
              homepageProjects.map((project) => {
                const projectId = getProjectId(project);
                const imageUrl = getProjectImage(project);
                const isUpdating = updatingIds.includes(projectId);

                return (
                  <motion.article
                    key={projectId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[24px] border border-white/10 bg-black/10 p-4 transition hover:-translate-y-1 hover:border-brand-accent"
                  >
                    <div className="grid gap-4 lg:grid-cols-[120px_minmax(0,1fr)]">
                      <div className="overflow-hidden rounded-3xl bg-white/5">
                        {imageUrl ? (
                          <img src={imageUrl} alt={project.title} className="h-32 w-full object-cover" />
                        ) : (
                          <div className="flex h-32 items-center justify-center text-white/30">No thumbnail</div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                          <p className="text-sm text-white/60">{project.category || 'Uncategorized'}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{project.status || 'unknown'}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Featured: false</span>
                        </div>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleToggleLocation(project)}
                          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-brand-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isUpdating ? 'Updating…' : 'Move to Projects Page'}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.35em] text-white/40">Projects Page</p>
              <h3 className="text-2xl font-semibold text-white">{projectsPage.length}</h3>
            </div>
            <div className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/70">
              Projects page cards
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-36 rounded-[24px] bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : projectsPage.length === 0 ? (
              <div className="rounded-[24px] border border-white/10 bg-black/10 p-6 text-white/60">
                No projects page entries found.
              </div>
            ) : (
              projectsPage.map((project) => {
                const projectId = getProjectId(project);
                const imageUrl = getProjectImage(project);
                const isUpdating = updatingIds.includes(projectId);

                return (
                  <motion.article
                    key={projectId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[24px] border border-white/10 bg-black/10 p-4 transition hover:-translate-y-1 hover:border-brand-accent"
                  >
                    <div className="grid gap-4 lg:grid-cols-[120px_minmax(0,1fr)]">
                      <div className="overflow-hidden rounded-3xl bg-white/5">
                        {imageUrl ? (
                          <img src={imageUrl} alt={project.title} className="h-32 w-full object-cover" />
                        ) : (
                          <div className="flex h-32 items-center justify-center text-white/30">No thumbnail</div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                          <p className="text-sm text-white/60">{project.category || 'Uncategorized'}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{project.status || 'unknown'}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Featured: true</span>
                        </div>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleToggleLocation(project)}
                          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-brand-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isUpdating ? 'Updating…' : 'Move to Homepage'}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
