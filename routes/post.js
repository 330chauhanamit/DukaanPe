const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.post("/createPost", requireLogin, (req, res) => {
  const {stock,image,title,description,price} = req.body
  const post = new Post({
    title,
    stock,
    description,
    price,
    image: image,
    postedBy: req.user,
  });
  post.save().then((result) => {
    res.json({ post: result });
  })
  .catch(err => console.log(err))
});

router.get("/allPost", requireLogin, (req, res) => {
  Post.find().then((posts) => {
    res.json(posts);
    // console.log(posts);
    // return posts;
  });
});

router.get("/myPost", requireLogin, (req, res) => {
  console.log(req);
  Post.find({postedBy:req.user._id}).then((posts) => {
    res.json(posts);
    // console.log(posts);
    // return posts;
  });
});
router.delete("/allPost", requireLogin, (req,res)=>{
  Post.deleteMany().then(()=>console.log("deleted"))
})

router.delete("/deletePost/:postId", requireLogin,(req,res)=>{
  console.log("here");
  Post.findOne({_id:req.params.postId})
  .exec((err,post)=>{
    post.remove();
  })
})
module.exports = router;
