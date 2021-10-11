import express from "express";
const router = express.Router();

import {postFeature} from "../controllers/featureController.js";
import { protect, admin } from "../middilewares/authMiddileware.js";

router.route("/post/").post(protect,postFeature);

export default router;