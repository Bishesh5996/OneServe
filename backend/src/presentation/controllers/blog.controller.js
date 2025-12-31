import { CreateBlogUseCase } from "../../application/use-cases/create-blog.use-case.js";
import { GetBlogUseCase } from "../../application/use-cases/get-blog.use-case.js";
import { ListBlogsUseCase } from "../../application/use-cases/list-blogs.use-case.js";
import { UpdateBlogUseCase } from "../../application/use-cases/update-blog.use-case.js";

const listUseCase = new ListBlogsUseCase();
const getUseCase = new GetBlogUseCase();
const createUseCase = new CreateBlogUseCase();
const updateUseCase = new UpdateBlogUseCase();

export class BlogController {
  static async list(req, res) {
    try {
      const blogs = await listUseCase.execute({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 12
      });
      res.json(blogs);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const blog = await getUseCase.execute(req.params.slug);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const blog = await createUseCase.execute(req.body);
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const blog = await updateUseCase.execute(req.params.id, req.body);
      res.json(blog);
    } catch (error) {
      res.status(/not found/i.test(error.message) ? 404 : 400).json({ message: error.message });
    }
  }
}
