/**
 * @file bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.1 refactored bullets into abstract class and children of
 *          abstract class
 * @description Behavior and Properties of Bullet GameObject
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        // player bullets and enemy bullets go in diff directions
        // player bullets and enemy bullets have different image strings
        function Bullet(imgString, _speed) {
            _super.call(this, imgString);
            this._speed = _speed;
            this.start();
        }
        Object.defineProperty(Bullet.prototype, "Speed", {
            // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
            get: function () { return this._speed; },
            set: function (newSpeed) { this._speed = newSpeed; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "InFlight", {
            get: function () { return this._inFlight; },
            set: function (newState) { this._inFlight = newState; },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Bullet.prototype.start = function () {
            this._defaultPostion = new objects.Vector2(-1000, -1000);
            // this.Speed = 8;
            this._reset();
        };
        Bullet.prototype.update = function () {
            if (this.InFlight) {
                this.x += this.Speed;
            }
            this.position = new objects.Vector2(this.x, this.y);
            this._checkBounds();
        };
        Bullet.prototype.destroy = function () {
            this._reset();
        };
        Bullet.prototype.fire = function (newPosition) {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.InFlight = true;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Bullet.prototype._reset = function () {
            this.position = this._defaultPostion;
            this.x = this.position.x;
            this.y = this.position.y;
            this.InFlight = false;
            this.isColliding = false;
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet; // end class
})(objects || (objects = {})); // end module
//# sourceMappingURL=bullet.js.map