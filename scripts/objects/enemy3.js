/**
 * @file enemy3.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1  initial
 * @description Defines enemy object introduced in the second stage
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy3 = (function (_super) {
        __extends(Enemy3, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy3() {
            _super.call(this, "enemy3");
            this._life = 4;
            //private _explosion:objects.GameObject;
            // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
            this.DefaultFireRate = 10;
            this.Reload = 0;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Enemy3.prototype.start = function () {
            this._reset();
            // creating bullets for each enemy ship
            this._bullets = new Array();
            for (var bullet = 0; bullet < 2; bullet++) {
                this._bullets.push(new objects.Enemy3_bullet());
            }
        };
        Enemy3.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            if (this.x > 700)
                this.x -= this._dx;
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
                for (var bullet in this._bullets) {
                    if (!this._bullets[bullet].InFlight) {
                        // fixed position where bullets are fired out from, from the 
                        // "mouth" of the enemy ship
                        this._bullets[bullet].fire(new objects.Vector2(this.position.x - 60, this.position.y));
                        break;
                    }
                }
            }
        };
        Enemy3.prototype.destroy = function () {
            this._life--;
            this._hitTime = createjs.Ticker.getTime();
            if (this._life === 0) {
                this._hitTime = 0;
                this._dx = 0;
                this._dy = 0;
                missionProgress++;
                this.gotoAndPlay("explosion1");
                this.on("animationend", this._reset);
                score += 300;
            }
        };
        Enemy3.prototype.reset = function () {
            this._reset();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Enemy3.prototype._reset = function () {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.gotoAndStop("enemy3");
            this.isColliding = false;
            this._life = 4;
            this._dx = Math.floor((Math.random() * 5) + 6); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 1); // horizontal drift
            this.x = config.Screen.WIDTH + this.width;
            // get a random x location
            this.y = Math.floor((Math.random() * (config.Screen.HEIGHT - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
            this.alpha = 1;
        };
        Enemy3.prototype._checkBounds = function () {
            // if ((this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)))
            if (this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT + (this.height * 0.5)) || this.y <= (0 - (this.height * 0.5))) {
                this._reset();
            }
        };
        Enemy3.prototype._fire = function () {
        };
        return Enemy3;
    }(objects.GameObject));
    objects.Enemy3 = Enemy3;
})(objects || (objects = {}));
//# sourceMappingURL=enemy3.js.map