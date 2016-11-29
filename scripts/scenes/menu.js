var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file menu.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @version 0.1.1 - added amso image to menu scene
 * @description This is the main title scene
 **/
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype.start = function () {
            console.log("Menu Scene started");
            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);
            this._amsoMenuPic = new createjs.Bitmap(assets.getResult("amsomenu"));
            this._amsoMenuPic.scaleX = this._amsoMenuPic.scaleY = .85;
            this.addChild(this._amsoMenuPic);
            this._menuLabel = new objects.Label("Title!", "80px Showcard Gothic", "#FF0033", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this.addChild(this._menuLabel);
            this._btnStart = new objects.Button("startButton", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 150);
            this._btnStart.on("click", this._btnStartClick, this);
            this._btnRule = new objects.Button("ruleButton", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 150);
            this._btnRule.on("click", this._btnRuleClick, this);
            this.addChild(this._btnStart, this._btnRule);
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype._btnStartClick = function () {
            scene = config.Scene.LEVEL1;
            changeScene();
        };
        Menu.prototype._btnRuleClick = function () {
            scene = config.Scene.RULE;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu; // end class Menu
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map