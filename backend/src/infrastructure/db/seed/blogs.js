import { BlogRepository } from "../../repositories/blog.repository.js";

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .substring(0, 80);

const buildSections = (product) => [
  {
    heading: `Prep the ${product.name}`,
    body: `Start by organizing your mise en place: portion the included ingredients, rinse fresh herbs, and warm any sauces in a small saucepan. Sear or roast the hero component until caramelized edges form, then tumble in the veggies or grains. The kits are calibrated for one, so follow the cook times closely—most come together in under ${product.prepTime ?? 20} minutes.`,
    image: product.gallery?.[0] ?? product.image
  },
  {
    heading: "Finishing & plating",
    body: `Once the main portion is cooked, toss it with the provided finishing sauce or drizzle it across the top. Layer the bowl or plate with grains first, arrange proteins and veg, then finish with crunchy toppings and citrus. The goal is restaurant-quality contrast in every bite.`,
    image: product.gallery?.[1] ?? null
  },
  {
    heading: "Serve it like a pro",
    body: "Serve immediately while everything is hot and crisp. Add a squeeze of lemon or lime, shower with fresh herbs, and enjoy straight from the OneServe bowl. Any leftovers can be stored for one day, but we recommend eating fresh for maximum texture."
  }
];

export const seedBlogs = async (productCatalog = []) => {
  const repo = new BlogRepository();
  const collection = productCatalog.length ? productCatalog : [];
  if (!collection.length) {
    await repo.seed([]);
    return [];
  }

  const articles = collection.slice(0, Math.min(24, collection.length)).map((product, index) => ({
    title: `The secret tips & tricks to prepare ${product.name}`,
    slug: `${slugify(product.name)}-${index}`,
    excerpt: `${product.description} Learn how we plate it perfectly every time.`,
    heroImage: product.image,
    productId: product.id,
    readMinutes: 6,
    sections: buildSections(product)
  }));

  await repo.seed(articles);
  return articles;
};
