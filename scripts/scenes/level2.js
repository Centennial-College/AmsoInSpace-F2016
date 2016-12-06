/**
 * @description Level 2
 * @export
 * @class Level2
 * @extends {objects.Scene}
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
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Level2.prototype.start = function () {
            console.log("Level2 Scene started");
            this._collision = new managers.Collision();
            this._bg = new objects.Background("bg2");
            this.addChild(this._bg);
            this._player = new objects.Player();
            this._player.on("click", this._playerFire, this);
            this.addChild(this._player);
            this._diamond = new Array();
            for (var count = 0; count < 2; count++) {
                this._diamond.push(new objects.Diamond());
                this.addChild(this._diamond[count]);
            }
            this._enemy = new Array();
            for (var count = 0; count < 2; count++) {
                this._enemy.push(new objects.Enemy2());
                this.addChild(this._enemy[count]);
            }
            this._bullets = new Array();
            for (var bullet = 0; bullet < 20; bullet++) {
                this._bullets.push(new objects.Player_bullet("player_bullet"));
                this.addChild(this._bullets[bullet]);
            }
            this._enemyBullets = new Array();
            for (var bullet_1 = 0; bullet_1 < 5; bullet_1++) {
                this._enemyBullets.push(new objects.Enemy2_bullet());
                this.addChild(this._enemyBullets[bullet_1]);
            }
            //bgm
            this._level2_bgsound = createjs.Sound.play("level2_bgsound");
            this._level2_bgsound.loop = -1;
            this._lblLevel = new objects.Label("Level 2", "40px customfont", "#FFFF00", config.Screen.CENTER_X - 250, 5);
            this._lblLives = new objects.Label("Lives: " + lives, "40px customfont", "#FB791A", config.Screen.CENTER_X, 5);
            this._lblScore = new objects.Label("Score: " + score, "40px customfont", "#1AFBF4", config.Screen.CENTER_X + 250, 5);
            this.addChild(this._lblLevel, this._lblLives, this._lblScore);
            stage.addChild(this);
        };
        Level2.prototype.update = function () {
            var _this = this;
            this._bg.update();
            this._player.update();
            this._diamond.forEach(function (diamond) {
                diamond.update();
                _this._collision.check(_this._player, diamond);
            });
            this._enemy.forEach(function (enemy) {
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
                _this._collision.check(_this._player, enemy);
            });
            this._bullets.forEach(function (bullet) {
                bullet.update();
                _this._enemy.forEach(function (enemy) {
                    _this._collision.check(enemy, bullet);
                });
            });
            this._enemyBullets.forEach(function (bullet) {
                bullet.update();
                _this._collision.check(_this._player, bullet);
            });
            this._updateScoreBoard();
            if (lives < 1) {
                this._level2_bgsound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Level2.prototype._updateScoreBoard = function () {
            this._lblLives.text = "Lives: " + lives;
            this._lblScore.text = "Score: " + score;
        };
        Level2.prototype._playerFire = function () {
            if (this._player.Reload === this._player.DefaultFireRate) {
                this._player.Reload = 0;
                for (var bullet in this._bullets) {
                    if (!this._bullets[bullet].InFlight) {
                        this._bullets[bullet].fire(this._player.position);
                        break;
                    }
                }
            }
        };
        return Level2;
    }(objects.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map