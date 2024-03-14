const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  contant: String,

  profilePicture: {
    type: String, 
  },
  title: {
    public_id: String,
  },
  name: {
    type: String,
  }
});

module.exports = mongoose.model("Post", postSchema);