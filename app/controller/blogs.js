const Blog = require('./../models/blog');

module.exports = {
    getBlogs:
        (req, res) => {
            Blog.find({}, (err, blogs) => {
                if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    return res.json({message: "Success", data: blogs});
                }
            });
        },
    getBlogById:
        (req, res) => {
            Blog.findOne({_id: req.params.id}, (err, blog) => {
                if(!blog){
                    return res.json({message: "Error", error: "This blog isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    return res.json({message: "Success", data: blog});
                }
            });
        },
    createBlog:
        (req, res) => {
            var newBlog = new Blog();
            newBlog.title = req.body.blogTitle;
            newBlog.body = req.body.blogBody;
            newBlog.metaDescription = req.body.blogDescription;
            newBlog.metaKeywords = req.body.blogKeywords;
            newBlog.featuredImage = req.body.blogFeaturedImage;
            newBlog.ogTitle = req.body.blogOgTitle;
            newBlog.ogDescription = req.body.blogOgDescription;
            newBlog.ogImage = req.body.blogOgImage;
            newBlog.save(err => {
                if(err){
                    // TODO - Add correct redirect route
                    return res.redirect('/');
                }else{
                    // TODO - Add correct redirect route
                    return res.redirect('/');
                }
            });
        },
    updateBlog:
        (req, res) => {
            Blog.findOne({_id: req.params.id}, (err, blog) => {
                if(!blog){
                    return res.json({message: "Error", error: "This blog isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    Blog.update(blog, req.body, (err, updatedBlog) => {
                        if(err){
                            return res.json({message: "Error", error: err});
                        }else{
                            return res.json({message: "Success", data: updatedBlog});
                        }
                    });
                }
            });
        },
    destroyBlog:
        (req, res) => {
            console.log('delete blog');
            Blog.findOne({_id: req.params.id}, (err, blog) => {
                if(!blog){
                    return res.json({message: "Error", error: "This blog isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    Blog.remove(blog, (err) => {
                        if(err){
                            return res.json({message: "Error", error: err});
                        }else{
                            return res.json({message: "Success"})
                        }
                    });
                }
            });
        }
}