// Reference for kafka-node:
// https://www.npmjs.com/package/kafka-node

const config = require('./config');
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
let app = express();


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: config.broker}),
    producer = new Producer(client);


producer.on('ready', () => {
    console.log('Producer is ready');
});


producer.on('error', (err) => {
    console.log('Producer is in error state');
    console.log(err);
})


app.get('/', (req, res) => {
    res.json({greeting:'Kafka Producer'})
});

/*
{
	"topic": "posts",
	"messages": ["Hello from Kafka", "Best tutorial ever"],
    "partition": 2
}
*/
app.post('/publish', (req, res) => {
    payloads = [{
        topic: (req.body.hasOwnProperty('topic')) ? req.body.topic : config.topic.name,
        messages: req.body.messages,
        partition: (req.body.hasOwnProperty('partition')) ? req.body.partition : config.topic.partition
    }];
    producer.send(payloads, (err, data) => {
        if (!err)
            res.json(data);
        else
            res.status(500).send({error: err, message: 'Kafka producer failed to send messages to kafka broker'});
    });    
})


app.listen(5001,function(){
    console.log('Kafka producer running at 5001')
})