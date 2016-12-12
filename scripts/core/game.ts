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
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var textureAtlas: createjs.SpriteSheet;

var scene: number;
let pause: scenes.Pause
var caveLevel: number;
var endingModifier: number;

// Game Variable
var score: number = 0;
var highScore: number = 0;
var lives: number = 5;
let level: number = 1;
let beamEnergyPercent: number
let mouseControls: boolean
let missionGoal: number
let missionProgress: number

// Game Scenes;
let currentScene: objects.Scene;

// Preload Assets
var assetData: objects.Asset[] = [
    { id: "bg1", src: "../../assets/images/background1.png" },
    { id: "bg2", src: "../../assets/images/background2.png" },
    { id: "bg3", src: "../../assets/images/background3.png" },
    { id: "amsomenu", src: "../../assets/images/amsomenu.png" },
    { id: "spritesheet", src: "../../assets/images/spritesheet2.png" },
    { id: "moo", src: "../../assets/audio/moo.mp3" },
    { id: "enemy1_sound", src: "../../assets/audio/enemy1_sound.wav" },
    { id: "diamond_sound", src: "../../assets/audio/diamond_sound.wav" },
    { id: "level1_bgsound", src: "../../assets/audio/level1_bgsound.wav" },
    { id: "level2_bgsound", src: "../../assets/audio/level2_bgsound.wav" },
    { id: "level3_bgsound", src: "../../assets/audio/level3_bgsound.wav" },

    // missing images
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


    let atlasData = {

        "images": [
            assets.getResult("spritesheet")
        ],

        "frames": [
            [1, 1, 277, 274, 0, 0, 0],
            [280, 1, 252, 250, 0, 0, 0],
            [534, 1, 252, 250, 0, 0, 0],
            [788, 1, 214, 212, 0, 0, 0],
            [1004, 1, 18, 17, 0, 0, 0],
            [788, 215, 140, 120, 0, 0, 0],
            [930, 215, 80, 49, 0, 0, 0],
            [930, 266, 39, 11, 0, 0, 0],
            [280, 253, 250, 188, 0, 0, 0],
            [532, 253, 140, 120, 0, 0, 0],
            [674, 253, 94, 58, 0, 0, 0],
            [1, 277, 140, 120, 0, 0, 0],
            [143, 277, 120, 108, 0, 0, 0],
            [1, 399, 140, 120, 0, 0, 0],
            [674, 337, 300, 96, 0, 0, 0],
            [532, 375, 140, 120, 0, 0, 0],
            [674, 435, 300, 96, 0, 0, 0],
            [143, 443, 140, 120, 0, 0, 0],
            [1, 521, 140, 120, 0, 0, 0],
            [285, 443, 140, 120, 0, 0, 0],
            [427, 497, 140, 120, 0, 0, 0],
            [143, 565, 140, 120, 0, 0, 0],
            [1, 643, 140, 120, 0, 0, 0],
            [285, 565, 140, 120, 0, 0, 0],
            [569, 533, 171, 85, 0, 0, 0],
            [742, 533, 148, 88, 0, -2, -3],
            [427, 620, 200, 59, 0, 0, 0],
            [629, 623, 200, 59, 0, 0, 0],
            [427, 681, 200, 59, 0, 0, 0],
            [831, 623, 150, 49, 0, 0, 0],
            [831, 674, 150, 48, 0, 0, 0],
            [629, 684, 200, 59, 0, 0, 0],
            [143, 687, 200, 59, 0, 0, 0]
        ],

        "animations": {
            "shield_l": { "frames": [0] },
            "kbcontrols": { "frames": [1] },
            "mousecontrols": { "frames": [2] },
            "shield_m": { "frames": [3] },
            "enemy2_bullet": { "frames": [4] },
            "explosion01": { "frames": [5] },
            "diamond": { "frames": [6] },
            "player_bullet": { "frames": [7] },
            "enemy3": { "frames": [8] },
            "explosion02": { "frames": [9] },
            "boss_bullet": { "frames": [10] },
            "explosion03": { "frames": [11] },
            "enemy1": { "frames": [12] },
            "explosion04": { "frames": [13] },
            "Boss1": { "frames": [14] },
            "explosion05": { "frames": [15] },
            "Boss2": { "frames": [16] },
            "explosion06": { "frames": [17] },
            "explosion07": { "frames": [18] },
            "explosion08": { "frames": [19] },
            "explosion09": { "frames": [20] },
            "explosion10": { "frames": [21] },
            "explosion11": { "frames": [22] },
            "explosion12": { "frames": [23] },
            "enemy2": { "frames": [24] },
            "enemy3_bullet": { "frames": [25] },
            "instructionsBtn": { "frames": [26] },
            "menubtn": { "frames": [27] },
            "playagainbtn": { "frames": [28] },
            "playerFT": { "frames": [29] },
            "playerSD": { "frames": [30] },
            "playgameBtn": { "frames": [31] },
            "upgradesbtn": { "frames": [32] },
            "explosion": { "frames": [5,9,11,13,15,17,18,19,20,21,22,23], speed:1, next:false}
        },
    };

    textureAtlas = new createjs.SpriteSheet(atlasData);

    // mouseControls = true
    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    if (createjs.Ticker.paused) {
        pause.update()
        createjs.Sound.stop()
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

function changeScene(): void {

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
            currentScene = new scenes.Pause()
            console.log("Pause Scene changed");
            break;
        case config.Scene.CONTROLSELECT:
            stage.removeAllChildren();
            currentScene = new scenes.ControlSelection()
            console.log('Control Selection Scene changed');
            break;
    }
}