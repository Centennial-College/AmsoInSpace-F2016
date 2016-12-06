/**
 * @description Defines diamond object used in the game
 * @export
 * @class Diamond
 * @extends {objects.GameObject}
 **/

module objects {
    export class Diamond extends objects.GameObject {
 
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _dy: number;
        private _dx: number;
        private _startY: number;

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
            if(this._startY < config.Screen.CENTER_Y)
                this.y += this._dy;
            else
                this.y -= this._dy;
            this.x -= this._dx;
            this._checkBounds();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++       
        private _reset(): void {
            this.isColliding = false;
            this.visible = true;
            this._dx = Math.floor((Math.random() * 3) + 5); // horizontal drift
            this._dy = Math.floor((Math.random() * 4) + 2); // horizontal drift
            this.x = 890;

            // get a random x location
            this.y = Math.floor((Math.random() * (628 - (this.height * 0.5))) + (this.height * 0.5));
            this._startY = this.y;
        }

        private _checkBounds(): void {
            if(this.y >= (config.Screen.HEIGHT + (this.height * 0.5)) || this.y <= (0 - (this.height * 0.5))) {
                this._reset();
            }
        }

    }
}