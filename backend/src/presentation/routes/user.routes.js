import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import { UserController } from "../controllers/user.controller.js";

const router = Router();

router.use(authenticate());

router.get("/me", UserController.getProfile);
router.patch("/me", UserController.updateProfile);
router.get("/me/favorites", UserController.getFavorites);
router.post("/me/favorites/:productId", UserController.addFavorite);
router.delete("/me/favorites/:productId", UserController.removeFavorite);

export const userRoutes = router;
