/**
 * @description Level 2
 * @export
 * @class Level2
 * @extends {objects.Scene}
 **/

module scenes {
    export class Level2 extends objects.Scene {
        
        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg:objects.Background;
        private _player:objects.Player;
        private _diamond:objects.Diamond[];
        private _enemy:objects.Enemy2[];
        private _lblScore:objects.Label;
        private _lblLives:objects.Label;
        private _lblLevel:objects.Label;
        private _collision:managers.Collision;
        private _level2_bgsound: createjs.AbstractSoundInstance;
        private _bullets: objects.Player_bullet[];
        private _enemyBullets: objects.Enemy2_bullet[];
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void{
            console.log("Level2 Scene started");
            
            this._collision = new managers.Collision();

            this._bg = new objects.Background("bg2");
            this.addChild(this._bg);

            this._player = new objects.Player();
            this._player.on("click", this._playerFire, this);
            this.addChild(this._player);
            
            this._diamond = new Array<objects.Diamond>();
            for(var count:number = 0; count < 2; count++){
                this._diamond.push(new objects.Diamond());
                this.addChild(this._diamond[count]);
            }

            this._enemy = new Array<objects.Enemy2>();
            for(var count:number = 0; count < 2; count++){
                this._enemy.push(new objects.Enemy2());
                this.addChild(this._enemy[count]);
            }

            this._bullets = new Array<objects.Player_bullet>();
            for (var bullet = 0; bullet < 20; bullet++) {
                this._bullets.push(new objects.Player_bullet("player_bullet"));
                this.addChild(this._bullets[bullet]);
            }

            this._enemyBullets = new Array<objects.Enemy2_bullet>();
            for (let bullet = 0; bullet < 5; bullet++) {
                this._enemyBullets.push(new objects.Enemy2_bullet());
                this.addChild(this._enemyBullets[bullet]);
            }

            //bgm
            this._level2_bgsound = createjs.Sound.play("level2_bgsound");
            this._level2_bgsound.loop = -1;

            this._lblLevel = new objects.Label("Level 2", "40px customfont", "#FFFF00", config.Screen.CENTER_X-250, 5);
            this._lblLives = new objects.Label("Lives: " + lives, "40px customfont", "#FB791A", config.Screen.CENTER_X, 5);
            this._lblScore = new objects.Label("Score: " + score, "40px customfont", "#1AFBF4", config.Screen.CENTER_X+250, 5);
            this.addChild(this._lblLevel, this._lblLives, this._lblScore);

            stage.addChild(this);
        }

        public update():void {
            this._bg.update();
            this._player.update();

            this._diamond.forEach(diamond => {
                diamond.update();
                this._collision.check(this._player, diamond);
            });

            this._enemy.forEach(enemy => {
                enemy.update();
                if(enemy.Reload === enemy.DefaultFireRate){
                    enemy.Reload = 0;
                    for(var bullet in this._enemyBullets){
                        if(!this._enemyBullets[bullet].InFlight){
                            this._enemyBullets[bullet].fire(enemy.position);
                            break;
                        }
                    }                   
                }
                this._collision.check(this._player, enemy);
            });
            
            this._bullets.forEach(bullet=>{
                bullet.update();
                this._enemy.forEach(enemy => {
                    this._collision.check(enemy, bullet);
                })
            });

            this._enemyBullets.forEach(bullet => {
                bullet.update();
                this._collision.check(this._player, bullet);
            });
            
            this._updateScoreBoard();
            
            if (lives < 1) {
                this._level2_bgsound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _updateScoreBoard() {
            this._lblLives.text = "Lives: " + lives;
            this._lblScore.text = "Score: " + score;
        }

        private _playerFire(): void {
            if(this._player.Reload === this._player.DefaultFireRate){
                this._player.Reload = 0;
                for(var bullet in this._bullets){
                    if(!this._bullets[bullet].InFlight){
                        this._bullets[bullet].fire(this._player.position);
                        break;
                    }
                }
            }
        }
    }
}