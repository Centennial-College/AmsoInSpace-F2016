/**
 * @description Level 1
 * @export
 * @class Level1
 * @extends {objects.Scene}
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
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Level1.prototype.start = function () {
            console.log("Level1 Scene started");
            this._collision = new managers.Collision();
            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);
            this._player = new objects.Player();
            this.addChild(this._player);
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
            //bgm
            this._level1_bgsound = createjs.Sound.play("level1_bgsound");
            this._level1_bgsound.loop = -1;
            this._lblLevel = new objects.Label("Level 1", "40px customfont", "#FFFF00", config.Screen.CENTER_X - 250, 5);
            this._lblLives = new objects.Label("Lives: " + lives, "40px customfont", "#FB791A", config.Screen.CENTER_X, 5);
            this._lblScore = new objects.Label("Score: " + score, "40px customfont", "#1AFBF4", config.Screen.CENTER_X + 250, 5);
            this.addChild(this._lblLevel, this._lblLives, this._lblScore);
            stage.addChild(this);
        };
        Level1.prototype.update = function () {
            var _this = this;
            this._bg.update();
            this._player.update();
            this._diamond.forEach(function (diamond) {
                diamond.update();
                _this._collision.check(_this._player, diamond);
            });
            this._enemy.forEach(function (enemy) {
                enemy.update();
                _this._collision.check(_this._player, enemy);
            });
            this._updateScoreBoard();
            if (lives < 1) {
                this._level1_bgsound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Level1.prototype._updateScoreBoard = function () {
            this._lblLives.text = "Lives: " + lives;
            this._lblScore.text = "Score: " + score;
            // Test Automatically moving to Stage 2
            if (score >= 1000) {
                this._level1_bgsound.stop();
                scene = config.Scene.LEVEL2;
                changeScene();
            }
        };
        return Level1;
    }(objects.Scene));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map