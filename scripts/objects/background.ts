/**
 * @file background.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @version 0.1.2 - rearranged text on menu scene
 * @description This defines background objects 
 **/
module objects {
    export class Background extends createjs.Bitmap {

        private _dx: number;

        constructor(imageString: string, scrollSpeed: number = 3) {
            super(assets.getResult(imageString));
            this._dx = scrollSpeed
            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        public start(): void {
            this.x = 0;
            // this._dx = 3; // 5px per frame down

        }

        public update(): void {
            this.x -= this._dx;
            this._reset();
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++

        private _reset(): void {
            if (this.x <= -1108) {
                this.x = 0;
            }
        }
    }
}