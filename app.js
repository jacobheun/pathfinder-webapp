/**
 * Setup and run our Express server
 *
 * This server is used during development and is not necessary for production
 * once all static files have been rendered out
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var players = require('./routes/players');
var items = require('./routes/items');
var http = require('http');
var path = require('path');
var writer = require('express-writer');
var stylus = require('stylus');

var app = express();
var server;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.configure('development', function() {

  app.use(express.errorHandler());
  app.use(stylus.middleware({
    src: __dirname + '/resources/',
    dest: __dirname + '/public/',
    debug: true,
    force: true
  }));

  // This must come after the stylus middleware
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(require('connect-livereload')({
    port: 36729
  }));

});

app.configure('dist', function() {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(writer.watch);
});

// Out static site's routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/items/:id', items.item);
app.get('/players', players.index);
app.get('/players/:name', players.player);

server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Node environment is ' + app.get('env'));
});
