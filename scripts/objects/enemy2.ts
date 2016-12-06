/**
 * @file enemy2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.2 refactored enemy bullets from level2.ts into enemy2.ts
 * @description Defines enemy object introduced in the second stage
 **/

module objects {
    export class Enemy2 extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _dy: number;
        private _dx: number;
        private _startY: number;
        private _life: number = 2;
        //private _explosion:objects.GameObject;

        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        public DefaultFireRate: number = 10;
        public Reload: number = 0;
        public _bullets: objects.Enemy2_bullet[];


        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy2");

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            this._reset();

            // creating bullets for each enemy ship
            this._bullets = new Array<objects.Enemy2_bullet>();
            for (let bullet = 0; bullet < 5; bullet++) {
                this._bullets.push(new objects.Enemy2_bullet());
            }
        }

        public update(): void {
            this.position = new Vector2(this.x, this.y);
            if (this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            if (this.x > 600)
                this.x -= this._dx;

            this._checkBounds();

            // update every bullet
            this._bullets.forEach(bullet => {
                bullet.update()
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
        }

        public destroy(): void {
            this._life--;
            if (this._life === 0) {
                this._reset();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _reset(): void {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0
            this.isColliding = false;
            this._life = 2;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift

            this.x = config.Screen.WIDTH;
            // get a random x location
            this.y = Math.floor((Math.random() * (config.Screen.HEIGHT - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;

            this.alpha = 1
        }

        private _checkBounds(): void {
            // if ((this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)))

            if (this.y >= (config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - (this.height * 0.5)) || this.y <= (0 - (this.height * 0.5))) {
                this._reset();
            }
        }
    }
}