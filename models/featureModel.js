import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" },
    content: { type: String, required: true },
    isOwner: {
      type: Boolean,
      required: true,
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
    hasChild: { type: Boolean, default: false },
  },
  { timestamp: true }
);

const featureSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    detail: { type: String},
    status: { type: String, required: true, default: "Under Review" },
    logo: { type: String },
    comments: [commentSchema],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    numOfVotes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Feature = mongoose.model("Feature", featureSchema);

export default Feature;
