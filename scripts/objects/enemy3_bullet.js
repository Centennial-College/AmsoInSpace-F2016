/**
 * @file enemy2_bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1 initial
 * @description Behavior and Properties of Enemy2 ship's bullets
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy3_bullet = (function (_super) {
        __extends(Enemy3_bullet, _super);
        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy3_bullet() {
            _super.call(this, "enemy3_bullet", -4);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // typescript doesnt let abstract methods be private
        Enemy3_bullet.prototype._checkBounds = function () {
            if (this.position.x <= this.width * 0.5) {
                _super.prototype._reset.call(this);
            }
        };
        return Enemy3_bullet;
    }(objects.Bullet));
    objects.Enemy3_bullet = Enemy3_bullet;
})(objects || (objects = {}));
//# sourceMappingURL=enemy3_bullet.js.map