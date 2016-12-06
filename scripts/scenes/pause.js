var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file pause.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.1.10 - added pause scene
 * @description This is the pause scene which bridges level scenes to menu and upgrade scenes
 **/
var scenes;
(function (scenes) {
    var Pause = (function (_super) {
        __extends(Pause, _super);
        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Pause() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Pause.prototype.start = function () {
            console.log("Pause Scene started");
            stage.addChild(this);
        };
        Pause.prototype.update = function () {
        };
        return Pause;
    }(objects.Scene));
    scenes.Pause = Pause; // end class Menu
})(scenes || (scenes = {}));
//# sourceMappingURL=pause.js.map