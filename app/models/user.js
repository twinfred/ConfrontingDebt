const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    fname: {type: String, required: [true, "A first name is required to create an account."]},
    lname: {type: String, required: [true, "A last name is required to create an account."]},
    email: {type: String, required: [true, "An email is required to create an account."],},
    password: {type: String, required: [true, "A password is required to create an account."], minlength: [8, "Your password is too short."]},
    user_level: {type: Number},
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);