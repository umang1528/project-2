import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { PageContainer } from '../../components/admin/PageContainer';
import { mediaApi } from '../../api/media.api';
import { projectBreakdownApi } from '../../api/projectBreakdown.api';

interface ProjectBreakdownItem {
  _id: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function ProjectBreakdown() {
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ProjectBreakdownItem[]>([]);
  const [editingId, setEditingId] = useState('');

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
    [items]
  );

  const resetForm = () => {
    setTitle('');
    setOrder(0);
    setIsActive(true);
    setImage(null);
    setImageUrl('');
    setPreviewImage('');
    setEditingId('');
  };

  const fetchItems = async () => {
    try {
      const response = await projectBreakdownApi.getProjectBreakdownItems({ all: true });
      setItems(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch project breakdown items', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append('file', image);

    const response = await mediaApi.uploadMedia(formData);
    return response.data?.data?.url || '';
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!title.trim()) {
        alert('Please enter a title.');
        return;
      }

      let finalImageUrl = imageUrl;

      if (image) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          alert('Image upload failed. Please try again.');
          return;
        }
        finalImageUrl = uploadedUrl;
      }

      if (!finalImageUrl) {
        alert('Please select an image to upload.');
        return;
      }

      const payload = {
        title: title.trim(),
        image: finalImageUrl,
        order,
        isActive,
      };

      if (editingId) {
        await projectBreakdownApi.updateProjectBreakdown(editingId, payload);
        alert('Project breakdown item updated successfully.');
      } else {
        await projectBreakdownApi.createProjectBreakdown(payload);
        alert('Project breakdown item created successfully.');
      }

      resetForm();
      await fetchItems();
    } catch (error) {
      console.error(error);
      alert('Unable to save project breakdown item.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ProjectBreakdownItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setOrder(item.order);
    setIsActive(item.isActive);
    setImage(null);
    setImageUrl(item.image);
    setPreviewImage(item.image);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this project breakdown item?');
    if (!confirmed) return;

    try {
      setLoading(true);
      await projectBreakdownApi.deleteProjectBreakdown(id);
      await fetchItems();
      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error('Failed to delete project breakdown item', error);
      alert('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (itemId: string, direction: 'up' | 'down') => {
    const currentItems = [...sortedItems];
    const index = currentItems.findIndex((item) => item._id === itemId);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (index < 0 || targetIndex < 0 || targetIndex >= currentItems.length) {
      return;
    }

    const nextItems = [...currentItems];
    [nextItems[index], nextItems[targetIndex]] = [nextItems[targetIndex], nextItems[index]];

    const normalizedItems = nextItems.map((item, position) => ({
      ...item,
      order: position,
    }));

    setItems(normalizedItems);

    try {
      setLoading(true);
      await Promise.all(
        normalizedItems.map((item) =>
          projectBreakdownApi.updateProjectBreakdown(item._id, { order: item.order })
        )
      );
      await fetchItems();
    } catch (error) {
      console.error('Failed to reorder project breakdown items', error);
      await fetchItems();
      alert('Reorder failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Project Breakdown"
      subtitle="Manage the images, order and visibility used in the About page breakdown section."
    >
      <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-white/80">
            <span>Breakdown Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter title"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-brand-accent"
            />
          </label>

          <label className="space-y-2 text-sm text-white/80">
            <span>Display Order</span>
            <input
              type="number"
              value={order}
              onChange={(event) => setOrder(Number(event.target.value))}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-brand-accent"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-white/80 block">
          <span>Status</span>
          <select
            value={isActive ? 'active' : 'inactive'}
            onChange={(event) => setIsActive(event.target.value === 'active')}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-white/80 block">
          <span>Image Upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              setImage(file);
              setImageUrl('');
              setPreviewImage(file ? URL.createObjectURL(file) : '');
            }}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white file:border-0 file:bg-white/10 file:px-4 file:py-2"
          />
        </label>

        {previewImage && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="mb-4 text-sm text-white/60">Image Preview</p>
            <img
              src={previewImage}
              alt="Preview"
              className="h-80 w-full rounded-2xl object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-3xl bg-brand-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Breakdown Item' : 'Save Breakdown Item'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-12 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">Breakdown Items</h3>
          <span className="text-sm text-white/60">
            {sortedItems.length} item{sortedItems.length === 1 ? '' : 's'}
          </span>
        </div>

        {sortedItems.length === 0 ? (
          <p className="text-sm text-white/60">No breakdown items saved yet.</p>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {sortedItems.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 lg:p-6"
              >
                <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full rounded-3xl object-cover"
                  />

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-accent">
                        {item.isActive ? 'Active' : 'Inactive'}
                      </p>
                      <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-white/70">Order: {item.order}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMove(item._id, 'up')}
                        disabled={loading || item.order === 0}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronUp size={16} />
                        Up
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMove(item._id, 'down')}
                        disabled={loading || item.order === sortedItems.length - 1}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronDown size={16} />
                        Down
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}