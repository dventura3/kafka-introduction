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
    run();
});


producer.on('error', (err) => {
    console.log('Producer is in error state');
    console.log(err);
});


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function publishColor(topic, color, partition){
    payloads = [{
        topic: topic,
        messages: color,
        partition: partition
    }];
    producer.send(payloads, (err, data) => {
        if (!err)
            console.log(data);
        else
            console.err(err);
    });    
};


async function run () {
    const topic = config.topic.name;
    const partition = config.topic.partition;
    while(true){ // to delete - I should send data everytime you get a new MQTT data (or each 10 samples)
        await timeout(5000);
        // Read MQTT data
        // TODO
        // Process color data
        let color = getRandomColor();
        // Send it to Kafka topic "colorSensor"
        publishColor(topic, color, partition);
    }
}

//********************** To delete **********************//

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

