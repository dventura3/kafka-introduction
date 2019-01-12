# kafka-introduction
Some samples to show Kafka in action

To run nultiple kafka broker instances, you need to make some changes to the server.properties file.
We can create multiple Kafka brokers simply by copying the server.properties file and making a few modifications to the values in the following fields, which must be unique to each broker:
- broker.id
- listeners: The first broker was started at localhost:9092.
- log.dirs: The physical location where each broker will store its messages.

>> Cli Commands

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
