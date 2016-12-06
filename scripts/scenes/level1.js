/**
 * @file scrollingLevel.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.1 recreated Level1 to extend from abstract scrollingLevel
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
            level = 1;
            this._diamond = new Array();
            for (var count = 0; count < 2; count++) {
                this._diamond.push(new objects.Diamond());
                this.addChild(this._diamond[count]);
            }
            this._enemy = new Array();
            for (var count = 0; count < 2; count++) {
                this._enemy.push(new objects.Enemy1());
                this.addChild(this._enemy[count]);
            }
            // super.addChild(this);
            stage.addChild(this);
        };
        Level1.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this._diamond.forEach(function (diamond) {
                diamond.update();
                _this._collision.check(_this._player, diamond);
            });
            this._enemy.forEach(function (enemy) {
                enemy.update();
                _this._collision.check(_this._player, enemy);
            });
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