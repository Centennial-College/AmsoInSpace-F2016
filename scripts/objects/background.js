var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file background.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @version 0.1.2 - rearranged text on menu scene
 * @description This defines background objects
 **/
var objects;
(function (objects) {
    var Background = (function (_super) {
        __extends(Background, _super);
        function Background(imageString, offset, scrollSpeed) {
            if (scrollSpeed === void 0) { scrollSpeed = 3; }
            _super.call(this, assets.getResult(imageString));
            this._dx = scrollSpeed;
            this._offset = offset;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Background.prototype.start = function () {
            this.x = this._offset;
            // this._dx = 3; // 5px per frame down
        };
        Background.prototype.update = function () {
            this.x -= this._dx;
            this._reset();
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Background.prototype._reset = function () {
            if (this.x <= -1022) {
                this.x = 1022;
            }
        };
        return Background;
    }(createjs.Bitmap));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map