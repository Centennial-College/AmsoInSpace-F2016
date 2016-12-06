/**
 * @file player.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.5 added player invulnerability when collide, asteroids reset upon collision
 * @description Behavior and Properties of Player GameObject
 **/

module objects {
    export class Player extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _isArmorOn: boolean = false;
        private _livesOfArmor: number = 2;
        private _invulnderableStartTime: number

        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        public numOfArmors: number = 3;
        public numOfFriend: number = 3;
        public _sheildDamage: boolean = false;
        public _isInvulnerable: boolean;

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("player")

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        public start(): void {
            this.x = 50;
            this.y = 300;

            this.position = new Vector2(this.x, this.y);
            this._isInvulnerable = false
        }

        public update(): void {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.position = new Vector2(this.x, this.y);
            this._checkBounds();

            if (this._isInvulnerable) {
                if ((createjs.Ticker.getTime() - this._invulnderableStartTime) <= 1000) {
                    if (createjs.Ticker.getTime() % 500 >= 250) {
                        this.alpha = 0
                    } else {
                        this.alpha = 1
                    }
                }
                else {
                    this.alpha = 1
                    this._isInvulnerable = false
                    this.isColliding = false
                }
            }

            // can only become invulner
            if (this.isColliding && !this._isInvulnerable) {
                // become invulnerable for brief duration
                this._isInvulnerable = true
                this._invulnderableStartTime = createjs.Ticker.getTime()
            }
        }

        public damage(): boolean {
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
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _checkBounds(): void {

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
        }

    }
}