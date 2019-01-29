const Content = require('./../models/content');

module.exports = {
    getContents:
        (req, res) => {
            Content.find({}, (err, contents) => {
                if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    return res.json({message: "Success", data: contents});
                }
            });
        },
    getContentById:
        (req, res) => {
            Content.findOne({_id: req.params.id}, (err, content) => {
                if(!content){
                    return res.json({message: "Error", error: "This content isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    return res.json({message: "Success", data: content});
                }
            });
        },
    createContent:
        (req, res) => {
            var newContent = new Content();
            newContent.name = req.body.name;
            newContent.content = req.body.content;
            newContent.save(err => {
                if(err){
                    // TODO - Add correct redirect route
                    return res.redirect('/');
                }else{
                    // TODO - Add correct redirect route
                    return res.redirect('/');
                }
            });
        },
    updateContent:
        (req, res) => {
            Content.findOne({_id: req.params.id}, (err, content) => {
                if(!content){
                    return res.json({message: "Error", error: "This content isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    Content.update(content, req.body, (err, updatedContent) => {
                        if(err){
                            return res.json({message: "Error", error: err});
                        }else{
                            return res.json({message: "Success", data: updatedContent});
                        }
                    });
                }
            });
        },
    destroyContent:
        (req, res) => {
            Content.findOne({_id: req.params.id}, (err, content) => {
                if(!content){
                    return res.json({message: "Error", error: "This content isn't in the database."});
                }else if(err){
                    return res.json({message: "Error", error: err});
                }else{
                    Content.remove(content, (err) => {
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