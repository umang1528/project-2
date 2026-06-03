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

  const [updatingIds, setUpdatingIds] =
    useState<string[]>([]);

  const handleLocationChange =
    async (projectId: string, featured: boolean) => {
      if (updatingIds.includes(projectId)) {
        return;
      }

      setUpdatingIds((current) => [...current, projectId]);

      try {
        const payload = new FormData();
        payload.append('featured', String(featured));
        await updateProject(projectId, payload);
      } finally {
        setUpdatingIds((current) => current.filter((id) => id !== projectId));
      }
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
          className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.3em] transition ${
            activeTab === 'all'
              ? 'bg-brand-accent text-black'
              : 'border border-white/10 bg-white/5 text-white/70 hover:border-brand-accent'
          }`}
        >
          All Projects ({allCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('homepage')}
          className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.3em] transition ${
            activeTab === 'homepage'
              ? 'bg-brand-accent text-black'
              : 'border border-white/10 bg-white/5 text-white/70 hover:border-brand-accent'
          }`}
        >
          Homepage Projects ({homepageCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('projectsPage')}
          className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.3em] transition ${
            activeTab === 'projectsPage'
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

          <span className="col-span-2">
            Created
          </span>

          <span className="col-span-1 text-right">
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

          filteredRows.map((row) => (

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
                <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.3em] ${
                  row.featured
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

              <div className="col-span-2 text-brand-accent uppercase space-y-2">
                <div>{row.status}</div>
                <select
                  value={row.featured ? 'projectsPage' : 'homepage'}
                  onChange={(event) =>
                    handleLocationChange(
                      row.id,
                      event.target.value === 'projectsPage'
                    )
                  }
                  disabled={updatingIds.includes(row.id)}
                  className="w-full rounded-full border border-white/10 bg-black/5 px-3 py-2 text-[11px] text-white outline-none transition focus:border-brand-accent"
                >
                  <option value="homepage">Homepage</option>
                  <option value="projectsPage">Projects Page</option>
                </select>
              </div>

              {/* CREATED */}

              <div className="col-span-2">

                {row.createdAt}

              </div>

              {/* ACTIONS */}

              <div className="col-span-1 flex justify-end items-center gap-2">

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

              </div>

            </motion.div>
          ))
        )}

      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-center gap-4 mt-10">

        {/* PREVIOUS */}

        <button
          type="button"
          disabled={page === 1}
          onClick={() =>
            setPage(
              (prev) => prev - 1
            )
          }
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10 disabled:opacity-30"
        >

          Previous

        </button>

        {/* PAGE INFO */}

        <span className="text-sm uppercase tracking-[0.2em] text-white/60">

          Page {
            pagination.currentPage
          }{' '}
          of{' '}
          {pagination.totalPages}

        </span>

        {/* NEXT */}

        <button
          type="button"
          disabled={
            page ===
            pagination.totalPages
          }
          onClick={() =>
            setPage(
              (prev) => prev + 1
            )
          }
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10 disabled:opacity-30"
        >

          Next

        </button>

      </div>

    </PageContainer>
  );
}