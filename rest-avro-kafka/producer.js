var KafkaRest = require('kafka-rest');
var kafka = new KafkaRest({ 'url': 'http://localhost:8082' });

/*
All types have both collection (Topics) and singular (Topic) types corresponding to
the /topics and /topics/<topic> API endpoints.
The complete version makes the resource hierarchy clear
>> kafka.topics.topic('test').partitions.partition(0);
*/



var send = function(partition_number){
	return new Promise((resolve, reject) => {
        //setTimeout(resolve, ms)
        kafka.topic('test3').partition(0).produce(['event1', 'event2'], (err, response) => {
        	console.log('***********************');
		   	console.log(err); 
		   	console.log(response);
		   	console.log('***********************');
		   	if(err){
		   		reject(err);
		   	}
		   	resolve(response);
		  }
		);

    })
}

var sleep = async function(ms){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

async function main(){
	let i = 0;
	while(true){
		console.log(i);
		await send(i);
		await sleep(1000);
		i++;
	}
}

main();