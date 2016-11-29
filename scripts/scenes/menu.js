var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file menu.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @version 0.1.2 - rearranged text on menu scene
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
            this._bg = new objects.Background("bg1", 1);
            this.addChild(this._bg);
            this._amsoMenuPic = new createjs.Bitmap(assets.getResult("amsomenu"));
            this._amsoMenuPic.scaleX = this._amsoMenuPic.scaleY = .85;
            this.addChild(this._amsoMenuPic);
            this._titleLabel = new objects.Label("Amso", "150px customfont", "#fff", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y - 250);
            this._titleLabel.shadow = new createjs.Shadow("#000", 5, 5, 5);
            this.addChild(this._titleLabel);
            this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#fff", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y-80));
            this._subtitleLabel.shadow = new createjs.Shadow("#000", 2, 2, 2);
            this._btnStart = new objects.Button("startButton", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 110);
            this._btnStart.on("click", this._btnStartClick, this);
            this._btnRule = new objects.Button("ruleButton", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 190);
            this._btnRule.on("click", this._btnRuleClick, this);
            this.addChild(this._btnStart, this._btnRule);
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
            this._bg.update();
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