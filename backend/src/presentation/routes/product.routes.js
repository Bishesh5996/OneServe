import { Router } from "express";

import { ProductController } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/authorize-admin.js";

const router = Router();

router.get("/", ProductController.list);
router.get("/:slug", ProductController.getBySlug);
router.post("/", authenticate(), authorizeAdmin, ProductController.create);
router.patch("/:id", authenticate(), authorizeAdmin, ProductController.update);

export const productRoutes = router;
