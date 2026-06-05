import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/admin/PageContainer';
// import { PageContainer } from '../../components/admin/PageContainer';

export function AddHomepageCarousel() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  return (
    <PageContainer
      title="Homepage Carousel"
      subtitle="Manage images for the homepage carousel section."
    >
      <form className="space-y-8">

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Title */}
          <label className="space-y-2 text-sm text-white/80">
            <span>Image Title</span>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-brand-accent"
            />
          </label>

          {/* Order */}
          <label className="space-y-2 text-sm text-white/80">
            <span>Display Order</span>

            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-brand-accent"
            />
          </label>

        </div>

        {/* Status */}
        <label className="space-y-2 text-sm text-white/80 block">
          <span>Status</span>

          <select
            value={isActive ? 'active' : 'inactive'}
            onChange={(e) =>
              setIsActive(e.target.value === 'active')
            }
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        {/* Image Upload */}
        <label className="space-y-2 text-sm text-white/80 block">
          <span>Carousel Image</span>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white file:border-0 file:bg-white/10 file:px-4 file:py-2"
          />
        </label>

        {/* Preview */}
        {image && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="mb-4 text-sm text-white/60">
              Image Preview
            </p>

            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-80 w-full rounded-2xl object-cover"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="button"
            className="rounded-3xl bg-brand-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black"
          >
            Upload Carousel Image
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white"
          >
            Cancel
          </button>

        </div>

      </form>
    </PageContainer>
  );
}