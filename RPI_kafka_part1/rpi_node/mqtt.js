'use strict';

const config = require('./config');
const colorSensor = require('./colorSensor');
const mqtt = require('mqtt');
const client  = mqtt.connect([{ host: config.mqtt.broker.host, port: config.mqtt.broker.port }]);
 
client.on('connect', () => {
	// send configuration to ESP32
	client.publish(config.mqtt.topics.configuration, JSON.stringify(config.mqtt.configData));

	// subscribe to color sensor events
  	client.subscribe(config.mqtt.topics.colorSensor, function (err) {
	    if (!err) {
	      	console.log('Subscription to esp32/Jupiter/sensors/ColorSensor on port 1883');
	    }
  	});
});
 
client.on('message', (topic, message) => {
	var payload = JSON.parse(message);
  	// message is Buffer
  	//console.log(payload.Data.Color);
  	colorSensor.extractRGBcomponents(payload);
  	//client.end()
});


