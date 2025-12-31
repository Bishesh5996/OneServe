import { BlogRepository } from "../../infrastructure/repositories/blog.repository.js";

export class UpdateBlogUseCase {
  constructor(blogs = new BlogRepository()) {
    this.blogs = blogs;
  }

  async execute(identifier, payload) {
    const updated = await this.blogs.update(identifier, payload);
    if (!updated) {
      throw new Error("Blog not found");
    }
    return updated;
  }
}
