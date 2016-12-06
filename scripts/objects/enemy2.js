/**
 * @file enemy2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.2 refactored enemy bullets from level2.ts into enemy2.ts
 * @description Defines enemy object introduced in the second stage
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy2 = (function (_super) {
        __extends(Enemy2, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy2() {
            _super.call(this, "enemy2");
            this._life = 2;
            //private _explosion:objects.GameObject;
            // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
            this.DefaultFireRate = 10;
            this.Reload = 0;
            this.start();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Enemy2.prototype.start = function () {
            this._reset();
            // creating bullets for each enemy ship
            this._bullets = new Array();
            for (var bullet = 0; bullet < 5; bullet++) {
                this._bullets.push(new objects.Enemy2_bullet());
            }
        };
        Enemy2.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            if (this.x > 600)
                this.x -= this._dx;
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
                        this._bullets[bullet].fire(this.position);
                        break;
                    }
                }
            }
        };
        Enemy2.prototype.destroy = function () {
            this._life--;
            if (this._life === 0) {
                this._reset();
            }
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Enemy2.prototype._reset = function () {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.isColliding = false;
            this._life = 2;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
            this.x = config.Screen.WIDTH;
            // get a random x location
            this.y = Math.floor((Math.random() * (config.Screen.HEIGHT - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
            this.alpha = 1;
        };
        Enemy2.prototype._checkBounds = function () {
            // if ((this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)))
            if (this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)) || this.y <= (0 - (this.height * 0.5))) {
                this._reset();
            }
        };
        return Enemy2;
    }(objects.GameObject));
    objects.Enemy2 = Enemy2;
})(objects || (objects = {}));
//# sourceMappingURL=enemy2.js.map