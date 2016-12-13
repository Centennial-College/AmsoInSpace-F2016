/**
 * @file config.ts 
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 12 2016
 * @version 0.4.7 added missionBriefing.ts
 * @description Defines the global static configuration values for the game 
 **/

module config {
    export class Scene {
        public static MENU: number = 0;
        public static INSTRUCTIONS: number = 1;
        public static LEVEL1: number = 2;
        public static LEVEL2: number = 3;
        public static LEVEL3: number = 4;
        public static OVER: number = 5;
        public static PAUSE: number = 6;
        public static CONTROLSELECT: number = 7
        public static WIN: number = 8
        public static BRIEFING1: number = 9
        public static BRIEFING2: number = 10
        public static BRIEFING3: number = 11
    }
    export class Screen {
        public static WIDTH: number = 890;
        public static HEIGHT: number = 628;
        public static CENTER_X: number = 445;
        public static CENTER_Y: number = 314;
    }
    export class Game {
        public static FPS: number = 60;
        public static SCORE_BOARD_HEIGHT: number = 75;
    }
}