import asyncHandler from "express-async-handler";
import Feature from "../models/featureModel.js";

const postFeature = asyncHandler(async (req, res) => {
  // console.log(req.body);
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
    throw new Error("Server error");
  }
});

const getFeatures = asyncHandler(async (req, res) => {
  let pageSize = 10;
  let page = Number(req.query.pageNumber) || 1;

  try {
    let count = await Feature.countDocuments();
    let features = await Feature.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res
      .status(200)
      .json({ features, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

const getFeatureById = async (req, res) => {
  try {
    let data = await Feature.findById({ _id: req.params.featureId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
};

const upVote = asyncHandler(async (req, res) => {
  // console.log("vote............/n")
  let feature = await Feature.findById({ _id: req.params.featureId });
  if (feature) {
    const alreadyVoted = feature.votes.find(
      (v) => v.toString() === req.user._id.toString()
    );
    if (alreadyVoted) {
      console.log(" ", feature.numOfVotes);
      res.status(200).json({ numOfVotes: feature.numOfVotes });
    } else {
      feature.votes.push(req.user._id);
      feature.numOfVotes = feature.votes.length;
      console.log(" ", feature.numOfVotes);
      await feature.save();
      res.status(201).json({ numOfVotes: feature.numOfVotes });
    }
  } else {
    res.status(404);
    throw new Error("Feature not found");
  }
});

const addComment = asyncHandler(async (req, res) => {
  let feature = await Feature.findById({ _id: req.params.featureId });
  if (feature) {
    const comment = {
      author: req.user._id,
      content: req.body?.comment,
      logo: req.body?.imagePath ? req.body?.imagePath : "",
      isOwner:
        feature.author.toString() === req.user._id.toString() ? true : false,
    };
    feature.comments.push(comment);
    let newFeature = await feature.save();
    res.status(201).json(newFeature);
  } else {
    res.status(404);
    throw new Error("Feature not found");
  }
});

const updateFeature = asyncHandler(async (req, res) => {
  console.log("update..", req.params.featureId);
  let feature = await Feature.findOne({_id: req.params.featureId});
  if(feature){ 
    try {
      feature.title = req.body.title,
      feature.detail = req.body.detail,
      feature.status = req.body.status,
      feature.logo = req.body.imagePath
      let updatedFeature = await feature.save();
      res.status(200).json(updatedFeature)
    } catch(error) {
      res.status(500);
      throw new Error("Server error");
    }
    
  } else {
    res.status(404);
    throw new Error("Feature Not Found")
  }
})

const deleteFeature = asyncHandler(async (req, res) => {
  try {
    console.log("delete..", req.params.featureId)
    await Feature.deleteOne({ _id: req.params.featureId });
    res.status(200).json(`${req.params.featureId} deleted`);
  } catch (error) {
    res.status(500);
    throw new Error("Server error.");
  }
});

export {
  postFeature,
  getFeatures,
  getFeatureById,
  upVote,
  addComment,
  updateFeature,
  deleteFeature,
};
