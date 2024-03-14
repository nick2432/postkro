const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    avatar:{
        type: String,
    },
    email:{
        type: String,
        required: [true,"please enter an email"],
        unique: [true, "email already exists"],
    },
    password:{
        type: String,
        required: [true, "please enter a password"],
        minlength:[6, "password must be at least 6 characters"],
        select : false,
    },
    post:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
});
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next()
})
userSchema.method.matchPassword = async function (passsword) {
    return await bcrypt.compare(passsword, this.passsword);
}
userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id}, "nikhilbhaiyajwt");
}
const User = mongoose.model("User", userSchema);
module.exports = User;
