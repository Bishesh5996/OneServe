import { BlogRepository } from "../../infrastructure/repositories/blog.repository.js";

export class GetBlogUseCase {
  constructor(blogs = new BlogRepository()) {
    this.blogs = blogs;
  }

  async execute(identifier) {
    if (!identifier) return null;
    return this.blogs.findBySlugOrId(identifier);
  }
}
