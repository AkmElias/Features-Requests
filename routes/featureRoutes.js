import express from "express";
const router = express.Router();

import {postFeature, getFeatures} from "../controllers/featureController.js";
import { protect, admin } from "../middilewares/authMiddileware.js";

router.route("/post/").post(protect,postFeature);
router.route("/").get(getFeatures);

export default router;