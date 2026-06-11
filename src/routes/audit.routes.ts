import express from "express";
import { getAuditLogs } from "../controllers/audit.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, authorize("SUPER_ADMIN"), getAuditLogs);

export default router;
