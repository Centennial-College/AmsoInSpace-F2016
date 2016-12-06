/**
 * @description Define player object
 * @export
 * @class Player
 * @extends {objects.GameObject}
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Player() {
            _super.call(this, "player");
            // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
            this._isArmorOn = false;
            this._livesOfArmor = 2;
            // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
            //public NumOfArmors: number = 3;
            //public NumOfFriend: number = 3;
            this.DefaultFireRate = 10;
            this.Reload = 10;
            this.ShieldDamage = false;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Player.prototype.start = function () {
            this.x = 50;
            this.y = 300;
            this.position = new objects.Vector2(this.x, this.y);
        };
        Player.prototype.update = function () {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.position = new objects.Vector2(this.x, this.y);
            this._checkBounds();
            if (this.Reload < this.DefaultFireRate) {
                this.Reload++;
            }
        };
        Player.prototype.damage = function () {
            if (this._isArmorOn) {
                if (this._livesOfArmor > 0) {
                    this._livesOfArmor -= 1;
                }
                if (this._livesOfArmor === 0) {
                    this._isArmorOn = false;
                    this.ShieldDamage = true;
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Player.prototype._checkBounds = function () {
            // checkbounds to stop player from going outside
            if (this.x <= (0 + (this.width * 0.5))) {
                this.x = (0 + (this.width * 0.5)); // left
            }
            else if (this.x >= (630 - (this.width * 0.5))) {
                this.x = (630 - (this.width * 0.5)); // right
            }
            else if (this.y <= (100 - (this.height * 0.5))) {
                this.y = (100 - (this.height * 0.5)); // top
            }
            else if (this.y >= (628 - (this.height * 0.5))) {
                this.y = (628 - (this.height * 0.5)); // bottom
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map