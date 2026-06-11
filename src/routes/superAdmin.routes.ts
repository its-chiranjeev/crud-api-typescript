import express from "express";
import {
  approveUser,
  rejectUser,
  makeAdmin,
} from "../controllers/superAdmin.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.patch(
  "/approve/:id",
  authMiddleware,
  authorize("SUPER_ADMIN"),
  approveUser
);

router.patch(
  "/reject/:id",
  authMiddleware,
  authorize("SUPER_ADMIN"),
  rejectUser
);

router.patch(
  "/make-admin/:id",
  authMiddleware,
  authorize("SUPER_ADMIN"),
  makeAdmin
);

export default router;