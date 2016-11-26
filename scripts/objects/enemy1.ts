/**
 * @description Defines enemy object used in the first stage
 * @export
 * @class Enemy1
 * @extends {objects.GameObject}
 **/
module objects {
    export class Enemy1 extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _dy:number;
        private _dx:number;

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy1");

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void {
            this._reset();
        }

        public update():void {
            this.position = new Vector2(this.x, this.y);
            this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _reset():void {
            this.isColliding = false;
            this._dx = Math.floor((Math.random() * 5) + 8); // vertical drispeedft
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
          
            this.x = 890;
            // get a random x location
            this.y = Math.floor((Math.random() * (628 - (this.height * 0.5))) + (this.height * 0.5));
        }

        private _checkBounds():void {
            if(this.x <= (0 + (this.width * 0.5))) {
                this._reset();
            }
        }
    }
}
