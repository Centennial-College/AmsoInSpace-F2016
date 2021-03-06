/**
 * @file enemy2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.4.2 - added mission objectives to scrollingLevel
 * @description Defines enemy object introduced in the second stage
 **/

module objects {
    export class Enemy2 extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _dy: number;
        private _dx: number;
        private _startY: number;
        private _life: number = 2;
        private _hitTime: number;
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
            
            // blink when enemy3 is hit
            if(createjs.Ticker.getTime() - this._hitTime < 400) {
                if(createjs.Ticker.getTime() % 20 >= 10) {
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
            // these bullets spray like ak47
            // they dont have accurate aim at player, but they spread out 
            // as they are fired from the enemy's location as the enemy ship drifts
            // around the map
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
            this._hitTime = createjs.Ticker.getTime();
            if (this._life === 0) {
                this._hitTime = 0;
                this._dx = 0;
                this._dy = 0;
                missionProgress++
                this.gotoAndPlay("explosion1");
                //this._reset();
                score += 100;
            }
        }

        public reset(): void {
            this._reset();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _reset(): void {
            // set it to invisible while moving, to prevent
            // blinking/flickering effect where it jumps to the side
            this.alpha = 0;
            this.gotoAndStop("enemy2");
            this.on("animationend",this._reset)
            this.isColliding = false;
            this._life = 1;
            this._dx = Math.floor((Math.random() * 8) + 5); // horizontal drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // vertical drift

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
        
        private _fire(): void {

        }
    }
}