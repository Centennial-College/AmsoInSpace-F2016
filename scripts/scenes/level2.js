/**
 * @file level2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.4.2 - added mission objectives to scrollingLevel
 * @description This level introduces enemy ships and shooting feature
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        // private _enemyBullets: objects.Enemy2_bullet[];
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Level2() {
            _super.call(this, "level2_bgsound", "bg2");
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Level2.prototype.start = function () {
            var _this = this;
            // intiial setup
            level = 2;
            beamEnergyPercent = 100;
            missionGoal = 1;
            // missionGoal = 5
            missionProgress = 0;
            console.log("Level2 Scene started");
            this.addChild(this._player = new objects.Player());
            this._collision = new managers.Collision();
            // adding diamond gameobjects
            this._diamonds = new Array();
            for (var count = 0; count < 1; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }
            // adding enemy ships
            this._enemyShips = new Array();
            for (var count = 0; count < 2; count++) {
                this._enemyShips.push(new objects.Enemy2());
                this.addChild(this._enemyShips[count]);
            }
            // adding player bullets to the scene
            this._player._bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            // adding enemy bullets to the scene
            this._enemyShips.forEach(function (enemy) {
                enemy._bullets.forEach(function (bullet) {
                    _this.addChild(bullet);
                });
            });
            stage.addChild(this);
        };
        Level2.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this._updateBeamEnergyBar();
            // updates diamonds position and checks for collision b/t player and diamonds
            this._diamonds.forEach(function (diamond) {
                diamond.update();
                _this._collision.check(_this._player, diamond);
            });
            // updates enemy position and checks for collision b/t player and enemy
            this._enemyShips.forEach(function (enemy) {
                enemy.update();
                if (_this._collision.check(_this._player, enemy)) {
                    enemy.destroy();
                }
                enemy._bullets.forEach(function (bullet) {
                    _this._collision.check(_this._player, bullet);
                });
            });
            // updates bullets position and checks for collision b/t enemy and bullets
            this._player._bullets.forEach(function (bullet) {
                bullet.update();
                _this._enemyShips.forEach(function (enemy) {
                    _this._collision.check(enemy, bullet);
                });
            });
            // level 2 requires score of 2000 points to advance to the next level
            if (missionProgress >= missionGoal && !this._levelComplete) {
                // this._canAdvanceToNextLevel = true
                this._advanceToNextLevel();
                this._bgSound.stop();
                // createjs.Sound.stop()
                scene = config.Scene.LEVEL3;
            }
            this._missionObjectiveLbl.text = "- Destroy enemy ships to get ship parts: " + missionProgress +
                "/" + missionGoal;
            // this._missionObjectiveLbl.text = "- Earn enough money to fix the ship: " + this._missionObjProgress +
            // "/" + this._missionObjectiveGoal
            // level 1 requires score of 1000 points to advance to the next level
            // if (score >= 1000 && !this._canAdvanceToNextLevel) {
            if (missionProgress >= missionGoal && !this._levelComplete) {
                // this._canAdvanceToNextLevel = true
                this._advanceToNextLevel();
                this._bgSound.stop();
                // createjs.Sound.stop()
                scene = config.Scene.LEVEL3;
            }
        };
        return Level2;
    }(scenes.ScrollingLevel));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map