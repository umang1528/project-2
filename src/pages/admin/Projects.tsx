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
    pagination,
  } = useProjectStore();

  const navigate = useNavigate();

  // PAGINATION

  const [page, setPage] =
    useState(1);

  // SEARCH

  const [search, setSearch] =
    useState('');

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

        slug:
          project.slug,
      })),
    [projects]
  );

  // FILTERED DATA

  const filteredRows =
    dataRows.filter(
      (row) =>
        row.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        row.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

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

              <div className="col-span-3 font-semibold">

                {row.title}

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

              <div className="col-span-2 text-brand-accent uppercase">

                {row.status}

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