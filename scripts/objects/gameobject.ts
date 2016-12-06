/**
 * @description Define generic game objects used in the game
 * @export
 * @class GameObject
 * @extends {createjs.Sprite}
 **/

module objects {
    export abstract class GameObject extends createjs.Sprite {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _width: number;
        private _height: number;
        private _objName: string;
        private _position: Vector2;
        private _isColliding: boolean;
        private _eventFrame: number;
        public sound: createjs.AbstractSoundInstance;

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
        get width(): number { return this._width; }
        get height(): number { return this._height; }
        get objName(): string { return this._objName; }
        get position(): Vector2 { return this._position; }
        set position(position: Vector2) { this._position = position; }
        get isColliding(): boolean { return this._isColliding; }
        set isColliding(state: boolean) { this._isColliding = state; }

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(imgString: string) {
            super(textureAtlas, imgString);
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this._objName = imgString;
            this.regX = this._width * 0.5;
            this.regY = this._height * 0.5;
            this._position = new Vector2(this.x, this.y);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {

        }

        public update(): void {

        }

        public destroy(): void {

        }
    }
}