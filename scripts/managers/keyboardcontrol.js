/**
 * @file asteroid.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.4 added keyboard controls
 * @description Defines the keyboard controls for the game
 **/
var managers;
(function (managers) {
    var KeyboardControls = (function () {
        // public enabled: boolean;
        // public paused: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function KeyboardControls() {
            // this.enabled = false;
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
                case 80:
                    if (createjs.Ticker.paused) {
                        createjs.Ticker.paused = false;
                    }
                    else {
                        currentScene.addChild(pause = new scenes.Pause());
                        // currentScene.update()
                        createjs.Ticker.paused = true;
                    }
                    // createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
                    // currentScene.addChild(new objects.Label("-PAUSED-", "60px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y))
                    // this.paused = (this.paused) ? false : true;
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