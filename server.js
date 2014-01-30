model = require('./models');
databaseUrl = "mean:123456@troup.mongohq.com:10087/MEAN_stack";
collections = ["users"];
db = require("mongojs").connect(databaseUrl, collections);

var express = require('express'),
    http = require('http'),
    users = require('./api_routes/users');
    // events = require('./api_routes/events');
    
var app = express();

var appHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, api_token, user_token');
    res.header('X-Powered-By', 'MEAN');
    res.setHeader("Cache-Control", "public, max-age=345600"); // 4 days
    res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString());
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(appHeaders);
    app.use('/css', express.static(__dirname + '/www/css'));
    app.use('/img', express.static(__dirname + '/www/img'));
    app.use('/js', express.static(__dirname + '/www/js'));
    app.use('/src', express.static(__dirname + '/src'));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.set('views', __dirname + '/www');
    app.engine('html', require('ejs').renderFile);
});

app.get('/', function (req, res) {
    res.render('index.html');
});

// API routing starts here
app.post('/api/users/create/', users.create);
app.post('/api/users/log_in/', users.login);
app.get('/api/users/get_user/:user_id', users.getUser);

// Handle other routing.
app.get('/*', function (req, res) {
    res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});