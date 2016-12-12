/**
 * @file enemy2_bullet.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.1 initial
 * @description Behavior and Properties of Enemy2 ship's bullets
 **/

module objects {
    export class Enemy3_bullet extends objects.Bullet {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemy3_bullet", -4);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // typescript doesnt let abstract methods be private
        public _checkBounds(): void {
            if (this.position.x <= this.width * 0.5) {
                super._reset();
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
    }
}