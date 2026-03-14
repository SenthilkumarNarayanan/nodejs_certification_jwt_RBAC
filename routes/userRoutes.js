import express from "express";
import { getUsers, addUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get all users (Admin only)
router.get("/", verifyToken, isAdmin, getUsers);

// Add new user (Admin only)
router.post("/add", verifyToken, isAdmin, addUser);

export default router;