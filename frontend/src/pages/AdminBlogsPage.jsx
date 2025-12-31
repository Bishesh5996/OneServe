import { useEffect, useState } from "react";

import { apiClient } from "@utils/apiClient.js";

const INPUT_STYLES = "w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-orange-400 focus:outline-none";

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const processFiles = async (fileList, setStatus) => {
  if (!fileList?.length) return [];

  const files = Array.from(fileList);
  setStatus("Processing upload…");

  const uploads = await Promise.all(
    files.map(async (file) => {
      const issues = [];
      if (!file.type.startsWith("image/")) issues.push("not detected as an image");
      if (file.size > 5 * 1024 * 1024) issues.push("over 5MB");
      const dataUrl = await readFileAsDataUrl(file);
      return {
        dataUrl,
        status: `${file.name} ready${issues.length ? ` (${issues.join(", ")})` : ""}`
      };
    })
  );

  setStatus(uploads.map((upload) => upload.status).join(" | "));
  return uploads.map((upload) => upload.dataUrl);
};

const createEmptySection = () => ({ heading: "", body: "", image: "", imageStatus: "" });

export const AdminBlogsPage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroStatus, setHeroStatus] = useState("");
  const [productId, setProductId] = useState("");
  const [readMinutes, setReadMinutes] = useState(5);
  const [sections, setSections] = useState([createEmptySection()]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const updateSection = (index, field, value) => {
    setSections((prev) => prev.map((section, sectionIndex) => (sectionIndex === index ? { ...section, [field]: value } : section)));
  };

  const addSection = () => setSections((prev) => [...prev, createEmptySection()]);

  const loadBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const response = await apiClient.get("/blogs", { params: { limit: 100 } });
      setBlogs(response.data?.data ?? response.data ?? []);
    } catch (error) {
      // ignore list errors to not block form
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setHeroImage("");
    setReadMinutes(5);
    setProductId("");
    setSections([createEmptySection()]);
    setHeroStatus("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const payload = {
        title,
        slug,
        excerpt,
        heroImage,
        productId: productId || undefined,
        readMinutes: Number(readMinutes) || 5,
        sections: sections.filter((section) => section.heading || section.body || section.image)
      };
      if (editingId) {
        await apiClient.patch(`/blogs/${editingId}`, payload);
        setMessage("Blog updated successfully.");
      } else {
        await apiClient.post("/blogs", payload);
        setMessage("Blog published successfully.");
      }
      resetForm();
      loadBlogs();
    } catch (error) {
      setMessage(error.response?.data?.message ?? "Unable to save blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHeroUpload = async (event) => {
    const urls = await processFiles(event.target.files, setHeroStatus);
    if (urls.length) {
      setHeroImage(urls[0]);
    }
    event.target.value = "";
  };

  const handleSectionUpload = async (index, files) => {
    const urls = await processFiles(files, (status) =>
      setSections((prev) => prev.map((section, i) => (i === index ? { ...section, imageStatus: status } : section)))
    );
    if (urls.length) {
      setSections((prev) => prev.map((section, i) => (i === index ? { ...section, image: urls[0] } : section)));
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title ?? "");
    setSlug(blog.slug ?? "");
    setExcerpt(blog.excerpt ?? "");
    setHeroImage(blog.heroImage ?? "");
    setProductId(blog.productId ?? "");
    setReadMinutes(blog.readMinutes ?? 5);
    setSections(
      (blog.sections ?? []).length
        ? blog.sections.map((section) => ({ heading: section.heading ?? "", body: section.body ?? "", image: section.image ?? "", imageStatus: "" }))
        : [createEmptySection()]
    );
    setHeroStatus("");
    setMessage("");
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">{editingId ? "Edit Blog" : "Publish New Blog"}</h1>
        <p className="text-sm text-slate-400">Share tips, tricks, and guides with OneServe readers.</p>
      </header>

      <form className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title">
            <input className={INPUT_STYLES} required value={title} onChange={(event) => setTitle(event.target.value)} />
          </Field>
          <Field label="Slug (optional)">
            <input className={INPUT_STYLES} placeholder="auto-generated-from-title" value={slug} onChange={(event) => setSlug(event.target.value)} />
          </Field>
        </div>
        <Field label="Hero Image URL">
          <input className={INPUT_STYLES} placeholder="https://images..." value={heroImage} onChange={(event) => setHeroImage(event.target.value)} />
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 px-3 py-1 font-semibold hover:bg-slate-800">
              <input accept="image/*" className="hidden" type="file" onChange={handleHeroUpload} />
              Upload from device
            </label>
            {heroStatus && <span className="rounded-full bg-slate-900 px-3 py-1">{heroStatus}</span>}
          </div>
        </Field>
        <Field label="Related Product ID (optional)">
          <input className={INPUT_STYLES} placeholder="Paste the product ID to show prep details" value={productId} onChange={(event) => setProductId(event.target.value)} />
        </Field>
        <Field label="Excerpt">
          <textarea className={INPUT_STYLES} rows="3" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} />
        </Field>
        <Field label="Read Time (minutes)">
          <input className={INPUT_STYLES} min="1" type="number" value={readMinutes} onChange={(event) => setReadMinutes(event.target.value)} />
        </Field>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-200">Sections</p>
          {sections.map((section, index) => (
            <div key={index} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <Field label={`Heading ${index + 1}`}>
                <input className={INPUT_STYLES} value={section.heading} onChange={(event) => updateSection(index, "heading", event.target.value)} />
              </Field>
              <Field label="Body">
                <textarea className={INPUT_STYLES} rows="4" value={section.body} onChange={(event) => updateSection(index, "body", event.target.value)} />
              </Field>
              <Field label="Image URL (optional)">
                <input className={INPUT_STYLES} value={section.image} onChange={(event) => updateSection(index, "image", event.target.value)} />
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 px-3 py-1 font-semibold hover:bg-slate-800">
                    <input
                      accept="image/*"
                      className="hidden"
                      type="file"
                      onChange={(event) => handleSectionUpload(index, event.target.files)}
                    />
                    Upload from device
                  </label>
                  {section.imageStatus && <span className="rounded-full bg-slate-900 px-3 py-1">{section.imageStatus}</span>}
                </div>
              </Field>
            </div>
          ))}
          <button className="rounded-full border border-orange-400 px-5 py-2 text-sm font-semibold text-orange-200" onClick={addSection} type="button">
            Add Section
          </button>
        </div>

        {message && <p className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-orange-200">{message}</p>}

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black disabled:opacity-60" disabled={submitting} type="submit">
            {submitting ? (editingId ? "Saving…" : "Publishing…") : editingId ? "Save Changes" : "Publish Blog"}
          </button>
          {editingId && (
            <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-orange-100" onClick={resetForm} type="button">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Existing Blogs</h2>
            <p className="text-sm text-slate-400">Click edit to update content.</p>
          </div>
          {loadingBlogs && <span className="text-xs text-slate-400">Loading…</span>}
        </div>
        <div className="mt-4 space-y-2">
          {blogs.length ? (
            blogs.map((blog) => (
              <div key={blog.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{blog.title}</p>
                  <p className="text-xs text-slate-400">{blog.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full border border-orange-300 px-4 py-1 text-xs font-semibold text-orange-200" onClick={() => startEdit(blog)} type="button">
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No blogs found.</p>
          )}
        </div>
      </section>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="text-sm font-semibold text-slate-200">
    {label}
    <div className="mt-2">{children}</div>
  </label>
);
