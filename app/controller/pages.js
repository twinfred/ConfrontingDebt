const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {
    index: (req, res) => {
        var context = {}
        User.find({}, (err, users) =>{
            console.log(users);
            if(users){
                context.users = users;
                console.log("hii");
                console.log(context);
                res.render("public/index", context);
            }else{
                context.users = {};
                console.log("hello")
                console.log(context);
                res.render("public/index", context);
            }
        })
    },
}