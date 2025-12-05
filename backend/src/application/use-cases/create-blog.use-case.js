import { BlogRepository } from "../../infrastructure/repositories/blog.repository.js";

export class CreateBlogUseCase {
  constructor(blogs = new BlogRepository()) {
    this.blogs = blogs;
  }

  async execute(payload = {}) {
    if (!payload.title) throw new Error("Title is required");
    return this.blogs.create(payload);
  }
}
