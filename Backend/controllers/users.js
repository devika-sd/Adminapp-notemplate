const Users = require('../models/users');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
// const crypto = require('crypto')


// 4.Connection to db
console.log('attempting to connect')

const blockUser = asyncHandler(async (req, res, next) => {
    const user = await Users.findOneAndUpdate({ email: req.params.email }, { isBlocked: req.params.isBlocked }, {
        new: true,
        runValidators: true
    })

    if (!user) throw new Error(`Email ID(${req.params.email}) is not found`)
    console.log(req.params.isBlocked);
    let logmessage = "";
    req.params.isBlocked ? logmessage = "user is blocked successfully" : logmessage = "user is blocked successfully";
    res.json({ success: true, message: logmessage, user })
})
const adminSignin = asyncHandler(async (req, res, next) => {
    let user = await Users.findOne({ email: req.body.email });
    console.log("using Email :" + user);
    if (!user) throw new Error(`Email ID(${req.body.email}) is not found`)

    user = await Users.findOne({ email: req.body.email, isBlocked: false });
    console.log("using Email and success: " + user);
    if (!user) throw new Error(`User with Email ID(${req.body.email}) is Blocked`)


    //compare password with hashed password
    const match = await user.checkpassword(req.body.password);

    if ((match) && (user.isAdmin)) {
        let token = await user.generateToken();
        // console.log(token);
        res.json({ success: true, message: "Login Successfull", token, isAdmin: user.isAdmin, userid: user._id });
    }
    else {
        res.json({ success: false, message: "Invalid Email / Password" });
    }
})

const fetchAllUsers = asyncHandler(async (req, res) => {
    res.status(200).json(res.advancedResults)
})
// const updateUserDetails = asyncHandler(async (req, res, next) => {

//     let users = await Users.findByIdAndUpdate({ _id: req.params._id }, {
//         email: req.body.email,
//         name: req.body.name,
//         address: req.body.address,
//         phone: req.body.phone
//     }, {
//         new: true,
//         runValidators: true
//     })
//     // 60c8ab82d8fd8e071c8211c5 
//     if (!users) throw new Error(`User id ${req.params._id} not found`)

//     if ((req.body.password).localeCompare('') !== 0) {
//         let newPassword = req.body.password
//         console.log('Inside Update Password Hash')
//         console.log("before save operation  " + newPassword);
//         const salt = await bcrypt.genSalt(10);
//         newPassword = await bcrypt.hash(newPassword, salt);
//        console.log("after save method  ", newPassword);
//         req.body.password = newPassword
//         users = await Users.findByIdAndUpdate({ _id: req.params._id }, {
//             password: req.body.password
//         }, {
//             new: true,
//             runValidators: true
//         })

//         if (!users) throw new Error(`Password not updated ${req.params._id} not found`)
//        // console.log("Updated: " + users);

//     }
//     res.json({ success: true, data: [users] });
//     // res.send('Update')
// })
const updateUserDetails = asyncHandler(async (req, res, next) => {
    const users = await Users.findOne({_id:req.params._id});

        users.email= req.body.email;
        users.name= req.body.name;
        users.phone= req.body.phone;
        users.password=req.body.password;
        await users.save().then(saved=>{
            if(saved===users)
            {
                res.json({ success: true, data: [users] });
            }
            else
            {
                res.json({ success: false, "message":"details not updated" });
            }
        });
        
});
const addUser = asyncHandler(async (req, res, next) => {
    //Operatons on model

    let user = await Users.create(req.body);
    console.log(user);
    if(!user) res.json({ success: false, message:"user is not added" });
    else res.status(201).json({ success: true, data: user,message:"user is added successfully" });
})

const deleteUsersByEmail = asyncHandler(async (req, res, next) => {
    let userDel = await Users.findOneAndDelete({ email: req.params.email })
    console.log(userDel)
    if (!userDel) throw new Error(`Email ID(${req.params.email}) is not found`)
    res.status(201).json({ success: true, data: userDel })

})

module.exports = { blockUser, adminSignin, fetchAllUsers, updateUserDetails, addUser, deleteUsersByEmail };