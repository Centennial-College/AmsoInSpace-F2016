/**
 * @file level2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.4 fixed collisions for current game objects
 * @description This level introduces enemy ships and shooting feature
 **/

module scenes {
    export class Level2 extends scenes.ScrollingLevel {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _diamonds: objects.Diamond[];
        private _enemyShips: objects.Enemy2[];
        // private _enemyBullets: objects.Enemy2_bullet[];

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("level2_bgsound", "bg2");
            this.start()
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {

            // intiial setup
            level = 2
            beamEnergyPercent = 100

            console.log("Level2 Scene started");

            this.addChild(this._player = new objects.Player())

            this._collision = new managers.Collision();

            // adding diamond gameobjects
            this._diamonds = new Array<objects.Diamond>();
            for (var count: number = 0; count < 2; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }

            // adding enemy ships
            this._enemyShips = new Array<objects.Enemy2>();
            for (var count: number = 0; count < 2; count++) {
                this._enemyShips.push(new objects.Enemy2());
                this.addChild(this._enemyShips[count]);
            }

            // adding player bullets to the scene
            this._player._bullets.forEach(bullet => {
                this.addChild(bullet)
            });

            // adding enemy bullets to the scene
            this._enemyShips.forEach(enemy => {
                enemy._bullets.forEach(bullet => {
                    this.addChild(bullet)
                });
            });
            stage.addChild(this);
        }

        public update(): void {
            super.update()

            this._updateBeamEnergyBar()

            // updates diamonds position and checks for collision b/t player and diamonds
            this._diamonds.forEach(diamond => {
                diamond.update();
                this._collision.check(this._player, diamond);
            });

            // updates enemy position and checks for collision b/t player and enemy
            this._enemyShips.forEach(enemy => {
                enemy.update();

                if (this._collision.check(this._player, enemy)) {
                    enemy.destroy()
                }

                enemy._bullets.forEach(bullet => {
                    this._collision.check(this._player, bullet)
                });
            });

            // updates bullets position and checks for collision b/t enemy and bullets
            this._player._bullets.forEach(bullet => {
                bullet.update();
                this._enemyShips.forEach(enemy => {
                    this._collision.check(enemy, bullet);
                })
            });
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

    }
}