import mongoose from "mongoose";

import { BlogModel } from "../db/models/blog.model.js";
import { createBlogEntity } from "../../domain/entities/blog.js";

const { Types } = mongoose;

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .substring(0, 80);

export class BlogRepository {
  async list(params = {}) {
    const { page = 1, limit = 12 } = params;
    const [data, total] = await Promise.all([
      BlogModel.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      BlogModel.countDocuments()
    ]);

    return {
      data: data.map((doc) => this.map(doc)),
      total
    };
  }

  async findBySlugOrId(identifier) {
    if (!identifier) return null;
    const query = Types.ObjectId.isValid(identifier) ? { _id: identifier } : { slug: identifier };
    const blog = await BlogModel.findOne(query);
    return blog ? this.map(blog) : null;
  }

  async create(data) {
    const payload = {
      title: data.title,
      slug: data.slug ? slugify(data.slug) : slugify(data.title),
      excerpt: data.excerpt,
      heroImage: data.heroImage,
      productId: data.productId,
      readMinutes: data.readMinutes ?? 5,
      publishedAt: data.publishedAt ?? new Date(),
      sections: Array.isArray(data.sections)
        ? data.sections.map((section) => ({
            heading: section.heading,
            body: section.body,
            image: section.image
          }))
        : []
    };

    const doc = await BlogModel.create(payload);
    return this.map(doc);
  }

  async seed(blogs = []) {
    await BlogModel.deleteMany({});
    await BlogModel.insertMany(blogs);
  }

  map(doc) {
    return createBlogEntity({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      heroImage: doc.heroImage,
      readMinutes: doc.readMinutes,
      publishedAt: doc.publishedAt,
      sections: doc.sections ?? [],
      productId: doc.productId ?? ""
    });
  }
}
