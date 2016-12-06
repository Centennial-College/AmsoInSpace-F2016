/**
 * @description module for collision detection
 **/

module managers {
    export class Collision {

        constructor(){
            this.start();
        }

        public start():void {}

        public update():void {}

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public check(prime: objects.GameObject, other: objects.GameObject, newFrameRate: number = 0) {
            //check to see if object is colliding
            if (objects.Vector2.distance(prime.position, other.position) < (prime.height + other.height)/2) {
                if(!other.isColliding) {
                    other.isColliding = true;

                    if (other.objName === "diamond") {
                        console.log("got diamond");
                        createjs.Sound.play("diamond_sound");
                        score += 100;
                        other.visible = false;
                    }
                    if (other.objName === "enemy1") {
                        console.log("hit enemy1");
                        createjs.Sound.play("enemy1_sound");
                        lives -= 1;
                    }
                    if (other.objName === "enemy2") {
                        console.log("hit enemy2");
                        createjs.Sound.play("enemy1_sound");
                        lives -= 1;
                    }
                    if (other.objName === "enemy2_bullet") {
                        createjs.Sound.play("enemy1_sound");
                        lives -= 1;
                    }

                    if (other.objName === "player_bullet") {
                        createjs.Sound.play("diamond_sound");
                        prime.destroy();
                        other.destroy();
                        score += 300;
                    }
                }
            }
        }
    }
}