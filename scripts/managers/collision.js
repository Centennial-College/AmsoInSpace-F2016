/**
 * @description module for collision detection
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
                            prime.isColliding = true;
                            return true;
                        }
                        if (other.objName === "enemy2") {
                            console.log("hit enemy2");
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true;
                            return true;
                        }
                        if (other.objName === "enemy2_bullet") {
                            createjs.Sound.play("enemy1_sound");
                            lives -= 1;
                            prime.isColliding = true;
                            return true;
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
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map