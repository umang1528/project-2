import { motion } from 'motion/react';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  Edit3,
  Trash2,
  Eye,
  Plus,
  Search,
  Loader2,
} from 'lucide-react';

import { PageContainer } from '../../components/admin/PageContainer';

import { useProjectStore } from '../../store/useProjectStore';

export function Projects() {

  const {
    projects,
    loading,
    error,
    fetchProjects,
    deleteProject,
    updateProject,
    pagination,
  } = useProjectStore();

  const navigate = useNavigate();

  // PAGINATION

  const [page, setPage] =
    useState(1);

  // SEARCH

  const [search, setSearch] =
    useState('');

  // LOCATION FILTER TABS

  const [activeTab, setActiveTab] =
    useState<'all' | 'homepage' | 'projectsPage'>('all');

  const [allPage, setAllPage] =
    useState(1);

  const [homepagePage, setHomepagePage] =
    useState(1);

  const [projectsPageNumber, setProjectsPageNumber] =
    useState(1);

  const [updatingIds, setUpdatingIds] =
    useState<string[]>([]);

  const [confirmMove, setConfirmMove] =
    useState<{
      projectId: string;
      title: string;
      featured: boolean;
    } | null>(null);

  const [toastMessages, setToastMessages] =
    useState<Array<{
      id: string;
      message: string;
    }>>([]);

  const addToast =
    (message: string) => {
      const toastId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToastMessages((current) => [
        ...current,
        { id: toastId, message },
      ]);

      window.setTimeout(() => {
        setToastMessages((current) =>
          current.filter((toast) => toast.id !== toastId)
        );
      }, 3200);
    };

  const buildProjectPayload =
    (project: typeof projects[number], featured: boolean) => {
      const payload = new FormData();

      payload.append('title', project.title || '');
      payload.append('shortDescription', project.shortDescription || project.description || '');
      payload.append('fullDescription', project.fullDescription || '');
      payload.append('category', project.category || 'Portfolio');
      payload.append('status', project.status || 'published');
      payload.append('caseStudy', project.caseStudy || '');
      payload.append('createdBy', project.createdBy || 'admin');
      payload.append('order', String((project as any).order || 0));
      payload.append('slug', project.slug || '');
      payload.append('featured', String(featured));

      if (project.tags) {
        payload.append('tags', Array.isArray(project.tags) ? project.tags.join(',') : String(project.tags));
      }

      if (project.hashtags) {
        payload.append('hashtags', Array.isArray(project.hashtags) ? project.hashtags.join(',') : String(project.hashtags));
      }

      if (project.description) {
        payload.append('description', project.description);
      }

      if (project.year) {
        payload.append('year', String(project.year));
      }

      if (project.size) {
        payload.append('size', String(project.size));
      }

      return payload;
    };

  const handleConfirmMove =
    async () => {
      if (!confirmMove) return;

      const projectId = confirmMove.projectId;
      const newFeatured = !confirmMove.featured;
      const existingProject = projects.find(
        (project) => (project._id || String(project.id)) === projectId
      );

      setConfirmMove(null);

      if (!existingProject) {
        return;
      }

      setUpdatingIds((current) => [...current, projectId]);

      try {
        const payload = buildProjectPayload(existingProject, newFeatured);
        const project = await updateProject(projectId, payload);

        if (project) {
          addToast(
            newFeatured
              ? 'Project moved to Projects Page'
              : 'Project moved to Homepage'
          );
        }
      } finally {
        setUpdatingIds((current) => current.filter((id) => id !== projectId));
      }
    };

  const handleMoveClick =
    (projectId: string, title: string, featured: boolean) => {
      setConfirmMove({ projectId, title, featured });
    };

  // FETCH PROJECTS

  useEffect(() => {

    fetchProjects(page, true);

  }, [fetchProjects, page]);

  // TABLE DATA

  const dataRows = useMemo(
    () =>
      projects.map((project) => ({
        id:
          project._id ||
          String(project.id),

        title:
          project.title,

        category:
          project.category,

        views:
          project.views || 0,

        createdAt:
          new Date(
            project.createdAt
          ).toLocaleDateString(),

        status:
          project.status,

        featured:
          project.featured === true,

        slug:
          project.slug,
      })),
    [projects]
  );

  const allCount = dataRows.length;
  const homepageCount = dataRows.filter((row) => row.featured === false).length;
  const projectsPageCount = dataRows.filter((row) => row.featured === true).length;

  // FILTERED DATA

  const filteredRows =
    dataRows.filter((row) => {
      const searchMatch =
        row.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.category
          .toLowerCase()
          .includes(search.toLowerCase());

      if (!searchMatch) return false;

      if (activeTab === 'homepage') {
        return row.featured === false;
      }

      if (activeTab === 'projectsPage') {
        return row.featured === true;
      }

      return true;
    });

  const homepageRows =
    useMemo(
      () => filteredRows.filter((row) => row.featured === false),
      [filteredRows]
    );

  const projectsPageRows =
    useMemo(
      () => filteredRows.filter((row) => row.featured === true),
      [filteredRows]
    );

  const totalAllPages =
    Math.max(1, Math.ceil(filteredRows.length / 10));

  const totalHomepagePages =
    Math.max(1, Math.ceil(homepageRows.length / 10));

  const totalProjectsPagePages =
    Math.max(1, Math.ceil(projectsPageRows.length / 10));

  useEffect(() => {
    if (allPage > totalAllPages) {
      setAllPage(totalAllPages);
    }
  }, [allPage, totalAllPages]);

  useEffect(() => {
    if (homepagePage > totalHomepagePages) {
      setHomepagePage(totalHomepagePages);
    }
  }, [homepagePage, totalHomepagePages]);

  useEffect(() => {
    if (projectsPageNumber > totalProjectsPagePages) {
      setProjectsPageNumber(totalProjectsPagePages);
    }
  }, [projectsPageNumber, totalProjectsPagePages]);

  const displayedRows =
    useMemo(() => {
      if (activeTab === 'homepage') {
        return homepageRows.slice((homepagePage - 1) * 10, homepagePage * 10);
      }

      if (activeTab === 'projectsPage') {
        return projectsPageRows.slice((projectsPageNumber - 1) * 10, projectsPageNumber * 10);
      }

      return filteredRows.slice((allPage - 1) * 10, allPage * 10);
    }, [activeTab, filteredRows, homepageRows, projectsPageRows, allPage, homepagePage, projectsPageNumber]);

  const currentPage =
    activeTab === 'homepage'
      ? homepagePage
      : activeTab === 'projectsPage'
        ? projectsPageNumber
        : allPage;

  const totalPages =
    activeTab === 'homepage'
      ? totalHomepagePages
      : activeTab === 'projectsPage'
        ? totalProjectsPagePages
        : totalAllPages;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <PageContainer
      title="Projects"
      subtitle="Manage every portfolio launch, client case study and gallery experience from a single cinematic admin panel."
      headerAction={
        <button
          type="button"
          onClick={() =>
            navigate(
              '/admin/projects/add'
            )
          }
          className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90"
        >

          <Plus size={18} />

          Add Project

        </button>
      }
    >

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.3em] transition ${activeTab === 'all'
              ? 'bg-brand-accent text-black'
              : 'border border-white/10 bg-white/5 text-white/70 hover:border-brand-accent'
            }`}
        >
          All Projects ({allCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('homepage')}
          className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.3em] transition ${activeTab === 'homepage'
              ? 'bg-brand-accent text-black'
              : 'border border-white/10 bg-white/5 text-white/70 hover:border-brand-accent'
            }`}
        >
          Homepage Projects ({homepageCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('projectsPage')}
          className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.3em] transition ${activeTab === 'projectsPage'
              ? 'bg-brand-accent text-black'
              : 'border border-white/10 bg-white/5 text-white/70 hover:border-brand-accent'
            }`}
        >
          Projects Page ({projectsPageCount})
        </button>
      </div>

      {/* TABLE */}

      <div className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.12)]">

        {/* SEARCH BAR */}

        <div className="p-6 border-b border-white/10 bg-black/5">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search projects..."
              className="w-full rounded-full border border-white/10 bg-white/5 pl-14 pr-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-accent"
            />

          </div>

        </div>

        {/* HEADER */}

        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-[0.3em] text-white/60 bg-black/10">

          <span className="col-span-3">
            Project
          </span>

          <span className="col-span-2">
            Category
          </span>

          <span className="col-span-2">
            Views
          </span>

          <span className="col-span-2">
            Status
          </span>

          <span className="col-span-1">
            Created
          </span>

          <span className="col-span-2 text-right">
            Actions
          </span>

        </div>

        {/* CONTENT */}

        {loading ? (

          <div className="px-6 py-12 text-center text-white/60">

            Loading projects…

          </div>

        ) : error ? (

          <div className="px-6 py-12 text-center text-red-400">

            {error}

          </div>

        ) : filteredRows.length === 0 ? (

          <div className="px-6 py-12 text-center text-white/60">

            No projects found yet.

          </div>

        ) : (

          displayedRows.map((row) => (

            <motion.div
              key={row.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="grid grid-cols-12 gap-4 border-t border-white/10 px-6 py-4 items-center text-sm text-white/80"
            >

              {/* TITLE */}

              <div className="col-span-3 space-y-2">
                <div className="font-semibold">{row.title}</div>
                <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.3em] ${row.featured
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                  }`}>
                  {row.featured ? 'Projects Page' : 'Homepage'}
                </span>
              </div>

              {/* CATEGORY */}

              <div className="col-span-2">

                {row.category}

              </div>

              {/* VIEWS */}

              <div className="col-span-2">

                {row.views}

              </div>

              {/* STATUS */}

              <div className="col-span-2 uppercase space-y-2">
                <div className="text-brand-accent">{row.status}</div>
              </div>

              {/* CREATED */}

              <div className="col-span-1">

                {row.createdAt}

              </div>

              {/* ACTIONS */}

              <div className="col-span-2 flex flex-col items-end gap-2 text-right">

                <button
                  type="button"
                  disabled={updatingIds.includes(row.id)}
                  onClick={() =>
                    handleMoveClick(
                      row.id,
                      row.title,
                      row.featured
                    )
                  }
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white transition hover:border-brand-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {updatingIds.includes(row.id) ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {row.featured ? 'Moving…' : 'Moving…'}
                    </span>
                  ) : row.featured ? (
                    'Move to Homepage'
                  ) : (
                    'Move to Projects Page'
                  )}
                </button>

                <div className="flex items-center justify-end gap-2">
                  {/* EDIT */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/admin/projects/edit/${row.id}`
                      )
                    }
                    className="text-white/70 hover:text-white transition-colors"
                  >

                    <Edit3 size={18} />

                  </button>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      deleteProject(
                        row.id
                      )
                    }
                    className="text-red-400 hover:text-red-200 transition-colors"
                  >

                    <Trash2 size={18} />

                  </button>

                  {/* VIEW */}

                  <Link
                    to={`/projects/${row.slug}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Eye size={18} />
                  </Link>

                </div> {/* inner actions row */}

              </div> {/* col-span-2 flex flex-col */}

            </motion.div>
          ))
        )}

      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-center gap-4 mt-10">

        {/* PREVIOUS */}

        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() => {
            if (activeTab === 'homepage') {
              setHomepagePage((prev) => prev - 1);
              return;
            }

            if (activeTab === 'projectsPage') {
              setProjectsPageNumber((prev) => prev - 1);
              return;
            }

            setAllPage((prev) => prev - 1);
          }}
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10 disabled:opacity-30"
        >

          Previous

        </button>

        {/* PAGE INFO */}

        <span className="text-sm uppercase tracking-[0.2em] text-white/60">
          Page {currentPage} of {totalPages}
        </span>

        {/* NEXT */}

        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => {
            if (activeTab === 'homepage') {
              setHomepagePage((prev) => prev + 1);
              return;
            }

            if (activeTab === 'projectsPage') {
              setProjectsPageNumber((prev) => prev + 1);
              return;
            }

            setAllPage((prev) => prev + 1);
          }}
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10 disabled:opacity-30"
        >

          Next

        </button>

      </div>

      {confirmMove && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-black/90 p-10 text-left shadow-[0_0_40px_rgba(0,0,0,0.45)]">
            <h3 className="text-xl font-semibold text-white">Confirm Move</h3>
            <p className="mt-4 text-sm text-white/70">
              Are you sure you want to move <span className="font-medium text-white">{confirmMove.title}</span> to{' '}
              <span className="font-semibold text-white">
                {confirmMove.featured ? 'Homepage' : 'Projects Page'}
              </span>?
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmMove(null)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-brand-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmMove}
                className="rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3">
        {toastMessages.map((toast) => (
          <div
            key={toast.id}
            className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          >
            {toast.message}
          </div>
        ))}
      </div>

    </PageContainer>
  );
}