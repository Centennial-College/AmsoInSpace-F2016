/**
 * @file menu.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @version 0.1.2 - rearranged text on menu scene
 * @description This is the main title scene 
 **/
module scenes {
    export class Menu extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg: objects.Background;
        private _titleLabel: objects.Label;
        private _subtitleLabel: objects.Label
        private _btnStart: objects.Button;
        private _btnRule: objects.Button;
        private _amsoMenuPic: createjs.Bitmap

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Menu Scene started");

            this._bg = new objects.Background("bg1", 1);



            this.addChild(this._bg);
            

            this._amsoMenuPic = new createjs.Bitmap(assets.getResult("amsomenu"))
            this._amsoMenuPic.scaleX = this._amsoMenuPic.scaleY = .85
            this.addChild(this._amsoMenuPic)

            this._titleLabel = new objects.Label("Amso", "150px customfont", "#fff", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y - 100);
            this._titleLabel.shadow = new createjs.Shadow("#000", 5, 5, 5)
            this.addChild(this._titleLabel);

            this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#fff", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y))
            this._subtitleLabel.shadow = new createjs.Shadow("#000", 2, 2, 2)

            this._btnStart = new objects.Button("startButton", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 110);
            this._btnStart.on("click", this._btnStartClick, this);
            this._btnRule = new objects.Button("ruleButton", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 190);
            this._btnRule.on("click", this._btnRuleClick, this);
            this.addChild(this._btnStart, this._btnRule);

            stage.addChild(this);
        }

        public update(): void {
            this._bg.update()
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        private _btnStartClick(): void {
            scene = config.Scene.LEVEL1;
            changeScene();
        }

        private _btnRuleClick(): void {
            scene = config.Scene.RULE;
            changeScene();
        }
    } // end class Menu
}