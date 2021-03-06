/**
 * @description Defines Text objects
 * @export
 * @class Label
 * @extends {createjs.Text}
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(labelString, labelFont, labelColor, x, y, _isCentered) {
            if (_isCentered === void 0) { _isCentered = true; }
            // MUST call parent class constructor. Requires text to be displayed, font, and color
            _super.call(this, labelString, labelFont, labelColor);
            this._isCentered = _isCentered;
            // Set registration point of the text. Used when performing transformations
            if (this._isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }
            // Set initial x,y position of the label
            this.x = x;
            this.y = y;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map