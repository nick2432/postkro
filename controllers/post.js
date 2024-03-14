const User = require("../models/user.js");
const Post = require("../models/post.js");

exports.getPost = async (req, res) => {
  console.log(req.query.page);
  console.log(req.query.size);
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 10;
  const skip = (page - 1) * size;
  try {
    // Retrieve all posts from the database
    const posts = await Post.find().skip(skip).limit(size);

    // Check if any posts were found
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found" });
    }

    // Send the retrieved posts as a response
    res.status(200).json({ success: true, posts: posts });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
