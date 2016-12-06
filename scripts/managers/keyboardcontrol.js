/**
 * @description module for keyboard control
 **/
var managers;
(function (managers) {
    var KeyboardControls = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function KeyboardControls() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        KeyboardControls.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.armor = true;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.friend = true;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveBackward = true;
                    break;
                case 39: /*right arrow*/
                case 68:
                    this.moveRight = true;
                    break;
                case 32:
                    this.fire = true;
                    break;
                case 81:
                    this.paused = (this.paused) ? false : true;
                    break;
            }
        };
        KeyboardControls.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.armor = false;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.friend = false;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveBackward = false;
                    break;
                case 39: /*right arrow*/
                case 68:
                    this.moveRight = false;
                    break;
                case 32:
                    this.fire = false;
                    break;
            }
        };
        return KeyboardControls;
    }());
    managers.KeyboardControls = KeyboardControls;
})(managers || (managers = {}));
//# sourceMappingURL=keyboardcontrol.js.map