/**
 * @file menu.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date November 29 2016
 * @version 0.1.7 - added new playgame button, howtoplay button, and animations when loading menu scene
 * @description This is the main title scene 
 **/
module scenes {
    export class Menu extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg: objects.Background;
        private _titleLabel: objects.Label;
        private _subtitleLabel: objects.Label
        private _playgameBtn: objects.Button;
        private _instructionsBtn: objects.Button;
        private _amsoMenuPic: createjs.Bitmap

        private _btnContainer: createjs.Container

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Menu Scene started");

            // Setting up BACKGROUND
            this._bg = new objects.Background("bg1", 1);

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            let bitmapBounds = this._bg.getBounds();

            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this.addChild(this._bg);

            // Setting up AMSO menu picture
            this._amsoMenuPic = new createjs.Bitmap(assets.getResult("amsomenu"))
            this._amsoMenuPic.scaleX = this._amsoMenuPic.scaleY = .85
            this._amsoMenuPic.regX = this._amsoMenuPic.getBounds().width / 2
            this._amsoMenuPic.regY = this._amsoMenuPic.getBounds().height / 2
            this._amsoMenuPic.x = config.Screen.CENTER_X
            this._amsoMenuPic.y = config.Screen.CENTER_Y
            this._amsoMenuPic.rotation = 1080
            this._amsoMenuPic.alpha = 0
            this._amsoMenuPic.shadow = new createjs.Shadow("#f00", 0, 0, 50)

            this.addChild(this._amsoMenuPic)

            // fade in effect - so he looks like he is alien from space
            createjs.Tween.get(this._amsoMenuPic).to({
                alpha: 1
            }, 1000)

            // Setting up TITLE label
            this._titleLabel = new objects.Label("Amso", "150px customfont", "#00FF48", config.Screen.CENTER_X - 200, -5000);
            this._titleLabel.shadow = new createjs.Shadow("#000", 5, 5, 5)
            this.addChild(this._titleLabel);

            // hammer down effect
            createjs.Tween.get(this._titleLabel).to({
                y: config.Screen.CENTER_Y - 100
            }, 1500, createjs.Ease.cubicIn)

            // Setting up SUBTITLE label
            this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#00FF48", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 500))
            this._subtitleLabel.alpha = 0
            // this.addChild(this._subtitleLabel = new objects.Label("In Space!", "60px customfont", "#00B233", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y))
            this._subtitleLabel.shadow = new createjs.Shadow("#000", 2, 2, 2)

            // push up effect
            createjs.Tween.get(this._subtitleLabel).wait(1500).to({
                y: config.Screen.CENTER_Y,
                alpha: .7
            }, 1000, createjs.Ease.cubicIn)

            // Setting up Buttons 
            this._playgameBtn = new objects.Button("playgameBtn", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 110);
            this._playgameBtn.shadow = new createjs.Shadow('#000', 2, 2, 5)
            this._instructionsBtn = new objects.Button("instructionsBtn", config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 190);
            this._instructionsBtn.shadow = new createjs.Shadow('#000', 2, 2, 5)
            this._btnContainer = new createjs.Container()
            this._btnContainer.alpha = 0
            this._btnContainer.addChild(this._playgameBtn, this._instructionsBtn);

            // fade in effect
            createjs.Tween.get(this._btnContainer).wait(3000).to({
                alpha: 1
            }, 1500).call(e => {
                // only add event listeners after animations finish
                this._playgameBtn.on("click", this._playgameBtnClick, this);
                this._instructionsBtn.on("click", this._instructionsBtnClick, this);
            })

            this.addChild(this._btnContainer)

            stage.addChild(this);
        }

        public update(): void {
            this._bg.update()
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        private _playgameBtnClick(): void {
            createjs.Sound.play("moo")

            // screen fades into black Background
            createjs.Tween.get(this).wait(500).to({
                alpha: 0
            }, 1500)

            // amso disappear animation - looks like being sucked into another dimension/space
            createjs.Tween.get(this._amsoMenuPic).wait(500).to({
                rotation: 0,
                scaleX: 0,
                scaleY: 0,
                alpha: 0
            }, 1500).call(e => {
                scene = config.Scene.LEVEL1;
                changeScene();
            })

        }

        private _instructionsBtnClick(): void {
            scene = config.Scene.RULE;
            changeScene();
        }
    } // end class Menu
}