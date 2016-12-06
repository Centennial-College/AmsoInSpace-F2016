/**
 * @file level2.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.2.3 fixed asteroid positioning with new ui
 * @description This level introduces enemy ships and shooting feature
 **/

module scenes {
    export class Level2 extends scenes.ScrollingLevel {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        // private _bg:objects.Background;
        // private _player:objects.Player;
        private _diamonds: objects.Diamond[];
        private _enemyShips: objects.Enemy2[];
        // private _lblScore:objects.Label;
        // private _lblLives:objects.Label;
        // private _lblLevel:objects.Label;
        // private _collision:managers.Collision;
        // private _level2_bgsound: createjs.AbstractSoundInstance;
        private _enemyBullets: objects.Enemy2_bullet[];

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

            this._diamonds = new Array<objects.Diamond>();
            for (var count: number = 0; count < 2; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }

            this._enemyShips = new Array<objects.Enemy2>();
            for (var count: number = 0; count < 2; count++) {
                this._enemyShips.push(new objects.Enemy2());
                this.addChild(this._enemyShips[count]);
            }

            // this._bullets = new Array<objects.Player_bullet>();
            // for (var bullet = 0; bullet < 20; bullet++) {
            //     this._bullets.push(new objects.Player_bullet("player_bullet"));
            //     this.addChild(this._bullets[bullet]);
            // }

            this._player._bullets.forEach(bullet => {
                this.addChild(bullet)
            });

            this._enemyBullets = new Array<objects.Enemy2_bullet>();
            for (let bullet = 0; bullet < 5; bullet++) {
                this._enemyBullets.push(new objects.Enemy2_bullet());
                this.addChild(this._enemyBullets[bullet]);
            }

            stage.addChild(this);
        }

        public update(): void {
            super.update()

            this._updateBeamEnergyBar()

            this._diamonds.forEach(diamond => {
                diamond.update();
                this._collision.check(this._player, diamond);
            });

            this._enemyShips.forEach(enemy => {
                enemy.update();
                if (enemy.Reload === enemy.DefaultFireRate) {
                    enemy.Reload = 0;
                    for (var bullet in this._enemyBullets) {
                        if (!this._enemyBullets[bullet].InFlight) {
                            this._enemyBullets[bullet].fire(enemy.position);
                            break;
                        }
                    }
                }
                if (this._collision.check(this._player, enemy)) {
                    enemy.destroy()
                }
            });

            this._player._bullets.forEach(bullet => {
                bullet.update();
                this._enemyShips.forEach(enemy => {
                    this._collision.check(enemy, bullet);
                })
            });

            this._enemyBullets.forEach(enemyBullet => {
                enemyBullet.update();
                if (this._collision.check(this._player, enemyBullet)) {
                    enemyBullet._reset()
                }
            });
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

    }
}