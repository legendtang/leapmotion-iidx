var height = window.innerHeight;
var width = window.innerWidth;
var basicPanelWidth = 600;
var basicPanelLineWidth = 3;
var markerPanelWidth = 540;
var markerPanelTextureWidth = markerPanelWidth - 60;
var markerPanelTextureLineWidth = 3;
var healPanelWidth = (basicPanelWidth - markerPanelWidth) / 2;
var buttonPanelHeight = 180;
var buttonPanelMarginTop = 50;
var markerWidth = 120;

var dropInitPosition = -1000 + (height - buttonPanelHeight - 25);

var dropSpeed = 10;

var combo = 0;

var deltaCombo = 0;

var tunnelWidth = markerPanelWidth / 4 - 5 * 3;

var globalMusicOffset = 500;

var currentMap;
var keyMap = [
    {
        keyCode: 68,
        direction: null
    },
    {
        keyCode: 70,
        direction: null
    },
    {
        keyCode: 74,
        direction: null
    },
    {
        keyCode: 75,
        direction: null
    },
];
var oldKeyMap = [
    {
        keyCode: 68,
        direction: null
    },
    {
        keyCode: 70,
        direction: null
    },
    {
        keyCode: 74,
        direction: null
    },
    {
        keyCode: 75,
        direction: null
    },
];

var leapKeyMap = [], oldLeapMap = [];

var gameRenderer = PIXI.autoDetectRenderer(width, height, {
    backgroundColor: 0xFFFFFF,
    transparent: true,
    view: document.getElementById('game'),
    autoResize: true
});

// create the root of the scene graph
var stage = new PIXI.Container();

var ticker = new PIXI.ticker.Ticker();

// draw main panel, (x, y, width, height)
var basicPanel = new PIXI.Graphics();
//basicPanel background
basicPanel.beginFill(0x000, 0.5);
basicPanel.lineStyle(basicPanelLineWidth, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2, -basicPanelLineWidth, basicPanelWidth, height + basicPanelLineWidth * 2);
basicPanel.endFill();

//markerPanel
basicPanel.beginFill(0x000, 1);
basicPanel.lineStyle(1, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2 + healPanelWidth, 0, markerPanelWidth, height);
basicPanel.endFill();

//markerPanel texture
basicPanel.beginFill(0xFFF, 0);
basicPanel.lineStyle(markerPanelTextureLineWidth, 0xEF6868, 1);
basicPanel.drawPolygon([
    (width - markerPanelTextureWidth) / 2, -markerPanelTextureLineWidth, (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth, -markerPanelTextureLineWidth, (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth,
    height - buttonPanelHeight - 50, (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 20,
    height - buttonPanelHeight, (width - markerPanelTextureWidth) / 2 + 20,
    height - buttonPanelHeight, (width - markerPanelTextureWidth) / 2,
    height - buttonPanelHeight - 50
]);
basicPanel.endFill();

basicPanel.beginFill(0xEF6868, 1);
basicPanel.lineStyle(0);
basicPanel.drawPolygon([
    (width - markerPanelTextureWidth) / 2 + 10,
    height - buttonPanelHeight - 25, (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 10,
    height - buttonPanelHeight - 25, (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 20,
    height - buttonPanelHeight, (width - markerPanelTextureWidth) / 2 + 20,
    height - buttonPanelHeight,
]);
basicPanel.endFill();

//horizontal line
// basicPanel.beginFill(0xEF6868, 1);
// basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + 10, height - buttonPanelHeight - 25);
// basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 10, height - buttonPanelHeight - 25);
// basicPanel.endFill();

basicPanel.beginFill(0xEF6868, 1);
basicPanel.lineStyle(0);
basicPanel.drawPolygon([
    (width - markerPanelTextureWidth) / 2, height,
    (width - markerPanelTextureWidth) / 2, height - buttonPanelHeight + buttonPanelMarginTop,
    (width - markerPanelTextureWidth) / 2 + 20, height - buttonPanelHeight + buttonPanelMarginTop - 20,
    (width + markerPanelTextureWidth) / 2 - 20, height - buttonPanelHeight + buttonPanelMarginTop - 20,
    (width + markerPanelTextureWidth) / 2, height - buttonPanelHeight + buttonPanelMarginTop,
    (width + markerPanelTextureWidth) / 2, height
]);
basicPanel.endFill();

basicPanel.beginFill(0xEF6868, 1);
for (var i = 1; i <= 3; i++) {
    basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + i * (markerPanelWidth / 4 - 5 * 3), height - 20 - 50);
    basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + i * (markerPanelWidth / 4 - 5 * 3), height);
};
basicPanel.endFill();

for (var i = 1; i <= 4; i++) {
    basicPanel.beginFill(0x000, 0.7);
    basicPanel.lineStyle(0);
    basicPanel.drawPolygon([
        (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + markerWidth * (i - 1),
        height,

        (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + markerWidth * (i - 1),
        height - buttonPanelHeight + buttonPanelMarginTop + 3,

        (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + 20 + markerWidth * (i - 1),
        height - buttonPanelHeight + buttonPanelMarginTop - 20 + 3,

        (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth - 20 + markerWidth * i,
        height - buttonPanelHeight + buttonPanelMarginTop - 20 + 3,

        (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth + markerWidth * i,
        height - buttonPanelHeight + buttonPanelMarginTop + 3,

        (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth + markerWidth * i,
        height
    ]);
    basicPanel.endFill();
};

//tunnel saperator
basicPanel.beginFill(0xEF6868, 1);
basicPanel.lineStyle(1, 0xEF6868, 1);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 1, 0);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 1, height - buttonPanelHeight - 25);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 2, 0);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 2, height - buttonPanelHeight - 25);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 3, 0);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + tunnelWidth * 3, height - buttonPanelHeight - 25);
basicPanel.endFill();

stage.addChild(basicPanel);

var light = new PIXI.Sprite.fromImage("../images/light.png");
stage.addChild(light);
light.position.x = (width - markerPanelTextureWidth) / 2;
light.position.y = height - buttonPanelHeight - 105;
light.width = 480;

var cover = new PIXI.Graphics();
cover.beginFill(0x000, 1);
cover.lineStyle(0);
cover.drawPolygon([
    (width - basicPanelWidth) / 2 + healPanelWidth,
    0,
    (width - markerPanelWidth) / 2 + healPanelWidth - 1.5,
    0,
    (width - markerPanelWidth) / 2 + healPanelWidth - 1.5,
    height - buttonPanelHeight - 50,
    (width - markerPanelWidth) / 2 + 20 + healPanelWidth - 1.5,
    height - buttonPanelHeight,
    (width - basicPanelWidth) / 2 + healPanelWidth,
    height - buttonPanelHeight
]);
cover.drawPolygon([
    width - ((width - basicPanelWidth) / 2 + healPanelWidth),
    0,
    width - ((width - markerPanelWidth) / 2 + healPanelWidth - 3),
    0,
    width - ((width - markerPanelWidth) / 2 + healPanelWidth - 3),
    height - buttonPanelHeight - 50,
    width - ((width - markerPanelWidth) / 2 + 20 + healPanelWidth - 3),
    height - buttonPanelHeight,
    width - ((width - basicPanelWidth) / 2 + healPanelWidth),
    height - buttonPanelHeight
]);
cover.drawRect((width - markerPanelWidth) / 2 + 20 + healPanelWidth - 1.5, height - buttonPanelHeight, 450, 25)
cover.endFill();
stage.addChild(cover);

var bgm = document.getElementById('bgm');

bgm.oncanplay = function() {
    // var texture = PIXI.Texture.fromVideo('./beatmaps/26044 Wada Kouji - Butter-Fly (TV Edit)/Digimon Adventure OP.mp4');
    // var videoSprite = new PIXI.Sprite(texture);

    var videoSprite = new PIXI.Sprite.fromImage("../beatmaps/120838 Ryu- - We're so Happy/BG.jpg");

    videoSprite.width = gameRenderer.width;
    videoSprite.height = gameRenderer.height;

    stage.addChild(videoSprite);
    stage.setChildIndex(videoSprite, 0);
    ticker.start();
    this.play();
};

$.ajax({
    url: "./beatmaps/json/120838 Ryu- - We're so Happy/Ryu - We're so Happy (Spy) [4K BASIC].osu",
    method: "get",
    dataType: "json",
    success: function(beatmap) {
        // beatmap json is here
        // console.log(beatmap);
        currentMap = beatmap;
        // setTimeout(function () {
        $('audio').attr('src', './beatmaps/120838 Ryu- - We\'re so Happy/Ryu - We\'re so Happy.mp3');
        // }, globalMusicOffset);
    }
})

// bgm.onended = function() {
//     stage.removeChild(videoSprite);
//     texture.destory();
// };

function point(pointerContainer) {
    this.position = [];
    this.container = pointerContainer;
}

point.prototype.setPosition = function(fingerPositionArray) {
    this.position = fingerPositionArray;
    var flag = 0;
    for(var k=0; k<=3; k++){
        for(var i in fingerPositionArray){
            // console.log(fingerPositionArray[i].x + "|" + ((width - markerPanelTextureWidth) / 2 + 120 * k));
            if(fingerPositionArray[i].x > (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + markerWidth * k &&
            fingerPositionArray[i].x < (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth + markerWidth * (k + 1) &&
            fingerPositionArray[i].y > (height - buttonPanelHeight) &&
            fingerPositionArray[i].y < height && oldLeapMap[k] != 'down'){
                oldLeapMap[k] = 'down';
                keyMap[k].direction = 'down';
                flag = 1;
            }
            else if(oldLeapMap[k] != 'up'){
                if(!flag){
                    oldLeapMap[k] = 'up';
                    keyMap[k].direction = 'up';
                }
            }
        }
    }
}

point.prototype.draw = function() {
    this.container.clear();
    this.container.lineStyle(2, 0xe0b6b6, 1);
    this.container.beginFill(0xe0b6b6, 0.7);
    for (var i in this.position) {
        this.container.drawCircle(this.position[i].x, this.position[i].y, 15);
    }
    this.container.endFill();
}

function button(buttonContainer) {
    this.container = buttonContainer;
}

button.prototype.draw = function() {
    for(var i in keyMap){
        switch (keyMap[i].keyCode) {
            case 68:
                index = 1;
                break;
            case 70:
                index = 2;
                break;
            case 74:
                index = 3;
                break;
            case 75:
                index = 4;
                break;
        }
        // console.log(keyMap[i].direction);
        if(keyMap[i].direction == 'down' && oldKeyMap[i].direction != 'down'){
            oldKeyMap[i].direction = 'down';
            this.container.lineStyle(0);
            this.container.beginFill(0xEF6868, 0.3);
            this.container.drawPolygon([
                (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + markerWidth * (index - 1),
                height,

                (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + markerWidth * (index - 1),
                height - buttonPanelHeight + buttonPanelMarginTop + 3,

                (width - markerPanelTextureWidth) / 2 + markerPanelTextureLineWidth + 20 + markerWidth * (index - 1),
                height - buttonPanelHeight + buttonPanelMarginTop - 20 + 3,

                (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth - 20 + markerWidth * index,
                height - buttonPanelHeight + buttonPanelMarginTop - 20 + 3,

                (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth + markerWidth * index,
                height - buttonPanelHeight + buttonPanelMarginTop + 3,

                (width - markerPanelTextureWidth) / 2 - markerPanelTextureLineWidth + markerWidth * index,
                height
            ]);
            this.container.endFill();
        }
        if(keyMap[i].direction == 'up' && oldKeyMap[i].direction != 'up'){
            oldKeyMap[i].direction = null;
            this.container.clear();
            keyMap[i].direction = null;
        }
    }
}

var pointerContainer = new PIXI.Graphics();
stage.addChild(pointerContainer);
var Pointer = new point(pointerContainer);

var buttonContainer = new PIXI.Graphics();
stage.addChild(buttonContainer);
var Button = new button(buttonContainer);

$(document).keydown(function(event) {
    for(var i in keyMap){
        if(keyMap[i].keyCode == event.keyCode){
            keyMap[i].direction = 'down';
        }
    }
    // console.log(keyMap);
});

$(document).keyup(function(event) {
    for(var i in keyMap){
        if(keyMap[i].keyCode == event.keyCode){
            keyMap[i].direction = 'up';
        }
    }
});

// Marker Sprite

// var markerArray = [];

// var totalMarker = 20;

function Marker() {
    var _this = this;
    _this.markerArray = [];

    this.create = function(slot, startTime) {
        if (slot == 64 || slot == 448)
            var marker = new PIXI.Sprite.fromImage("../images/marker0.png");
        else var marker = new PIXI.Sprite.fromImage("../images/marker1.png");
        stage.addChild(marker);

        marker.anchor.x = 0;
        marker.anchor.y = 0;

        marker.used = 0;
        marker.type = parseInt(slot / 120);
        marker.startTime = startTime;

        // marker.width = tunnelWidth;

        marker.position.x = (width - markerPanelTextureWidth) / 2 + marker.type * tunnelWidth;
        marker.position.y = -20;

        stage.addChild(marker);
        stage.swapChildren(marker, cover);

        _this.markerArray.push(marker);
    };

    this.update = function() {
        _this.markerArray.forEach(updateMarker);

        function updateMarker(element, index) {
            element.position.y += 1000 / ticker.FPS;
            if ( Math.abs( ticker.lastTime - globalMusicOffset - element.startTime ) >= 700 && Math.abs( ticker.lastTime - element.startTime ) <= 1400) {
                // console.log(Math.abs( ( height - buttonPanelHeight - 25 - 10 - 37.5 ) - element.position.y) );
                checkKeyDown( element, element.type , false );
            }
            if ( Math.abs( ticker.lastTime - globalMusicOffset - element.startTime ) < 700 ) {

                checkKeyDown( element, element.type , true );
            }


            if (element.position.y >= height - buttonPanelHeight) {
                stage.removeChild(element);
            }

            if (element.position.y >= height - buttonPanelHeight + 50) {
                // stage.removeChild(element);
                if (element.used == 0) {
                    judgementDisplay( false );
                    combo = 0;
                };
                delete marker.markerArray[marker.markerArray.indexOf(element)];
                
            };
        }
    };
};

var marker = new Marker();

function checkKeyDown ( element, type, pos ) {

    if (keyMap[type].direction == 'down') {
        element.used = 1;
        judgementDisplay( pos );
        if( !pos ) {
            stage.removeChild(element);
            delete marker.markerArray[marker.markerArray.indexOf(element)];
        } else deltaCombo ++;
    } else return;

};

function searchObject(hitObjects) {
    for (var i = 0; i < hitObjects.length; i++) {
        for (var j = 0; j < 4; j++) {
            if (i + j < hitObjects.length && ticker !== undefined && Math.abs(ticker.lastTime - ( hitObjects[i + j].startTime) - globalMusicOffset) < (1 / ticker.FPS * 400))
                marker.create(hitObjects[i + j].position[0], hitObjects[i + j].startTime);
        };
    };
};

function judgementDisplay ( status ) {
    if (status) {
        var style = {font:"50px Lucida Console", fill:"red", align: "center", stroke: "#EF6868", strokeThickness: 6};

        var text = new PIXI.Text("GOOD", style);

        // combo++;
    } else {
        var style = {font:"50px Lucida Console", fill:"#666", align: "center", stroke: "white", strokeThickness: 6};

        var text = new PIXI.Text("MISS", style);

        // combo = 0;
    }


    text.anchor.x = 0.5;
    text.anchor.y = 0.5;

    text.position.x = width / 2;
    text.position.y = height - buttonPanelHeight - 50;

    stage.addChild(text);
    setTimeout(function () {
        stage.removeChild(text);
    }, 400);
}

function scoreDisplay ( combo ) {
    if ( combo >= 5) {
        var style = {font:"50px Lucida Console", fill:"#666", align: "center", stroke: "white", strokeThickness: 6};

        var text = new PIXI.Text("COMBO:" + combo, style);

        text.anchor.x = 0.5;
        text.anchor.y = 0.5;

        text.position.x = width / 2;
        text.position.y = 50;

        stage.addChild(text);
        setTimeout(function () {
            stage.removeChild(text);
        }, 400);

    }
}

// start animating
animateGame();

function animateGame() {
    var pointersArray = [];
    for (var i = 1; i <= 2; i++) {
        pointersArray.push({
            x: (leftHand.fingers[i].connections[2].position.x * 8 + width / 2),
            y: (-leftHand.fingers[i].connections[2].position.y * 20 + 600)
        });
        pointersArray.push({
            x: (rightHand.fingers[i].connections[2].position.x * 8 + width / 2),
            y: (-rightHand.fingers[i].connections[2].position.y * 20 + 600)
        });
    }

    Button.draw();

    if (currentMap !== undefined) {
        searchObject(currentMap.hitObjects);
    };

    marker.update();

    scoreDisplay( combo );

    Pointer.setPosition(pointersArray);
    Pointer.draw();

    requestAnimationFrame(animateGame);

    if (ticker !== undefined && ticker.started)
        ticker.update();

    // render the root container
    gameRenderer.render(stage);
}
