/**
 * @description Derived from CreateJS.Point class 
 * @export
 * @class Vector2
 * @extends {createjs.Point}
 **/

module objects {
    export class Vector2 extends createjs.Point {

        constructor(x:number = 0, y:number = 0) {
            super(x, y);
        }
        // returns the distance between two Vector2 objects (a and b)
         
        public static distance(a:Vector2, b:Vector2):number {
            return Math.floor(Math.sqrt(Math.pow((b.x - a.x),2) + Math.pow((b.y - a.y), 2)));
        }

        public trackingmouse(x:number, y:number):void {
            this.x = x;
            this.y = y;
        }
    }
}