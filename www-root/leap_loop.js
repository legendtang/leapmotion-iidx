/********************************************************
* This is the actual example part where we call pinchStrength
*****************************************************/
var last_hentai = 'Legend Tang';
var hentai = 'Legend Tang';

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
					last_hentai = hentai;
					hentai = pointable[0];
					$(document).trigger("handTap", [pointable, pointableId % 10]); 
				});
			}
		});
	}
});

$(document).on('handTap', function(event, pointable, finger){
	console.log(pointable.stabilizedTipPosition);
	console.log(finger);
	hentai 
});

controller.connect();


/*********************************************************
* End of the actual example
****************************************************/
