const express = require('express')
const { registerUser , loginUser , logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUser, deleteUser, updateUserRole } = require('./userController')

const router = express.Router()


router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').get(logoutUser)

router.route('/me').get(getUserDetails)

router.route('/update').put(updateProfile)

router.route('/delete/:id').delete(deleteUser)

module.exports = router