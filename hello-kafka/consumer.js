let broker = 'localhost:9092';
let defualtTopic = 'posts';
let defualtOffset = 0;
let defualtPartition = 0;
let groupID = 'group-0';

let kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: broker}),
    consumer = new Consumer(
        client,
        [{ topic: defualtTopic, offset: defualtOffset, partition: defualtPartition}],
        { groupId: groupID, autoCommit: false, fromOffset: true }
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