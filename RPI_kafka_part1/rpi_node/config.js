'use strict';

module.exports = {
	broker: 'localhost:9092',
	topic: {
		name: 'colorSensor',
		partition: 0,
		offset: 0
	},
	consumer: {
		groupID: 'group-0'
	}
}