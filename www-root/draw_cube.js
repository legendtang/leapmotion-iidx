var container, stats;

var camera, renderer;

var cube, back_cube, plane;

var cubeDropNull = {
	drop_cube: {
		position: {
			x: null,
			y: null
		}
	}
};
var drop_list = [];

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
// drop_rotation();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'Please do not hint the panel hard';
	container.appendChild( info );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 100;
	camera.position.z = 500;

	

	//Drop Cube
	// var drop_geometry = new THREE.BoxGeometry( 78, 16, 16 );
	// drop_cube = Array(5);
	// var drop_material = Array(5);
	// var green_material = new THREE.MeshBasicMaterial({color: 0xADFF2F});
	// var yellow_material = new THREE.MeshBasicMaterial({color: 0xB8860B});
	// for (var j=0;j<5;j++)
	// {
	// 	if (j%2==0)
	// 	{
	// 		drop_material = green_material;
	// 	}
	// 	else
	// 	{
	// 		drop_material =  yellow_material;
	// 	}
	// 	drop_cube[j] = new THREE.Mesh(drop_geometry, drop_material);
	// 	drop_cube[j].position.x = back_cube.position.x - 400 / 2.5+400 / 5 * j + 1;
	// 	drop_cube[j].position.y = back_cube.position.y + 400;
	// 	scene.add(drop_cube[j]);
	// }

	// Plane

	// var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
	// geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	// var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0 } );

	// plane = new THREE.Mesh( geometry, material );
	// scene.add( plane );

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	// document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	// document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	// document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

// function  (argument) {
// 	// body...
// }

// function judgeTip (ID, status) {

// 	var judge_geometry = new THREE.BoxGeometry( 78, 19, 16 );


// 	var judge_cube;
// 	var yellow_material = new THREE.MeshBasicMaterial({color: 0xFFCC00});
// 	var blue_material = new THREE.MeshBasicMaterial({color: 0x0000FF});	
// 	if (status) {
// 		var judge_material =  yellow_material;
// 	}else {
// 		var judge_material =  blue_material;
// 	}

// 	judge_cube = new THREE.Mesh(judge_geometry, judge_material);
// 	judge_cube.position.x = (ID + 1) * 76 - 3 * 76;
// 	judge_cube.position.y = -100;
// 	scene.add(judge_cube);
// 	// setTimeout(function () {
// 	// 	judge_material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
// 	// },500);
// }

function CubeDrop(dropID, cubeDrop, bpm)
{
	this.dropID = dropID;
	this.bpm = bpm;
	this.bpm = 0;
	if (this.dropID >= 5) {
		return;
	};
	var drop_geometry = new THREE.BoxGeometry( 76, 16, 1 );

	var drop_material;
	var green_material = new THREE.MeshBasicMaterial({color: 0xADFF2F});
	var yellow_material = new THREE.MeshBasicMaterial({color: 0xB8860B});
	if (dropID % 2 == 0)
	{
		drop_material = green_material;
	}
	else
	{
		drop_material =  yellow_material;
	}
	this.drop_cube = new THREE.Mesh(drop_geometry, drop_material);
	if(cubeDrop.drop_cube.position.x != null){
		this.drop_cube.position.x = cubeDrop.drop_cube.position.x;
		this.drop_cube.position.y = cubeDrop.drop_cube.position.y - 5;
	}else{
		this.drop_cube.position.x = -(2 * 76 + 76) + (this.dropID + 1) * 76;
		this.drop_cube.position.y = 400;
	}
	//this.drop_cube.position.y = 0 + 400;

	// window.requestAnimationFrame(drop_rotation);
	// drop_cube[ dropID ].rotation.x += 0.1;
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;	
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

// //

// function onDocumentMouseDown( event ) {

// 	event.preventDefault();

// 	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
// 	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

// 	mouseXOnMouseDown = event.clientX - windowHalfX;
// 	targetRotationOnMouseDown = targetRotation;

// }

// function onDocumentMouseMove( event ) {

// 	mouseX = event.clientX - windowHalfX;

// 	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

// }

// function onDocumentMouseUp( event ) {

// 	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
// 	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

// }

// function onDocumentMouseOut( event ) {

// 	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
// 	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

// }

// function onDocumentTouchStart( event ) {

// 	if ( event.touches.length === 1 ) {

// 		event.preventDefault();

// 		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
// 		targetRotationOnMouseDown = targetRotation;

// 	}

// }

// function onDocumentTouchMove( event ) {

// 	if ( event.touches.length === 1 ) {

// 		event.preventDefault();

// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
// 		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

// 	}

// }

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	var scene = new THREE.Scene();
	// Cube

	var geometry = new THREE.BoxGeometry( 400, 600, 1 );

	for ( var i = 0; i < geometry.faces.length; i += 2 ) {

		var hex = 0x999999;
		geometry.faces[ i ].color.setHex( hex );
		geometry.faces[ i + 1 ].color.setHex( hex );

	}

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

	cube = new THREE.Mesh( geometry, material );
	cube.position.y = 100;
	scene.add( cube );

	// Back Cube

	var geometry = new THREE.BoxGeometry( 380, 20, 1 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	var back_cube = new THREE.Mesh( geometry, material );
	
	back_cube.position.y = -100;
	back_cube.position.x = 0;
	scene.add( back_cube );

	// plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;	
	for(var i in drop_list){
		if (drop_list[i].drop_cube.position.y < -100) {
			drop_list.splice(i, 1);
		}else{
			drop_list[i] = new CubeDrop(drop_list[i].dropID, drop_list[i], null)
			scene.add(drop_list[i].drop_cube);
		}
	}
	

	renderer.render( scene, camera );
	// delete scene;
}

function add_drop(dropID, dropList){
	dropList.push(new CubeDrop(dropID, cubeDropNull, null));
}

var y = 0;
getTxt(function(textArraySplit){
	console.log(textArraySplit);
	setInterval(function(){
		textArraySplit.forEach(function(item){
			if(item[0] == y){
				console.log(item);
				add_drop(item[1] - 1, drop_list);
			}
		});
		y += 100;
	}, 100);
});