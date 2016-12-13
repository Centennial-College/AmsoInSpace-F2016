/**
 * @file saja.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1  initial
 * @extends objects.GameObject
 * @description Defines enemy object introduced in the second stage
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Saja = (function (_super) {
        __extends(Saja, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Saja(
            // private _sajaStrength: number = 1
            _sajaPoweredUp) {
            if (_sajaPoweredUp === void 0) { _sajaPoweredUp = false; }
            _super.call(this, "Saja_b");
            this._sajaPoweredUp = _sajaPoweredUp;
            this._dyF = true; // distinguish +-
            this._dxF = true; // distinguish +-
            this._life = 10;
            //private _explosion:objects.GameObject;
            // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
            this.DefaultFireRate = 10;
            this.Reload = 0;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Saja.prototype.start = function () {
            this._reset();
            // creating bullets for each enemy ship
            this._bullets = new Array();
            for (var bullet = 0; bullet < 8; bullet++) {
                this._bullets.push(new objects.Saja_bullet());
            }
        };
        Saja.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            console.log(this._sajaPoweredUp);
            if (this._life < 10 && !this._sajaPoweredUp) {
                this._powerUp();
            }
            if (this._dxF) {
                this.x += this._dx;
            }
            else {
                this.x -= this._dx;
            }
            if (this._dyF) {
                this.y += this._dy;
            }
            else {
                this.y -= this._dy;
            }
            // blink when enemy3 is hit
            if (createjs.Ticker.getTime() - this._hitTime < 400) {
                if (createjs.Ticker.getTime() % 20 >= 10) {
                    this.alpha = 0.5;
                }
                else {
                    this.alpha = 1;
                }
            }
            else {
                this.alpha = 1;
            }
            this._checkBounds();
            // update every bullet
            this._bullets.forEach(function (bullet) {
                bullet.update();
            });
            // enemies of this type can only fire 5 times per second
            if (this.Reload < this.DefaultFireRate) {
                this.Reload++;
            }
            if (this.Reload === this.DefaultFireRate) {
                this.Reload = 0;
                // for (var bullet in this._bullets) {
                for (var bullet = 0; bullet < (this._sajaPoweredUp ? 8 : 4); bullet++) {
                    if (!this._bullets[bullet].InFlight) {
                        // fixed position where bullets are fired out from, from the 
                        // "mouth" of the enemy ship
                        this._bullets[bullet].fire(new objects.Vector2(this.position.x - 60, this.position.y));
                        break;
                    }
                }
            }
        };
        Saja.prototype.destroy = function () {
            this._life--;
            missionProgress++;
            this._hitTime = createjs.Ticker.getTime();
            if (this._life === 0) {
                this._hitTime = 0;
                this._dx = 0;
                this._dy = 0;
                this.gotoAndPlay("explosion1");
                this.on("animationend", this._complete);
                score += 1000;
            }
        };
        Saja.prototype.appear = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Saja.prototype._powerUp = function () {
            this.gotoAndPlay("Saja_b_move");
            this._sajaPoweredUp = true;
            this._bullets.forEach(function (bullet) {
                bullet.Speed *= 2;
            });
        };
        Saja.prototype._reset = function () {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.gotoAndStop("Saja_w_move");
            this.isColliding = false;
            this._life = 20;
            this._dx = Math.floor((Math.random() * 5) + 6); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 1); // horizontal drift
            this.x = config.Screen.WIDTH + this.width;
            // get a random x location
            this.y = config.Screen.CENTER_Y;
            this.alpha = 1;
        };
        Saja.prototype._checkBounds = function () {
            // X-Axis bound check
            if (this.x >= config.Screen.WIDTH - this.width * 0.5) {
                this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
                this._dxF = false;
            }
            else if (this.x <= config.Screen.CENTER_X + this.width * 0.5) {
                this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
                this._dxF = true;
            }
            // Y-Axis bound check
            if (this.y >= config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - this.height * 0.5) {
                this._dy = Math.floor((Math.random() * 3) + 3);
                this._dyF = false;
            }
            else if (this.y <= 0 + this.height * 0.5) {
                this._dy = Math.floor((Math.random() * 3) + 3);
                this._dyF = true;
            }
        };
        Saja.prototype._fire = function () {
        };
        Saja.prototype._complete = function () {
            scene = config.Scene.WIN;
            changeScene();
        };
        return Saja;
    }(objects.GameObject));
    objects.Saja = Saja;
})(objects || (objects = {}));
//# sourceMappingURL=saja.js.map