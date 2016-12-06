/**
 * @description Level 1
 * @export
 * @class Level1
 * @extends {objects.Scene}
 **/

module scenes {
    export class Level1 extends objects.Scene {
        
        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg:objects.Background;
        private _player:objects.Player;
        private _diamond:objects.Diamond[];
        private _enemy:objects.Enemy1[];
        private _lblScore:objects.Label;
        private _lblLives:objects.Label;
        private _lblLevel:objects.Label;
        private _collision:managers.Collision;
        private _level1_bgsound: createjs.AbstractSoundInstance;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start():void{
            stage.cursor="none"; // hide cursor
            console.log("Level1 Scene started");
            
            this._collision = new managers.Collision();

            this._bg = new objects.Background("bg1");
            this.addChild(this._bg);

            this._player = new objects.Player();
            this.addChild(this._player);
            
            this._diamond = new Array<objects.Diamond>();
            for(var count:number = 0; count < 2; count++){
                this._diamond.push(new objects.Diamond());
                this.addChild(this._diamond[count]);
            }

            this._enemy = new Array<objects.Enemy1>();
            for(var count:number = 0; count < 2; count++){
                this._enemy.push(new objects.Enemy1());
                this.addChild(this._enemy[count]);
            }

            //bgm
            this._level1_bgsound = createjs.Sound.play("level1_bgsound");
            this._level1_bgsound.loop = -1;

            this._lblLevel = new objects.Label("Level 1", "40px customfont", "#FFFF00", config.Screen.CENTER_X-250, 5);
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
                this._collision.check(this._player, enemy);
            });

            this._updateScoreBoard();
            
            if (lives < 1) {
                this._level1_bgsound.stop();
                scene = config.Scene.OVER;
                changeScene();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _updateScoreBoard() {
            this._lblLives.text = "Lives: " + lives;
            this._lblScore.text = "Score: " + score;

            // Test Automatically moving to Stage 2
            if (score >= 1000) {
                this._level1_bgsound.stop();
                scene = config.Scene.LEVEL2;
                changeScene();
            }     
        }
    }
}