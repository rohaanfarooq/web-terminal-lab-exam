import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: Number,
  tags: [String],
  reactions: Number
});

export default mongoose.model("Post", postSchema);
