/**
 * @file asteroid.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.3 fixed asteroid positioning with new ui
 * @description Behavior and Properties of Asteroid GameObject
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Asteroid = (function (_super) {
        __extends(Asteroid, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Asteroid() {
            _super.call(this, "enemy1");
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Asteroid.prototype.start = function () {
            this._reset();
        };
        Asteroid.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Asteroid.prototype._reset = function () {
            this.isColliding = false;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
            this.x = config.Screen.WIDTH;
            // get a random x location
            this.y = Math.floor((Math.random() * (config.Screen.HEIGHT - (this.height * 0.5))) + (this.height * 0.5));
        };
        Asteroid.prototype._checkBounds = function () {
            if ((this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)))
                || (this.x <= (0 + (this.width * 0.5)))) {
                this._reset();
            }
        };
        return Asteroid;
    }(objects.GameObject));
    objects.Asteroid = Asteroid;
})(objects || (objects = {}));
//# sourceMappingURL=asteroid.js.map