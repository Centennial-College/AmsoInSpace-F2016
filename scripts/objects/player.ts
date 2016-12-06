/**
 * @file player.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.0 added abstract scrollingLevel class
 * @description Behavior and Properties of Player GameObject
 **/

module objects {
    export class Player extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _isArmorOn: boolean = false;
        private _livesOfArmor: number = 2;

        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        public numOfArmors: number = 3;
        public numOfFriend: number = 3;
        public _sheildDamage: boolean = false;

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
        }

        public update(): void {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.position = new Vector2(this.x, this.y);
            this._checkBounds();
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