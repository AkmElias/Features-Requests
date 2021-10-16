import express from "express";
const router = express.Router();

import {postFeature, getFeatures, getFeatureById, upVote, addComment, updateFeature, deleteFeature} from "../controllers/featureController.js";
import { protect, admin } from "../middilewares/authMiddileware.js";

router.route("/").get(getFeatures);
router.route("/feature/").post(protect,postFeature);
router.route("/:featureId").put(protect,admin, updateFeature);
router.route("/:featureId").delete(protect,admin,deleteFeature);
router.route("/vote/:featureId").get(protect, upVote);
router.route("/:featureId").get(getFeatureById);
router.route("/comment/:featureId").post(protect, addComment);


export default router;