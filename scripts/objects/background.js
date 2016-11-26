/**
 * @description Define background objects
 * @export
 * @class Background
 * @extends {createjs.Bitmap}
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Background = (function (_super) {
        __extends(Background, _super);
        function Background(imageString) {
            _super.call(this, assets.getResult(imageString));
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Background.prototype.start = function () {
            this.x = 0;
            this._dx = 3; // 5px per frame down
        };
        Background.prototype.update = function () {
            this.x -= this._dx;
            this._reset();
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Background.prototype._reset = function () {
            if (this.x <= -1108) {
                this.x = 0;
            }
        };
        return Background;
    }(createjs.Bitmap));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map