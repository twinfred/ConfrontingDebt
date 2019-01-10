const pageController = require('../controller/pages');
const userController = require('../controller/users');

module.exports = function(app){
    // Pages
    app.get('/', pageController.index);
    // User API
    app.get('/api/users', userController.getUsers);
    app.get('/api/users/id/:id', userController.getUserById);
    app.post('/api/users', userController.createUser);
    app.put('/api/users/:id', userController.updateUser);
    app.delete('/api/users/:id', userController.destroyUser);
}