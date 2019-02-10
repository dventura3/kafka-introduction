const mqtt = require('mqtt');
const client  = mqtt.connect([{ host: 'localhost', port: 1883 }]);
 
client.on('connect', () => {
  client.subscribe('color-sensor-topic', function (err) {
    if (!err) {
      console.log('Subscription to color-sensor-topic on port 1883');
    }
  });
});
 
client.on('message', (topic, message) => {
  // message is Buffer
  console.log(message.toString())
  client.end()
});
