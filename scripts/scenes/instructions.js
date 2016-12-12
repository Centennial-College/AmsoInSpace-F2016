/**
 * @file instructions.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.3.9 - implemented instructions scene
 * @description This scene provides rules to playing this game.
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Instructions(_currentlyShowingSlide) {
            if (_currentlyShowingSlide === void 0) { _currentlyShowingSlide = 0; }
            _super.call(this);
            this._currentlyShowingSlide = _currentlyShowingSlide;
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Instructions.prototype.start = function () {
            console.log("Instructions Scene started");
            this._instructionsRRectBGs = [];
            this._headers = [];
            this._bodyParas = [];
            this._bodyContainers = [];
            this._setupBackground();
            this._setupHeaderLabels();
            this._setupBodyLabels();
            this._setupButtons();
            this._setupFlashingLabel();
            // display the first panel of instrucstions on startup
            this._displaySlide(this._headers[0], this._bodyContainers[0]);
            stage.addChild(this);
        };
        Instructions.prototype.update = function () {
            this._bg.update();
            this._bgBuffer.update();
            // flashing of click to continue
            if (createjs.Ticker.getTime() % 1000 < 500) {
                this._flashingClickToContinue.alpha = 0;
            }
            else {
                this._flashingClickToContinue.alpha = 1;
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Instructions.prototype._setupStageMouseEventHandlers = function () {
            var _this = this;
            stage.on("stagemousedown", function (e) {
                if (_this._currentlyShowingSlide < 2) {
                    // hides current panel
                    _this._hideSlide(_this._headers[_this._currentlyShowingSlide], _this._bodyContainers[_this._currentlyShowingSlide]);
                    // increments counter panel
                    _this._currentlyShowingSlide++;
                    // displays next panel
                    _this._displaySlide(_this._headers[_this._currentlyShowingSlide], _this._bodyContainers[_this._currentlyShowingSlide]);
                    if (_this._currentlyShowingSlide == 2) {
                        _this.removeChild(_this._flashingClickToContinue);
                        _this._showButtons();
                    }
                }
            });
        };
        Instructions.prototype._showButtons = function () {
            createjs.Tween.get(this._menuBtn).wait(3500).to({
                alpha: 1
            }, 2000);
            createjs.Tween.get(this._beginBtn).wait(3500).to({
                alpha: 1
            }, 2000);
        };
        Instructions.prototype._setupHeaderLabels = function () {
            this._headers[0] = new objects.Label("Who are you, what do you do?", "45px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headers[0].shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._headers[0].alpha = 0;
            this._headers[1] = new objects.Label("How do you do it?", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headers[1].shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._headers[1].alpha = 0;
            this._headers[2] = new objects.Label("When will your journey end?", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headers[2].shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._headers[2].alpha = 0;
            this.addChild(this._headers[0], this._headers[1], this._headers[2]);
        };
        Instructions.prototype._setupBodyLabels = function () {
            // container1
            this._bodyContainers[0] = new createjs.Container();
            this._instructionsRRectBGs[0] = new createjs.Shape();
            this._instructionsRRectBGs[0].graphics.beginFill('#fff');
            this._instructionsRRectBGs[0].graphics.drawRoundRect(15, 175, config.Screen.WIDTH - 30, 275, 25);
            this._instructionsRRectBGs[0].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._instructionsRRectBGs[0].alpha = .1;
            this._bodyParas[0] = new objects.Label("Your name is Jim, and you are a wild cowboy\nhailing from the proud kingdom of Moshorse, \nBelusra.You once enjoyed a peaceful life as\na mere traveller of the desert.But now, you\nare heralded as the chosen hero of the\nuniverse.Your life of tranquility has ended\nand you fight daily for the lives of many...", "30px customfont", "#00FF48", config.Screen.CENTER_X + 10, config.Screen.CENTER_Y);
            this._bodyParas[0].alpha = .9;
            this._bodyContainers[0].addChild(this._instructionsRRectBGs[0], this._bodyParas[0]);
            // start off, off screen so can zoom in later
            this._bodyContainers[0].y = 5000;
            // container2
            this._bodyContainers[1] = new createjs.Container();
            this._instructionsRRectBGs[1] = new createjs.Shape();
            this._instructionsRRectBGs[1].graphics.beginFill('#fff');
            this._instructionsRRectBGs[1].graphics.drawRoundRect(15, 175, config.Screen.WIDTH - 30, 275, 25);
            this._instructionsRRectBGs[1].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._instructionsRRectBGs[1].alpha = .1;
            this._bodyParas[1] = new objects.Label("You pilot Amso, the spaceship you named after\nyour beloved cow, across the many galaxies of\nour universe. Throughout your journey, you\nmust navigate through asteroid belts, enemy\nfortresses, and enemy defense lines in order\nto eventually end the reign of the evil tyrant,\nSaja.", "30px customfont", "#00FF48", config.Screen.CENTER_X + 3, config.Screen.CENTER_Y);
            this._bodyParas[1].alpha = .9;
            this._bodyContainers[1].addChild(this._instructionsRRectBGs[1], this._bodyParas[1]);
            // start off, off screen so can zoom in later
            this._bodyContainers[1].y = 5000;
            // container3
            this._bodyContainers[2] = new createjs.Container();
            this._instructionsRRectBGs[2] = new createjs.Shape();
            this._instructionsRRectBGs[2].graphics.beginFill('#fff');
            this._instructionsRRectBGs[2].graphics.drawRoundRect(15, 175, config.Screen.WIDTH - 30, 275, 25);
            this._instructionsRRectBGs[2].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._instructionsRRectBGs[2].alpha = .1;
            this._bodyParas[2] = new objects.Label("You complete your travels when you slay the\nevil emperor, Saja, and restore peace back to\nthe people of the universe. Before then, you\nmust navigate your spaceship, using controls\nyou later select, complete mission objectives,\nand accrue enough strength to do battle with\nSaja.", "30px customfont", "#00FF48", config.Screen.CENTER_X + 3, config.Screen.CENTER_Y);
            this._bodyParas[2].alpha = .9;
            this._bodyContainers[2].addChild(this._instructionsRRectBGs[2], this._bodyParas[2]);
            // start off, off screen so can zoom in later
            this._bodyContainers[2].y = 5000;
            this.addChild(this._bodyContainers[0], this._bodyContainers[1], this._bodyContainers[2]);
        };
        /**
         * Dispalys the nth panel of instructions - header and body container
         *
         * @private
         * @param {objects.Label} h header label for the current panel of instructions
         * @param {createjs.Container} b the body container for the current panel of instructions
         *
         * @memberOf Instructions
         */
        Instructions.prototype._displaySlide = function (h, b) {
            var _this = this;
            console.log(h);
            // header fades into view
            createjs.Tween.get(h).wait(1000).to({
                alpha: 1
            }, 1000);
            // body zooms up
            createjs.Tween.get(b).wait(1500).to({
                y: 0
            }, 1000).call(function (e) {
                // only setup handlers now so the player can only click after animation finishes
                _this._setupStageMouseEventHandlers();
            });
        };
        /**
         * Hides the nth panel of instructions - header and body container
         *
         * @private
         * @param {objects.Label} h header label for the current panel of instructions
         * @param {createjs.Container} b the body container for the current panel of instructions
         *
         * @memberOf Instructions
         */
        Instructions.prototype._hideSlide = function (h, b) {
            // prevents skipping all instructions scene by spam clicking
            stage.removeAllEventListeners();
            // header fades into view
            createjs.Tween.get(h).wait(200).to({
                y: -2000
            }, 1000);
            // body zooms up
            createjs.Tween.get(b).wait(200).to({
                y: -2000
            }, 1000);
        };
        Instructions.prototype._setupFlashingLabel = function () {
            this._flashingClickToContinue = new objects.Label("- Click anywhere to continue -", "30px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y + 200);
            this._flashingClickToContinue.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._flashingClickToContinue);
        };
        Instructions.prototype._setupButtons = function () {
            this._beginBtn = new objects.Button("letsbeginbtn", config.Screen.CENTER_X + 150, config.Screen.CENTER_Y + 200);
            this._beginBtn.on("click", this._beginBtnClick, this);
            this._beginBtn.alpha = 0;
            this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 150, config.Screen.CENTER_Y + 200);
            this._menuBtn.on("click", this._menuBtnClick, this);
            this._menuBtn.alpha = 0;
            this.addChild(this._beginBtn, this._menuBtn);
        };
        /**
         * Switches the scene to LEVEL1
         *
         * @private
         *
         * @memberOf Instructions
         */
        Instructions.prototype._beginBtnClick = function () {
            scene = config.Scene.CONTROLSELECT;
            changeScene();
        };
        /**
        * Switches the scene to Menu
        *
        * @private
        *
        * @memberOf Instructions
        */
        Instructions.prototype._menuBtnClick = function () {
            scene = config.Scene.MENU;
            changeScene();
        };
        /**
         * Sets up the background image, and its box blur filter
         *
         * @private
         *
         * @memberOf Menu
         */
        Instructions.prototype._setupBackground = function () {
            // Setting up BACKGROUND
            this._bg = new objects.Background("bg1", 0, 1);
            this._bgBuffer = new objects.Background("bg1", 1024, 1);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            var bitmapBounds = this._bg.getBounds();
            var bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map