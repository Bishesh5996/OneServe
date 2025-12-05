import { Router } from "express";

import { authRoutes } from "./auth.routes.js";
import { productRoutes } from "./product.routes.js";
import { orderRoutes } from "./order.routes.js";
import { adminRoutes } from "./admin.routes.js";
import { blogRoutes } from "./blog.routes.js";
import { userRoutes } from "./user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);

export const apiRoutes = router;
