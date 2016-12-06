var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @description Defines enemy object used in the second stage
 * @export
 * @class Enemy2
 * @extends {objects.GameObject}
 **/
var objects;
(function (objects) {
    var Enemy2 = (function (_super) {
        __extends(Enemy2, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy2() {
            _super.call(this, "enemy2");
            this._life = 2;
            //private _explosion:objects.GameObject;
            // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
            this.DefaultFireRate = 10;
            this.Reload = 0;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Enemy2.prototype.start = function () {
            this._reset();
        };
        Enemy2.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            if (this.x > 600)
                this.x -= this._dx;
            this._checkBounds();
            if (this.Reload < this.DefaultFireRate) {
                this.Reload++;
            }
        };
        Enemy2.prototype.destroy = function () {
            this._life--;
            if (this._life === 0) {
                this._reset();
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Enemy2.prototype._reset = function () {
            this.isColliding = false;
            this._life = 2;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
            this.x = 890;
            // get a random x location
            this.y = Math.floor((Math.random() * (628 - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
        };
        Enemy2.prototype._checkBounds = function () {
            if (this.y >= (config.Screen.HEIGHT + (this.height * 0.5)) || this.y <= (0 - (this.height * 0.5))) {
                this._reset();
            }
        };
        return Enemy2;
    }(objects.GameObject));
    objects.Enemy2 = Enemy2;
})(objects || (objects = {}));
//# sourceMappingURL=enemy2.js.map