const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AddressSchema = require('./addresses');

const schema = mongoose.Schema;

const UsersSchema = new schema({
    name: {
        type: String,
        unique: false,
        lowercase: true,
        trim: true,
        required: [true, 'Please provide a Name'],
        match: [/[a-zA-Z]{4,}/, 'Please provide a valid Name'],
        index: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide a Email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid Email Address'],
        index: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a Password'],
        match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addresses: {
        type: [AddressSchema]
    },
    phone: {
        type: Number,
        max: 9999999999,
        min: 1000000000,
        unique: true,
        required: [true, 'Please provide a Contact Number']
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
});
UsersSchema.index({name: 'text', email: 'text'});
UsersSchema.methods.generateToken = async function () {
    let token = await jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isBlocked: this.isBlocked }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
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
    const user = this
})

const Users = new mongoose.model('user', UsersSchema);
module.exports = Users;