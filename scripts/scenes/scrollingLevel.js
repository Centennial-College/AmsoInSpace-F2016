/**
 * @file scrollingLevel.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.1 recreated Level1 to extend from abstract scrollingLevel
 * @description Abstract class for all levels with scrolling background in this game.
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var ScrollingLevel = (function (_super) {
        __extends(ScrollingLevel, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function ScrollingLevel(_bgmString, _bgImgString) {
            _super.call(this);
            this._bgmString = _bgmString;
            this._bgImgString = _bgImgString;
            // had to do the initializations in constructor due to constraints of super class
            // didnt want to break the structure for all the remaining classes
            this._collision = new managers.Collision();
            // bgm
            this._bgSound = createjs.Sound.play(this._bgmString);
            this._bgSound.loop = -1;
            // bg
            this._bg = new objects.Background(this._bgImgString);
            // SCOREBOARD configuration
            // draws ui scoreboard panel at bottom of screen
            this._scoreBoard = new createjs.Shape();
            this._scoreBoard.graphics.beginFill('#333')
                .drawRect(0, 0, config.Screen.WIDTH, config.Game.SCORE_BOARD_HEIGHT);
            this._scoreBoard.y = config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT;
            this._lblLevel = new objects.Label("Level: " + level, "20px customfont", "#fff", config.Screen.CENTER_X, config.Screen.HEIGHT - 55);
            this._lblLives = new objects.Label("Lives: " + lives, "20px customfont", "#fff", 60, config.Screen.HEIGHT - 55);
            this._lblScore = new objects.Label("Score: " + score, "20px customfont", "#fff", 60, config.Screen.HEIGHT - 25);
            // beam energy will be hidden from level 1, only shows for level 2 and 3 + boss (but that wont be scrollingLevel descendent)
            this._lblBeam = new objects.Label("Beam: ", "20px customfont", "#fff", config.Screen.CENTER_X, config.Screen.HEIGHT - 25);
            this._createBeamEnergyBar();
            if (level == 1)
                this._hideBeamEnergyControls();
            // upgrades available will blink/flash when the player can upgrade something in the store
            this._lblUpgradesAvailable = new objects.Label("Upgrades Available!", "20px customfont", "#fff", config.Screen.CENTER_X + 200, config.Screen.HEIGHT - 55);
            this._lblUpgradesAvailable.alpha = 0;
            // Player
            this._player = new objects.Player();
            this.addChild(this._bg, this._scoreBoard, this._lblBeam, this._lblLevel, this._lblLives, this._lblScore, this._lblBeam, this._beamEnergyBar, this._lblUpgradesAvailable, this._player);
            stage.addChild(this);
            // test code
            // this._levelCompleteNotification()
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        ScrollingLevel.prototype.start = function () { };
        ScrollingLevel.prototype.update = function () {
            this._bg.update();
            this._player.update();
            this._updateScoreBoard();
            // test code
            // this._beamEnergyPercent = 94
            // this._lblBeam.alpha = this._beamEnergyBar.alpha = 1
            // this._updateBeamEnergyBar()
            // this._blinkUpgradesAvailableLbl()
            if (lives < 1) {
                this._bgSound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        ScrollingLevel.prototype._updateScoreBoard = function () {
            this._lblLives.text = "Lives: " + lives;
            this._lblScore.text = "Score: " + score;
        };
        ScrollingLevel.prototype._createBeamEnergyBar = function () {
            this._beamEnergyBar = new createjs.Shape();
            this._beamEnergyBar.x = config.Screen.CENTER_X + 37;
            this._beamEnergyBar.y = config.Screen.HEIGHT - 35;
            this._beamEnergyBar.graphics.setStrokeStyle(2);
            this._beamEnergyBar.graphics.beginStroke('#000');
            this._beamEnergyBar.graphics.drawRect(0, 0, 300, 20);
            this.addChild(this._beamEnergyBar);
        };
        ScrollingLevel.prototype._hideBeamEnergyControls = function () {
            this._lblBeam.alpha = this._beamEnergyBar.alpha = 0;
        };
        // PROTECTED METHODS ++++++++++++++++++++++++++++++++++++++++++++
        ScrollingLevel.prototype._updateBeamEnergyBar = function () {
            this._beamEnergyBar.graphics.clear();
            this._beamEnergyBar.graphics.beginFill('#00FF48');
            this._beamEnergyBar.graphics.drawRect(0, 0, 300 * this._beamEnergyPercent / 100, 20);
            this._beamEnergyBar.graphics.endFill();
            this._beamEnergyBar.graphics.setStrokeStyle(2);
            this._beamEnergyBar.graphics.beginStroke('#000');
            this._beamEnergyBar.graphics.drawRect(0, 0, 300, 20);
            this._beamEnergyBar.graphics.endStroke();
        };
        ScrollingLevel.prototype._blinkUpgradesAvailableLbl = function () {
            if (createjs.Ticker.getTime() % 1000 >= 500) {
                this._lblUpgradesAvailable.alpha = 0;
            }
            else {
                this._lblUpgradesAvailable.alpha = 1;
            }
        };
        ScrollingLevel.prototype._levelCompleteNotification = function () {
            // generate level complete notification and let fade away
            this.addChild(this._lblLevelComplete = new objects.Label("LEVEL " + level + " COMPLETE!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y));
            this._lblLevelComplete.shadow = new createjs.Shadow("#fff", 0, 0, 2);
            createjs.Tween.get(this._lblLevelComplete)
                .to({ alpha: 0, y: this._lblLevelComplete.y - 100 }, 1000)
                .call(function () {
                stage.removeChild(this._lblLevelComplete);
            });
        };
        return ScrollingLevel;
    }(objects.Scene));
    scenes.ScrollingLevel = ScrollingLevel;
})(scenes || (scenes = {}));
//# sourceMappingURL=scrollingLevel.js.map