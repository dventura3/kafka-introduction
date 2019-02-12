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
	}
}