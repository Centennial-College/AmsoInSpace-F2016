var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file pause.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.1.10 - added pause scene
 * @description This is the pause scene which bridges level scenes to menu and upgrade scenes
 **/
var scenes;
(function (scenes) {
    var Pause = (function (_super) {
        __extends(Pause, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Pause() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Pause.prototype.start = function () {
            console.log("Pause Scene started");
            this.addChild(this._overlayBG = new createjs.Shape());
            this.addChild(new objects.Label("-PAUSED-", "60px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y));
            this.addChild(this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 125, config.Screen.CENTER_Y + 100));
            this.addChild(this._upgradesBtn = new objects.Button("upgradesbtn", config.Screen.CENTER_X + 125, config.Screen.CENTER_Y + 100));
            this._overlayBG.graphics.beginFill('#000')
                .drawRect(0, 0, config.Screen.WIDTH, config.Screen.HEIGHT);
            this._overlayBG.alpha = .7;
            this._menuBtn.on("click", this._menuBtnClick, this);
            stage.addChild(this);
        };
        Pause.prototype.update = function () {
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Pause.prototype._menuBtnClick = function () {
            createjs.Sound.stop();
            createjs.Ticker.paused = false;
            scene = config.Scene.MENU;
            changeScene();
        };
        Pause.prototype._upgradesBtnClick = function () {
        };
        return Pause;
    }(objects.Scene));
    scenes.Pause = Pause; // end class Menu
})(scenes || (scenes = {}));
//# sourceMappingURL=pause.js.map