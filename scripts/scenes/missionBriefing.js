/**
 * @file missionBriefing.ts
 * @author Chamsol Yoon cyoon2@my.centennialcollege.ca
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 12 2016
 * @version 0.4.9 implemented story and mission objective for level2
 * @description This class is used to brief the player about the details
 *              of the upcoming mission
 **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var MissionBriefing = (function (_super) {
        __extends(MissionBriefing, _super);
        // constructor
        function MissionBriefing(_currentlyShowingSlide) {
            if (_currentlyShowingSlide === void 0) { _currentlyShowingSlide = 0; }
            _super.call(this);
            this._currentlyShowingSlide = _currentlyShowingSlide;
        }
        // public methods
        MissionBriefing.prototype.start = function () {
            createjs.Sound.stop();
            console.log('started missionBriefing');
            // initialize empty arrays
            this._headerLbls = [];
            this._missionLbls = [];
            this._missionBgPanels = [];
            this._missionContainers = [];
            this._newGameFeaturesBgPanels = [];
            this._newGameFeaturesContainers = [];
            this._newGameObjects = [];
            this._newGameObjectsLabels = [];
            this._setupBackground();
            this._setupHeaderLabels();
            this._setupMissionLabels();
            this._setupNewFeaturesContainers();
            this._setupFlashingLabel();
            this._displaySlide(this._headerLbls[level], this._missionContainers[level]);
            stage.addChild(this);
        };
        MissionBriefing.prototype.update = function () {
            // scrolls the background
            this._bg.update();
            this._bgBuffer.update();
            // flashing of click to continue
            if (createjs.Ticker.getTime() % 1000 < 500) {
                this._flashingClickToContinue.alpha = 0;
            }
            else {
                this._flashingClickToContinue.alpha = 1;
            }
        };
        // private methods
        MissionBriefing.prototype._proceedToMission = function () {
            this.removeChild(this._flashingClickToContinue);
            this.addChild(this._player = new createjs.Sprite(textureAtlas, (mouseControls ? "playerFT_move" : "playerSD_move")));
            this._player.y = config.Screen.CENTER_Y;
            this._player.x = 0;
            this.addChild(this._hereWeGoLabel = new objects.Label("Here we Go!", "40px customfont", "#fff", this._player.x, this._player.y));
            // this.addChild(this._letsGoLabel = new objects.Label("Let's Go!", "40px customfont", "#fff", config.Screen.CENTER_X, config.Screen.CENTER_Y))
            this._hereWeGoLabel.shadow = new createjs.Shadow("#fff", 0, 0, 2);
            createjs.Sound.play('missionstart');
            // player move accross the screen, message shoots out while crossing mid screen
            createjs.Tween.get(this._player)
                .to({ x: config.Screen.WIDTH }, 2000);
            createjs.Tween.get(this._hereWeGoLabel)
                .to({
                alpha: 0,
                y: this._hereWeGoLabel.y - 250,
                x: config.Screen.WIDTH
            }, 2000)
                .call(function () {
                stage.removeChild(this._letsGoLabel);
                // wait until this animation finishes before changing scenes
                switch (level) {
                    case 0:
                        scene = config.Scene.LEVEL1;
                        break;
                    case 1:
                        scene = config.Scene.LEVEL2;
                        break;
                    case 2:
                        scene = config.Scene.LEVEL3;
                        break;
                }
                changeScene();
            });
        };
        MissionBriefing.prototype._setupStageMouseEventHandlers = function () {
            var _this = this;
            stage.on("stagemousedown", function (e) {
                // done introducing new game obj -> proceed to level stage
                if (_this._currentlyShowingSlide++ == 1) {
                    _this._hideSlide(null, _this._newGameFeaturesContainers[level]);
                }
                else {
                    _this._displaySlide(null, _this._newGameFeaturesContainers[level]);
                    // hides current panel
                    _this._hideSlide(_this._headerLbls[level], _this._missionContainers[level]);
                }
            });
        };
        /**
         * Dispalys the nth mission briefing - header and body container
         *
         * @private
         * @param {objects.Label} h header label for the current panel of mission briefing
         * @param {createjs.Container} b the body container for the current panel of mission briefing
         *
         * @memberOf Instructions
         */
        MissionBriefing.prototype._displaySlide = function (h, b) {
            var _this = this;
            if (h != null) {
                // header fades into view
                createjs.Tween.get(h).wait(1000).to({
                    alpha: 1
                }, 1000);
            }
            else {
                createjs.Tween.get(this._newGameObjectiveHeaderLabel).wait(1000).to({
                    alpha: 1
                }, 1000);
            }
            // body zooms up
            createjs.Tween.get(b).wait(1500).to({
                y: 0
            }, 1000).call(function (e) {
                // only setup handlers now so the player can only click after animation finishes
                _this._setupStageMouseEventHandlers();
            });
        };
        /**
         * Hides the nth mission briefing - header and body container
         *
         * @private
         * @param {objects.Label} h header label for the current panel of mission briefing
         * @param {createjs.Container} b the body container for the current panel of mission briefing
         *
         * @memberOf Instructions
         */
        MissionBriefing.prototype._hideSlide = function (h, b) {
            var _this = this;
            // prevents skipping all instructions scene by spam clicking
            stage.removeAllEventListeners();
            if (h != null) {
                // header fades out of  view
                createjs.Tween.get(h).wait(200).to({
                    y: -2000
                }, 1000);
            }
            else {
                createjs.Tween.get(this._newGameObjectiveHeaderLabel).wait(200).to({
                    y: -2000
                }, 1000).call(function (e) {
                    _this._proceedToMission();
                });
            }
            // body zooms up
            createjs.Tween.get(b).wait(200).to({
                y: -2000
            }, 1000);
        };
        MissionBriefing.prototype._setupFlashingLabel = function () {
            this._flashingClickToContinue = new objects.Label("- Click anywhere to continue -", "30px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y + 275, true);
            this._flashingClickToContinue.shadow = new createjs.Shadow('#000', 5, 5, 15);
            this.addChild(this._flashingClickToContinue);
        };
        MissionBriefing.prototype._setupNewFeaturesContainers = function () {
            // FOR LEVEL 1
            this._newGameFeaturesContainers[0] = new createjs.Container();
            this._newGameFeaturesBgPanels[0] = new createjs.Shape();
            this._newGameFeaturesBgPanels[0].graphics.beginFill('#fff');
            this._newGameFeaturesBgPanels[0].graphics.drawRoundRect(15, 165, config.Screen.WIDTH - 30, 395, 25);
            this._newGameFeaturesBgPanels[0].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._newGameFeaturesBgPanels[0].alpha = .1;
            this._newGameObjectsLabels[0] = new objects.Label("There will be asteroids moving\nacross the screen. If you get hit,\nyou will lose a life. Try your best\nto avoid collding with them.", "30px customfont", "#00FF48", 200, config.Screen.CENTER_Y - 100, false);
            this._newGameObjectsLabels[1] = new objects.Label("Diamonds will also move across the\nscreen.Pick them up to sell them\nfor money.Each diamond is worth\n$100.", "30px customfont", "#00FF48", 200, config.Screen.CENTER_Y + 100, false);
            // asteroids and diamonds are new in level 1
            this._newGameObjects[0] = new objects.Asteroid();
            this._newGameObjects[1] = new objects.Diamond();
            this._newGameObjects[1].x = this._newGameObjects[0].x = 100;
            this._newGameObjects[0].y = config.Screen.CENTER_Y - 50;
            this._newGameObjects[1].y = config.Screen.CENTER_Y + 150;
            this._newGameObjectsLabels[0].alpha = .9;
            this._newGameObjectsLabels[1].alpha = .9;
            this._newGameFeaturesContainers[0].addChild(this._newGameFeaturesBgPanels[0], this._newGameObjectsLabels[0], this._newGameObjectsLabels[1], this._newGameObjects[0], this._newGameObjects[1]);
            // start off, off screen so can zoom in later
            this._newGameFeaturesContainers[0].y = 5000;
            // FOR LEVEL 2 
            this._newGameFeaturesContainers[1] = new createjs.Container();
            this._newGameFeaturesBgPanels[1] = new createjs.Shape();
            this._newGameFeaturesBgPanels[1].graphics.beginFill('#fff');
            this._newGameFeaturesBgPanels[1].graphics.drawRoundRect(15, 165, config.Screen.WIDTH - 30, 395, 25);
            this._newGameFeaturesBgPanels[1].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._newGameFeaturesBgPanels[1].alpha = .1;
            this._newGameObjectsLabels[2] = new objects.Label("The enemy ships patrol their secret\nbase. They will never leave the\nperimeter of their base. However,\nthey will randomly fire their\nweapons outside their base.", "30px customfont", "#00FF48", 210, config.Screen.CENTER_Y - 40, false);
            // asteroids and diamonds are new in level 1
            this._newGameObjects[2] = new objects.Enemy2();
            this._newGameObjects[2].x = 110;
            this._newGameObjects[2].y = config.Screen.CENTER_Y + 50;
            this._newGameObjectsLabels[2].alpha = .9;
            this._newGameFeaturesContainers[1].addChild(this._newGameFeaturesBgPanels[1], this._newGameObjectsLabels[2], this._newGameObjects[2], this._newGameObjects[2]);
            // start off, off screen so can zoom in later
            this._newGameFeaturesContainers[1].y = 5000;
            this.addChild(this._newGameFeaturesContainers[0], this._newGameFeaturesContainers[1]);
        };
        MissionBriefing.prototype._setupMissionLabels = function () {
            // FOR LEVEL 1
            this._missionContainers[0] = new createjs.Container();
            this._missionBgPanels[0] = new createjs.Shape();
            this._missionBgPanels[0].graphics.beginFill('#fff');
            this._missionBgPanels[0].graphics.drawRoundRect(15, 165, config.Screen.WIDTH - 30, 395, 25);
            this._missionBgPanels[0].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._missionBgPanels[0].alpha = .1;
            this._missionLbls[0] = new objects.Label("Location\t: Asteroid Belt XXX\n\nDescription\t:\n			  Although we summoned you, the chosen one\n			  destined for greatness, we are actually\n			  dirt poor. As such you need to make do with\n			  this broken ship we have prepared for you.\n\nObjective\t:\n			  Earn enough money ($1000) to fix the ship\n			  before setting off on your journey to\n			  vanquish the evil tyrant Saja.", "30px customfont", "#00FF48", 50, 180, false);
            this._missionLbls[0].alpha = .9;
            this._missionContainers[0].addChild(this._missionBgPanels[0], this._missionLbls[0]);
            // start off, off screen so can zoom in later
            this._missionContainers[0].y = 5000;
            // LEVEL 2
            this._missionContainers[1] = new createjs.Container();
            this._missionBgPanels[1] = new createjs.Shape();
            this._missionBgPanels[1].graphics.beginFill('#fff');
            this._missionBgPanels[1].graphics.drawRoundRect(15, 165, config.Screen.WIDTH - 30, 395, 25);
            this._missionBgPanels[1].shadow = new createjs.Shadow("#000", 2, 2, 20);
            this._missionBgPanels[1].alpha = .1;
            this._missionLbls[1] = new objects.Label("Location\t: Enemy's Secret Base\n\nDescription\t:\n			  Although you managed to get enough money\n			  to fix your ship, there are no available\n			  parts for Amso. If there was only some way\n			  you could get things for free...oh look\n			  there's the enemy's secret base!\n\nObjective\t:\n			  Destroy enemy ships (10) to stea...er,\n			  borrow ship parts to fix your ship.", "30px customfont", "#00FF48", 50, 180, false);
            this._missionContainers[1].addChild(this._missionBgPanels[1], this._missionLbls[1]);
            // start off, off screen so can zoom in later
            this._missionContainers[1].y = 5000;
            this.addChild(this._missionContainers[0], this._missionContainers[1]);
        };
        MissionBriefing.prototype._setupHeaderLabels = function () {
            // for mission 1
            this._headerLbls[0] = new objects.Label("Mission 01", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headerLbls[0].shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._headerLbls[0].alpha = 0;
            this._headerLbls[1] = new objects.Label("Mission 02", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headerLbls[1].shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._headerLbls[1].alpha = 0;
            this._headerLbls[2] = new objects.Label("Mission 03", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headerLbls[2].shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._headerLbls[2].alpha = 0;
            // new obj label
            this._newGameObjectiveHeaderLabel = new objects.Label("New Features!", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._newGameObjectiveHeaderLabel.shadow = new createjs.Shadow("#000", 5, 5, 5);
            this._newGameObjectiveHeaderLabel.alpha = 0;
            this.addChild(this._headerLbls[0], this._headerLbls[1], this._headerLbls[2], this._newGameObjectiveHeaderLabel);
        };
        /**
        * Sets up the background image, and its box blur filter
        *
        * @private
        *
        * @memberOf Menu
        */
        MissionBriefing.prototype._setupBackground = function () {
            // Setting up BACKGROUND
            this._bg = new objects.Background(currBgImgString, 0, 1);
            this._bgBuffer = new objects.Background(currBgImgString, 1022, 1);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            var bitmapBounds = this._bg.getBounds();
            var bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);
        };
        return MissionBriefing;
    }(objects.Scene));
    scenes.MissionBriefing = MissionBriefing;
})(scenes || (scenes = {}));
//# sourceMappingURL=missionBriefing.js.map