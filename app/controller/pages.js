const mongoose = require('mongoose');
const User = mongoose.model('users');
const Content = mongoose.model('contents');
const Blog = mongoose.model('blogs');

function findBlogs(context, req, res){
    Blog.find({}, (err, blogs) => {
        if(blogs){
            context.blogs = blogs;
            return res.render("public/index", context);
        }else{
            context.blogs = {};
            return res.render("public/index", context);
        }
    });
}

function findContents(context, req, res){
    Content.find({}, (err, contents) => {
        if(contents){
            context.contents = contents;
            findBlogs(context, req, res);
        }else{
            context.contents = {};
            findBlogs(context, req, res);
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