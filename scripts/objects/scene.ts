/**
 * @description Defines Scene objects
 * @export
 * @class Scene
 * @extends {createjs.Container}
 **/

module objects {
    export class Scene extends createjs.Container {
        constructor(){
            super();
            this.start();
        }
        // attatch to global stage
        public start():void{
            stage.addChild(this);
        }
        public update():void{

        }
    }
}