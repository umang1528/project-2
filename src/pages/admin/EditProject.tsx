import { FormEvent, useEffect, useState } from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { PageContainer } from '../../components/admin/PageContainer';

import { projectApi } from '../../api/project.api';

import { useProjectStore } from '../../store/useProjectStore';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, } from '../../views/projectFormConstants.ts';

// const categories = [
//   'Branding',
//   'UI/UX',
//   'Motion',
//   'Product',
//   'Portfolio',
//   'mukesh'
// ];

// const statuses = [
//   'published',
//   'draft',
//   'archived',
// ];

export function EditProject() {

  const { id } = useParams();

  const navigate = useNavigate();

  const updateProject = useProjectStore(
    (state) => state.updateProject
  );

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [projectId, setProjectId] =
    useState('');

  const [title, setTitle] =
    useState('');

  const [category, setCategory] =
    useState('Branding');

  const [
    shortDescription,
    setShortDescription,
  ] = useState('');

  const [
    fullDescription,
    setFullDescription,
  ] = useState('');

  const [caseStudy, setCaseStudy] =
    useState('');

  const [hashtags, setHashtags] =
    useState('');

  const [status, setStatus] =
    useState('published');

  const [featured, setFeatured] =
    useState(false);

  const [thumbnail, setThumbnail] =
    useState<File | null>(null);

  const [images, setImages] =
    useState<File[]>([]);

  // EXISTING IMAGES

  const [
    existingThumbnail,
    setExistingThumbnail,
  ] = useState('');

  const [
    existingImages,
    setExistingImages,
  ] = useState<string[]>([]);

  // LOAD PROJECT

  useEffect(() => {

    async function loadProject() {

      if (!id) return;

      try {

        setLoading(true);

        const response =
          await projectApi.getProjectById(
            id
          );

        const project =
          response.data?.data;

        console.log(project);

        if (!project) {

          navigate('/admin/projects');

          return;
        }

        setProjectId(
          project._id || project.id
        );

        setTitle(
          project.title || ''
        );

        setCategory(
          project.category ||
          'Branding'
        );

        setShortDescription(
          project.shortDescription ||
          ''
        );

        setFullDescription(
          project.fullDescription ||
          ''
        );

        setCaseStudy(
          project.caseStudy || ''
        );

        setHashtags(
          (
            project.hashtags || []
          ).join(', ')
        );

        setStatus(
          project.status ||
          'published'
        );

        setFeatured(
          project.featured || false
        );

        // EXISTING IMAGES

        setExistingThumbnail(
          project.thumbnail?.url || ''
        );

        setExistingImages(
          project.images?.map(
            (img: any) => img.url
          ) || []
        );

      } catch (error) {

        console.error(error);

        navigate('/admin/projects');

      } finally {

        setLoading(false);

      }
    }

    loadProject();

  }, [id, navigate]);

  // FORM DATA

  const buildFormData = () => {

    const formData = new FormData();

    formData.append(
      'title',
      title
    );

    formData.append(
      'category',
      category
    );

    formData.append(
      'shortDescription',
      shortDescription
    );

    formData.append(
      'fullDescription',
      fullDescription
    );

    formData.append(
      'caseStudy',
      caseStudy
    );

    formData.append(
      'hashtags',
      hashtags
    );

    formData.append(
      'status',
      status
    );

    formData.append(
      'featured',
      String(featured)
    );

    if (thumbnail) {

      formData.append(
        'thumbnail',
        thumbnail
      );
    }

    images.forEach((file) => {

      formData.append(
        'images',
        file
      );

    });

    return formData;
  };

  // SUBMIT

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    if (!projectId) return;

    try {

      setSubmitting(true);

      const formData =
        buildFormData();

      const project =
        await updateProject(
          projectId,
          formData
        );

      if (project) {

        navigate('/admin/projects');

      }

    } catch (error) {

      console.error(error);

    } finally {

      setSubmitting(false);

    }
  };

  // LOADING

  if (loading) {

    return (
      <PageContainer
        title="Edit Project"
        subtitle="Loading project details..."
      >

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center text-white/60">

          Loading...

        </div>

      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Edit Project"
      subtitle="Update your project details"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* TITLE + CATEGORY */}

        <div className="grid gap-6 lg:grid-cols-2">

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Project Title
            </span>

            <input
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Enter project title"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
              required
            />

          </label>

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Category
            </span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
            >

              {PROJECT_CATEGORIES.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}

            </select>

          </label>

        </div>

        {/* SHORT + FULL */}

        <div className="grid gap-6 lg:grid-cols-2">

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Short Description
            </span>

            <textarea
              value={
                shortDescription
              }
              onChange={(event) =>
                setShortDescription(
                  event.target.value
                )
              }
              rows={4}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
              required
            />

          </label>

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Full Description
            </span>

            <textarea
              value={
                fullDescription
              }
              onChange={(event) =>
                setFullDescription(
                  event.target.value
                )
              }
              rows={4}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
              required
            />

          </label>

        </div>

        {/* CASE STUDY */}

        <label className="space-y-2 text-sm text-white/80">

          <span>
            Case Study
          </span>

          <textarea
            value={caseStudy}
            onChange={(event) =>
              setCaseStudy(
                event.target.value
              )
            }
            rows={6}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
          />

        </label>

        {/* HASHTAGS + STATUS + FEATURED */}

        <div className="grid gap-6 lg:grid-cols-3">

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Hashtags
            </span>

            <input
              value={hashtags}
              onChange={(event) =>
                setHashtags(
                  event.target.value
                )
              }
              placeholder="branding, ui, motion"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
            />

          </label>

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Status
            </span>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
            >

              {PROJECT_STATUSES.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}

            </select>

          </label>

          <label className="flex items-center gap-3 text-sm text-white/80 mt-10">

            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-white/20 bg-black/20 text-brand-accent outline-none"
            />

            Feature Project

          </label>

        </div>

        {/* UPLOADS */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* THUMBNAIL */}

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Thumbnail Upload
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setThumbnail(
                  event.target.files?.[0] ||
                  null
                )
              }
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition"
            />

            {/* EXISTING THUMBNAIL */}

            {existingThumbnail && (

              <div className="mt-4">

                <img
                  src={existingThumbnail}
                  alt="Thumbnail"
                  className="h-52 w-full rounded-3xl object-cover border border-white/10"
                />

              </div>

            )}

          </label>

          {/* GALLERY */}

          <label className="space-y-2 text-sm text-white/80">

            <span>
              Gallery Images
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) =>
                setImages(
                  Array.from(
                    event.target.files ||
                    []
                  )
                )
              }
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition"
            />

            <span className="text-xs text-studio-text/50">

              {images.length} images selected

            </span>

            {/* EXISTING GALLERY */}

            {existingImages.length >
              0 && (

              <div className="mt-4 grid grid-cols-2 gap-4">

                {existingImages.map(
                  (
                    image,
                    index
                  ) => (

                    <img
                      key={index}
                      src={image}
                      alt={`Gallery ${index}`}
                      className="h-36 w-full rounded-3xl object-cover border border-white/10"
                    />

                  )
                )}

              </div>

            )}

          </label>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap items-center gap-4">

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-3xl bg-brand-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {submitting
              ? 'Updating...'
              : 'Update Project'}

          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/admin/projects')
            }
            className="rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >

            Cancel

          </button>

        </div>

      </form>

    </PageContainer>
  );
}