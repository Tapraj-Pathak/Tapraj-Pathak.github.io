import { Router } from "express";
import { createContactMessage } from "../controllers/contact.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(createContactMessage));

export default router;
