/**
 * @file level3.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1 initial
 * @description This level introduces enemy ships and shooting feature
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Level3() {
            _super.call(this, "level3_bgsound", "bg3");
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Level3.prototype.start = function () {
            var _this = this;
            // intiial setup
            level = 3;
            beamEnergyPercent = 100;
            missionGoal = 1;
            missionProgress = 0;
            console.log("Level3 Scene started");
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
                this._enemyShips.push(new objects.Enemy3());
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
            // prepare for boss stage
            this._bossSignal = new objects.Label("Saja is Incoming!!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._bossSignal.alpha = 0;
            this.addChild(this._bossSignal);
            // adding boss to scene
            this._boss = new objects.Saja();
            this.addChild(this._boss);
            // adding boss bullet;
            this._boss._bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            stage.addChild(this);
            // true when objective of stage has done.
            this._bossFlag = false;
        };
        Level3.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this._updateBeamEnergyBar();
            // updates bullets position and checks for collision b/t enemy and bullets
            this._player._bullets.forEach(function (bullet) {
                bullet.update();
                if (!_this._bossFlag) {
                    _this._enemyShips.forEach(function (enemy) {
                        _this._collision.check(enemy, bullet);
                    });
                }
                else {
                    _this._collision.check(_this._boss, bullet);
                }
            });
            if (this._bossFlag) {
                this._bossStage();
            }
            else {
                this._enemy3Stage();
            }
            // run only once when when boss is coming out
            if (missionProgress >= missionGoal && !this._bossFlag) {
                this._bossFlag = true;
                // code from super._advanceToNextLevel()
                this.addChild(this._lblLevelComplete = new objects.Label("MISSION " + level + " COMPLETE!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y));
                this._lblLevelComplete.shadow = new createjs.Shadow("#fff", 0, 0, 2);
                this._levelComplete = true;
                createjs.Tween.get(this._lblLevelComplete)
                    .to({ alpha: 0, y: this._lblLevelComplete.y - 100 }, 1000);
                this._bossSpawnTime = createjs.Ticker.getTime();
                this._clearStage();
            }
            // this._missionObjectiveLbl.text = "- Earn enough money to fix the ship: " + this._missionObjProgress +
            // "/" + this._missionObjectiveGoal
            if (missionProgress >= missionGoal && !this._levelComplete) {
                // this._canAdvanceToNextLevel = true
                scene = config.Scene.WIN;
                this._advanceToNextLevel();
                this._bgSound.stop();
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Level3.prototype._enemy3Stage = function () {
            var _this = this;
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
            this._missionObjectiveLbl.text = "- Destroy enemy ships to get ship parts: " + missionProgress + "/" + missionGoal;
        };
        Level3.prototype._bossStage = function () {
            var _this = this;
            var signalBoss;
            // blick signal
            if (createjs.Ticker.getTime() - this._bossSpawnTime > 1000 && createjs.Ticker.getTime() - this._bossSpawnTime < 2500) {
                if (createjs.Ticker.getTime() % 200 >= 100) {
                    this._bossSignal.alpha = 0.5;
                }
                else {
                    this._bossSignal.alpha = 1;
                }
            }
            else if (createjs.Ticker.getTime() - this._bossSpawnTime > 2500) {
                this._bossSignal.alpha = 0;
                this._boss.update();
                if (this._collision.check(this._player, this._boss)) {
                    this._boss.destroy();
                }
                this._boss._bullets.forEach(function (bullet) {
                    _this._collision.check(_this._player, bullet);
                });
            }
            this._missionObjectiveLbl.text = "- Defeat Saja's Grand Generals: " + missionProgress + "/" + missionGoal;
        };
        // clear enemy3s and their bullets
        Level3.prototype._clearStage = function () {
            var _this = this;
            this._diamonds.forEach(function (diamond) {
                diamond.reset();
                _this.removeChild(diamond);
            });
            this._enemyShips.forEach(function (enemy) {
                enemy.reset();
                enemy._bullets.forEach(function (bullet) {
                    bullet.reset();
                    _this.removeChild(bullet);
                });
                _this.removeChild(enemy);
            });
            // initialize boss stage
            missionProgress = 0;
            missionGoal = 20;
        };
        return Level3;
    }(scenes.ScrollingLevel));
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));
//# sourceMappingURL=level3.js.map