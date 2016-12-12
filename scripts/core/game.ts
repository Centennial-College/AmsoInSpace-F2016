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


// Game Scenes;
let currentScene: objects.Scene;

// Preload Assets
var assetData: objects.Asset[] = [
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
    { id: "level3_bgsound", src: "../../assets/audio/level3_bgsound.wav" }
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
            [1, 1, 252, 250, 0, 0, 0],
            [255, 1, 252, 250, 0, 0, 0],
            [509, 1, 269, 242, 0, 0, 0],
            [780, 1, 208, 198, 0, 0, 0],
            [780, 201, 153, 49, 0, 0, 0],
            [935, 201, 153, 49, 0, 0, 0],
            [990, 1, 250, 188, 0, 0, 0],
            [1090, 191, 200, 59, 0, 0, 0],
            [1242, 1, 124, 118, 0, 0, 0],
            [1242, 121, 200, 59, 0, 0, 0],
            [1292, 182, 200, 59, 0, 0, 0],
            [1368, 1, 120, 108, 0, 0, 0],
            [1444, 111, 200, 59, 0, 0, 0],
            [1646, 1, 200, 59, 0, 0, 0],
            [1490, 1, 153, 49, 0, 0, 0],
            [1490, 52, 153, 49, 0, 0, 0],
            [1646, 62, 200, 59, 0, 0, 0],
            [1494, 172, 80, 49, 0, 0, 0],
            [1494, 223, 18, 17, 0, 0, 0],
            [1514, 223, 39, 11, 0, 0, 0],
            [1646, 123, 171, 85, 0, 0, 0]
        ],

        "animations": {
            "kbcontrols": { "frames": [0] },
            "mousecontrols": { "frames": [1] },
            "explosion_l": { "frames": [2] },
            "explosion_m": { "frames": [3] },
            "boss1": { "frames": [4] },
            "boss2": { "frames": [5] },
            "enemy3": { "frames": [6] },
            "instructionsBtn": { "frames": [7] },
            "explosion_s": { "frames": [8] },
            "letsbeginbtn": { "frames": [9] },
            "menubtn": { "frames": [10] },
            "enemy1": { "frames": [11] },
            "playagainbtn": { "frames": [12] },
            "playgameBtn": { "frames": [13] },
            "playerFT": { "frames": [14] },
            "playerSD": { "frames": [15] },
            "upgradesbtn": { "frames": [16] },
            "diamond": { "frames": [17] },
            "enemy2_bullet": { "frames": [18] },
            "player_bullet": { "frames": [19] },
            "enemy2": { "frames": [20] }
        }
    };

    textureAtlas = new createjs.SpriteSheet(atlasData);

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