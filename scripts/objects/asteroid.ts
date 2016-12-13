/**
 * @file asteroid.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.4 fixed collisions for current game objects
 * @description Behavior and Properties of Asteroid GameObject
 **/

module objects {
    export class Asteroid extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _dy: number;
        private _dx: number;
        private _startY: number;

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy1");

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            this._reset();
        }

        public update(): void {
            this.position = new Vector2(this.x, this.y);
            this.x -= this._dx;
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            this._checkBounds();
        }

        public _reset(): void {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0

            this.isColliding = false;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 3) + 1); // horizontal drift

            this.x = config.Screen.WIDTH;
            // get a random y location
            this.y = Math.floor((Math.random() * ((config.Screen.HEIGHT - (this.height * 0.5)) - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
            
            this.alpha = 1
        }

        public destroy(): void {
            this._reset()
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _checkBounds(): void {
            if ((this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT + (this.height * 0.5)))
                || (this.x <= (0 - (this.width * 0.5)))) {
                this._reset();
            }
        }
    }
}
