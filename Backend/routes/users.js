const express = require('express');
const router = express.Router();
const { blockUser, adminSignin, fetchAllUsers, addUser, updateUserDetails, deleteUsersByEmail } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
var advancedFind = require('../middleware/Advancedfind');
const Users = require('../models/users');


router.route('/login')
    .post(adminSignin);//{{admin}}users/login


router.route('/block/:email&:status')
    .patch(protect, authorize('admin'), blockUser);//{{admin}}users/block/vrushali@gmail.com

router.route('/:email')
    .delete(protect, authorize('admin'), deleteUsersByEmail)

router.route('/')
    .get(protect, advancedFind(Users), fetchAllUsers)
    .post(protect, authorize('admin'), addUser)

router.route('/:_id')
    .put(protect, authorize('admin'), updateUserDetails);


module.exports = router;