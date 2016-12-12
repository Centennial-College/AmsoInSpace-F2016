/**
 * @file scrollingLevel.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.4.2 - added mission objectives to scrollingLevel
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

            this.addChild(this._player = new objects.Player())

            lives = 5
            level = 1
            score = 0

            missionGoal = 100
            missionProgress = 0

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
                if (this._collision.check(this._player, diamond))
                    missionProgress += 100
            });

            this._missionObjectiveLbl.text = "- Earn enough money to fix the ship: " + missionProgress +
                "/" + missionGoal

            this._asteroids.forEach(asteroid => {
                asteroid.update();
                this._collision.check(this._player, asteroid)
            });

            // level 1 requires score of 1000 points to advance to the next level
            // if (score >= 1000 && !this._canAdvanceToNextLevel) {
            if (missionProgress >= missionGoal && !this._levelComplete) {
                // this._canAdvanceToNextLevel = true
                this._advanceToNextLevel()
                this._bgSound.stop()
                // createjs.Sound.stop()
                scene = config.Scene.LEVEL2
            }
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

    }
}