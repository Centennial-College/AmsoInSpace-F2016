/**
 * @description Defines player's weapon
 * @export
 * @class Player_bullet
 * @extends {objects.GameObject}
 **/
module objects {
    export class Player_bullet extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _defaultPostion: objects.Vector2;
        private _speed: number;
        private _inFlight: boolean;

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
        get Speed(): number { return this._speed; }
        set Speed(newSpeed: number) { this._speed = newSpeed; }
        get InFlight(): boolean { return this._inFlight; }
        set InFlight(newState: boolean) { this._inFlight = newState; }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor(imgString:string) {
            super(imgString);

            this.start();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void {
            this._defaultPostion = new Vector2(-1000, -1000);
            this.Speed = 8;
            this._reset();
        }

        public update():void {
            if (this.InFlight) {
                this.x += this.Speed;
            }

            this.position = new Vector2(this.x, this.y);
            this._checkBounds();
        }

        public destroy():void {
            this._reset();
        }

        public fire(newPosition: Vector2): void {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.InFlight = true;
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        public _reset(): void {
            this.position = this._defaultPostion;
            this.x = this.position.x;
            this.y = this.position.y;
            this.InFlight = false;
            this.isColliding = false;
        }

        private _checkBounds(): void {
            if (this.position.x >= config.Screen.WIDTH + this.width*0.5) {
                this._reset();
            }
        }
    } // end class
} // end module