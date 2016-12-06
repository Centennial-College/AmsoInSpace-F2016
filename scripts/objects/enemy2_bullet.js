var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @description Defines enemy2's weapon
 * @export
 * @class Enemy2_bullet
 * @extends {objects.GameObject}
 **/
var objects;
(function (objects) {
    var Enemy2_bullet = (function (_super) {
        __extends(Enemy2_bullet, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy2_bullet() {
            _super.call(this, "enemy2_bullet");
            this.start();
        }
        Object.defineProperty(Enemy2_bullet.prototype, "Speed", {
            // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
            get: function () { return this._speed; },
            set: function (newSpeed) { this._speed = newSpeed; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy2_bullet.prototype, "InFlight", {
            get: function () { return this._inFlight; },
            set: function (newState) { this._inFlight = newState; },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Enemy2_bullet.prototype.start = function () {
            this._defaultPostion = new objects.Vector2(-1000, -1000);
            this.Speed = 8;
            this._reset();
        };
        Enemy2_bullet.prototype.update = function () {
            if (this.InFlight) {
                this.x -= this.Speed;
            }
            this.position = new objects.Vector2(this.x, this.y);
            this._checkBounds();
        };
        Enemy2_bullet.prototype.destroy = function () {
            this._reset();
        };
        Enemy2_bullet.prototype.fire = function (newPosition) {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.InFlight = true;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Enemy2_bullet.prototype._reset = function () {
            this.position = this._defaultPostion;
            this.x = this.position.x;
            this.y = this.position.y;
            this.InFlight = false;
            this.isColliding = false;
        };
        Enemy2_bullet.prototype._checkBounds = function () {
            if (this.position.x <= this.width * 0.5) {
                this._reset();
            }
        };
        return Enemy2_bullet;
    }(objects.GameObject));
    objects.Enemy2_bullet = Enemy2_bullet;
})(objects || (objects = {}));
//# sourceMappingURL=enemy2_bullet.js.map