import { Router } from "express";

import { AdminController } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/authorize-admin.js";

const router = Router();

router.get("/analytics", authenticate(), authorizeAdmin, AdminController.analytics);
router.get("/users", authenticate(), authorizeAdmin, AdminController.users);

export const adminRoutes = router;
