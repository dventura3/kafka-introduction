'use strict';

module.exports = {
	broker: '0.0.0.0:9092',
	topic: {
		name: 'color',
		partition: 0,
		offset: 0
	},
	consumer: {
		groupID: 'group-0'
	},
	mqtt: {
		broker : {
			host: 'localhost',
			port: 1883
		},
		topics: {
			configuration: 'esp32/Jupiter/config',
			colorSensor: 'esp32/Jupiter/sensors/ColorSensor'
		},
		configData: {
			"sensors":[
				{
					"Type":"ColorSensor",
					"IO": {"Pin":"I2C1","ID":"0x73"}
				}
			]
		}
	}
}