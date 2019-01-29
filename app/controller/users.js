const mongoose = require('mongoose');
const User = require('./../models/user');
var bcrypt = require('bcryptjs');
const flash = require('express-flash');

module.exports = {
    getUsers:
        (req, res) => {
            User.find({}, (err, users) => {
                if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    return res.json({message: "Success", data: users});
                }
            });
        },
    getUserById:
        (req, res) => {
            User.findOne({_id: req.params.id}, (err, user) => {
                if(!user){
                    return res.json({message: "Error", error: "This user isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    return res.json({message: "Success", data: user});
                }
            });
        },
     createUser:
        (req, res) => {
            if(req.session.user_id){
                req.flash("error", "Please log out before creating a new account.");
                return res.redirect('/');
            }
            User.findOne({email: req.body.email}, (err, user) => {
                if(user){
                    req.flash("error", "Email already exists. Please log in.");
                    return res.redirect('/');
                }
                var newUser = new User();
                const emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if(!emailRegEx.test(req.body.email)){
                    req.flash('error', 'The email you entered is not the correct format.');
                    return res.redirect('/');
                }
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if(err){
                            return res.redirect('/');
                        }else{
                            // TODO - Security: Need to add logic to prevent database injection
                            newUser.email = req.body.email;
                            newUser.fname = req.body.fname;
                            newUser.lname = req.body.lname;
                            newUser.password = hash;
                            newUser.save(err => {
                                if(err){
                                    return res.redirect('/');
                                }else{
                                    req.session.user_id = newUser._id;
                                    return res.redirect('/');
                                }
                            });
                        }
                    });
                });

            });
        },
    updateUser:
        (req, res) => {
            User.findOne({_id: req.params.id}, (err, user) => {
                if(!user){
                    return res.json({message: "Error", error: "This user isn't in the database"});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    User.update(user, req.body, (err, updatedUser) => {
                        if(err){
                            return res.json({message: "Error", error: err});
                        }else{
                            return res.json({message: "Success", data: updatedUser});
                        }
                    });
                }
            });
        },
    destroyUser:
        (req, res) => {
            User.findOne({_id: req.params.id}, (err, user)=>{
                if(!user){
                    return res.json({message: "Error", error: "This user isn't in the database"});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    User.remove(user, (err) => {
                        if(err){
                            return res.json({message: "Error", error: err});
                        }else{
                            return res.json({message: "Success"});
                        }
                    });
                }
            });
        },
}