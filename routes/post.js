const  router  = require("express").Router();
const {getPost}=require("../controllers/post.js")
router.route("/posts").get(getPost); 
module.exports = router; 