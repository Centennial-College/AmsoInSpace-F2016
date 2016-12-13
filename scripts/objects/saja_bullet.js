/**
 * @file saja_bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1 initial
 * @extends Bullet
 * @description Behavior and Properties of Player's bullets
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Saja_bullet = (function (_super) {
        __extends(Saja_bullet, _super);
        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Saja_bullet() {
            _super.call(this, "saja_bullet", -6);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // typescript doesnt let abstract methods be private
        Saja_bullet.prototype._checkBounds = function () {
            if (this.position.x <= 0 - this.width * 0.5) {
                _super.prototype._reset.call(this);
            }
        };
        return Saja_bullet;
    }(objects.Bullet));
    objects.Saja_bullet = Saja_bullet; // end class
})(objects || (objects = {})); // end module
//# sourceMappingURL=saja_bullet.js.map