/**
 * @description Defines button objects
 * @export
 * @class Button
 * @extends {createjs.Bitmap}
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(imgString, x, y) {
            _super.call(this, textureAtlas, imgString);
            // Set the registration point of the button. This is used for transformations
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            // Set the position of the button
            this.x = x;
            this.y = y;
            // Register mouseover and mouseout event listeners. 
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }
        // Modify the bitmaps alpha value when hovering over the button
        Button.prototype.overButton = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        // Modify the bitmaps alphave when mouse is not hovering
        Button.prototype.outButton = function (event) {
            event.currentTarget.alpha = 1.0;
        };
        return Button;
    }(createjs.Sprite));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map