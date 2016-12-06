/**
 * @file player_bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.1 refactored bullets into abstract class and children of
 *          abstract class
 * @description Behavior and Properties of Player's bullets
 **/

module objects {
    export class Player_bullet extends objects.Bullet {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("player_bullet", 8);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // typescript doesnt let abstract methods be private
        public _checkBounds(): void {
            if (this.position.x >= config.Screen.WIDTH + this.width * 0.5) {
                super._reset();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
       


    } // end class
} // end module