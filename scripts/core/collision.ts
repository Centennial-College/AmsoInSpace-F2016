/**
 * @description module for collision detection
 **/

module managers {
    export class Collision {

        constructor() {
            this.start();
        }

        public start(): void { }

        public update(): void { }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public check(prime: objects.GameObject, other: objects.GameObject, newFrameRate: number = 0): boolean {
            //check to see if object is colliding
            if (objects.Vector2.distance(prime.position, other.position) < (prime.height + other.height) / 2) {
                if (!other.isColliding) {
                    other.isColliding = true;

                    if (other.objName === "diamond") {
                        console.log("got diamond");
                        createjs.Sound.play("diamond_sound");
                        score += 100;
                        other.visible = false;
                        return true;
                    }
                    // only check for collisions if player hasn't collided 
                    if (!prime.isColliding) {
                        if (other.objName === "enemy1") {
                            console.log("hit enemy1");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            // if player is colliding, set to invulnerable for brief duration
                            prime.isColliding = true
                            return true;
                        }
                    }
                }
            }
        }
    }
}