from confluent_kafka import avro
from confluent_kafka.avro import AvroProducer


value_schema_str = """{"type": "record", "name": "myrecord", "fields": [{"name": "id", "type": "int"}, {"name": "created", "type": "string"}, {"name": "product", "type": "string"}, {"name": "price", "type": "double"}]}"""

# key_schema_str = """
# {
#    "namespace": "my.test",
#    "name": "key",
#    "type": "record",
#    "fields" : [
#      {
#        "name" : "name",
#        "type" : "string"
#      }
#    ]
# }
# """

value_schema = avro.loads(value_schema_str)
#key_schema = avro.loads(key_schema_str)
value = {
      "id": 99,
      "created": "2016-05-06 13:55:00",
      "product": "FU-DATAMOUNTAINEER-20150201-100",
      "price": 10000
      }
#key = {"name": "Key"}

avroProducer = AvroProducer({
    'bootstrap.servers': 'localhost',
    'schema.registry.url': 'http://127.0.0.1:8081'
    }, default_value_schema=value_schema)
#    }, default_key_schema=key_schema, default_value_schema=value_schema)

avroProducer.produce(topic='orders-topic', value=value)
avroProducer.flush()