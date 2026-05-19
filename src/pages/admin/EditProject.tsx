import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '../../components/admin/PageContainer';
import { projectApi } from '../../api/project.api';
import { useProjectStore } from '../../store/useProjectStore';

const categories = ['Branding', 'UI/UX', 'Motion', 'Product', 'Portfolio'];
const statuses = ['published', 'draft', 'archived'];

export function EditProject() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const updateProject = useProjectStore((state) => state.updateProject);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Branding');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [status, setStatus] = useState('published');
  const [featured, setFeatured] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [projectId, setProjectId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await projectApi.getProjects({ slug });
        const project = response.data?.data?.projects?.[0];
        if (!project) {
          navigate('/admin/projects');
          return;
        }

        setProjectId(project._id || project.id);
        setTitle(project.title);
        setCategory(project.category);
        setShortDescription(project.shortDescription);
        setFullDescription(project.fullDescription);
        setCaseStudy(project.caseStudy || '');
        setHashtags((project.hashtags || []).join(', '));
        setStatus(project.status || 'published');
        setFeatured(project.featured || false);
      } catch {
        navigate('/admin/projects');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug, navigate]);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('shortDescription', shortDescription);
    formData.append('fullDescription', fullDescription);
    formData.append('caseStudy', caseStudy);
    formData.append('hashtags', hashtags);
    formData.append('status', status);
    formData.append('featured', String(featured));
    if (thumbnail) formData.append('thumbnail', thumbnail);
    images.forEach((file) => formData.append('images', file));
    return formData;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectId) return;
    setSubmitting(true);
    const formData = buildFormData();
    const project = await updateProject(projectId, formData);
    setSubmitting(false);
    if (project) {
      navigate('/admin/projects');
    }
  };

  if (loading) {
    return (
      <PageContainer title="Edit Project" subtitle="Loading project details for editing…">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center text-white/60">Loading…</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Edit Project" subtitle="Update the portfolio project, replace assets, and publish the latest case study.">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-white/80">
            <span>Project Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-brand-accent"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-white/80">
            <span>Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition"
            >
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-white/80">
            <span>Short Description</span>
            <textarea
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              rows={4}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-brand-accent"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-white/80">
            <span>Full Description</span>
            <textarea
              value={fullDescription}
              onChange={(event) => setFullDescription(event.target.value)}
              rows={4}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-brand-accent"
              required
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-white/80">
          <span>Case Study</span>
          <textarea
            value={caseStudy}
            onChange={(event) => setCaseStudy(event.target.value)}
            rows={6}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-brand-accent"
          />
        </label>

        <div className="grid gap-6 lg:grid-cols-3">
          <label className="space-y-2 text-sm text-white/80">
            <span>Hashtags</span>
            <input
              value={hashtags}
              onChange={(event) => setHashtags(event.target.value)}
              placeholder="branding, motion, ui"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-brand-accent"
            />
          </label>
          <label className="space-y-2 text-sm text-white/80">
            <span>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition"
            >
              {statuses.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 text-sm text-white/80">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black/20 text-brand-accent outline-none"
            />
            Feature project
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-white/80">
            <span>Thumbnail Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setThumbnail(event.target.files?.[0] || null)}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition file:border-0 file:bg-white/10 file:px-4 file:py-2"
            />
          </label>
          <label className="space-y-2 text-sm text-white/80">
            <span>Gallery Images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => setImages(Array.from(event.target.files || []))}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition file:border-0 file:bg-white/10 file:px-4 file:py-2"
            />
            <span className="text-xs text-studio-text/50">{images.length} images added</span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-3xl bg-brand-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Updating…' : 'Update Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </PageContainer>
  );
}
