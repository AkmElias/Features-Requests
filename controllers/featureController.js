import asyncHandler from "express-async-handler";
import Feature from "../models/featureModel.js";

const postFeature = asyncHandler(async (req, res) => {
    console.log(req.body)
  const feature = new Feature({
    title: req.body.title,
    description: req.body.detail ? req.body.detail : "",
    author: req.user._id,
    logo: req.body.imagePath ? req.body.imagePath : "/frontend/public/images/file-1633969520509.PNG",
    status: "Under Review",
    numberOfVotes: 0,
  });
  try {
    const createdFeaturePost = await feature.save();
    res.status(201).json(createdFeaturePost);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

export { postFeature };
