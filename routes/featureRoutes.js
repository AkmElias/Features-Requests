import express from "express";
const router = express.Router();

import {postFeature, getFeatures, getFeatureById, upVote, addComment} from "../controllers/featureController.js";
import { protect, admin } from "../middilewares/authMiddileware.js";

router.route("/").get(getFeatures);
router.route("/feature/").post(protect,postFeature);
router.route("/vote/:featureId").get(protect, upVote);
router.route("/:featureId").get(getFeatureById);
router.route("/comment/:featureId").post(protect, addComment);

export default router;