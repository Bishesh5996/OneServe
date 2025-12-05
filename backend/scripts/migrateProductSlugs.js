import mongoose from "mongoose";

import { connectDatabase } from "../src/config/database.js";
import { ProductModel } from "../src/infrastructure/db/models/product.model.js";

const slugifyValue = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const ensureUniqueSlug = (slug, used) => {
  if (!slug) return "";
  let uniqueSlug = slug;
  let suffix = 2;
  while (used.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${suffix}`;
    suffix += 1;
  }
  used.add(uniqueSlug);
  return uniqueSlug;
};

const migrate = async () => {
  await connectDatabase();
  const usedSlugs = new Set(
    (await ProductModel.find({ slug: { $exists: true, $ne: null } }, { slug: 1 }).lean()).map((doc) => doc.slug)
  );

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  const cursor = ProductModel.find().cursor();
  for await (const doc of cursor) {
    try {
      if (doc.slug) {
        usedSlugs.add(doc.slug);
        skipped += 1;
        continue;
      }
      const base = slugifyValue(doc.name ?? "");
      if (!base) {
        errors += 1;
        console.warn(`Skipping product ${doc._id} because it lacks a name.`);
        continue;
      }
      const uniqueSlug = ensureUniqueSlug(base, usedSlugs);
      if (!uniqueSlug) {
        errors += 1;
        console.warn(`Unable to create slug for product ${doc._id}.`);
        continue;
      }
      doc.slug = uniqueSlug;
      await doc.save();
      updated += 1;
    } catch (error) {
      errors += 1;
      console.error(`Failed to migrate product ${doc._id}`, error);
    }
  }

  await mongoose.disconnect();
  console.log(`Product slug migration completed. Updated: ${updated}, skipped: ${skipped}, errors: ${errors}`);
};

migrate().catch((error) => {
  console.error("Migration failed:", error);
  mongoose.disconnect().finally(() => process.exit(1));
});
