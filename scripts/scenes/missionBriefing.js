/**
 * @file missionBriefing.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 12 2016
 * @version 0.4.7 added missionBriefing.ts
 * @description This class is used to brief the player about the details
 *              of the upcoming mission
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var MissionBriefing = (function (_super) {
        __extends(MissionBriefing, _super);
        // constructor
        function MissionBriefing(_bgImgString) {
            _super.call(this);
            this._bgImgString = _bgImgString;
        }
        // public methods
        MissionBriefing.prototype.start = function () {
        };
        MissionBriefing.prototype.update = function () {
        };
        // private methods
        /**
        * Sets up the background image, and its box blur filter
        *
        * @private
        *
        * @memberOf Menu
        */
        MissionBriefing.prototype._setupBackground = function () {
            // Setting up BACKGROUND
            this._bg = new objects.Background(this._bgImgString, 0, 1);
            this._bgBuffer = new objects.Background(this._bgImgString, 1024, 1);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            var bitmapBounds = this._bg.getBounds();
            var bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);
        };
        return MissionBriefing;
    }(objects.Scene));
    scenes.MissionBriefing = MissionBriefing;
})(scenes || (scenes = {}));
//# sourceMappingURL=missionBriefing.js.map