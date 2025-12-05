import { useEffect, useState } from "react";

import { apiClient } from "@utils/apiClient.js";

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

const INITIAL_FORM = {
  name: "",
  description: "",
  image: "",
  gallery: "",
  price: "",
  comparePrice: "",
  stock: "50",
  category: "",
  diet: "",
  prepTime: "",
  ingredients: "",
  tags: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: ""
};

const createCustomizationField = (overrides = {}) => ({
  id: overrides.id ?? (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
  name: overrides.name ?? "",
  description: overrides.description ?? "",
  unitPrice: overrides.unitPrice ?? "",
  stock: overrides.stock ?? "50",
  minQuantity: overrides.minQuantity ?? "0",
  maxQuantity: overrides.maxQuantity ?? "2",
  defaultQuantity: overrides.defaultQuantity ?? "0"
});

const inputStyles =
  "w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-orange-400 focus:outline-none";

export const AdminProductsPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [customizations, setCustomizations] = useState([createCustomizationField()]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [imageStatus, setImageStatus] = useState("");
  const [galleryStatus, setGalleryStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const isEditing = Boolean(editingId);

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await apiClient.get("/products", { params: { limit: 200 } });
      setProducts(response.data?.data ?? response.data ?? []);
    } catch (error) {
      console.error("Unable to load products", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomizationChange = (index, field, value) => {
    setCustomizations((prev) => prev.map((custom, i) => (i === index ? { ...custom, [field]: value } : custom)));
  };

  const addCustomizationField = () => {
    setCustomizations((prev) => [...prev, createCustomizationField()]);
  };

  const removeCustomizationField = (index) => {
    setCustomizations((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const payload = {
        name: form.name,
        description: form.description,
        image: form.image,
        gallery: form.gallery
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        price: parseFloat(form.price),
        stock: form.stock ? parseInt(form.stock, 10) : 0,
        comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : undefined,
        category: form.category,
        diet: form.diet,
        prepTime: form.prepTime ? parseInt(form.prepTime, 10) : undefined,
        ingredients: form.ingredients
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        nutrition:
          form.calories || form.protein || form.carbs || form.fat
            ? {
                calories: form.calories ? parseFloat(form.calories) : undefined,
                protein: form.protein ? parseFloat(form.protein) : undefined,
                carbs: form.carbs ? parseFloat(form.carbs) : undefined,
                fat: form.fat ? parseFloat(form.fat) : undefined
              }
            : undefined,
        customizations: customizations
          .filter((custom) => custom.name.trim())
          .map((custom) => ({
            id: custom.id,
            name: custom.name,
            description: custom.description,
            unitPrice: custom.unitPrice ? parseFloat(custom.unitPrice) : 0,
            stock: custom.stock ? parseInt(custom.stock, 10) : 0,
            minQuantity: custom.minQuantity ? parseInt(custom.minQuantity, 10) : 0,
            maxQuantity: custom.maxQuantity ? parseInt(custom.maxQuantity, 10) : 2,
            defaultQuantity: custom.defaultQuantity ? parseInt(custom.defaultQuantity, 10) : 0
          })),
        currency: "NPR"
      };
      if (isEditing) {
        await apiClient.patch(`/products/${editingId}`, payload);
        setMessage("Product updated successfully.");
      } else {
        await apiClient.post("/products", payload);
        setMessage("Product added successfully.");
      }
      setForm(INITIAL_FORM);
      setCustomizations([createCustomizationField()]);
      setEditingId(null);
      loadProducts();
    } catch (error) {
      setMessage(error.response?.data?.message ?? "Unable to add product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description ?? "",
      image: product.image ?? "",
      gallery: (product.gallery ?? []).join("\n"),
      price: product.price ?? "",
      comparePrice: product.comparePrice ?? "",
      stock: product.stock ?? "50",
      category: product.category ?? "",
      diet: product.diet ?? "",
      prepTime: product.prepTime ?? "",
      ingredients: (product.ingredients ?? []).join("\n"),
      tags: (product.tags ?? []).join(", "),
      calories: product.nutrition?.calories ?? "",
      protein: product.nutrition?.protein ?? "",
      carbs: product.nutrition?.carbs ?? "",
      fat: product.nutrition?.fat ?? ""
    });
    setCustomizations(
      product.customizations?.length
        ? product.customizations.map((custom) =>
            createCustomizationField({
              id: custom.id,
              name: custom.name,
              description: custom.description ?? "",
              unitPrice: custom.unitPrice ?? "",
              stock: custom.stock ?? "50",
              minQuantity: custom.minQuantity ?? "0",
              maxQuantity: custom.maxQuantity ?? "2",
              defaultQuantity: custom.defaultQuantity ?? "0"
            })
          )
        : [createCustomizationField()]
    );
    setMessage("");
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setCustomizations([createCustomizationField()]);
    setEditingId(null);
    setMessage("");
    setImageStatus("");
    setGalleryStatus("");
  };

  const handleCoverUpload = async (event) => {
    const urls = await processFiles(event.target.files, setImageStatus);
    if (urls.length) {
      setForm((prev) => ({ ...prev, image: urls[0] }));
    }
    event.target.value = "";
  };

  const handleGalleryUpload = async (event) => {
    const urls = await processFiles(event.target.files, setGalleryStatus);
    if (urls.length) {
      setForm((prev) => ({
        ...prev,
        gallery: [prev.gallery, urls.join("\n")].filter(Boolean).join("\n")
      }));
    }
    event.target.value = "";
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">{isEditing ? "Edit Product" : "Add New Product"}</h1>
        <p className="text-sm text-slate-400">{isEditing ? "Update existing meal kit details or restock inventory." : "Provide complete details to publish a new meal kit."}</p>
      </header>
      <form className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <input className={inputStyles} value={form.name} onChange={(event) => handleChange("name", event.target.value)} required />
          </Field>
          <Field label="Category">
            <input className={inputStyles} value={form.category} onChange={(event) => handleChange("category", event.target.value)} required />
          </Field>
          <Field label="Dietary Type">
            <input className={inputStyles} value={form.diet} onChange={(event) => handleChange("diet", event.target.value)} />
          </Field>
          <Field label="Prep Time (minutes)">
            <input className={inputStyles} type="number" min="1" value={form.prepTime} onChange={(event) => handleChange("prepTime", event.target.value)} />
          </Field>
        </div>
        <Field label="Highlight Description">
          <textarea className={inputStyles} rows="3" value={form.description} onChange={(event) => handleChange("description", event.target.value)} />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Cover Image URL">
            <input className={inputStyles} value={form.image} onChange={(event) => handleChange("image", event.target.value)} required />
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 px-3 py-1 font-semibold hover:bg-slate-800">
                <input accept="image/*" className="hidden" type="file" onChange={handleCoverUpload} />
                Upload from device
              </label>
              {imageStatus && <span className="rounded-full bg-slate-900 px-3 py-1">{imageStatus}</span>}
            </div>
          </Field>
          <Field label="Gallery Images (one per line)">
            <textarea className={inputStyles} rows="3" value={form.gallery} onChange={(event) => handleChange("gallery", event.target.value)} />
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 px-3 py-1 font-semibold hover:bg-slate-800">
                <input accept="image/*" className="hidden" multiple type="file" onChange={handleGalleryUpload} />
                Upload gallery photos
              </label>
              {galleryStatus && <span className="rounded-full bg-slate-900 px-3 py-1">{galleryStatus}</span>}
            </div>
          </Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Price (NPR)">
            <input className={inputStyles} type="number" min="0" step="1" value={form.price} onChange={(event) => handleChange("price", event.target.value)} required />
          </Field>
          <Field label="Compare Price (NPR, optional)">
            <input className={inputStyles} type="number" min="0" step="1" value={form.comparePrice} onChange={(event) => handleChange("comparePrice", event.target.value)} />
          </Field>
        </div>
        <Field label="Available Stock (kits)">
          <input className={inputStyles} type="number" min="0" step="1" value={form.stock} onChange={(event) => handleChange("stock", event.target.value)} required />
        </Field>
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Calories">
            <input className={inputStyles} type="number" min="0" value={form.calories} onChange={(event) => handleChange("calories", event.target.value)} />
          </Field>
          <Field label="Protein (g)">
            <input className={inputStyles} type="number" min="0" value={form.protein} onChange={(event) => handleChange("protein", event.target.value)} />
          </Field>
          <Field label="Carbs (g)">
            <input className={inputStyles} type="number" min="0" value={form.carbs} onChange={(event) => handleChange("carbs", event.target.value)} />
          </Field>
          <Field label="Fat (g)">
            <input className={inputStyles} type="number" min="0" value={form.fat} onChange={(event) => handleChange("fat", event.target.value)} />
          </Field>
        </div>
        <Field label="Ingredients (one per line)">
          <textarea className={inputStyles} rows="4" value={form.ingredients} onChange={(event) => handleChange("ingredients", event.target.value)} />
        </Field>
        <Field label="Tags (comma separated)">
          <input className={inputStyles} value={form.tags} onChange={(event) => handleChange("tags", event.target.value)} />
        </Field>
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-200">Customizable Items</p>
          {customizations.map((custom, index) => (
            <div key={custom.id} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Field label="Name">
                  <input className={inputStyles} value={custom.name} onChange={(event) => handleCustomizationChange(index, "name", event.target.value)} />
                </Field>
                {customizations.length > 1 && (
                  <button className="text-xs font-semibold text-red-300 underline" onClick={() => removeCustomizationField(index)} type="button">
                    Remove
                  </button>
                )}
              </div>
              <Field label="Description">
                <textarea className={inputStyles} rows="2" value={custom.description} onChange={(event) => handleCustomizationChange(index, "description", event.target.value)} />
              </Field>
              <div className="grid gap-3 md:grid-cols-5">
                <Field label="Unit Price (NPR)">
                  <input className={inputStyles} type="number" step="1" value={custom.unitPrice} onChange={(event) => handleCustomizationChange(index, "unitPrice", event.target.value)} />
                </Field>
                <Field label="Available Stock">
                  <input className={inputStyles} type="number" step="1" min="0" value={custom.stock} onChange={(event) => handleCustomizationChange(index, "stock", event.target.value)} />
                </Field>
                <Field label="Min Qty">
                  <input className={inputStyles} type="number" value={custom.minQuantity} onChange={(event) => handleCustomizationChange(index, "minQuantity", event.target.value)} />
                </Field>
                <Field label="Max Qty">
                  <input className={inputStyles} type="number" value={custom.maxQuantity} onChange={(event) => handleCustomizationChange(index, "maxQuantity", event.target.value)} />
                </Field>
                <Field label="Default Qty">
                  <input className={inputStyles} type="number" value={custom.defaultQuantity} onChange={(event) => handleCustomizationChange(index, "defaultQuantity", event.target.value)} />
                </Field>
              </div>
            </div>
          ))}
          <button className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-orange-200" onClick={addCustomizationField} type="button">
            Add Customization
          </button>
        </div>
        {message && <p className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-orange-200">{message}</p>}
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black disabled:opacity-60" disabled={submitting} type="submit">
            {submitting ? "Saving…" : isEditing ? "Update Product" : "Save Product"}
          </button>
          {isEditing && (
            <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-orange-100" onClick={handleReset} type="button">
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold text-white">Existing Products</h2>
        {loadingProducts ? (
          <p className="text-sm text-slate-400">Loading products…</p>
        ) : products.length ? (
          <div className="space-y-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-wrap items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">{product.name}</p>
                  <p className="text-xs text-slate-400">
                    Stock: {product.stock ?? "—"} · Customizable items: {product.customizations?.length ?? 0}
                  </p>
                </div>
                <button className="rounded-full border border-slate-600 px-4 py-1 text-xs font-semibold text-orange-200 hover:bg-slate-800" onClick={() => handleEditProduct(product)} type="button">
                  Edit
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No products found.</p>
        )}
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
