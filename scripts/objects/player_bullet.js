/**
 * @file player_bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.1 refactored bullets into abstract class and children of
 *          abstract class
 * @description Behavior and Properties of Player's bullets
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player_bullet = (function (_super) {
        __extends(Player_bullet, _super);
        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Player_bullet() {
            _super.call(this, "player_bullet", 8);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // typescript doesnt let abstract methods be private
        Player_bullet.prototype._checkBounds = function () {
            if (this.position.x >= config.Screen.WIDTH + this.width * 0.5) {
                _super.prototype._reset.call(this);
            }
        };
        return Player_bullet;
    }(objects.Bullet));
    objects.Player_bullet = Player_bullet; // end class
})(objects || (objects = {})); // end module
//# sourceMappingURL=player_bullet.js.map