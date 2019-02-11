const mqtt = require('mqtt');
const client  = mqtt.connect([{ host: 'localhost', port: 1883 }]);
 
client.on('connect', () => {
	// send configuration to ESP32
	const config = {"sensors":[{"Type":"ColorSensor","IO":{"Pin":"I2C1","ID":"0x73"}}]};
	client.publish('esp32/Jupiter/config', JSON.stringify(config));
	
	// subscribe to color sensor events
  	client.subscribe('esp32/Jupiter/sensors/ColorSensor', function (err) {
	    if (!err) {
	      	console.log('Subscription to esp32/Jupiter/sensors/ColorSensor on port 1883');
	    }
  	});
});
 
client.on('message', (topic, message) => {
  // message is Buffer
  console.log(message.toString())
  //client.end()
});
