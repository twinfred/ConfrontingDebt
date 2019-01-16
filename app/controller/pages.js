const mongoose = require('mongoose');
const User = mongoose.model('users');
const session = require('express-session');

module.exports = {
    index: (req, res) => {
        var context = {};
        console.log("--- USER ID ---");
        console.log(req.session.user_id);
        User.find({}, (err, users) =>{
            if(users){
                context.users = users;
                res.render("public/index", context);
            }else{
                context.users = {};
                res.render("public/index", context);
            }
        })
    },
}