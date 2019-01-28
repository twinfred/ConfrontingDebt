const mongoose = require('mongoose');
const User = require('./../models/user');
var bcrypt = require('bcryptjs');
const flash = require('express-flash');

module.exports = {
    getUsers:
        (req, res) => {
            User.find({}, (err, users) => {
                if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: users});
                }
            });
        },
    getUserById:
    (req, res) => {
        User.findOne({_id: req.params.id}, (err, user) => {
            if(!user){
                res.json({message: "Error", error: "This user isn't in the database."});
            }else if(err){
                res.json({message: "Error", error: err});
            }else{
                res.json({message: "Success", data: user});
            }
        });
    },
     createUser:
        (req, res) => {
            console.log(req.body);
            if(req.session.user_id){
                console.log("Already logged in");
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
                            console.log("--- ALERT: Hash Error ---");
                            console.log(err);
                            return res.redirect('/');
                        }else{
                            // Security: Need to add logic to prevent database injection
                            newUser.email = req.body.email;
                            newUser.fname = req.body.fname;
                            newUser.lname = req.body.lname;
                            newUser.password = hash;
                            newUser.save(err => {
                                if(err){
                                    console.log("--- ALERT: User Save Err ---");
                                    console.log(err);
                                    return res.redirect('/');
                                }else{
                                    console.log("new user created");
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
        (req, res)=>{
            User.findOne({_id: req.params.id}, (err, user)=>{
                if(!user){
                    res.json({message: "Error", error: "This user isn't in the database"});
                }else{
                    User.update(user, req.body, (err, updatedUser)=>{
                        if(err){
                            res.json({message: "Error", error: err})
                        }else{
                            res.json({message: "Success", data: updatedUser});
                        }
                    })
                }
            })
        },
    destroyUser:
        (req, res)=>{
            User.findOne({_id: req.params.id}, (err, user)=>{
                if(!user){
                    res.json({message: "Error", error: "This user isn't in the database"});
                }else{
                    User.remove(user, (err)=>{
                        res.json({message: "Success"});
                    })
                }
            })
        },
}