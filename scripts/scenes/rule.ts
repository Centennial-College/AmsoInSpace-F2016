/**
 * @description Page for explain how to play
 * @export
 * @class Rule
 * @extends {objects.Scene}
 **/

module scenes {
    export class Rule extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg:objects.Background;
        private _imgRule:createjs.Bitmap;
        private _menuLabel:objects.Label;
        private _btnStart:objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void{
            console.log("Rule Scene started");

            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);

            this._imgRule = new createjs.Bitmap(assets.getResult(" "));
            this.addChild(this._imgRule);

            this._btnStart = new objects.Button("startButton", config.Screen.CENTER_X, config.Screen.CENTER_Y+250)
            this._btnStart.on("click", this._btnStartClick, this);
            this.addChild(this._btnStart);

            stage.addChild(this);
        }

        public update():void {

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _btnStartClick():void {
            scene = config.Scene.LEVEL1;
            changeScene();
        }
    }
}