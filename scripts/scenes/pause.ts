/**
 * @file pause.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.1.10 - added pause scene
 * @description This is the pause scene which bridges level scenes to menu and upgrade scenes
 **/
module scenes {
    export class Pause extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++


        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Pause Scene started");
            stage.addChild(this);
        }

        public update(): void {
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++

    } // end class Menu
}