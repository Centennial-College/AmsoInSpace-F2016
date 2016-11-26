/**
 * @description Page for explain how to play
 * @export
 * @class Rule
 * @extends {objects.Scene}
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Rule = (function (_super) {
        __extends(Rule, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function Rule() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Rule.prototype.start = function () {
            console.log("Rule Scene started");
            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);
            this._imgRule = new createjs.Bitmap(assets.getResult(" "));
            this.addChild(this._imgRule);
            this._btnStart = new objects.Button("startButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 250);
            this._btnStart.on("click", this._btnStartClick, this);
            this.addChild(this._btnStart);
            stage.addChild(this);
        };
        Rule.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        Rule.prototype._btnStartClick = function () {
            scene = config.Scene.LEVEL1;
            changeScene();
        };
        return Rule;
    }(objects.Scene));
    scenes.Rule = Rule;
})(scenes || (scenes = {}));
//# sourceMappingURL=rule.js.map