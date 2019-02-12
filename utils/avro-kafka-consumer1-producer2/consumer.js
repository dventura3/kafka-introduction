const KafkaAvro = require('kafka-node-avro');
const Settings  = {
  "kafka" : {
    "kafkaHost" : "localhost:9092"
  },
  "schema": {
    "registry" : "http://localhost:8081",
    "name"       : "orders-topic",
    "version"    : 1
  }
};

KafkaAvro.init(Settings).then(kafka => {
	
	let consumer = kafka.addConsumer("orders-topic", {groupId: 'test'});

/*
  	kafka.schemas.getById(41).then(schema => {
	  // we got the schema from the registry by the id
	  console.log('***********************');
	  console.log(schema);

	  consumer.on('message', message => {
	   // we got a decoded message
	   console.log('&&&&&&&&&&&&&&&&&&&&&&&');
	   console.log(message);
	  });

	} , error => {
	  // something wrong happen
	  console.log('Error in fetching scema');
	});
*/	


  	kafka.schemas.getByName('orders-topic').then(schema => {
	  // we got the schema from the registry by the name
	  console.log('***********************');
	  console.log(schema);

	  consumer.on('message', message => {
	   // we got a decoded message
	   console.log('&&&&&&&&&&&&&&&&&&&&&&&');
	   console.log(message);
	  });

	} , error => {
	  // something wrong happen
	  console.log('Error in fetching scema');
	});

} , error => {
  // something wrong happen
  console.log('Error in init function');
});