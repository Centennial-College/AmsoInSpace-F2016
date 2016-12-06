/**
 * @file menu.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.6 hide cursor during scrollingLevel scenes
 * @description This is the main title scene
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this._setupBackground();
            this._setupAmsoMenuImage();
            this._setupTitleAndSubtitleLabels();
            this._setupButtons();
            stage.cursor = 'default';
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
            this._bg.update();
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the play game, and instructions buttons and their associated animations, and event listeners
         *
         * @private
         *
         * @memberOf Menu
         */
        Menu.prototype._setupButtons = function () {
            var _this = this;
            // Setting up Buttons 
            this._playgameBtn = new objects.Button("playgameBtn", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 110);
            this._playgameBtn.shadow = new createjs.Shadow('#000', 2, 2, 5);
            this._instructionsBtn = new objects.Button("instructionsBtn", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 190);
            this._instructionsBtn.shadow = new createjs.Shadow('#000', 2, 2, 5);
            this._btnContainer = new createjs.Container();
            this._btnContainer.alpha = 0;
            this._btnContainer.addChild(this._playgameBtn, this._instructionsBtn);
            // fade in effect
            createjs.Tween.get(this._btnContainer).wait(3000).to({
                alpha: 1
            }, 1500).call(function (e) {
                // only add event listeners after animations finish
                _this._playgameBtn.on("click", _this._playgameBtnClick, _this);
                _this._instructionsBtn.on("click", _this._instructionsBtnClick, _this);
            });
            this.addChild(this._btnContainer);
        };
        /**
         * Sets up the title and subtitle label, along with their associated animations
         *
         * @private
         *
         * @memberOf Menu
         */
        Menu.prototype._setupTitleAndSubtitleLabels = function () {
            // Setting up TITLE label
            this._titleLabel = new objects.Label("Amso", "150px customfont", "#00FF48", config.Screen.CENTER_X - 200, -5000);
            this._titleLabel.shadow = new createjs.Shadow("#000", 5, 5, 5);
            this.addChild(this._titleLabel);
            // hammer down effect
            createjs.Tween.get(this._titleLabel).to({
                y: config.Screen.CENTER_Y - 100
            }, 1500, createjs.Ease.cubicIn);
            // Setting up SUBTITLE label
            this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#00FF48", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 500));
            this._subtitleLabel.alpha = 0;
            // this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#00B233", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y))
            this._subtitleLabel.shadow = new createjs.Shadow("#000", 2, 2, 2);
            // push up effect
            createjs.Tween.get(this._subtitleLabel).wait(1500).to({
                y: config.Screen.CENTER_Y,
                alpha: .7
            }, 1000, createjs.Ease.cubicIn);
        };
        /**
         * Sets up the Amso menu image and its animation
         *
         * @private
         *
         * @memberOf Menu
         */
        Menu.prototype._setupAmsoMenuImage = function () {
            // Setting up AMSO menu picture
            this._amsoMenuPic = new createjs.Bitmap(assets.getResult("amsomenu"));
            this._amsoMenuPic.scaleX = this._amsoMenuPic.scaleY = .85;
            this._amsoMenuPic.regX = this._amsoMenuPic.getBounds().width / 2;
            this._amsoMenuPic.regY = this._amsoMenuPic.getBounds().height / 2;
            this._amsoMenuPic.x = config.Screen.CENTER_X;
            this._amsoMenuPic.y = config.Screen.CENTER_Y;
            this._amsoMenuPic.rotation = 1080;
            this._amsoMenuPic.alpha = 0;
            this._amsoMenuPic.shadow = new createjs.Shadow("#f00", 0, 0, 50);
            this.addChild(this._amsoMenuPic);
            // fade in effect - so he looks like he is alien from space
            createjs.Tween.get(this._amsoMenuPic).to({
                alpha: 1
            }, 1000);
        };
        /**
         * Sets up the background image, and its box blur filter
         *
         * @private
         *
         * @memberOf Menu
         */
        Menu.prototype._setupBackground = function () {
            // Setting up BACKGROUND
            this._bg = new objects.Background("bg1", 1);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            var bitmapBounds = this._bg.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this.addChild(this._bg);
        };
        /**
         * Plays animations and changes scene to LEVEL1
         *
         * @private
         *
         * @memberOf Menu
         */
        Menu.prototype._playgameBtnClick = function () {
            createjs.Sound.play("moo");
            // screen fades into black Background
            createjs.Tween.get(this).wait(500).to({
                alpha: 0
            }, 1500);
            // amso disappear animation - looks like being sucked into another dimension/space
            createjs.Tween.get(this._amsoMenuPic).wait(500).to({
                rotation: 0,
                scaleX: 0,
                scaleY: 0,
                alpha: 0
            }, 1500).call(function (e) {
                scene = config.Scene.LEVEL1;
                changeScene();
            });
        };
        /**
         * Changes scene to instructions scene
         *
         * @private
         *
         * @memberOf Menu
         */
        Menu.prototype._instructionsBtnClick = function () {
            scene = config.Scene.RULE;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu; // end class Menu
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map