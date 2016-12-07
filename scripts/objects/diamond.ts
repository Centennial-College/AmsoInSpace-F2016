/**
 * @file diamond.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.2 fixed diamonds positioning with new ui
 * @description Behavior and Properties of Diamond GameObject
 **/

module objects {
    export class Diamond extends objects.GameObject {

        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _dy: number;
        private _dx: number;

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("diamond");

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            this._reset();
        }

        public update(): void {
            this.position = new Vector2(this.x, this.y);
            this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++       
        private _reset(): void {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0

            this.isColliding = false;
            this.visible = true;
            this._dx = Math.floor((Math.random() * 3) + 5); // horizontal drift
            this._dy = Math.floor((Math.random() * 3) + 1); // horizontal drift
            this.x = config.Screen.WIDTH;

            // get a random y location
            this.y = Math.floor((Math.random() * ((config.Screen.HEIGHT - (this.height * 0.5)) - (this.height * 0.5))) + (this.height * 0.5));

            this.alpha = 1
        }

        private _checkBounds(): void {
            if (this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)) || (this.x <= (0 + (this.width * 0.5)))) {
                this._reset();
            }
        }

    }
}