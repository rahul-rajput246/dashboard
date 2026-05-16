import express from "express";
import { getCurrentUser, loginUser, registerUser } from "../controllers/authController";
import protect from "../middleware/authMiddleware";
import validateRequest from "../middleware/validateRequest";
import { loginValidator, registerValidator } from "../validators/authValidators";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.get("/me", protect, getCurrentUser);

export default router;
