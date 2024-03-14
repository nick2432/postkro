const  router  = require("express").Router();
const {Signin}=require("../controllers/user.js")
router.route("/user").post(Signin); 
module.exports = router; 