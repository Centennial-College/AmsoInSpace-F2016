/**
 * @file controlSelection.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.7 added controlSelection scene
 * @description This scene determines the controls used in the remainder of the game
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var ControlSelection = (function (_super) {
        __extends(ControlSelection, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function ControlSelection() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        ControlSelection.prototype.start = function () {
            this._bg = new createjs.Shape();
            // black rectangle covering whole bg
            this._bg.graphics.beginFill("#000")
                .drawRect(0, 0, config.Screen.WIDTH, config.Screen.HEIGHT);
            this.addChild(this._bg);
            //adding title Label
            this.addChild(this._instructionsLbl = new objects.Label("Select your set of Controls", "40px customfont", "#00FF48", config.Screen.CENTER_X, 150));
            this.addChild(new objects.Label("or", "40px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y + 50));
            //adding buttons
            this.addChild(this._kbBtn = new objects.Button('kbcontrols', config.Screen.CENTER_X + 200, config.Screen.CENTER_Y + 50));
            this._kbBtn.shadow = new createjs.Shadow("#00FF48", 0, 0, 25);
            this.addChild(this._mouseBtn = new objects.Button('mousecontrols', config.Screen.CENTER_X - 200, config.Screen.CENTER_Y + 50));
            this._mouseBtn.shadow = new createjs.Shadow("#00FF48", 0, 0, 25);
            //adding event handlers
            this._kbBtn.on('click', this._kbBtnClick, this);
            this._mouseBtn.on('click', this._mouseBtnClick, this);
            stage.addChild(this);
        };
        ControlSelection.prototype.update = function () {
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         *
         * These two methods sets the boolean value of mouseControls
         * This will determine how the player interaacts with the game for
         * the remainder of the game
         *
         * @private
         *
         * @memberOf ControlSelection
        
         */
        ControlSelection.prototype._kbBtnClick = function () {
            mouseControls = false;
            scene = config.Scene.BRIEFING;
            changeScene();
        };
        ControlSelection.prototype._mouseBtnClick = function () {
            mouseControls = true;
            scene = config.Scene.BRIEFING;
            changeScene();
        };
        return ControlSelection;
    }(objects.Scene));
    scenes.ControlSelection = ControlSelection; // end class Menu
})(scenes || (scenes = {}));
//# sourceMappingURL=controlSelection.js.map