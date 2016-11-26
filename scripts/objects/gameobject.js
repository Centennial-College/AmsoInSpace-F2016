/**
 * @description Define generic game objects used in the game
 * @export
 * @class GameObject
 * @extends {createjs.Sprite}
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function GameObject(imgString) {
            _super.call(this, textureAtlas, imgString);
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this._objName = imgString;
            this.regX = this._width * 0.5;
            this.regY = this._height * 0.5;
            this._position = new objects.Vector2(this.x, this.y);
        }
        Object.defineProperty(GameObject.prototype, "width", {
            // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++
            get: function () { return this._width; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () { return this._height; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "objName", {
            get: function () { return this._objName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () { return this._position; },
            set: function (position) { this._position = position; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isColliding", {
            get: function () { return this._isColliding; },
            set: function (state) { this._isColliding = state; },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        GameObject.prototype.start = function () {
        };
        GameObject.prototype.update = function () {
        };
        return GameObject;
    }(createjs.Sprite));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map