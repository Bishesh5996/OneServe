import { BlogRepository } from "../../infrastructure/repositories/blog.repository.js";

export class ListBlogsUseCase {
  constructor(blogs = new BlogRepository()) {
    this.blogs = blogs;
  }

  execute(params = {}) {
    return this.blogs.list(params);
  }
}
