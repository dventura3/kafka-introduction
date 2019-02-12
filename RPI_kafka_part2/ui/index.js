var app = require('express')();
var http = require('http').Server(app);
// Initialize a new instance of socket.io by passing the http (the HTTP server) object
var io = require('socket.io')(http);

const config = require('./config');
const kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: config.broker});

// Read latest offset
let latestOffset = config.topic.offset;
/*
let offset = new kafka.Offset(client);
offset.fetch([{ topic: config.topic.name, partition: config.topic.partition, time: -1 }], (err, data) => {
    latestOffset = data[config.topic.name]['0'][0];
});
*/

console.log("Consumer current offset: " + latestOffset);

const consumer = new Consumer(
        client,
        [{ topic: config.topic.name, offset: latestOffset, partition: config.topic.partition}],
        { groupId: config.consumer.groupID, autoCommit: false, fromOffset: true }
    );


// Utils
function changeBackgroundColor(color) {
	// broadcast to everyone connected to the socket
	io.emit('color', color);
}

// Kafka
consumer.on('message', (message) => {
    //console.log(JSON.stringify(message));
    let msg = JSON.parse(message.value);
    changeBackgroundColor(msg.payload.value);
});

consumer.on('error', (err) => {
    console.log('Error:', err);
})

consumer.on('offsetOutOfRange', (err) => {
    console.log('offsetOutOfRange:', err);
})


// Socket.io
io.on('connection', (socket) => {
	console.log('a user connected');

	// When a client close the web page, it fires a 'disconnect' event
	socket.on('disconnect', function(){
    	console.log('user disconnected');
	});
});


// Express 
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
