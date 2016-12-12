/**
 * @file collision.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.4.2 - added mission objectives to scrollingLevel
 * @description Defines behaviors for collision manager, handles collisions
 *              of various game objects in the game.
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

                    // player colliding with diamonds
                    if (other.objName === "diamond") {
                        console.log("got diamond");
                        createjs.Sound.play("diamond_sound");
                        score += 100;
                        other.visible = false;
                        return true
                    }
                    // only check for collisions if player hasn't collided 
                    if (!prime.isColliding) {
                        if (other.objName === "enemy1") {
                            console.log("hit enemy1");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            // if player is colliding, set to invulnerable for brief duration
                            prime.isColliding = true
                            other.destroy() // asteroid explodes upon collision w/player
                            return true
                        }

                        // player colliding with enemy2
                        if (other.objName === "enemy2") {
                            console.log("hit enemy2");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true
                            return true
                        }

                        // player colliding with enemy3
                        if (other.objName === "enemy3") {
                            console.log("hit enemy3");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true
                        }

                        // player colliding with enemy2's bullets
                        if (other.objName === "enemy2_bullet") {
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true
                            other.destroy() // bullets explode upon collision
                            return true
                        }

                        // player colliding with enemy3's bullets
                        if (other.objName === "enemy3_bullet") {
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true
                            other.destroy() // bullets explode upon collision
                        }

                        // enemy colliding with player bullets
                        if (other.objName === "player_bullet") {
                            createjs.Sound.play("diamond_sound");
                            prime.destroy();
                            other.destroy();
                            return true
                        }
                    }


                }
            }
            // not colliding
            return false
        }
    }
}