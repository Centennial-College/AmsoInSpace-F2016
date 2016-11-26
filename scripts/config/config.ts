/*
    Filename: config.ts
    Author: Chamsol Yoon
    Last Modified: Chamsol Yoon 
    Date last Modified: 10/4/2016
    Description: define global static values
    Revision History: ???
*/

module config {
    export class Scene {
        public static MENU:number = 0;
        public static RULE:number = 1;
        public static LEVEL1:number = 2;
        public static LEVEL2:number = 3;
        public static LEVEL3:number = 4;
        public static OVER:number = 5;

    }
    export class Screen {
        public static WIDTH:number = 890;
        public static HEIGHT:number = 628;
        public static CENTER_X:number = 445;
        public static CENTER_Y:number = 314;
    }
    export class Game {
        public static FPS:number = 60;
    }
}