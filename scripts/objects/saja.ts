/**
 * @file saja.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1  initial
 * @extends objects.GameObject
 * @description Defines enemy object introduced in the second stage
 **/

module objects {
    export class Saja extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _dy: number;
        private _dyF: boolean = true; // distinguish +-
        private _dx: number;
        private _dxF: boolean = true; // distinguish +-
        private _life: number = 10;
        private _hitTime: number;
        //private _explosion:objects.GameObject;

        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        public DefaultFireRate: number = 10;
        public Reload: number = 0;
        public _bullets: objects.Saja_bullet[];


        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("Saja_b");

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            this._reset();

            // creating bullets for each enemy ship
            this._bullets = new Array<objects.Saja_bullet>();
            for (let bullet = 0; bullet < 4; bullet++) {
                this._bullets.push(new objects.Saja_bullet());
            }
        }

        public update(): void {
            this.position = new Vector2(this.x, this.y);

            if(this._dxF) {
                this.x += this._dx;
            } else {
                this.x -= this._dx;
            }
            if(this._dyF) {
                this.y += this._dy;
            } else {
                this.y -= this._dy;
            }

            // blink when enemy3 is hit
            if (createjs.Ticker.getTime() - this._hitTime < 400) {
                if (createjs.Ticker.getTime() % 20 >= 10) {
                    this.alpha = 0.5;
                } else {
                    this.alpha = 1;
                }
            }
            else {
                this.alpha = 1;
            }

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
                        // fixed position where bullets are fired out from, from the 
                        // "mouth" of the enemy ship
                        this._bullets[bullet].fire(
                            new objects.Vector2(this.position.x - 60, this.position.y)
                        );
                        break;
                    }
                }
            }
        }

        public destroy(): void {
            this._life--;
            missionProgress++
            this._hitTime = createjs.Ticker.getTime();
            if (this._life === 0) {
                this._hitTime = 0;
                this._dx = 0;
                this._dy = 0;

                this.gotoAndPlay("explosion1");
                this.on("animationend", this._complete)
                score += 1000;
            }
        }

        public appear() {

        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _reset(): void {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0
            this.gotoAndStop("Saja_b");
            this.isColliding = false;
            this._life = 20;
            this._dx = Math.floor((Math.random() * 5) + 6); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 1); // horizontal drift

            this.x = config.Screen.WIDTH + this.width;
            // get a random x location
            this.y = config.Screen.CENTER_Y;

            this.alpha = 1
        }

        private _checkBounds(): void {
            // X-Axis bound check
            if (this.x >= config.Screen.WIDTH - this.width*0.5) {
                this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
                this._dxF = false;
            } else if (this.x <= config.Screen.CENTER_X + this.width*0.5) {
                this._dx = Math.floor((Math.random() * 3) + 2); // vertical drispeedft
                this._dxF = true;
            }
            // Y-Axis bound check
            if(this.y >= config.Screen.HEIGHT - config.Game.SCORE_BOARD_HEIGHT - this.height * 0.5){
                this._dy = Math.floor((Math.random() * 3) + 3);
                this._dyF = false;
            } else if (this.y <= 0 + this.height * 0.5) {
                this._dy = Math.floor((Math.random() * 3) + 3);
                this._dyF = true;
            }
        }

        private _fire(): void {

        }

        private _complete(): void {
            scene = config.Scene.WIN;
            changeScene();
        }
    }
}