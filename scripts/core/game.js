/// <reference path="_reference.ts" />
/**
 * @file game.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.4.1 - cleaned up loaded assets; small images into spritesheet
 * @description This file starts the game
 **/
// Global Variable
var assets;
var canvas;
var stage;
var textureAtlas;
var scene;
var pause;
var caveLevel;
var endingModifier;
// Game Variable
var score = 0;
var highScore = 0;
var lives = 5;
var level = 1;
var beamEnergyPercent;
var mouseControls;
var missionGoal;
var missionProgress;
var gameOverBGImgString;
// Game Scenes;
var currentScene;
// Preload Assets
var assetData = [
    { id: "bg1", src: "../../assets/images/background1.png" },
    { id: "bg2", src: "../../assets/images/background2.png" },
    { id: "bg3", src: "../../assets/images/background3.png" },
    { id: "amsomenu", src: "../../assets/images/amsomenu.png" },
    { id: "spritesheet", src: "../../assets/images/spritesheet.png" },
    { id: "moo", src: "../../assets/audio/moo.mp3" },
    { id: "enemy1_sound", src: "../../assets/audio/enemy1_sound.wav" },
    { id: "diamond_sound", src: "../../assets/audio/diamond_sound.wav" },
    { id: "level1_bgsound", src: "../../assets/audio/level1_bgsound.wav" },
    { id: "level2_bgsound", src: "../../assets/audio/level2_bgsound.wav" },
    { id: "level3_bgsound", src: "../../assets/audio/level3_bgsound.wav" },
    { id: "level3_bgsound", src: "../../assets/audio/level3_bgsound.wav" },
    { id: "gameover", src: "../../assets/audio/gameover.mp3" },
    { id: "gamewin", src: "../../assets/audio/yay.mp3" },
];
function preload() {
    // create a queue for assets
    assets = new createjs.LoadQueue(false);
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // get canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    var atlasData = {
        "images": [
            assets.getResult("spritesheet")
        ],
        "frames": [
            [1, 1, 277, 274, 0, 0, 0],
            [1, 277, 252, 250, 0, 0, 0],
            [1, 529, 214, 212, 0, 0, 0],
            [1, 743, 18, 17, 0, 0, 0],
            [21, 743, 39, 11, 0, 0, 0],
            [217, 529, 250, 188, 0, 0, 0],
            [255, 277, 252, 250, 0, 0, 0],
            [217, 719, 150, 49, 0, 0, 0],
            [369, 719, 80, 49, 0, 0, 0],
            [451, 719, 150, 48, 0, 0, 0],
            [469, 529, 140, 120, 0, 0, 0],
            [469, 651, 200, 59, 0, 0, 0],
            [671, 1, 300, 96, 0, 0, 0],
            [509, 1, 140, 120, 0, 0, 0],
            [280, 1, 200, 59, 0, 0, 0],
            [280, 62, 200, 59, 0, 0, 0],
            [280, 123, 140, 120, 0, 0, 0],
            [422, 123, 140, 120, 0, 0, 0],
            [671, 99, 300, 96, 0, 0, 0],
            [671, 197, 200, 59, 0, 0, 0],
            [873, 197, 140, 120, 0, 0, 0],
            [671, 258, 200, 59, 0, 0, 0],
            [509, 245, 140, 120, 0, 0, 0],
            [509, 367, 140, 120, 0, 0, 0],
            [611, 489, 140, 120, 0, 0, 0],
            [671, 611, 140, 120, 0, 0, 0],
            [813, 319, 200, 59, 0, 0, 0],
            [651, 319, 140, 120, 0, 0, 0],
            [813, 380, 171, 85, 0, 0, 0],
            [753, 467, 140, 120, 0, 0, 0],
            [895, 467, 120, 108, 0, 0, 0],
            [813, 589, 140, 120, 0, 0, 0]
        ],
        "animations": {
            "shield_l": { "frames": [0] },
            "kbcontrols": { "frames": [1] },
            "shield_m": { "frames": [2] },
            "enemy2_bullet": { "frames": [3] },
            "player_bullet": { "frames": [4] },
            "enemy3": { "frames": [5] },
            "mousecontrols": { "frames": [6] },
            "playerSD": { "frames": [7] },
            "diamond": { "frames": [8] },
            "playerFT": { "frames": [9] },
            "explosion1": { "frames": [10, 13, 16, 17, 20, 22, 23, 24, 25, 27, 29, 31] },
            "instructionsBtn": { "frames": [11] },
            "Saja_b": { "frames": [12] },
            "letsbeginbtn": { "frames": [14] },
            "menubtn": { "frames": [15] },
            "Saja_w": { "frames": [18] },
            "playagainbtn": { "frames": [19] },
            "playgameBtn": { "frames": [21] },
            "upgradesbtn": { "frames": [26] },
            "enemy2": { "frames": [28] },
            "enemy1": { "frames": [30] }
        },
    };
    textureAtlas = new createjs.SpriteSheet(atlasData);
    // mouseControls = true
    // scene = config.Scene.LEVEL2;
    scene = config.Scene.LEVEL3;
    changeScene();
}
function gameLoop(event) {
    if (createjs.Ticker.paused) {
        pause.update();
        createjs.Sound.stop();
    }
    if (!createjs.Ticker.paused) {
        console.log("gameloop updated");
        currentScene.update();
        stage.update();
    }
    // else {
    //     pause.update()
    //     createjs.Sound.stop()
    // }
}
function changeScene() {
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            console.log("Menu Scene changed");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Instructions Scene changed");
            break;
        case config.Scene.LEVEL1:
            stage.removeAllChildren();
            currentScene = new scenes.Level1;
            console.log("Level1 Scene changed");
            break;
        case config.Scene.LEVEL2:
            stage.removeAllChildren();
            currentScene = new scenes.Level2();
            console.log("Level2 Scene changed");
            break;
        case config.Scene.LEVEL3:
            stage.removeAllChildren();
            currentScene = new scenes.Level3();
            console.log("Level3 Scene changed");
            break;
        case config.Scene.OVER:
            stage.removeAllChildren();
            currentScene = new scenes.Over();
            console.log("Over Scene changed");
            break;
        case config.Scene.PAUSE:
            stage.removeAllChildren();
            currentScene = new scenes.Pause();
            console.log("Pause Scene changed");
            break;
        case config.Scene.CONTROLSELECT:
            stage.removeAllChildren();
            currentScene = new scenes.ControlSelection();
            console.log('Control Selection Scene changed');
            break;
    }
}
//# sourceMappingURL=game.js.map