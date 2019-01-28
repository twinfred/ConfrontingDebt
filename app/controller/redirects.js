const session = require('express-session');

module.exports = {
    logout:
        (req, res) => {
            if(req.session.user_id){
                req.session.destroy();
            }
            return res.redirect('/');
        }
}