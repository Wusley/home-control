#!/bin/env node

/*
* Module dependencies.
*/
var express    = require( 'express' );
var routes     = require( './routes' );
var http       = require( 'http' );
var path       = require( 'path' );
var io         = require( 'socket.io' );

var app = express();

// all environments
app.set( 'port', process.env.OPENSHIFT_NODEJS_PORT || 9011 );

app.set( 'hostname', process.env.OPENSHIFT_NODEJS_IP );

if( app.get( 'hostname' ) === 'undefined' ) {

    app.set( 'hostname', 'localhost' );

}

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( express.favicon( __dirname + '/public/favicon.png') );
app.use( express.logger( 'dev' ) );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( express.cookieParser( 'your secret here' ) );
app.use( express.session() );
app.use( express.compress() );
app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// development only
if( 'development' == app.get( 'env' ) ) {

	app.use( express.errorHandler() );

}

app.get( '/', routes.index );

var server = http.createServer( app );

var io = io.listen( server, { log : true }  );

io.sockets.on( 'connection', function( socket ) {

  socket.on( 'on', function( data ) {

    socket.broadcast.emit( 'on', {} );

  });

  socket.on( 'off', function( data ) {

    socket.broadcast.emit( 'off', {} );

  });

} );

server.listen( app.get( 'port' ), app.get( 'hostname' ), function() {

  console.log( 'Express server listening on port ' + app.get( 'port' ) );

} );