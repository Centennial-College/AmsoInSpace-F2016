/**
 * @file level3.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1 initial
 * @description This level introduces enemy ships and shooting feature
 **/

module scenes {
    export class Level3 extends scenes.ScrollingLevel {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _diamonds: objects.Diamond[];
        private _enemyShips: objects.Enemy3[];

        private _bossFlag: boolean;
        private _bossSpawnTime: number;
        private _bossSignal: objects.Label;

        private _boss: objects.Saja;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("level3_bgsound", "bg3");
            this.start()
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {

            // intiial setup
            level = 3
            beamEnergyPercent = 100
            missionGoal = 3
            missionProgress = 0
            lives = 5 // "restored" because of the game's story, we "fixed" our ship

            console.log("Level3 Scene started");

            this.addChild(this._player = new objects.Player())

            this._collision = new managers.Collision();

            // adding diamond gameobjects
            this._diamonds = new Array<objects.Diamond>();
            for (var count: number = 0; count < 1; count++) {
                this._diamonds.push(new objects.Diamond());
                this.addChild(this._diamonds[count]);
            }

            // adding enemy ships
            this._enemyShips = new Array<objects.Enemy3>();
            for (var count: number = 0; count < 2; count++) {
                this._enemyShips.push(new objects.Enemy3());
                this.addChild(this._enemyShips[count]);
            }

            // adding player bullets to the scene
            this._player._bullets.forEach(bullet => {
                this.addChild(bullet);
            });

            // adding enemy bullets to the scene
            this._enemyShips.forEach(enemy => {
                enemy._bullets.forEach(bullet => {
                    this.addChild(bullet);
                });
            });

            // prepare for boss stage
            this._bossSignal = new objects.Label("Saja is Incoming!!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._bossSignal.shadow = new createjs.Shadow("#f00", 0, 0, 50)
            this._bossSignal.alpha = 0;
            this.addChild(this._bossSignal);

            // adding boss to scene
            this._boss = new objects.Saja();
            this.addChild(this._boss);
            // adding boss bullet;
            this._boss._bullets.forEach(bullet => {
                this.addChild(bullet);
            })

            stage.addChild(this);

            // true when objective of stage has done.
            this._bossFlag = false;

        }

        public update(): void {
            super.update()

            this._updateBeamEnergyBar()

            // updates bullets position and checks for collision b/t enemy and bullets
            this._player._bullets.forEach(bullet => {
                bullet.update();
                if (!this._bossFlag) {

                    this._enemyShips.forEach(enemy => {
                        this._collision.check(enemy, bullet);
                    })
                } else {
                    this._collision.check(this._boss, bullet);
                }
            });

            if (this._bossFlag) {
                this._bossStage();
            } else {
                this._enemy3Stage();
            }

            // run only once when when boss is coming out
            if (missionProgress >= missionGoal && !this._bossFlag) {
                this._bossFlag = true;

                // code from super._advanceToNextLevel()
                this.addChild(this._lblLevelComplete = new objects.Label("MISSION " + level + " COMPLETE!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y))
                this._lblLevelComplete.shadow = new createjs.Shadow("#fff", 0, 0, 2)
                this._levelComplete = true
                createjs.Tween.get(this._lblLevelComplete)
                    .to({ alpha: 0, y: this._lblLevelComplete.y - 100 }, 1000);
                this._bossSpawnTime = createjs.Ticker.getTime();
                this._clearStage();
            }
            // this._missionObjectiveLbl.text = "- Earn enough money to fix the ship: " + this._missionObjProgress +
            // "/" + this._missionObjectiveGoal

            if (missionProgress >= missionGoal && !this._levelComplete) {
                // this._canAdvanceToNextLevel = true
                scene = config.Scene.WIN
                this._advanceToNextLevel()
                this._bgSound.stop()
                // createjs.Sound.stop()
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

        private _enemy3Stage(): void {
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
            this._missionObjectiveLbl.text = "- Destroy enemy ships to get ship parts: " + missionProgress + "/" + missionGoal;
        }

        private _bossStage(): void {


            var signalBoss: objects.Label;

            // blick signal
            if (createjs.Ticker.getTime() - this._bossSpawnTime > 1000 && createjs.Ticker.getTime() - this._bossSpawnTime < 2500) {
                if (createjs.Ticker.getTime() % 200 >= 100) {
                    this._bossSignal.alpha = 0.5
                } else {
                    this._bossSignal.alpha = 1
                }
            } else if (createjs.Ticker.getTime() - this._bossSpawnTime > 2500) {
                this._bossSignal.alpha = 0;
                this._boss.update();
                if (this._collision.check(this._player, this._boss)) {
                    this._boss.destroy();
                }
                this._boss._bullets.forEach(bullet => {
                    this._collision.check(this._player, bullet);
                })
            }
            this._missionObjectiveLbl.text = "- Defeat Saja's Grand Generals: " + missionProgress + "/" + missionGoal;
        }

        // clear enemy3s and their bullets
        private _clearStage(): void {
            this._diamonds.forEach(diamond => {
                diamond.reset();
                this.removeChild(diamond);
            });
            this._enemyShips.forEach(enemy => {
                enemy.reset();
                enemy._bullets.forEach(bullet => {
                    bullet.reset();
                    this.removeChild(bullet);
                });
                this.removeChild(enemy);
            });
            // initialize boss stage
            missionProgress = 0;
            missionGoal = 20;
        }
    }
}