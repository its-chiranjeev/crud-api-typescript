import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { signupValidator } from "../validators/auth.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/signup", signupValidator, validate, registerUser);
router.post("/login", loginUser);

export default router;
