const express = require('express');
const router = express.Router();
const { blockUser, adminSignin, fetchAllUsers, addUser, updateUserDetails, deleteUsersByEmail } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
var advancedFind = require('../middleware/Advancedfind');
const Users = require('../models/users');
var wordsearch = require('../middleware/wordsearch');

router.route('/login')
    .post(adminSignin);//{{admin}}users/login


router.route('/block/:email&:isBlocked')
    .patch(protect, authorize(), blockUser);//{{admin}}users/block/vrushali@gmail.com

router.route('/:email')
    .delete(protect, authorize(), deleteUsersByEmail)

router.route('/')
    .get(protect, advancedFind(Users), fetchAllUsers)
    .post(/*protect, authorize(),*/ addUser)

router.route('/filter/:word')
    .get(protect, wordsearch(Users))

router.route('/:_id')
    .put(protect, authorize(), updateUserDetails);

module.exports = router;