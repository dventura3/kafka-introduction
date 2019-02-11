'use strict';

module.exports = {
	broker: 'localhost:9092',
	topic: {
		name: 'posts',
		partition: 0,
		offset: 0
	},
	consumer: {
		groupID: 'group-0'
	}
}