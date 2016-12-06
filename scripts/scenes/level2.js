/**
 * @file level2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.3 fixed asteroid positioning with new ui
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
            console.log("Level2 Scene started");
            this.addChild(this._player = new objects.Player());
            this._collision = new managers.Collision();
            this._diamonds = new Array();
            for (var count = 0; count < 2; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }
            this._enemyShips = new Array();
            for (var count = 0; count < 2; count++) {
                this._enemyShips.push(new objects.Enemy2());
                this.addChild(this._enemyShips[count]);
            }
            // this._bullets = new Array<objects.Player_bullet>();
            // for (var bullet = 0; bullet < 20; bullet++) {
            //     this._bullets.push(new objects.Player_bullet("player_bullet"));
            //     this.addChild(this._bullets[bullet]);
            // }
            this._player._bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            this._enemyBullets = new Array();
            for (var bullet = 0; bullet < 5; bullet++) {
                this._enemyBullets.push(new objects.Enemy2_bullet());
                this.addChild(this._enemyBullets[bullet]);
            }
            stage.addChild(this);
        };
        Level2.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this._updateBeamEnergyBar();
            this._diamonds.forEach(function (diamond) {
                diamond.update();
                _this._collision.check(_this._player, diamond);
            });
            this._enemyShips.forEach(function (enemy) {
                enemy.update();
                if (enemy.Reload === enemy.DefaultFireRate) {
                    enemy.Reload = 0;
                    for (var bullet in _this._enemyBullets) {
                        if (!_this._enemyBullets[bullet].InFlight) {
                            _this._enemyBullets[bullet].fire(enemy.position);
                            break;
                        }
                    }
                }
                if (_this._collision.check(_this._player, enemy)) {
                    enemy.destroy();
                }
            });
            this._player._bullets.forEach(function (bullet) {
                bullet.update();
                _this._enemyShips.forEach(function (enemy) {
                    _this._collision.check(enemy, bullet);
                });
            });
            this._enemyBullets.forEach(function (enemyBullet) {
                enemyBullet.update();
                if (_this._collision.check(_this._player, enemyBullet)) {
                    enemyBullet._reset();
                }
            });
        };
        return Level2;
    }(scenes.ScrollingLevel));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map