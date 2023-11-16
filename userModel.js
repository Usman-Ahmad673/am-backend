const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true,"Please Enter Your Name"],
        maxLength: [30,"Name Cannot Exceed 30 Letters"],
        minLength: [4,"Name Cannot less 4 Letters"]
    },
    lastName : {
        type: String,
        required: [true,"Please Enter Your Name"],
        maxLength: [30,"Name Cannot Exceed 30 Letters"],
        minLength: [4,"Name Cannot less 4 Letters"]
    },
    email : {
        type: String,
        required: [true,"Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail , "Please Enter a valid Email"]
    },
    password : {
        type: String,
        required: [true,"Please Enter Your Password"],
        minLength: [8,"Password Cannot less 8 Letters"],
    },
    gender : {
        type: String,
        required: [true,"Please Enter Your Gender"],
    },
    number : {
        type: Number,
        required: [true,"Please Enter Your Number"],
    },
    description : {
        type: String,
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', async function (next) {

    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})




//JWT Token
// userSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id : this._id } , process.env.JWT_SECRET_KEY , {
//         expiresIn: process.env.JWT_EXPIRE_KEY
//     })
// }




//Compare Password
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
    
}










module.exports = mongoose.model('User', userSchema)