const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

module.exports = {
    login:
        (req, res) => {
            User.findOne({email: req.body.email}, (err, user) => {
                if(user){
                    bcrypt.compare(req.body.password, user.password, function(err, isValid){
                        if(isValid){
                            req.session.user_id = user._id;
                        }else{
                            req.flash('error', 'The email or password you entered was incorrect.');
                        }
                        return res.redirect('/');
                    });
                }else{
                    req.flash('error', "The email or password you entered was incorrect.");
                    return res.redirect('/');
                }
            });
        },
    logout:
        (req, res) => {
            if(req.session.user_id){
                req.session.destroy();
            }
            return res.redirect('/');
        }
}