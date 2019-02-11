'use strict';

exports.extractRGBcomponents = function(payload) {
	var colorPayload = parseInt(payload.Data.Color);
	var color = {red:0, green:0, blue:0};
	 
	// Extracting RGB components
	color.blue = (colorPayload&0xFF);
	color.green = ((colorPayload>>8)&0xFF);
	color.red = ((colorPayload>>16)&0xFF);

	console.log("------------------------");
	console.log("number " + colorPayload);
	console.log("red " + color.red);
	console.log("green " + color.green);
	console.log("blue " + color.blue);
	console.log("------------------------");

	return color;
}


exports.isSameColor = function(currentColor, prevColor) {
	var deviation = {red:8, green:8, blue:8};
	var result = false;

    if (Math.abs(currentColor.red - prevColor.red) <= deviation.red){
        result = true;
    } else if (Math.abs(currentColor.green - prevColor.green) <= deviation.green){
        result = result & true;
    } else if (Math.abs(currentColor.blue - prevColor.blue) <= deviation.blue){
        result = result & true;
    }
    
    console.log("isSameColor is:", result);
    return result;
}

 
/*
var changed;
 
changed = context.get('marsChanged');
 
console.log("Variable changed:", changed);
 
 
    switch (true) {
        case (isSameColor(color, {red:90, green:25, blue:30})): 
            if (changed) {
            msg= {"midi":{"raw":[176,1,127],"deltaTime":0,"channel":1,"type":"controlchange","data":[1,127]},"payload":[1,127],"topic":"nanoKONTROL Studio CTRL","_msgid":"1caf24e9.3f202b"};
            changed = false;
            context.set('marsChanged',changed);
            }
        console.log("Variable changed:", changed);
        break;
        default:
         changed = true;
//         msg= {"midi":{"raw":[176,0,127],"deltaTime":0,"channel":1,"type":"controlchange","data":[0,127]},"payload":[0,127],"topic":"nanoKONTROL Studio CTRL","_msgid":"1caf24e9.3f202b"};
         context.set('marsChanged',changed);
         console.log("Variable changed:", changed);
        break;
    }
 
return msg;
*/