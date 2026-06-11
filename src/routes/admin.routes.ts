import express from "express";
import { createUser, getUsers, updateUser } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/users", authMiddleware, authorize("ADMIN", "SUPER_ADMIN"), createUser);
router.get("/users", authMiddleware, authorize("ADMIN", "SUPER_ADMIN"), getUsers);
router.patch("/users/:id", authMiddleware, authorize("ADMIN", "SUPER_ADMIN"), updateUser);

export default router;
