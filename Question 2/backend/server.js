import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Post from './models/Post.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//db config
const connection_url =
  "mongodb+srv://rohaan:abcd1234@cluster0.ywksqhm.mongodb.net/?retryWrites=true&w=majority";

app.get('/posts', async (req, res) => {
  let posts
  try {
    posts = await Post.find().limit(30)
  } catch (error) {
    return console.log(error);
  }
  if(!posts) {
    return res.status(404).json({message: "No Posts Found"})
  }
  return res.status(200).json({posts})
})

app.get('/posts/limit=:lim/skip=:sk', async (req, res) => {
  const lim = req.params.lim
  const sk = req.params.sk
  let posts;
  try {
    posts = await Post.find().skip(sk).limit(lim)
  } catch (error) {
    return console.log(error);
  }
  if(!posts) {
    return res.status(404).json({message: "No Posts Found"})
  }
  return res.status(200).json({posts})
})


app.post('/posts/add', async (req, res) => {
  const { title, body, userId, tags, reactions } = req.body;
  const newPost = new Post({
    title,
    body,
    userId,
    tags,
    reactions,
  });
  try {
    await newPost.save();
  } catch (error) {
    return res.status(500).json({error})
  }
  return res.status(201).json({newPost})
})

mongoose
  .connect(connection_url)
  .then(() => console.log("successfully connected to database"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`listening on localhost: ${port}`));
