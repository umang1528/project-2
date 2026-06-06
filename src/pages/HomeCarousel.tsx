import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../components/admin/PageContainer";
import { homeCarouselApi } from "../api/homeCarousel.api";
import { mediaApi } from "../api/media.api";

interface CarouselItem {
  _id: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
}

export function HomeCarousel() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [editingId, setEditingId] = useState("");

  const resetForm = () => {
    setTitle("");
    setOrder(0);
    setIsActive(true);
    setImage(null);
    setImageUrl("");
    setPreviewImage("");
    setEditingId("");
  };

  const fetchCarouselItems = async () => {
    try {
      const response = await homeCarouselApi.getHomeCarouselItems();
      setItems(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch carousel items", error);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);

    const res = await mediaApi.uploadMedia(formData);
    return res.data?.data?.url;
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!title.trim()) {
        alert("Please enter a title for the carousel image.");
        return;
      }

      let finalImageUrl = imageUrl;

      if (image) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          alert("Image upload failed. Please try again.");
          return;
        }
        finalImageUrl = uploadedUrl;
      }

      if (!finalImageUrl) {
        alert("Please select an image to upload.");
        return;
      }

      const payload = {
        title: title.trim(),
        image: finalImageUrl,
        order,
        isActive,
      };

      if (editingId) {
        await homeCarouselApi.updateHomeCarousel(editingId, payload);
        alert("Carousel item updated successfully.");
      } else {
        await homeCarouselApi.createHomeCarousel(payload);
        alert("Carousel item created successfully.");
      }

      resetForm();
      await fetchCarouselItems();
    } catch (error) {
      console.error(error);
      alert("Unable to save carousel item.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: CarouselItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setOrder(item.order);
    setIsActive(item.isActive);
    setImage(null);
    setImageUrl(item.image);
    setPreviewImage(item.image);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this carousel item?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await homeCarouselApi.deleteHomeCarousel(id);
      await fetchCarouselItems();
      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Failed to delete carousel item", error);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Homepage Carousel"
      subtitle="Manage images for the homepage carousel section."
    >
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-white/80">
            <span>Image Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-brand-accent"
            />
          </label>

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

        <label className="space-y-2 text-sm text-white/80 block">
          <span>Status</span>
          <select
            value={isActive ? "active" : "inactive"}
            onChange={(e) => setIsActive(e.target.value === "active")}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-white/80 block">
          <span>Carousel Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
              setImageUrl("");
              setPreviewImage(file ? URL.createObjectURL(file) : "");
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

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-3xl bg-brand-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Carousel Item" : "Upload Carousel Image"}
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              navigate("/admin");
            }}
            className="rounded-3xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">Carousel Items</h3>
          <span className="text-sm text-white/60">{items.length} item{items.length === 1 ? '' : 's'}</span>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-white/60">No carousel items saved yet.</p>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 lg:p-6"
              >
                <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full rounded-3xl object-cover"
                  />

                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm uppercase tracking-[0.2em] text-brand-accent">{item.isActive ? 'Active' : 'Inactive'}</p>
                      <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-white/70">Order: {item.order}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
                      >
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