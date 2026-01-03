import { Router } from "express";

import { ContactController } from "../controllers/contact.controller.js";

const router = Router();

router.post("/", ContactController.create);

export const contactRoutes = router;
