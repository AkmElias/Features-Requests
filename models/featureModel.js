import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    descriptions: { type: String, required: true },
    status: { type: String, required: true },
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
