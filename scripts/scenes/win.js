/**
 * @file wins.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 12 2016
 * @version 0.4.3 added gameover and gamewin sounds
 * @description This is the gamewin scene that is displayed
 *              when the player wins the game.
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Win = (function (_super) {
        __extends(Win, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Win() {
            _super.call(this);
            stage.cursor = 'default';
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Win.prototype.start = function () {
            console.log("Gamewin Scene started");
            createjs.Sound.play('gamewin');
            // Setting up BACKGROUND
            this._bg = new objects.Background(currBgImgString, 0, 1);
            this._bgBuffer = new objects.Background(currBgImgString, 1024, 1);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            var bitmapBounds = this._bg.getBounds();
            var bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);
            this._lblGamewin = new objects.Label("Congratulations, you win!", "80px customfont", "#FDFDFD", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this._lblScore = new objects.Label("SCORE: " + score, "60px customfont", "#1AFBF4", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._lblGamewin, this._lblScore);
            // this._playagainBtn = new objects.Button("playagainbtn", config.Screen.CENTER_X + 125, config.Screen.CENTER_Y + 150);
            // this._playagainBtn.on("click", this._playagainBtnClick, this);
            // this.addChild(this._playagainBtn);
            // this.addChild(this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 125, config.Screen.CENTER_Y + 150))
            // this._menuBtn.on('click', this._menuBtnClick, this)
            stage.addChild(this);
        };
        Win.prototype.update = function () {
            this._bg.update();
            this._bgBuffer.update();
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Win.prototype._playagainBtnClick = function () {
            scene = config.Scene.LEVEL1;
            changeScene();
        };
        Win.prototype._menuBtnClick = function () {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Win;
    }(objects.Scene));
    scenes.Win = Win;
})(scenes || (scenes = {}));
//# sourceMappingURL=win.js.map