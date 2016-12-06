/**
 * @file diamond.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.2 fixed diamonds positioning with new ui
 * @description Behavior and Properties of Diamond GameObject
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Diamond = (function (_super) {
        __extends(Diamond, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        function Diamond() {
            _super.call(this, "diamond");
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Diamond.prototype.start = function () {
            this._reset();
        };
        Diamond.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++       
        Diamond.prototype._reset = function () {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.isColliding = false;
            this.visible = true;
            this._dx = Math.floor((Math.random() * 3) + 5); // horizontal drift
            this._dy = Math.floor((Math.random() * 3) + 1); // horizontal drift
            this.x = config.Screen.WIDTH;
            // get a random y location
            this.y = Math.floor((Math.random() * ((config.Screen.HEIGHT - (this.height * 0.5)) - (this.height * 0.5))) + (this.height * 0.5));
            this.alpha = 1;
        };
        Diamond.prototype._checkBounds = function () {
            if (this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)) || (this.x <= (0 + (this.width * 0.5)))) {
                this._reset();
            }
        };
        return Diamond;
    }(objects.GameObject));
    objects.Diamond = Diamond;
})(objects || (objects = {}));
//# sourceMappingURL=diamond.js.map