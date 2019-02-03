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
	
  	kafka.schemas.getById(41).then(schema => {
	  // we got the schema from the registry by the id
	  console.log('***********************');
	  console.log(schema);

	  // Produce a message
	  kafka.send({
	  	topic    : 'orders-topic',
	  	messages : {
	    	"id": 33,
			"created": "2017-05-06 13:55:00",
			"product": "FU-DATAMOUNTAINEER-20150201-100",
			"price": 231000
	  	}
	  }).then(success => {
	  	// Message was sent encoded with Avro Schema
	  	console.log('***********************');
	  	console.log(success);
	  	
	  }, error => {
	  	// Something wrong happen
	  	console.log('***********************');
	  	console.log(error)
	  });

	} , error => {
	  // something wrong happen
	  console.log('Error in fetching scema');
	});
	

/*
  	kafka.schemas.getByName('orders-topic').then(schema => {
	  // we got the schema from the registry by the name
	  console.log('***********************');
	  console.log(schema);

	  // Produce a message
	  kafka.send({
	  	topic    : 'orders-topic',
	  	messages : {
	    	"id": 33,
			"created": "2017-05-06 13:55:00",
			"product": "FU-DATAMOUNTAINEER-20150201-100",
			"price": 231000
	  	}
	  }).then(success => {
	  	// Message was sent encoded with Avro Schema
	  	console.log('***********************');
	  	console.log(success)
	  }, error => {
	  	// Something wrong happen
	  	console.log('***********************');
	  	console.log(error)
	  });

	} , error => {
	  // something wrong happen
	  console.log('Error in fetching scema');
	});
*/
} , error => {
  // something wrong happen
  console.log('Error in init function');
});
