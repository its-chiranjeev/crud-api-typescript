import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", validateUser, createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
