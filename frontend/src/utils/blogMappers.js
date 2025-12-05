import { fallbackProducts } from "@utils/productMappers.js";

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .substring(0, 80);

const randomId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
};

export const normalizeBlog = (blog = {}) => {
  const slug = blog.slug ?? slugify(blog.title ?? "");
  const publishedAt = blog.publishedAt ? new Date(blog.publishedAt).toISOString() : new Date().toISOString();
  const sections = Array.isArray(blog.sections) && blog.sections.length
    ? blog.sections.map((section, index) => ({
        heading: section.heading ?? (index === 0 ? blog.title : ""),
        body: section.body ?? "",
        image: section.image ?? ""
      }))
    : [
        {
          heading: blog.title ?? "Featured Article",
          body: blog.excerpt ?? "",
          image: blog.heroImage ?? ""
        }
      ];

  return {
    id: blog.id ?? blog._id ?? slug ?? randomId(),
    title: blog.title ?? "OneServe Article",
    slug: slug || randomId(),
    excerpt: blog.excerpt ?? "Discover the latest tips from our kitchen team.",
    heroImage: blog.heroImage ?? sections[0]?.image ?? "",
    readMinutes: blog.readMinutes ?? 5,
    productId: blog.productId ?? "",
    publishedAt,
    sections
  };
};

export const mapBlogsResponse = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload.map(normalizeBlog);
  if (Array.isArray(payload?.data)) return payload.data.map(normalizeBlog);
  return [];
};

export const fallbackBlogs = fallbackProducts.slice(0, 12).map((product, index) =>
  normalizeBlog({
    id: `fallback-blog-${product.id}`,
    title: `The secret tips & tricks to prepare ${product.name}`,
    slug: slugify(`${product.name}-${index}`),
    excerpt: product.description,
    heroImage: product.image,
    readMinutes: 6,
     productId: product.id,
    sections: [
      {
        heading: `Why we love ${product.name}`,
        body: `${product.description}\n\nReady in ${product.prepTime ?? 20} minutes with just the right amount of ingredients.`,
        image: product.gallery?.[0]
      },
      {
        heading: "Solo cooking inspiration",
        body: "Keep experimenting with toppings, garnishes, and sides to transform the same base kit into a handful of different meals throughout the week."
      }
    ]
  })
);
