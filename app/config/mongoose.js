const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/confronting_debt');
require('./../models/user');
require('./../models/content');