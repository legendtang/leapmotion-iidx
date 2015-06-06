var height = window.innerHeight;
var width = window.innerWidth;
var basicPanelWidth = 600;
var basicPanelLineWidth = 5;
var markerPanelWidth = 540;
var markerPanelTextureRadius = 30;
var markerPanelTextureWidth = markerPanelWidth - 60;
var markerPanelTextureLineWidth = 3;
var healPanelWidth = (basicPanelWidth - markerPanelWidth) / 2;
var buttonPanelHeight = 100;

var tunnelWidth = markerPanelWidth/4-5*3;

var gameRenderer = PIXI.autoDetectRenderer(width, height, {
    backgroundColor: 0xFFFFFF,
    transparent: true,
    view: document.getElementById('game'),
    autoResize: true
});

// create the root of the scene graph
var stage = new PIXI.Container();

// draw main panel, (x, y, width, height)
var basicPanel = new PIXI.Graphics();
//basicPanel background
basicPanel.beginFill(0x000, 0.5);
basicPanel.lineStyle(basicPanelLineWidth, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2, -basicPanelLineWidth, basicPanelWidth, height + basicPanelLineWidth * 2);
basicPanel.endFill();

//markerPanel
basicPanel.beginFill(0x000, 0.7);
basicPanel.lineStyle(1, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2 + healPanelWidth, 0, markerPanelWidth, height);
basicPanel.endFill();

// //markerPanel texture
// basicPanel.beginFill(0xFFF, 0);
// basicPanel.lineStyle(3, 0xEF6868, 1);
// basicPanel.drawRoundedRect((width - markerPanelTextureWidth) / 2, - markerPanelTextureRadius - markerPanelTextureLineWidth, markerPanelTextureWidth, height - buttonPanelHeight, markerPanelTextureRadius);
basicPanel.beginFill(0xFFF, 0);
basicPanel.lineStyle(3, 0xEF6868, 1);
basicPanel.drawPolygon([
    (width - markerPanelTextureWidth) / 2,
    - markerPanelTextureLineWidth,
    (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth,
    - markerPanelTextureLineWidth,
    (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth,
    height - buttonPanelHeight - 50,
    (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 20,
    height - buttonPanelHeight,
    (width - markerPanelTextureWidth) / 2 + 20,
    height - buttonPanelHeight,
    (width - markerPanelTextureWidth) / 2,
    height - buttonPanelHeight - 50
]);
basicPanel.endFill();

//horizontal line
basicPanel.beginFill(0xEF6868, 1);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + 10, height - buttonPanelHeight - 25);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 10, height - buttonPanelHeight - 25);
basicPanel.endFill();

basicPanel.beginFill(0xFFF, 0);
basicPanel.lineStyle(3, 0xEF6868, 1);
basicPanel.drawPolygon([
    (width - markerPanelTextureWidth) / 2,
    height,
    (width - markerPanelTextureWidth) / 2,
    height - 50,
    (width - markerPanelTextureWidth) / 2 + 20,
    height - 50 - 20,
    (width + markerPanelTextureWidth) / 2 - 20,
    height - 50 - 20,
    (width + markerPanelTextureWidth) / 2,
    height - 50,
    (width + markerPanelTextureWidth) / 2,
    height,
]);
basicPanel.endFill();

basicPanel.beginFill(0xEF6868, 1);
for (var i = 1; i <= 3; i++) {
    basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + i * (markerPanelWidth / 4 - 5 * 3), height - 20 - 50);
    basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + i * (markerPanelWidth / 4 - 5 * 3), height);
};
basicPanel.endFill();

//tunnel saperator
basicPanel.beginFill(0xEF6868, 1);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 1,0);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 1,height - buttonPanelHeight - 25);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 2,0);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 2,height - buttonPanelHeight - 25);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 3,0);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 3,height - buttonPanelHeight - 25);
basicPanel.endFill()

stage.addChild(basicPanel);

var bgm = document.getElementById('bgm');

bgm.oncanplay = function() {
    var texture = PIXI.Texture.fromVideo('./beatmaps/26044 Wada Kouji - Butter-Fly (TV Edit)/Digimon Adventure OP.mp4');
    var videoSprite = new PIXI.Sprite(texture);

    videoSprite.width = gameRenderer.width;
    videoSprite.height = gameRenderer.height;

    stage.addChild(videoSprite);
    stage.setChildIndex(videoSprite, 0);
    this.play();
};

// bgm.onended = function() {
//     stage.removeChild(videoSprite);
//     texture.destory();
// };

function point(pointerContainer){
    this.position = [];
    this.container = pointerContainer;
}

point.prototype.setPosition = function(fingerPositionArray){
    // this.oldPosition = [];
    // for(var i in fingerPositionArray){
    //     this.oldPosition[i] = {x: fingerPositionArray[i].x, y: fingerPositionArray[i].y};
    // }
    this.position = fingerPositionArray;
}

point.prototype.draw = function(){
    this.container.clear();
    this.container.lineStyle(2, 0xe0b6b6, 1);
    this.container.beginFill(0xe0b6b6, 0.7);
    for(var i in this.position){
        this.container.drawCircle(this.position[i].x, this.position[i].y, 15);
    }
    this.container.endFill();
}

var pointerContainer = new PIXI.Graphics();
stage.addChild(pointerContainer);
var Pointer = new point(pointerContainer);

// start animating
animateGame();

function animateGame() {
    var pointersArray = [];
    for(var i=1; i<=4; i++){
        pointersArray.push({x: (rightHand.fingers[i].connections[2].position.x * 8 + width / 2) , y: (-rightHand.fingers[i].connections[2].position.y * 25 + 600) });
    }
    Pointer.setPosition(pointersArray);
    // console.log(pointersArray);
    Pointer.draw();

    requestAnimationFrame(animateGame);

    // render the root container
    gameRenderer.render(stage);
}
