const mongoose = require('mongoose');

// Blog Articles
var blogSchema = new mongoose.Schema({
    title: {type: String, required: [true, "A blog title is required."]},
    body: {type: String, required: [true, "This blog needs body HTML."]},
    metaDescription: {type: String, required: [true, "A meta description is required."]},
    metaKeywords: {type: String, required: [true, "At least one keyword is required."]},
    featuredImage: {type: String, required: [true, "A featured image is required."]},
    ogTitle: {type: String, required: [true, "An og:title is required."]},
    ogDescription: {type: String, required: [true, "An og:description is required."]},
    ogImage: {type: String, required: [true, "An og:image is required."]},
}, {timestamps: true});

module.exports = mongoose.model('blogs', blogSchema);