var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file menu.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @version 0.1.6 - added disappear animation and moo sound when clicking start game on menu scene
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
            // Background
            this._bg = new objects.Background("bg1", 1);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            var bitmapBounds = this._bg.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this.addChild(this._bg);
            // Setting up AMSO menu picture
            this._amsoMenuPic = new createjs.Bitmap(assets.getResult("amsomenu"));
            this._amsoMenuPic.scaleX = this._amsoMenuPic.scaleY = .85;
            this._amsoMenuPic.regX = this._amsoMenuPic.getBounds().width / 2;
            this._amsoMenuPic.regY = this._amsoMenuPic.getBounds().height / 2;
            this._amsoMenuPic.x = config.Screen.CENTER_X;
            this._amsoMenuPic.y = config.Screen.CENTER_Y;
            this._amsoMenuPic.rotation = 720;
            // this._titleLabel.shadow = new createjs.Shadow('#000', 5, 5, 15)
            // createjs.Tween.get(this._titleLabel).wait(500).to({
            //     x: config.Screen.CENTER_X,
            //     y: config.Screen.CENTER_Y,
            // }, 1500,
            //     createjs.Ease.backOut);
            this.addChild(this._amsoMenuPic);
            this._titleLabel = new objects.Label("Amso", "150px customfont", "#fff", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y - 100);
            this._titleLabel.shadow = new createjs.Shadow("#000", 5, 5, 5);
            this.addChild(this._titleLabel);
            this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#fff", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y));
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
            createjs.Sound.play("moo");
            // amso disappear animation
            createjs.Tween.get(this._amsoMenuPic).wait(500).to({
                rotation: 0,
                scaleX: 0,
                scaleY: 0
            }, 1500).call(function (e) {
                scene = config.Scene.LEVEL1;
                changeScene();
            });
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