/**
 * @description This is the main title scene
 * @export
 * @class Menu
 * @extends {objects.Scene}
 **/

module scenes {
    export class Menu extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg:objects.Background;
        private _menuLabel: objects.Label;
        private _btnStart:objects.Button;
        private _btnRule:objects.Button;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void {
            console.log("Menu Scene started");

            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);

            this._menuLabel = new objects.Label("Title!","80px Showcard Gothic", "#FF0033", config.Screen.CENTER_X, config.Screen.CENTER_Y-150);
            this.addChild(this._menuLabel);

            this._btnStart = new objects.Button("startButton", config.Screen.CENTER_X-100, config.Screen.CENTER_Y+150);
            this._btnStart.on("click", this._btnStartClick, this);
            this._btnRule = new objects.Button("ruleButton", config.Screen.CENTER_X+100, config.Screen.CENTER_Y+150);
            this._btnRule.on("click", this._btnRuleClick, this);
            this.addChild(this._btnStart, this._btnRule);
            stage.addChild(this);
        }

        public update():void {

        }
        
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        private _btnStartClick():void{
            scene = config.Scene.LEVEL1;
            changeScene();
        }

        private _btnRuleClick():void{
            scene = config.Scene.RULE;
            changeScene();
        }
    } // end class Menu
}