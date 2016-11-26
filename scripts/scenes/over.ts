/**
 * @description This is gameover scene
 * @export
 * @class Over
 * @extends {objects.Scene}
 **/
module scenes {
    export class Over extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg:objects.Background;
        private _lblGameover: objects.Label;
        private _lblScore:objects.Label;
        private _btnRestart:objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void {
            console.log("Menu Scene started");

            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);

            this._lblGameover = new objects.Label("GAME OVER","80px Showcard Gothic", "#FDFDFD", config.Screen.CENTER_X, config.Screen.CENTER_Y-150);
            this._lblScore = new objects.Label("SCORE: " + score, "60px Showcard Gothic", "#1AFBF4",config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._lblGameover, this._lblScore);
            
            this._btnRestart = new objects.Button("restartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y+150);
            this._btnRestart.on("click", this._btnRestartClick, this);
            this.addChild(this._btnRestart);
            
            stage.addChild(this);
        }

        public update():void {

        }
        
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        private _btnRestartClick():void{
            lives = 5;
            score = 0;
            scene = config.Scene.LEVEL1;
            changeScene();
        }
    }
}