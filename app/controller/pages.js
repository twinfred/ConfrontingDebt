const mongoose = require('mongoose');
const User = mongoose.model('users');
const Content = mongoose.model('contents');

function findContents(context, req, res){
    Content.find({}, (err, contents) => {
        if(contents){
            context.contents = contents;
            return res.render("public/index", context);
        }else{
            content.contents = {};
            return res.render("public/index", context);
        }
    });
}

function findUsers(context, req, res){
    User.find({}, (err, users) => {
        if(users){
            context.users = users;
            findContents(context, req, res);
        }else{
            context.users = {};
            findContents(context, req, res);
        }
    });
}

module.exports = {
    index: (req, res) => {
        var context = {};
        context.user_id = req.session.user_id;
        findUsers(context, req, res);
    },
}