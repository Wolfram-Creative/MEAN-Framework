var express = require('express'),
    http = require('http'),
    users = require('./api_routes/users'),
    events = require('./api_routes/events');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, api_token, user_token');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(allowCrossDomain);
    app.use('/www', express.static(__dirname + '/www'));
    app.use('/src', express.static(__dirname + '/src'));
    app.use('/vendor', express.static(__dirname + '/vendor'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
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
app.post('/api/users/login/', users.login);
app.get('/api/users/get_user/:user_id', users.getUser);

app.post('/api/events/find_event/', events.findEvent);
app.get('/api/events/get_event/:name', events.getEvent);
// app.get('/api/events/vote_yes/:event_id/:name/:user_id', events.voteYes);
// app.get('/api/events/vote_yes/:event_id/:name/:user_id', events.voteNo);
app.post('/api/events/create', events.createEvent);


// Handle other routing.
app.get('/*', function (req, res) {
    res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});