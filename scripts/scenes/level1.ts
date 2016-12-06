/**
 * @file scrollingLevel.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.3 fixed asteroid positioning with new ui
 * @description This will be the training level in the game
 **/

module scenes {
    export class Level1 extends scenes.ScrollingLevel {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _diamonds: objects.Diamond[];
        private _asteroids: objects.Asteroid[];

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("level1_bgsound", "bg1");

            this.start()
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Level1 Scene started");

            level = 1
            score = 0

            this._diamonds = new Array<objects.Diamond>();
            for (var count: number = 0; count < 1; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }

            this._asteroids = new Array<objects.Asteroid>();
            for (var count: number = 0; count < 3; count++) {
                this._asteroids.push(new objects.Asteroid());
                this.addChild(this._asteroids[count]);
            }

            // super.addChild(this);
            stage.addChild(this)
        }

        public update(): void {
            super.update()

            this._diamonds.forEach(diamond => {
                diamond.update();
                this._collision.check(this._player, diamond);
            });

            this._asteroids.forEach(asteroid => {
                asteroid.update();
                if (this._collision.check(this._player, asteroid)) {
                    asteroid._reset()
                }
            });

            // level 1 requires score of 1000 points to advance to the next level
            if (score >= 1000 && !this._canAdvanceToNextLevel) {
                this._canAdvanceToNextLevel = true
                this._levelCompleteNotification()
            }

            if (lives < 1) {
                this._bgSound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

    }
}