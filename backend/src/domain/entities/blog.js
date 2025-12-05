export const createBlogEntity = (data = {}) => ({
  id: data.id ?? "",
  title: data.title ?? "",
  slug: data.slug ?? "",
  excerpt: data.excerpt ?? "",
  heroImage: data.heroImage ?? "",
  readMinutes: data.readMinutes ?? 5,
  productId: data.productId ?? "",
  publishedAt: data.publishedAt ?? new Date().toISOString(),
  sections: Array.isArray(data.sections)
    ? data.sections.map((section) => ({
        heading: section.heading ?? "",
        body: section.body ?? "",
        image: section.image ?? ""
      }))
    : []
});
