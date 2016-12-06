var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @description Defines player's weapon
 * @export
 * @class Player_bullet
 * @extends {objects.GameObject}
 **/
var objects;
(function (objects) {
    var Player_bullet = (function (_super) {
        __extends(Player_bullet, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Player_bullet(imgString) {
            _super.call(this, imgString);
            this.start();
        }
        Object.defineProperty(Player_bullet.prototype, "Speed", {
            // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
            get: function () { return this._speed; },
            set: function (newSpeed) { this._speed = newSpeed; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player_bullet.prototype, "InFlight", {
            get: function () { return this._inFlight; },
            set: function (newState) { this._inFlight = newState; },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Player_bullet.prototype.start = function () {
            this._defaultPostion = new objects.Vector2(-1000, -1000);
            this.Speed = 8;
            this._reset();
        };
        Player_bullet.prototype.update = function () {
            if (this.InFlight) {
                this.x += this.Speed;
            }
            this.position = new objects.Vector2(this.x, this.y);
            this._checkBounds();
        };
        Player_bullet.prototype.destroy = function () {
            this._reset();
        };
        Player_bullet.prototype.fire = function (newPosition) {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.InFlight = true;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Player_bullet.prototype._reset = function () {
            this.position = this._defaultPostion;
            this.x = this.position.x;
            this.y = this.position.y;
            this.InFlight = false;
            this.isColliding = false;
        };
        Player_bullet.prototype._checkBounds = function () {
            if (this.position.x >= config.Screen.WIDTH + this.width * 0.5) {
                this._reset();
            }
        };
        return Player_bullet;
    }(objects.GameObject));
    objects.Player_bullet = Player_bullet; // end class
})(objects || (objects = {})); // end module
//# sourceMappingURL=player_bullet.js.map