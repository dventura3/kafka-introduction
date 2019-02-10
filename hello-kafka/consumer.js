const config = require('./config');
const kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: config.broker}),
    consumer = new Consumer(
        client,
        [{ topic: config.topic.name, offset: config.topic.offset, partition: config.topic.partition}],
        { groupId: config.consumer.groupID, autoCommit: false, fromOffset: true }
    );


consumer.on('message', (message) => {
    console.log(message);
});

consumer.on('error', (err) => {
    console.log('Error:', err);
})

consumer.on('offsetOutOfRange', (err) => {
    console.log('offsetOutOfRange:', err);
})