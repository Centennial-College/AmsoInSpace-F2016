var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @description This is gameover scene
 * @export
 * @class Over
 * @extends {objects.Scene}
 **/
var scenes;
(function (scenes) {
    var Over = (function (_super) {
        __extends(Over, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Over() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Over.prototype.start = function () {
            stage.cursor = "auto"; // hide cursor
            console.log("Over Scene started");
            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);
            this._lblGameover = new objects.Label("GAME OVER", "80px customfont", "#FDFDFD", config.Screen.CENTER_X, config.Screen.CENTER_Y - 150);
            this._lblScore = new objects.Label("SCORE: " + score, "60px customfont", "#1AFBF4", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._lblGameover, this._lblScore);
            this._btnRestart = new objects.Button("restartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150);
            this._btnRestart.on("click", this._btnRestartClick, this);
            this.addChild(this._btnRestart);
            stage.addChild(this);
        };
        Over.prototype.update = function () {
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++
        Over.prototype._btnRestartClick = function () {
            lives = 5;
            score = 0;
            scene = config.Scene.LEVEL1;
            changeScene();
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map