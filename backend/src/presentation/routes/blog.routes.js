import { Router } from "express";

import { BlogController } from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/authorize-admin.js";

const router = Router();

router.get("/", BlogController.list);
router.get("/:slug", BlogController.get);
router.post("/", authenticate(), authorizeAdmin, BlogController.create);
router.patch("/:id", authenticate(), authorizeAdmin, BlogController.update);

export const blogRoutes = router;
