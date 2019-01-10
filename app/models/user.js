const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    fname: {type: String, required: [true, "A first name is required to create an account."], minlength: [2, "Your first name must be at least 2 characters long."]},
    lname: {type: String, required: [true, "A last name is required to create an account."], minlength: [2, "Your las name must be at least 2 characters long."]},
    email: {type: String, required: [true, "An email is required to create an account."], minlength: [8, "Your email address is too short."]},
    password: {type: String, required: [true, "A password is required to create an account."], minlength: [8, "Your password is too short."]},
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);