/********************************************************
* This is the actual example part where we call pinchStrength
*****************************************************/

// Set up the controller:
var controller = new Leap.Controller({
	host: '127.0.0.1',
	port: 6437,
	background: true,
	enableGestures: true,
	frameEventName: 'animationFrame',
	useAllPlugins: false
});

controller.on('frame', function(frame){
	//console.log(frame.currentFrameRate);
	if(frame.valid && frame.gestures.length > 0){
		frame.gestures.forEach(function(gesture){
			if(gesture.type == "keyTap"){
				var pointableIds = gesture.pointableIds;
				console.log(gesture);
				pointableIds.forEach(function(pointableId){
					var pointable = frame.pointable(pointableId);
					$(document).trigger("handTap", [pointable.stabilizedTipPosition, pointableId % 10]); 
				});
			}
		});
	}
});

$(document).on('handTap', function(event, xyz, finger){
	console.log(xyz);
	console.log(finger);
});

controller.connect();


/*********************************************************
* End of the actual example
****************************************************/
