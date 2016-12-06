/**
 * @file scrollingLevel.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.2.1 recreated Level1 to extend from abstract scrollingLevel
 * @description This will be the training level in the game
 **/

module scenes {
    export class Level1 extends scenes.ScrollingLevel {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _diamond: objects.Diamond[];
        private _enemy: objects.Enemy1[];

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("level1_bgsound", "bg1");

            this.start()
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Level1 Scene started");

            level = 1

            this._diamond = new Array<objects.Diamond>();
            for (var count: number = 0; count < 2; count++) {
                this._diamond.push(new objects.Diamond());
                this.addChild(this._diamond[count]);
            }

            this._enemy = new Array<objects.Enemy1>();
            for (var count: number = 0; count < 2; count++) {
                this._enemy.push(new objects.Enemy1());
                this.addChild(this._enemy[count]);
            }

            // super.addChild(this);
            stage.addChild(this)
        }

        public update(): void {
            super.update()

            this._diamond.forEach(diamond => {
                diamond.update();
                this._collision.check(this._player, diamond);
            });

            this._enemy.forEach(enemy => {
                enemy.update();
                this._collision.check(this._player, enemy);
            });

            if (lives < 1) {
                this._bgSound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

    }
}