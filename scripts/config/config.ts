/**
 * @file config.ts 
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 5 2016
 * @version 0.1.10 - added pause scene
 * @description Defines the global static configuration values for the game 
 **/

module config {
    export class Scene {
        public static MENU: number = 0;
        public static RULE: number = 1;
        public static LEVEL1: number = 2;
        public static LEVEL2: number = 3;
        public static LEVEL3: number = 4;
        public static OVER: number = 5;
        public static PAUSE: number = 6;

    }
    export class Screen {
        public static WIDTH: number = 890;
        public static HEIGHT: number = 628;
        public static CENTER_X: number = 445;
        public static CENTER_Y: number = 314;
    }
    export class Game {
        public static FPS: number = 60;
    }
}