const mongoose = require('mongoose');

// Text-based content
var contentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "This content needs a name."]},
    content: {type: String, required: [true, "This text field cannot be left blank."]},
}, {timestamps: true});

module.exports = mongoose.model('contents', contentSchema);