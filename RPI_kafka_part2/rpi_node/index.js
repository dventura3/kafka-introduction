'use strict';

const config = require('./config');
const colorSensor = require('./colorSensor');
const mqtt = require('mqtt');
const mqtt_client  = mqtt.connect([{ host: config.mqtt.broker.host, port: config.mqtt.broker.port }]);

const kafka = require('kafka-node');
const Producer = kafka.Producer,
      client = new kafka.KafkaClient({kafkaHost: config.broker}),
      producer = new Producer(client);

let message_template = {"schema":{"type":"struct","fields":[{"type":"string","optional":false,"field":"topic"},{"type":"string","optional":false,"field":"value"},{"type":"int64","optional":false,"field":"offset"},{"type":"int64","optional":false,"field":"partition"},{"type":"int64","optional":false,"field":"highWaterOffset"},{"type":"string","optional":true,"field":"key"}],"optional":false,"name":"sensor.color"},"payload":{"topic":config.topic.name,"value":"#0b0b07","offset":0,"partition":0,"highWaterOffset":526,"key":null}};


mqtt_client.on('connect', () => {
	// send configuration to ESP32
	mqtt_client.publish(config.mqtt.topics.configuration, JSON.stringify(config.mqtt.configData));

	// subscribe to color sensor events
  	mqtt_client.subscribe(config.mqtt.topics.colorSensor, function (err) {
	    if (!err) {
	      	console.log('MQTT Subscription to esp32/Jupiter/sensors/ColorSensor on port 1883');
	    }
  	});
});
 
mqtt_client.on('message', (topic, message) => {
	var payload = JSON.parse(message);
  	// message is Buffer
  	//console.log(payload.Data.Color);
  	let color = colorSensor.extractRGBcomponents(payload);
  	publishColor(config.topic.name, color, config.topic.partition);
  	//client.end()
});


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function publishColor(topic, color, partition){
    let hexColor = rgbToHex(color.red, color.green, color.blue);
    message_template.payload.value = hexColor;
    let payloads = [{
        topic: topic,
        messages: JSON.stringify(message_template),
        partition: partition
    }];
    producer.send(payloads, (err, data) => {
        if (err)
          console.log(err);
        //else
        //  console.log(data);
    });    
};


producer.on('ready', () => {
    console.log('Kafka Producer is ready');
});


producer.on('error', (err) => {
    console.log('Kafka Producer is in error state');
    console.log(err);
});
