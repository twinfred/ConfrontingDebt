const pageController = require('../controller/pages');
const redirectController = require('../controller/redirects');
const userController = require('../controller/users');
const contentController = require('../controller/contents');
const blogController = require('../controller/blogs');

module.exports = function(app){
    // Pages
    app.get('/', pageController.index);
    // Redirect Routes
    app.get('/logout', redirectController.logout);
    // User API
    app.get('/api/users', userController.getUsers);
    app.get('/api/users/:id', userController.getUserById);
    app.post('/api/users', userController.createUser);
    app.put('/api/users/:id', userController.updateUser);
    app.delete('/api/users/:id', userController.destroyUser);
    // Content API
    app.get('/api/contents', contentController.getContents);
    app.get('/api/contents/:id', contentController.getContentById);
    app.post('/api/contents', contentController.createContent);
    app.put('api/contents/:id', contentController.updateContent);
    app.delete('api/contents/:id', contentController.destroyContent);
    // Blog API
    app.get('/api/blogs', blogController.getBlogs);
    app.get('/api/blogs/:id', blogController.getBlogById);
    app.post('/api/blogs', blogController.createBlog);
    app.put('api/blogs/:id', blogController.updateBlog);
    app.delete('api/blogs/:id', blogController.destroyBlog);
}