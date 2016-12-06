/**
 * @file scrollingLevel.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.5 implemented pause functionality
 * @description Abstract class for all levels with scrolling background in this game. 
 **/

module scenes {
    export class ScrollingLevel extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg: objects.Background;
        private _lblScore: objects.Label;
        private _lblLives: objects.Label;
        private _lblLevel: objects.Label;
        private _scoreBoard: createjs.Shape

        // PROTECTED VARIABLES
        protected _bgSound: createjs.AbstractSoundInstance;
        protected _player: objects.Player;
        protected _collision: managers.Collision;
        protected _lblBeam: objects.Label;
        protected _beamEnergyPercent: number
        protected _beamEnergyBar: createjs.Shape
        protected _lblUpgradesAvailable: objects.Label
        protected _lblLevelComplete: objects.Label
        protected _canAdvanceToNextLevel: boolean
        protected _keyboardcontrol: managers.KeyboardControls

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(private _bgmString: string, private _bgImgString: string) {
            super();

            // had to do the initializations in constructor due to constraints of super class
            // didnt want to break the structure for all the remaining classes
            this._collision = new managers.Collision();
            this._keyboardcontrol = new managers.KeyboardControls
            this._canAdvanceToNextLevel = false

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
            this._createBeamEnergyBar()
            if (level == 1)
                this._hideBeamEnergyControls()

            // upgrades available will blink/flash when the player can upgrade something in the store
            this._lblUpgradesAvailable = new objects.Label("Upgrades Available!", "20px customfont", "#fff", config.Screen.CENTER_X + 200, config.Screen.HEIGHT - 55)
            this._lblUpgradesAvailable.alpha = 0

            // Player
            this._player = new objects.Player();

            this.addChild(this._bg, this._scoreBoard, this._lblBeam, this._lblLevel, this._lblLives, this._lblScore, this._lblBeam, this._beamEnergyBar, this._lblUpgradesAvailable, this._player);
            stage.addChild(this);

            // test code
            // this._levelCompleteNotification()

        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void { }

        public update(): void {
            this._bg.update();
            this._player.update();
            this._updateScoreBoard();

            if (!createjs.Ticker.paused) {
                this._bgSound.play()
            }

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
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _updateScoreBoard() {
            this._lblLives.text = "Lives: " + lives;
            this._lblScore.text = "Score: " + score;
        }
        private _createBeamEnergyBar(): void {
            this._beamEnergyBar = new createjs.Shape();
            this._beamEnergyBar.x = config.Screen.CENTER_X + 37
            this._beamEnergyBar.y = config.Screen.HEIGHT - 35
            this._beamEnergyBar.graphics.setStrokeStyle(2);
            this._beamEnergyBar.graphics.beginStroke('#000');
            this._beamEnergyBar.graphics.drawRect(0, 0, 300, 20);
            this.addChild(this._beamEnergyBar);
        }
        private _hideBeamEnergyControls(): void {
            this._lblBeam.alpha = this._beamEnergyBar.alpha = 0
        }

        // PROTECTED METHODS ++++++++++++++++++++++++++++++++++++++++++++
        protected _updateBeamEnergyBar(): void {
            this._beamEnergyBar.graphics.clear();
            this._beamEnergyBar.graphics.beginFill('#00FF48');
            this._beamEnergyBar.graphics.drawRect(0, 0, 300 * this._beamEnergyPercent / 100, 20);
            this._beamEnergyBar.graphics.endFill();
            this._beamEnergyBar.graphics.setStrokeStyle(2);
            this._beamEnergyBar.graphics.beginStroke('#000');
            this._beamEnergyBar.graphics.drawRect(0, 0, 300, 20);
            this._beamEnergyBar.graphics.endStroke();
        }

        protected _blinkUpgradesAvailableLbl(): void {
            if (createjs.Ticker.getTime() % 1000 >= 500) {
                this._lblUpgradesAvailable.alpha = 0
            } else {
                this._lblUpgradesAvailable.alpha = 1
            }
        }

        protected _levelCompleteNotification(): void {
            // generate level complete notification and let fade away
            this.addChild(this._lblLevelComplete = new objects.Label("LEVEL " + level + " COMPLETE!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y))
            this._lblLevelComplete.shadow = new createjs.Shadow("#fff", 0, 0, 2)

            createjs.Tween.get(this._lblLevelComplete)
                .to({ alpha: 0, y: this._lblLevelComplete.y - 100 }, 1000)
                .call(function () {
                    stage.removeChild(this._lblLevelComplete);
                });
        }
    }
}