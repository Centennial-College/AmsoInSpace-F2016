/**
 * @file asteroid.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.8 implemented diff controls feature
 * @description Defines the keyboard controls for the game
 **/

module managers {
    export class KeyboardControls {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        public armor: boolean;
        public moveLeft: boolean;
        public friend: boolean;
        public moveRight: boolean;
        public moveUp: boolean;
        public moveDown: boolean;
        public fire: boolean;
        // public enabled: boolean;
        // public paused: boolean;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        public onKeyDown(event: KeyboardEvent): void {
            // the only key that should be used if mouse controls are selected 
            // is p for pause
            if (!mouseControls) {
                switch (event.keyCode) {
                    case 38: /*up arrow*/
                    case 87: /* W Key */
                        // this.armor = true;
                        this.moveUp = true;
                        break;
                    case 37: /*left arrow*/
                    case 65: /* A Key */
                        this.moveLeft = true;
                        // this.friend = true;
                        break;
                    case 40: /*down arrow*/
                    case 83: /* S Key */
                        this.moveDown = true;
                        break;
                    case 39: /*right arrow*/
                    case 68: /* D Key */
                        this.moveRight = true;
                        break;
                    case 32: /* Spacebar */
                        this.fire = true;
                        break;
                }
            }

            // P key - for pause
            if (event.keyCode === 80) {
                if (createjs.Ticker.paused) {
                    createjs.Ticker.paused = false;
                    // currentScene.removeChild(pause)
                } else {
                    currentScene.addChild(pause = new scenes.Pause())
                    // currentScene.update()
                    createjs.Ticker.paused = true;
                }
                // createjs.Ticker.paused = createjs.Ticker.paused ? false : true;
                // currentScene.addChild(new objects.Label("-PAUSED-", "60px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y))
                // this.paused = (this.paused) ? false : true;
            }
        }

        public onKeyUp(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87: /* W Key */
                    this.moveUp = false;
                    // this.armor = false;
                    break;
                case 37: /*left arrow*/
                case 65: /* A Key */
                    this.moveLeft = false;
                    // this.friend = false;
                    break;
                case 40: /*down arrow*/
                case 83: /* S Key */
                    this.moveDown = false;
                    break;
                case 39: /*right arrow*/
                case 68: /* D Key */
                    this.moveRight = false;
                    break;
                case 32: /* Spacebar */
                    this.fire = false;
                    break;
            }
        }
    }
}