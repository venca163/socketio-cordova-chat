/*
 * Main client js file.
 */
var ip = '10.0.0.6';
var port = '2301';

var DP_SocketioChat = function () {
    
    // get socket manipulation object
    this.socket = io.connect('http://' + ip + ':' + port);
    
    this.name = 'client' + Math.ceil(Math.random()*100);
    
    this.counter = 0;

    this.registerEvents();
};


DP_SocketioChat.prototype.registerEvents = function () {

    var this2 = this;

    this.socket.on('init', function (messages) {
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















