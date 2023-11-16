const ErrorHandler = require('./errorHandler')
const catchAsyncError = require('./catchAsyncError')
const User = require('./userModel')
const bcrypt = require('bcryptjs')

//Register a User
exports.registerUser = catchAsyncError( async(req,res,next) => {

    const {firstName,lastName,email,password,number,gender} = req.body

    const user = await User.create({
        firstName,lastName,email,password,number,gender
    })

    res.status(201).json({
        success: true,
        user
    })
})


//Login User
exports.loginUser = catchAsyncError( async(req,res,next) => {
    
    const vemail = req.body.email
    const vpassword = req.body.password

        if(!vemail || !vpassword){
        return next(new ErrorHandler("Please Enter Email & Password" , 400))
    }
    const user = await User.findOne({ email: vemail })
    
    if(!user){
        return next(new ErrorHandler("Invalid Email & Password" , 401))
    }
    const isPasswordMatched = await bcrypt.compare(vpassword , user.password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email & Password" , 401))
    }
    
    res.status(200).json({
        success: true,
        user,
    })
})


//Logout User
exports.logoutUser = catchAsyncError( async(req,res,next) => {
    
    
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })

})






//GetUser Details
exports.getUserDetails = catchAsyncError(async (req,res,next) =>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})



//Update User Password
exports.updatePassword = catchAsyncError(async (req,res,next) =>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect" , 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password Doesnot Match" , 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user,200,res)

})



//Update User Profile
exports.updateProfile = catchAsyncError(async (req,res,next) =>{

    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
    }

    //we will add cloudinary later
    // if(req.body.avatar !== ""){
    //     const user = await User.findById(req.user.id)
    //     const imageId = user.avatar.public_id
    //     await cloudinary.v2.uploader.destroy(imageId)
    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
    //         folder: 'avatars',
    //         width: 150,
    //         crop: 'scale',
    //     })

    //     newUserData.avatar = {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,
    //     }
    // }

    const user = await User.findByIdAndUpdate(req.body.id , newUserData , {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})






//Get Single User(Admin)
exports.getSingleUser = catchAsyncError(async (req,res,next) =>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User Doesnot Exist`))
    }
    
    res.status(200).json({
        success: true,
        user
    })

})









//Delete User --Admin
exports.deleteUser = catchAsyncError(async (req,res,next) =>{
    
    const user = await User.findByIdAndDelete(req.params.id)
    
    if(!user){
        return next(new ErrorHandler(`User doesnot exist`))
    }
    
    
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
    
})