const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const port = 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'timssupersecretawesomekeyisalmostasawesomeasheis',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

require('./app/config/mongoose');
require('./app/config/routes')(app);

server.listen(port, function(){
    console.log("Server running on port " + port + ".");
});