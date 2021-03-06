/**
 * @file saja_bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1 initial
 * @extends Bullet
 * @description Behavior and Properties of Player's bullets
 **/

module objects {
    export class Saja_bullet extends objects.Bullet {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("saja_bullet", -6);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // typescript doesnt let abstract methods be private
        public _checkBounds(): void {
            if (this.position.x <= 0 - this.width * 0.5) {
                super._reset();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++

    } // end class
} // end module