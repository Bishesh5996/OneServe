import { Router } from "express";

import { OrderController } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/authorize-admin.js";

const router = Router();

router.get("/", authenticate(), OrderController.listMine);
router.post("/", authenticate(), OrderController.create);
router.get("/admin", authenticate(), authorizeAdmin, OrderController.listAll);
router.get("/track/:code", OrderController.track);
router.patch("/:id/status", authenticate(), authorizeAdmin, OrderController.updateStatus);
router.post("/:id/received", authenticate(), OrderController.markReceived);

export const orderRoutes = router;
