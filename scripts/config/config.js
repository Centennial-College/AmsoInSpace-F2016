/*
    Filename: config.ts
    Author: Chamsol Yoon
    Last Modified: Chamsol Yoon
    Date last Modified: 10/4/2016
    Description: define global static values
    Revision History: ???
*/
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
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map