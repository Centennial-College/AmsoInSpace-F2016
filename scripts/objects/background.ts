/**
 * @description Define background objects
 * @export
 * @class Background
 * @extends {createjs.Bitmap}
 **/

module objects {
    export class Background extends createjs.Bitmap {

        private _dx:number;

        constructor(imageString: string) {
            super(assets.getResult(imageString));
            this.start();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        public start():void {
            this.x = 0;
            this._dx = 3; // 5px per frame down
      
        }

        public update():void {
            this.x -= this._dx;
            this._reset();
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
         
        private _reset():void {
            if(this.x <= -1108) {
                this.x = 0;
            }
        }
    }
}