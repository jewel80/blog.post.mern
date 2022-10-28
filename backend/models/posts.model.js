//mongoose package get
const mongoose = require("mongoose");

//content model schema
const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  emTest: {
    type: String,
  },
  articleText: {
    type: String,
  },
  imgUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//content schema export..
module.exports = mongoose.model("Post", postsSchema);
