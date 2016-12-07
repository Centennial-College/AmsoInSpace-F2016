/**
 * @file config.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 6 2016
 * @version 0.3.7 added controlSelection scene
 * @description Defines the global static configuration values for the game
 **/
var config;
(function (config) {
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.RULE = 1;
        Scene.LEVEL1 = 2;
        Scene.LEVEL2 = 3;
        Scene.LEVEL3 = 4;
        Scene.OVER = 5;
        Scene.PAUSE = 6;
        Scene.CONTROLSELECT = 7;
        return Scene;
    }());
    config.Scene = Scene;
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 890;
        Screen.HEIGHT = 628;
        Screen.CENTER_X = 445;
        Screen.CENTER_Y = 314;
        return Screen;
    }());
    config.Screen = Screen;
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        Game.SCORE_BOARD_HEIGHT = 75;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map