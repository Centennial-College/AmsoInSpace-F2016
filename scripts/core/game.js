/// <reference path="_reference.ts" />
/**
 * @file game.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.4 fixed collisions for current game objects
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
// Game Scenes;
var currentScene;
// Preload Assets
var assetData = [
    { id: "playgameBtn", src: "../../assets/images/playgameBtn.png" },
    { id: "instructionsBtn", src: "../../assets/images/instructionsBtn.png" },
    { id: "restartButton", src: "../../assets/images/playagainbtn.png" },
    { id: "menubtn", src: "../../assets/images/menubtn.png" },
    { id: "upgradesbtn", src: "../../assets/images/upgradesbtn.png" },
    { id: "rules", src: "../../assets/images/instruction.png" },
    { id: "bg1", src: "../../assets/images/background1.png" },
    { id: "bg2", src: "../../assets/images/background2.png" },
    { id: "bg3", src: "../../assets/images/background3.png" },
    { id: "atlas", src: "../../assets/images/atlas.png" },
    { id: "amsomenu", src: "../../assets/images/amsomenu.png" },
    //{ id: "test", src: "../../assets/images/ "},
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
    var atlasData = {
        "images": [
            // "../../Assets/images/atlas.png"
            assets.getResult("atlas")
        ],
        "frames": [
            [1, 1, 277, 274, 0, 0, 0],
            [280, 1, 269, 242, 0, 0, 0],
            [280, 245, 214, 212, 0, 0, 0],
            [551, 1, 250, 188, 0, 0, 0],
            //[1, 277, 170, 136, 0, 0, 0],
            [551, 191, 300, 30, 0, 0, 0],
            [551, 223, 250, 22, 0, 0, 0],
            [496, 247, 208, 198, 0, 0, 0],
            [803, 1, 171, 85, 0, 0, 0],
            [803, 88, 148, 88, 0, -2, -3],
            [706, 247, 124, 118, 0, 0, 0],
            [706, 367, 120, 65, 0, 0, -2],
            [173, 277, 94, 58, 0, 0, 0],
            [1, 415, 99, 38, 0, -12, -26],
            [173, 337, 80, 49, 0, 0, 0],
            [853, 178, 120, 108, 0, 0, 0],
            [832, 288, 150, 49, 0, 0, 0],
            [832, 339, 150, 48, 0, 0, 0],
            [828, 389, 87, 38, 0, -15, -26],
            [173, 388, 80, 45, 0, 0, 0],
            [803, 178, 39, 11, 0, 0, 0],
            [953, 88, 18, 17, 0, 0, 0]
        ],
        "animations": {
            "shield_l": { "frames": [0] },
            "explosion_l": { "frames": [1] },
            "shield_m": { "frames": [2] },
            "enemy3": { "frames": [3] },
            //"restartButton": { "frames": [4] },
            "beam-l": { "frames": [4] },
            "beam_m": { "frames": [5] },
            "explosion_m": { "frames": [6] },
            "enemy2": { "frames": [7] },
            "enemy3_bullet": { "frames": [8] },
            "explosion_s": { "frames": [9] },
            "missile_round_blue_enemy_m": { "frames": [10] },
            "player_bullet_update": { "frames": [11] },
            "ruleButton": { "frames": [12] },
            "diamond": { "frames": [13] },
            "enemy1": { "frames": [14] },
            "player": { "frames": [15] },
            "friend": { "frames": [16] },
            "startButton": { "frames": [17] },
            "friend_bullet": { "frames": [18] },
            "player_bullet": { "frames": [19] },
            "enemy2_bullet": { "frames": [20] },
            "explosion": {
                "frames": [9, 6, 1],
                "speed": 0.1
            }
        }
    };
    textureAtlas = new createjs.SpriteSheet(atlasData);
    scene = config.Scene.MENU;
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
        case config.Scene.RULE:
            stage.removeAllChildren();
            currentScene = new scenes.Rule();
            console.log("Rule Scene changed");
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
            currentScene = new scenes.Pause;
            console.log("Pause Scene changed");
            break;
    }
}
//# sourceMappingURL=game.js.map