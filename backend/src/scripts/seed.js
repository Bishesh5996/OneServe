import { connectDatabase } from "../config/database.js";
import { seedProducts } from "../infrastructure/db/seed/products.js";
import { seedBlogs } from "../infrastructure/db/seed/blogs.js";

const run = async () => {
  await connectDatabase();
  const catalog = await seedProducts();
  console.log(`Seeded ${catalog.length} products`);
  const articles = await seedBlogs(catalog);
  console.log(`Seeded ${articles.length} blogs`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
