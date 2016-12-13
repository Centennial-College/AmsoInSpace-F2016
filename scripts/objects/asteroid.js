/**
 * @file asteroid.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.4 fixed collisions for current game objects
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
            this.x -= this._dx;
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            this._checkBounds();
        };
        Asteroid.prototype._reset = function () {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.isColliding = false;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 3) + 1); // horizontal drift
            this.x = config.Screen.WIDTH;
            // get a random y location
            this.y = Math.floor((Math.random() * ((config.Screen.HEIGHT - (this.height * 0.5)) - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
            this.alpha = 1;
        };
        Asteroid.prototype.destroy = function () {
            this._reset();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Asteroid.prototype._checkBounds = function () {
            if ((this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)))
                || (this.x <= (0 - (this.width * 0.5)))) {
                this._reset();
            }
        };
        return Asteroid;
    }(objects.GameObject));
    objects.Asteroid = Asteroid;
})(objects || (objects = {}));
//# sourceMappingURL=asteroid.js.map