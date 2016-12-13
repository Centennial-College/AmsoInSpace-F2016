/**
 * @file asteroid.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.8 implemented diff controls feature
 * @description Defines the keyboard controls for the game
 **/
var managers;
(function (managers) {
    var KeyboardControls = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function KeyboardControls() {
            // this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        KeyboardControls.prototype.onKeyDown = function (event) {
            // the only key that should be used if mouse controls are selected 
            // is p for pause
            if (!mouseControls) {
                switch (event.keyCode) {
                    case 38: /*up arrow*/
                    case 87:
                        // this.armor = true;
                        this.moveUp = true;
                        break;
                    case 37: /*left arrow*/
                    case 65:
                        this.moveLeft = true;
                        // this.friend = true;
                        break;
                    case 40: /*down arrow*/
                    case 83:
                        this.moveDown = true;
                        break;
                    case 39: /*right arrow*/
                    case 68:
                        this.moveRight = true;
                        break;
                    case 32:
                        this.fire = true;
                        break;
                }
            }
            // P key - for pause
            if (event.keyCode === 80) {
                if (this.paused) {
                    createjs.Ticker.paused = true;
                    this.paused = false;
                }
                else {
                    createjs.Ticker.paused = false;
                    this.paused = true;
                }
                console.log("p pressed" + createjs.Ticker.paused);
            }
        };
        KeyboardControls.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.moveUp = false;
                    // this.armor = false;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.moveLeft = false;
                    // this.friend = false;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveDown = false;
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