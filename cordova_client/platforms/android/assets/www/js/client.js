/*
 * Main cordova app client js file.
 */
//var ip = '192.168.1.100';
var ip = '10.0.0.6';
var port = '2301';

var DP_SocketioChat = function () {
    
    $('#test4').text('class loaded');
    // get socket manipulation object
    this.socket = null;
    
    this.name = 'client' + Math.ceil(Math.random()*100);
    
    this.counter = 0;
    
//    this.init();
    this.loadSocketio(this.init.bind(this));
};



DP_SocketioChat.prototype.loadSocketio = function (callback) {
    
    $('#test4').text('class loaded - loadSocketio');
    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
//    script.src = 'http://192.168.1.100:2301/socket.io/socket.io.js';
    script.src = 'lib/socket.io.js';
//    script.src = 'lib/jquery-1.10.2.js';
//    script.onload = function () {$('#test5').text('script socket.io.js loaded dynamically from lib/')};
    script.onload = callback;
    head.appendChild(script);
    
    $('#test4').text('class loaded - loadSocketio end');
};

DP_SocketioChat.prototype.init = function () {
    
    $('#test5').text('socketio loaded');
    
    this.socket = io.connect('http://' + ip + ':' + port);
    
    this.socket.on('error', function (e) {
        
        $('#test7').text('error during io.connect');
        $('#test8').text(e);
        $('#test9').text('____');
        
    });
    
    $('#test6').text('io.connect done');
    
    this.registerEvents();
    
};


DP_SocketioChat.prototype.registerEvents = function () {


    var this2 = this;

    this.socket.on('init', function (messages) {
        $('#test7').text('showing all messages');
        this2.showAllMessages(messages);
    });
    
    this.socket.on('msg', function (newMsg) {
        this2.prependMsg(newMsg);
    });

    $('#sendMsg').on('click', function (e) {
        this2.sendMsg();
    });
};


DP_SocketioChat.prototype.sendMsg = function () {
    
    var msgTextarea = $('#msgTextarea');
    var newMsg = {};
    newMsg[this.name] = msgTextarea.val() || 'message' + this.counter++;
    // send to server (server will broadcast this new msg)
    this.socket.emit('msg', newMsg);
    // show in this client
    this.prependMsg(newMsg);
    // empty msgTextarea
    msgTextarea.val('');
};

DP_SocketioChat.prototype.showAllMessages = function (messages) {
    
    for(var i=0; i<messages.length; i++) {
        this.prependMsg(messages[i]);
    }
};

DP_SocketioChat.prototype.prependMsg = function (newMsg) {
    
    // get the only property
    var clientName = Object.keys(newMsg)[0];
    // build and prepend message in html
    var html = '<div class="msg"><h2>';
    html += clientName;
    html += ' wrote:</h2><p>'
    html += newMsg[clientName];
    html += '</p></div>'
    $('#messagesLog').prepend(html);
};















