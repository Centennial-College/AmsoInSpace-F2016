/**
 * @description Defines enemy object used in the second stage
 * @export
 * @class Enemy2
 * @extends {objects.GameObject}
 **/
module objects {
    export class Enemy2 extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _dy:number;
        private _dx:number;
        private _startY:number;
        private _life:number = 2;
        //private _explosion:objects.GameObject;

        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        public DefaultFireRate: number = 10;
        public Reload:number = 0;

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy2");

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void {
            this._reset();
        }

        public update():void {
            this.position = new Vector2(this.x, this.y);
            if(this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            if(this.x > 600)
                this.x -= this._dx;

            this._checkBounds();

            if(this.Reload < this.DefaultFireRate) {
                this.Reload++;
            }
        }
        
        public destroy():void {
            this._life--;
            if(this._life === 0){
                this._reset();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _reset():void {
            this.isColliding = false;
            this._life = 2;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
          
            this.x = 890;
            // get a random x location
            this.y = Math.floor((Math.random() * (628 - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
        }

        private _checkBounds():void {
            if(this.y >= (config.Screen.HEIGHT + (this.height * 0.5)) || this.y <= (0 - (this.height * 0.5))) {
                this._reset();
            }
        }
    }
}
