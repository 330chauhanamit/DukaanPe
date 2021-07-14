const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },

  postedBy:{
     type:ObjectId,
     ref:"User"
  }
});

mongoose.model("Post", postSchema);
