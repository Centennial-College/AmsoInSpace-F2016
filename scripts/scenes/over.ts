/**
 * @file over.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.5 updated links on over.ts
 * @description This is the gameover scene that is displayed
 *              when the player loses the game. 
 **/

module scenes {
    export class Over extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg: objects.Background;
        private _bgBuffer: objects.Background;
        private _lblGameover: objects.Label;
        private _lblScore: objects.Label;
        private _playagainBtn: objects.Button;
        private _menuBtn: objects.Button

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
            stage.cursor = 'default'
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Menu Scene started");

            // Setting up BACKGROUND
            this._bg = new objects.Background(gameOverBGImgString, 0, 1);
            this._bgBuffer = new objects.Background(gameOverBGImgString, 1024, 1);

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            let bitmapBounds = this._bg.getBounds();
            let bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);

            this._lblGameover = new objects.Label("GAME OVER", "80px customfont", "#FDFDFD", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this._lblScore = new objects.Label("SCORE: " + score, "60px customfont", "#1AFBF4", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._lblGameover, this._lblScore);

            this._playagainBtn = new objects.Button("playagainbtn", config.Screen.CENTER_X + 125, config.Screen.CENTER_Y + 150);
            this._playagainBtn.on("click", this._playagainBtnClick, this);
            this.addChild(this._playagainBtn);

            this.addChild(this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 125, config.Screen.CENTER_Y + 150))
            this._menuBtn.on('click', this._menuBtnClick, this)

            stage.addChild(this);
        }

        public update(): void {
            this._bg.update()
            this._bgBuffer.update()
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        private _playagainBtnClick(): void {
            scene = config.Scene.LEVEL1;
            changeScene();
        }

        private _menuBtnClick(): void {
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}