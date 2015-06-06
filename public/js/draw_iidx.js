var height = window.innerHeight;
var width = window.innerWidth;
var basicPanelWidth = 500;
var basicPanelLineWidth = 5;
var markerPanelWidth = 440;
var markerPanelTextureRadius = 30;
var markerPanelTextureWidth = markerPanelWidth - 60;
var markerPanelTextureLineWidth = 3;
var healPanelWidth = (basicPanelWidth - markerPanelWidth) / 2;
var buttonPanelHeight = 100;

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
//markerPanel
basicPanel.beginFill(0x000, 0.7);
basicPanel.lineStyle(1, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2 + healPanelWidth, 0, markerPanelWidth, height);
// //markerPanel texture
// basicPanel.beginFill(0xFFF, 0);
// basicPanel.lineStyle(3, 0xEF6868, 1);
// basicPanel.drawRoundedRect((width - markerPanelTextureWidth) / 2, - markerPanelTextureRadius - markerPanelTextureLineWidth, markerPanelTextureWidth, height - buttonPanelHeight, markerPanelTextureRadius);
basicPanel.beginFill(0xFFF, 0);
basicPanel.lineStyle(3, 0xEF6868, 1);
basicPanel.drawPolygon([
    (width - markerPanelTextureWidth) / 2,
    - markerPanelTextureRadius - markerPanelTextureLineWidth,
    (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth,
    - markerPanelTextureRadius - markerPanelTextureLineWidth,
    (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth,
    height - buttonPanelHeight - 50,
    (width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 20,
    height - buttonPanelHeight,
    (width - markerPanelTextureWidth) / 2 + 20,
    height - buttonPanelHeight,
    (width - markerPanelTextureWidth) / 2,
    height - buttonPanelHeight - 50
]);
basicPanel.beginFill(0xEF6868, 1);
basicPanel.moveTo((width - markerPanelTextureWidth) / 2 + 10, height - buttonPanelHeight - 25);
basicPanel.lineTo((width - markerPanelTextureWidth) / 2 + markerPanelTextureWidth - 10, height - buttonPanelHeight - 25);

stage.addChild(basicPanel);

// start animating
animateGame();

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

function animateGame() {

    requestAnimationFrame(animateGame);

    // render the root container
    gameRenderer.render(stage);
}
