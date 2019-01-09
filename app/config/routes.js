const controller = require('../controller/pages');

module.exports = function(app){
    app.get('/', controller.index);
}