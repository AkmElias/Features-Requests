import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" },
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

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
