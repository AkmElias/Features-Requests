import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  adminLogin,
  getUserById
} from "../controllers/userController.js";
import { protect, admin } from "../middilewares/authMiddileware.js";

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.post("/admin/login", adminLogin);
router.route("/:id").get(getUserById);

export default router;
