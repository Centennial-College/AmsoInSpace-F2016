/**
 * @file collision.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.4 fixed collisions for current game objects
 * @description Defines behaviors for collision manager, handles collisions
 *              of various game objects in the game.
 **/
var managers;
(function (managers) {
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () { };
        Collision.prototype.update = function () { };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        Collision.prototype.check = function (prime, other, newFrameRate) {
            if (newFrameRate === void 0) { newFrameRate = 0; }
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
                    }
                    // only check for collisions if player hasn't collided 
                    if (!prime.isColliding) {
                        if (other.objName === "enemy1") {
                            console.log("hit enemy1");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            // if player is colliding, set to invulnerable for brief duration
                            prime.isColliding = true;
                            other.destroy(); // asteroid explodes upon collision w/player
                        }
                        // player colliding with enemy2
                        if (other.objName === "enemy2") {
                            console.log("hit enemy2");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true;
                        }
                        // player colliding with enemy2's bullets
                        if (other.objName === "enemy2_bullet") {
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true;
                            other.destroy(); // bullets explode upon collision
                        }
                        // enemy colliding with player bullets
                        if (other.objName === "player_bullet") {
                            createjs.Sound.play("diamond_sound");
                            prime.destroy();
                            other.destroy();
                            score += 300;
                        }
                    }
                }
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map