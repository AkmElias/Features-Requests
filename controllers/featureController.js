import asyncHandler from "express-async-handler";
import Feature from "../models/featureModel.js";

const postFeature = asyncHandler(async (req, res) => {
    console.log(req.body)
  const feature = new Feature({
    title: req.body.title,
    detail: req.body.detail ? req.body.detail : "",
    author: req.user._id,
    logo: req.body.imagePath ? req.body.imagePath : "",
    status: "In Progress",
    numberOfVotes: 0,
  });
  try {
    const createdFeaturePost = await feature.save();
    res.status(201).json(createdFeaturePost);
  } catch (error) {
    res.status(500);
    throw new Error("Server error")
  }
});

const getFeatures = asyncHandler(async (req, res) => {
    let pageSize = 10;
    let page = Number(req.query.pageNumber) || 1;

    try{
      let count = await Feature.countDocuments();
      let features = await Feature.find().limit(pageSize).skip(pageSize * (page-1));
      res.status(200).json({features, page, pages: Math.ceil(count / pageSize) });
    } catch(error) {
      res.status(500);
      throw new Error("Server error")
    }
})

export { postFeature, getFeatures };
