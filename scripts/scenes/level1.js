/**
 * @file scrollingLevel.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.3 fixed asteroid positioning with new ui
 * @description This will be the training level in the game
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Level1() {
            _super.call(this, "level1_bgsound", "bg1");
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Level1.prototype.start = function () {
            console.log("Level1 Scene started");
            this.addChild(this._player = new objects.Player());
            level = 1;
            score = 0;
            this._diamonds = new Array();
            for (var count = 0; count < 1; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }
            this._asteroids = new Array();
            for (var count = 0; count < 3; count++) {
                this._asteroids.push(new objects.Asteroid());
                this.addChild(this._asteroids[count]);
            }
            // super.addChild(this);
            stage.addChild(this);
        };
        Level1.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this._diamonds.forEach(function (diamond) {
                diamond.update();
                _this._collision.check(_this._player, diamond);
            });
            this._asteroids.forEach(function (asteroid) {
                asteroid.update();
                if (_this._collision.check(_this._player, asteroid)) {
                    asteroid._reset();
                }
            });
            // level 1 requires score of 1000 points to advance to the next level
            // if (score >= 1000 && !this._canAdvanceToNextLevel) {
            if (score >= 100 && !this._levelComplete) {
                // this._canAdvanceToNextLevel = true
                this._advanceToNextLevel();
                scene = config.Scene.LEVEL2;
            }
            if (lives < 1) {
                this._bgSound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        };
        return Level1;
    }(scenes.ScrollingLevel));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map