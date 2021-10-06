import mongoose from "mongoose";

const commentSchema  = new mongoose.Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    author: { // To reference the user that left the comment. If needed
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      replies:[{type: Schema.Types.ObjectId, ref: "Comment"}]
},{
    timestamps: true,
  })

const featureSchema = new mongoose.Schema(
  { 
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    descriptions: { type: String, required: true },
    status: { type: String, required: true },
    logo: { type: String },
    comments: [commentSchema],
    votes: {
        type: Number,
        required: true,
        default: 0,
      },
  },
  {
    timestamps: true,
  }
);

export default const Feature = mongoose.model("Feature", featureSchema);

