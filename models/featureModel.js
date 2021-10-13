import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" },
    content: { type: String, required: true },
    logo: {type: String},
    isOwner: {
      type: Boolean,
      required: true,
    },
    loves: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    numOfLoves: {type: Number, default: 0},
    // parent: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "Comment",
    // },
    // hasChild: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const featureSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    detail: { type: String},
    status: { type: String, required: true, default: "In Progress" },
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
