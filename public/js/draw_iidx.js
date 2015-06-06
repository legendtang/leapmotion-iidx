var height = window.innerHeight;
var width = window.innerWidth;
var basicPanelWidth = 480;

var gameRenderer = PIXI.autoDetectRenderer(width, height, {
    backgroundColor: 0x1099bb,
    view: document.getElementById('game'),
    autoResize: true
});

// create the root of the scene graph
var stage = new PIXI.Container();

// draw main panel, (x, y, width, height)
var basicPanel = new PIXI.Graphics();
basicPanel.beginFill(0x646464, 0.6);
basicPanel.lineStyle(3, 0x000, 1);
basicPanel.drawRect((width - basicPanelWidth) / 2, -3, basicPanelWidth, height + 6);

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

function animateGame() {

    requestAnimationFrame(animateGame);

    // render the root container
    gameRenderer.render(stage);
}
