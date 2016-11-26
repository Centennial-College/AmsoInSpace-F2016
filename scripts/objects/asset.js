/**
 * @description Defines external assets
 * @export
 * @class Asset
 **/
var objects;
(function (objects) {
    var Asset = (function () {
        function Asset(id, src) {
            this.id = id;
            this.src = src;
        }
        return Asset;
    }());
    objects.Asset = Asset;
})(objects || (objects = {}));
//# sourceMappingURL=asset.js.map