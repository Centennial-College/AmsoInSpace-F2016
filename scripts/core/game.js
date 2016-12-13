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
var currBgImgString;
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
            [1, 1, 300, 96, 0, 0, 0],
            [303, 1, 200, 59, 0, 0, 0],
            [303, 62, 200, 59, 0, 0, 0],
            [1, 99, 300, 96, 0, 0, 0],
            [303, 123, 200, 59, 0, 0, 0],
            [303, 184, 200, 59, 0, 0, 0],
            [1, 197, 300, 30, 0, 0, 0],
            [1, 229, 277, 274, 0, 0, 0],
            [280, 229, 18, 17, 0, 0, 0],
            [300, 245, 200, 59, 0, 0, 0],
            [280, 306, 214, 212, 0, 0, 0],
            [1, 505, 269, 242, 0, 0, 0],
            [272, 520, 208, 198, 0, 0, 0],
            [272, 720, 200, 59, 0, 0, 0],
            [1, 749, 252, 250, 0, 0, 0],
            [255, 781, 250, 188, 0, 0, 0],
            [255, 971, 250, 22, 0, 0, 0],
            [255, 995, 184, 49, 0, 0, 0],
            [1, 1001, 252, 250, 0, 0, 0],
            [441, 995, 39, 11, 0, 0, 0],
            [255, 1046, 184, 49, 0, 0, 0],
            [255, 1097, 171, 85, 0, 0, 0],
            [255, 1184, 152, 49, 0, -32, 0],
            [409, 1184, 94, 58, 0, 0, 0],
            [255, 1235, 152, 49, 0, -32, 0],
            [409, 1244, 80, 49, 0, 0, 0],
            [1, 1253, 148, 88, 0, -2, -3],
            [151, 1253, 80, 45, 0, 0, 0],
            [233, 1286, 140, 120, 0, 0, 0],
            [375, 1295, 124, 118, 0, 0, 0],
            [1, 1343, 140, 120, 0, 0, 0],
            [143, 1408, 140, 120, 0, 0, 0],
            [1, 1465, 140, 120, 0, 0, 0],
            [285, 1415, 140, 120, 0, 0, 0],
            [143, 1530, 140, 120, 0, 0, 0],
            [1, 1587, 140, 120, 0, 0, 0],
            [285, 1537, 140, 120, 0, 0, 0],
            [143, 1652, 140, 120, 0, 0, 0],
            [1, 1709, 140, 120, 0, 0, 0],
            [1, 1831, 120, 65, 0, 0, -2],
            [143, 1774, 140, 120, 0, 0, 0],
            [285, 1659, 140, 120, 0, 0, 0],
            [285, 1781, 120, 108, 0, 0, 0]
        ],
        "animations": {
            "Saja_b": { "frames": [0] },
            "instructionsBtn": { "frames": [1] },
            "letsbeginbtn": { "frames": [2] },
            "Saja_w": { "frames": [3] },
            "menubtn": { "frames": [4] },
            "playagainbtn": { "frames": [5] },
            "beam-l": { "frames": [6] },
            "shield_l": { "frames": [7] },
            "enemy2_bullet": { "frames": [8] },
            "playgameBtn": { "frames": [9] },
            "shield_m": { "frames": [10] },
            "explosion_l": { "frames": [11] },
            "explosion_m": { "frames": [12] },
            "upgradesbtn": { "frames": [13] },
            "kbcontrols": { "frames": [14] },
            "enemy3": { "frames": [15] },
            "beam_m": { "frames": [16] },
            "playerFT_move": { "frames": [17] },
            "mousecontrols": { "frames": [18] },
            "player_bullet": { "frames": [19] },
            "playerSD_move": { "frames": [20] },
            "enemy2": { "frames": [21] },
            "playerFT": { "frames": [22] },
            "missile_large_red": { "frames": [23] },
            "playerSD": { "frames": [24] },
            "diamond": { "frames": [25] },
            "enemy3_bullet": { "frames": [26] },
            "missile_round_blue": { "frames": [27] },
            "explosion1": { "frames": [28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41] },
            "explosion_s": { "frames": [29] },
            "missile_round_blue_enemy_m": { "frames": [39] },
            "enemy1": { "frames": [42] }
        },
    };
    textureAtlas = new createjs.SpriteSheet(atlasData);
    // mouseControls = true
    // scene = config.Scene.MENU;
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
        case config.Scene.WIN:
            stage.removeAllChildren();
            currentScene = new scenes.Win();
            console.log('Win Scene changed');
            break;
    }
}
//# sourceMappingURL=game.js.map