
var port = process.env.PORT || 2301;

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//var fs = require('fs');

// listening on port ( ! not app.listen(port), does not work for express 3.x)
server.listen(port);



app.get('/', function(req, res) {
    res.send('app ok');
});


app.get('/chat', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/chat2', function (req, res) {
    res.sendfile(__dirname + '/public/index2.html');
});

// serving static files - in public directory
app.configure(function(){
    app.use(express['static'](__dirname + '/public'));
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

var DEBUG = true;
var messages = [];

io.sockets.on('connection', function (socket) {
    
    if (DEBUG) {
        console.log('new connection: ', socket.id);
    }
    // send messages to new client
    socket.emit('init', messages);

    // some client sent message
    socket.on('msg', function (msg) {
        messages.push(msg);
        socket.broadcast.emit('msg', msg);
    });

    
    socket.on('disconnect', function () {
        if (DEBUG) {
            console.log('Disconnected: ', socket.id);
        }
    });
});


//////////////////////////////////////////////////////////////////////////
// custom functions
//var mod2 = require('./helper.js');
//var log = mod2.log; 

console.log('chat server running... port ' + port);
