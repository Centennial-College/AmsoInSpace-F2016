/**
 * @file bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.1 refactored bullets into abstract class and children of
 *          abstract class
 * @description Behavior and Properties of Bullet GameObject
 **/

module objects {
    export abstract class Bullet extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        protected _defaultPostion: objects.Vector2;
        protected _inFlight: boolean;

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
        get Speed(): number { return this._speed; }
        set Speed(newSpeed: number) { this._speed = newSpeed; }
        get InFlight(): boolean { return this._inFlight; }
        set InFlight(newState: boolean) { this._inFlight = newState; }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        // player bullets and enemy bullets go in diff directions
        // player bullets and enemy bullets have different image strings
        constructor(imgString: string, protected _speed: number) {
            super(imgString);

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            this._defaultPostion = new Vector2(-1000, -1000);
            // this.Speed = 8;
            this._reset();
        }

        public update(): void {
            if (this.InFlight) {
                this.x += this.Speed;
            }

            this.position = new Vector2(this.x, this.y);
            this._checkBounds();
        }

        public destroy(): void {
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

        // player bullets and enemy bullets check diff boundaries
        abstract _checkBounds(): void

    } // end class
} // end module