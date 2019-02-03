# kafka-introduction
Some samples to show Kafka in action

To run nultiple kafka broker instances, you need to make some changes to the server.properties file.
We can create multiple Kafka brokers simply by copying the server.properties file and making a few modifications to the values in the following fields, which must be unique to each broker:
- broker.id
- listeners: The first broker was started at localhost:9092.
- log.dirs: The physical location where each broker will store its messages.

>> Prerequisite

Create MongoDB Database:

$ use kafkaconnect
$ db.dummy.insert({"name":"Kafka Rulz!"})



>> Cli Commands for CONFLUENT to get AVRO running

NB: All the directory are in confluent-5.1.0
It is possible to set the CONFLUENT_HOME path:
export CONFLUENT_HOME=/Users/Daniela/Desktop/Documenti_Accenture/progetto_Kafka/confluent-5.1.0


- Run Zookeper

./bin/zookeeper-server-start etc/kafka/zookeeper.properties

- Run Kafka Broker

./bin/kafka-server-start  etc/kafka/server.properties

- Run the Schema Registry (AVRO)

./bin/schema-registry-start etc/schema-registry/schema-registry.properties

- Run Kafka REST (It allows to send HTTP requests to a Kafka Topic in order to publish or get data from the topic)

./bin/kafka-rest-start etc/kafka-rest/kafka-rest.properties

- Download the kafka-connect-mongodb in CONFLUENT web page (https://www.confluent.io/connector/kafka-connect-mongodb-sink/) and then you need to setup the CLASSPATH variable:

 export CLASSPATH=/Users/Daniela/Desktop/Documenti_Accenture/progetto_Kafka/hpgrahsl-kafka-connect-mongodb-1.2.0/lib/*

- Run the MongoDB connector in the MONGDB-CONNECTOR folder:

./bin/connect-standalone ./etc/schema-registry/connect-avro-standalone.properties ./etc/MongoDbSinkConnector.properties

- Run Avro Producer

bin/kafka-avro-console-producer \
 --broker-list localhost:9092 --topic orders-topic \
 --property value.schema='{"type":"record","name":"myrecord","fields":[{"name":"id","type":"int"},
{"name":"created", "type": "string"}, {"name":"product", "type": "string"}, {"name":"price", "type": "double"}]}'

then you can insert data, such as:

{"id": 1, "created": "2016-05-06 13:53:00", "product": "OP-DAX-P-20150201-95.7", "price": 94.2}
or
{"id": 2, "created": "2016-05-06 13:54:00", "product": "OP-DAX-C-20150201-100", "price": 99.5}

- Make an HTTP request to the kafka-rest connector:

Endpoint>
@POST
http://localhost:8082/topics/orders-topic

Header>
Content-type: application/vnd.kafka.avro.v2+json
Accept: application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json

Body>

{
	"value_schema": "{\"type\": \"record\", \"name\": \"myrecord\", \"fields\": [{\"name\": \"id\", \"type\": \"int\"}, {\"name\": \"created\", \"type\": \"string\"}, {\"name\": \"product\", \"type\": \"string\"}, {\"name\": \"price\", \"type\": \"double\"}]}",
	"records": [{
		"value": {
			"id": 3,
			"created": "2016-05-06 13:55:00",
			"product": "FU-DATAMOUNTAINEER-20150201-100",
			"price": 10000
		}
	}]
}







>> Cli Commands for Hello World example

- Run Zookeper

sh bin/zookeeper-server-start.sh config/zookeeper.properties 

- Start Kafka Broker

sh bin/kafka-server-start.sh config/server.properties

- Create a Kafka Topic

sh bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic Posts

- Run a Producer

sh bin/kafka-console-producer.sh --broker-list localhost:9092 --topic Posts

- Run a Consumer which will read all the data from the first one added in the topic

bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic Posts --from-beginning

- See available topics

sh bin/kafka-topics.sh --list --zookeeper localhost:2181

- Run a Consumer in a specific consumer group and read only the newer data

sh bin/kafka-console-consumer.sh-bootstrap-server localhost:9092 --topic Posts --group testgroup

- Get information about a specific consumer group

sh bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group testgroup











>> References

- https://www.linkedin.com/pulse/introduction-kafka-using-nodejs-pankaj-panigrahi/
