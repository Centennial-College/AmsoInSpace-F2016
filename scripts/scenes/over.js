/**
 * @file over.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.5 updated links on over.ts
 * @description This is the gameover scene that is displayed
 *              when the player loses the game.
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Over = (function (_super) {
        __extends(Over, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Over() {
            _super.call(this);
            stage.cursor = 'default';
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Over.prototype.start = function () {
            console.log("Menu Scene started");
            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);
            this._lblGameover = new objects.Label("GAME OVER", "80px customfont", "#FDFDFD", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this._lblScore = new objects.Label("SCORE: " + score, "60px customfont", "#1AFBF4", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._lblGameover, this._lblScore);
            this._playagainBtn = new objects.Button("restartButton", config.Screen.CENTER_X + 125, config.Screen.CENTER_Y + 150);
            this._playagainBtn.on("click", this._playagainBtnClick, this);
            this.addChild(this._playagainBtn);
            this.addChild(this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 125, config.Screen.CENTER_Y + 150));
            this._menuBtn.on('click', this._menuBtnClick, this);
            stage.addChild(this);
        };
        Over.prototype.update = function () {
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Over.prototype._playagainBtnClick = function () {
            scene = config.Scene.LEVEL1;
            changeScene();
        };
        Over.prototype._menuBtnClick = function () {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map