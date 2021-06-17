const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const schema = mongoose.Schema;

const UsersSchema = new schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        minLength: 4,
        required: [true, 'Please provide a Name'],
        match: [/[a-zA-Z]/, 'Please provide a valid Name']
    },
    email: {
        type: String,
        unique: [true, 'Provide a Unique Email'],
        trim: true,
        required: [true, 'Please provide a Email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid Email Address']
    },
    password: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide a Password'],
        match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Please provide a valid Password'],
        minLength: 5
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        lowercase: true,
        trim: true,
        match: [/[a-zA-Z]/, 'Please provide a valid Role']
    },
    address: {
        type: String
    },
    phonenumber: {
        type: String,
        unique: true,
        required: [true, 'Please provide a Contact Number'],
        match: [/^[0-9]{10}$/, 'Please provide a valid Contact Number']
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: true
    }
});
UsersSchema.methods.generateToken = async function () {
    let token = await jwt.sign({ _id: this._id, role: this.role, status: this.status }, process.env.JWT_SECRET_KEY /*, { expiresIn: '1h' }*/);
    return token;
}

UsersSchema.methods.checkpassword = async function (rawpassword) {
    console.log("Inside a match password");
    return await bcrypt.compare(rawpassword, this.password);
}

UsersSchema.pre('save', async function () {
    console.log(this)
    console.log("before save operation  " + this.password);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("after save method  ", this.password);

})
const Users = new mongoose.model('user', UsersSchema);
module.exports = Users;