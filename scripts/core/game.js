/// <reference path="_reference.ts" />
/**
 * @file game.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 12 2016
 * @version 0.4.6 - added different throttle animations for Saja_b and Saja_w
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
var level = 0;
var beamEnergyPercent;
var mouseControls;
var missionGoal;
var missionProgress;
var currBgImgString = "bg1";
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
    { id: "missionstart", src: "../../assets/audio/mario-herewego.wav" },
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
            [1, 277, 269, 242, 0, 0, 0],
            [280, 1, 252, 250, 0, 0, 0],
            [1, 521, 252, 250, 0, 0, 0],
            [534, 1, 391, 96, 0, 0, 0],
            [1, 773, 250, 188, 0, 0, 0],
            [534, 99, 334, 96, 0, 0, 0],
            [534, 197, 301, 96, 0, 0, 0],
            [1, 963, 300, 30, 0, 0, 0],
            [280, 253, 250, 22, 0, 0, 0],
            [272, 277, 214, 212, 0, 0, 0],
            [488, 295, 208, 198, 0, 0, 0],
            [698, 295, 140, 120, 0, 0, 0],
            [272, 491, 200, 59, 0, 0, 0],
            [255, 552, 301, 96, 0, 0, 0],
            [255, 650, 140, 120, 0, 0, 0],
            [397, 650, 140, 120, 0, 0, 0],
            [474, 495, 184, 49, 0, 0, 0],
            [698, 417, 171, 85, 0, 0, 0],
            [660, 504, 200, 59, 0, 0, 0],
            [255, 772, 200, 59, 0, 0, 0],
            [253, 833, 140, 120, 0, 0, 0],
            [395, 833, 140, 120, 0, 0, 0],
            [303, 955, 200, 59, 0, 0, 0],
            [457, 772, 200, 59, 0, 0, 0],
            [539, 650, 140, 120, 0, 0, 0],
            [537, 833, 140, 120, 0, 0, 0],
            [505, 955, 200, 59, 0, 0, 0],
            [681, 565, 184, 49, 0, 0, 0],
            [681, 616, 140, 120, 0, 0, 0],
            [681, 738, 148, 88, 0, -2, -3],
            [679, 828, 140, 120, 0, 0, 0],
            [707, 950, 120, 65, 0, 0, -2],
            [823, 616, 140, 120, 0, 0, 0],
            [831, 738, 140, 120, 0, 0, 0],
            [821, 860, 152, 49, 0, -32, 0],
            [829, 911, 152, 49, 0, -32, 0],
            [870, 99, 120, 108, 0, 0, 0],
            [558, 546, 94, 58, 0, 0, 0],
            [840, 209, 140, 120, 0, 0, 0],
            [871, 331, 124, 118, 0, 0, 0],
            [829, 962, 80, 49, 0, 0, 0],
            [871, 451, 80, 45, 0, 0, 0],
            [488, 277, 39, 11, 0, 0, 0],
            [1, 995, 18, 17, 0, 0, 0]
        ],
        "animations": {
            "shield_l": { "frames": [0] },
            "explosion_l": { "frames": [1] },
            "kbcontrols": { "frames": [2] },
            "mousecontrols": { "frames": [3] },
            "Saja_b_move": { "frames": [4] },
            "enemy3": { "frames": [5] },
            "Saja_w_move": { "frames": [6] },
            "Saja_b": { "frames": [7] },
            "beam-l": { "frames": [8] },
            "beam_m": { "frames": [9] },
            "shield_m": { "frames": [10] },
            "explosion1": { "frames": [12, 15, 16, 21, 22, 25, 26, 29, 31, 33, 34, 39] },
            "instructionsBtn": { "frames": [13] },
            "Saja_w": { "frames": [14] },
            "playerFT_move": { "frames": [17] },
            "enemy2": { "frames": [18] },
            "letsbeginbtn": { "frames": [19] },
            "menubtn": { "frames": [20] },
            "playagainbtn": { "frames": [23] },
            "playgameBtn": { "frames": [24] },
            "upgradesbtn": { "frames": [27] },
            "playerSD_move": { "frames": [28] },
            "enemy3_bullet": { "frames": [30] },
            "missile_round_blue_enemy_m": { "frames": [32] },
            "playerFT": { "frames": [35] },
            "playerSD": { "frames": [36] },
            "enemy1": { "frames": [37] },
            "saja_bullet": { "frames": [38] },
            "explosion_s": { "frames": [40] },
            "diamond": { "frames": [41] },
            "missile_round_blue": { "frames": [42] },
            "player_bullet": { "frames": [43] },
            "enemy2_bullet": { "frames": [44] }
        },
    };
    textureAtlas = new createjs.SpriteSheet(atlasData);
    // mouseControls = true
    // level = 2
    // scene = config.Scene.LEVEL3;
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // if (createjs.Ticker.paused) {
    //     pause.update()
    //     createjs.Sound.stop()
    // }
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
        // case config.Scene.PAUSE:
        //     stage.removeAllChildren();
        //     currentScene = new scenes.Pause()
        //     console.log("Pause Scene changed");
        //     break;
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
        case config.Scene.BRIEFING:
            stage.removeAllChildren();
            currentScene = new scenes.MissionBriefing();
            break;
    }
}
//# sourceMappingURL=game.js.map