/**
 * @file pause.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.1.10 - added pause scene
 * @description This is the pause scene which bridges level scenes to menu and upgrade scenes
 **/
module scenes {
    export class Pause extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _overlayBG: createjs.Shape
        private _menuBtn: objects.Button
        private _upgradesBtn: objects.Button

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Pause Scene started");

            this.addChild(this._overlayBG = new createjs.Shape())
            this.addChild(new objects.Label("-PAUSED-", "60px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y))
            this.addChild(this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 125, config.Screen.CENTER_Y + 100))
            this.addChild(this._upgradesBtn = new objects.Button("upgradesbtn", config.Screen.CENTER_X + 125, config.Screen.CENTER_Y + 100))

            this._overlayBG.graphics.beginFill('#000')
                .drawRect(0, 0, config.Screen.WIDTH, config.Screen.HEIGHT);
            this._overlayBG.alpha = .7

            this._menuBtn.on("click", this._menuBtnClick, this)

            stage.addChild(this);
        }

        public update(): void {
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        private _menuBtnClick(): void {
            createjs.Sound.stop()
            createjs.Ticker.paused = false;
            scene = config.Scene.MENU;
            changeScene();
        }

        private _upgradesBtnClick(): void {

        }
    } // end class Menu
}