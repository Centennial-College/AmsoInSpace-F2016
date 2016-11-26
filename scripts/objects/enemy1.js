var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @description Defines enemy object used in the first stage
 * @export
 * @class Enemy1
 * @extends {objects.GameObject}
 **/
var objects;
(function (objects) {
    var Enemy1 = (function (_super) {
        __extends(Enemy1, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy1() {
            _super.call(this, "enemy1");
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Enemy1.prototype.start = function () {
            this._reset();
        };
        Enemy1.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Enemy1.prototype._reset = function () {
            this.isColliding = false;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
            this.x = 890;
            // get a random x location
            this.y = Math.floor((Math.random() * (628 - (this.height * 0.5))) + (this.height * 0.5));
        };
        Enemy1.prototype._checkBounds = function () {
            if (this.x <= (0 + (this.width * 0.5))) {
                this._reset();
            }
        };
        return Enemy1;
    }(objects.GameObject));
    objects.Enemy1 = Enemy1;
})(objects || (objects = {}));
//# sourceMappingURL=enemy1.js.map