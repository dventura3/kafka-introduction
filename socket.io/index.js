var app = require('express')();
var http = require('http').Server(app);
// Initialize a new instance of socket.io by passing the http (the HTTP server) object
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	// When a new 'chat message' is received, show it in the console
	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	
	// When a client close the web page, it fires a 'disconnect' event
	socket.on('disconnect', function(){
    	console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
