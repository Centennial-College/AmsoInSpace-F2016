/**
 * @file missionBriefing.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 12 2016
 * @version 0.4.7 added missionBriefing.ts
 * @description This class is used to brief the player about the details 
 *              of the upcoming mission 
 **/

namespace scenes {
    export class MissionBriefing extends objects.Scene {
        // attributes
        private _bg: objects.Background
        private _bgBuffer: objects.Background
        private _player: objects.Player
        private _missionLbl: objects.Label

        // constructor
        constructor(
            private _bgImgString: string
        ) {
            super()
        }

        // public methods
        public start(): void {

        }

        public update(): void {

        }

        // private methods
        /**
        * Sets up the background image, and its box blur filter
        * 
        * @private
        * 
        * @memberOf Menu
        */
        private _setupBackground(): void {
            // Setting up BACKGROUND
            this._bg = new objects.Background(this._bgImgString, 0, 1);
            this._bgBuffer = new objects.Background(this._bgImgString, 1024, 1);

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            let bitmapBounds = this._bg.getBounds();
            let bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);
        }
    }
}