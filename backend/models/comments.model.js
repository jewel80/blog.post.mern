//mongoose package get
const mongoose = require("mongoose");

//content model schema
const commentsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//content schema export..
module.exports = mongoose.model("Comment", commentsSchema);
