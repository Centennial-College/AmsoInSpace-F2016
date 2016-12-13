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
let currBgImgString: string

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
    { id: "level3_bgsound", src: "../../assets/audio/level3_bgsound.wav" },
    { id: "level3_bgsound", src: "../../assets/audio/level3_bgsound.wav" },
    { id: "gameover", src: "../../assets/audio/gameover.mp3" },
    { id: "gamewin", src: "../../assets/audio/yay.mp3" },

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
            [1, 277, 269, 242, 0, 0, 0],
            [280, 1, 252, 250, 0, 0, 0],
            [1, 521, 252, 250, 0, 0, 0],
            [534, 1, 250, 188, 0, 0, 0],
            [786, 1, 214, 212, 0, 0, 0],
            [1, 773, 300, 96, 0, 0, 0],
            [1, 871, 300, 30, 0, 0, 0],
            [534, 191, 250, 22, 0, 0, 0],
            [534, 215, 300, 96, 0, 0, 0],
            [836, 215, 171, 85, 0, 0, 0],
            [280, 253, 208, 198, 0, 0, 0],
            [272, 453, 200, 59, 0, 0, 0],
            [490, 313, 140, 120, 0, 0, 0],
            [632, 313, 140, 120, 0, 0, 0],
            [490, 435, 200, 59, 0, 0, 0],
            [272, 514, 200, 59, 0, 0, 0],
            [255, 575, 140, 120, 0, 0, 0],
            [474, 496, 200, 59, 0, 0, 0],
            [474, 557, 200, 59, 0, 0, 0],
            [255, 697, 200, 59, 0, 0, 0],
            [303, 758, 140, 120, 0, 0, 0],
            [774, 313, 140, 120, 0, 0, 0],
            [692, 435, 148, 88, 0, -2, -3],
            [676, 525, 140, 120, 0, 0, 0],
            [457, 618, 140, 120, 0, 0, 0],
            [842, 435, 120, 108, 0, 0, 0],
            [818, 545, 140, 120, 0, 0, 0],
            [457, 740, 140, 120, 0, 0, 0],
            [599, 647, 140, 120, 0, 0, 0],
            [599, 769, 140, 120, 0, 0, 0],
            [741, 667, 140, 120, 0, 0, 0],
            [883, 667, 124, 118, 0, 0, 0],
            [741, 789, 150, 49, 0, 0, 0],
            [741, 840, 150, 48, 0, 0, 0],
            [893, 787, 120, 65, 0, 0, -2],
            [916, 302, 94, 58, 0, 0, 0],
            [916, 362, 80, 49, 0, 0, 0],
            [893, 854, 80, 45, 0, 0, 0],
            [741, 890, 39, 11, 0, 0, 0],
            [490, 253, 18, 17, 0, 0, 0]
        ],

        "animations": {
            "shield_l": { "frames": [0] },
            "explosion_l": { "frames": [1] },
            "kbcontrols": { "frames": [2] },
            "mousecontrols": { "frames": [3] },
            "enemy3": { "frames": [4] },
            "shield_m": { "frames": [5] },
            "Saja_b": { "frames": [6] },
            "beam-l": { "frames": [7] },
            "beam_m": { "frames": [8] },
            "Saja_w": { "frames": [9] },
            "enemy2": { "frames": [10] },
            "explosion_m": { "frames": [11] },
            "instructionsBtn": { "frames": [12] },
            "explosion1": { "frames": [13, 14, 17, 21, 22, 24, 25, 27, 28, 29, 30, 31] },
            "letsbeginbtn": { "frames": [15] },
            "menubtn": { "frames": [16] },
            "playagainbtn": { "frames": [18] },
            "playgameBtn": { "frames": [19] },
            "upgradesbtn": { "frames": [20] },
            "enemy3_bullet": { "frames": [23] },
            "enemy1": { "frames": [26] },
            "explosion_s": { "frames": [32] },
            "playerSD": { "frames": [33] },
            "playerFT": { "frames": [34] },
            "missile_round_blue_enemy_m": { "frames": [35] },
            "saja_bullet": { "frames": [36] },
            "diamond": { "frames": [37] },
            "missile_round_blue": { "frames": [38] },
            "player_bullet": { "frames": [39] },
            "enemy2_bullet": { "frames": [40] }
        },
    };

    textureAtlas = new createjs.SpriteSheet(atlasData);

    // mouseControls = true
    // scene = config.Scene.MENU;
    scene = config.Scene.LEVEL3;
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
        case config.Scene.WIN:
            stage.removeAllChildren();
            currentScene = new scenes.Win()
            console.log('Win Scene changed');
            break;
    }
}