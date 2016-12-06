/**
 * @file player.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.0 merged level2, changed ui and underlying code
 * @description Behavior and Properties of Player GameObject
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
        // public ShieldDamage: boolean = false;
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Player() {
            _super.call(this, "player");
            // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
            this._isArmorOn = false;
            this._livesOfArmor = 2;
            // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
            this.numOfArmors = 3;
            this.numOfFriend = 3;
            this._sheildDamage = false;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Player.prototype.start = function () {
            this.x = 50;
            this.y = 300;
            this._bulletSpawnTimer = 5;
            this.position = new objects.Vector2(this.x, this.y);
            this._isInvulnerable = false;
            this.on("click", this._fire, this);
            this._bullets = new Array();
            for (var bullet = 0; bullet < 20; bullet++) {
                this._bullets.push(new objects.Player_bullet());
            }
        };
        Player.prototype.update = function () {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.position = new objects.Vector2(this.x, this.y);
            this._checkBounds();
            // if (this.Reload < this.DefaultFireRate) {
            //     this.Reload++;
            // }
            // if the player is invulnerable, he cannot collide for 2 seconds
            if (this._isInvulnerable) {
                // the player blinks while he is invulnerable
                if ((createjs.Ticker.getTime() - this._invulnderableStartTime) <= 2000) {
                    if (createjs.Ticker.getTime() % 500 >= 250) {
                        this.alpha = 0;
                    }
                    else {
                        this.alpha = 1;
                    }
                }
                else {
                    this.alpha = 1;
                    this._isInvulnerable = false;
                    this.isColliding = false;
                }
            }
            // if player collides, he will become invulnerable
            if (this.isColliding && !this._isInvulnerable) {
                // become invulnerable for brief duration
                this._isInvulnerable = true;
                this._invulnderableStartTime = createjs.Ticker.getTime();
            }
            // only charge beam energy when < 100%
            if (beamEnergyPercent < 100)
                this._bulletSpawnTimer--;
            // beam energy recharges every 0.5 seconds
            if (this._bulletSpawnTimer <= 0) {
                this._bulletSpawnTimer = 5;
                beamEnergyPercent++;
            }
        };
        Player.prototype.damage = function () {
            if (this._isArmorOn) {
                if (this._livesOfArmor > 0) {
                    this._livesOfArmor -= 1;
                }
                if (this._livesOfArmor === 0) {
                    this._isArmorOn = false;
                    this._sheildDamage = true;
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
                this.x = (this.width * 0.5); // left
            }
            if (this.x >= (config.Screen.WIDTH - (this.width * 0.5))) {
                this.x = (config.Screen.WIDTH - (this.width * 0.5)); // right
            }
            if (this.y <= (0 - (this.height * 0.5))) {
                this.y = (this.height * 0.5); // top
            }
            if (this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5))) {
                this.y = (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)); // bottom
            }
        };
        Player.prototype._fire = function () {
            // can only shoot bullets when you have at least 10% 
            // beam energy
            if (beamEnergyPercent >= 10) {
                for (var bullet in this._bullets) {
                    if (!this._bullets[bullet].InFlight) {
                        this._bullets[bullet].fire(this.position);
                        break;
                    }
                }
                beamEnergyPercent -= 10;
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map