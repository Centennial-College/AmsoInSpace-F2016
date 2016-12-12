/**
 * @file instructions.ts
 * @author Kevin Ma kma45@my.centennialcollege.ca
 * @date December 11 2016
 * @version 0.3.9 - implemented instructions scene
 * @description This scene provides rules to playing this game.
 **/

module scenes {
    export class Instructions extends objects.Scene {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _bg: objects.Background;
        private _bgBuffer: objects.Background
        private _beginBtn: objects.Button;
        private _menuBtn: objects.Button
        private _instructionsRRectBGs: createjs.Shape[]
        private _headers: objects.Label[]
        private _bodyParas: objects.Label[]
        private _bodyContainers: createjs.Container[]
        private _flashingClickToContinue: objects.Label

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(private _currentlyShowingSlide: number = 0) {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        public start(): void {
            console.log("Instructions Scene started");

            this._instructionsRRectBGs = []
            this._headers = []
            this._bodyParas = []
            this._bodyContainers = []

            this._setupBackground()
            this._setupHeaderLabels()
            this._setupBodyLabels()
            this._setupButtons()
            this._setupFlashingLabel()

            // display the first panel of instrucstions on startup
            this._displaySlide(this._headers[0], this._bodyContainers[0])

            stage.addChild(this);
        }

        public update(): void {
            this._bg.update()
            this._bgBuffer.update()

            // flashing of click to continue
            if (createjs.Ticker.getTime() % 1000 < 500) {
                this._flashingClickToContinue.alpha = 0
            }
            else {
                this._flashingClickToContinue.alpha = 1
            }
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _setupStageMouseEventHandlers(): void {
            stage.on("stagemousedown", e => {
                if (this._currentlyShowingSlide < 2) {
                    // hides current panel
                    this._hideSlide(this._headers[this._currentlyShowingSlide], this._bodyContainers[this._currentlyShowingSlide])

                    // increments counter panel
                    this._currentlyShowingSlide++

                    // displays next panel
                    this._displaySlide(this._headers[this._currentlyShowingSlide], this._bodyContainers[this._currentlyShowingSlide])

                    if (this._currentlyShowingSlide == 2) {
                        this.removeChild(this._flashingClickToContinue)
                        this._showButtons()
                    }
                }
            })
        }

        private _showButtons(): void {
            createjs.Tween.get(this._menuBtn).wait(3500).to({
                alpha: 1
            }, 2000)

            createjs.Tween.get(this._beginBtn).wait(3500).to({
                alpha: 1
            }, 2000)
        }

        private _setupHeaderLabels(): void {
            this._headers[0] = new objects.Label("Who are you, what do you do?", "45px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headers[0].shadow = new createjs.Shadow("#000", 5, 5, 5)
            this._headers[0].alpha = 0

            this._headers[1] = new objects.Label("How do you do it?", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headers[1].shadow = new createjs.Shadow("#000", 5, 5, 5)
            this._headers[1].alpha = 0

            this._headers[2] = new objects.Label("When will your journey end?", "50px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y - 200);
            this._headers[2].shadow = new createjs.Shadow("#000", 5, 5, 5)
            this._headers[2].alpha = 0

            this.addChild(this._headers[0], this._headers[1], this._headers[2])
        }

        private _setupBodyLabels(): void {

            // container1
            this._bodyContainers[0] = new createjs.Container()
            this._instructionsRRectBGs[0] = new createjs.Shape()
            this._instructionsRRectBGs[0].graphics.beginFill('#fff')
            this._instructionsRRectBGs[0].graphics.drawRoundRect(15, 175, config.Screen.WIDTH - 30, 275, 25)
            this._instructionsRRectBGs[0].shadow = new createjs.Shadow("#000", 2, 2, 20)
            this._instructionsRRectBGs[0].alpha = .1

            this._bodyParas[0] = new objects.Label(
                "Your name is Jim, and you are a wild cowboy\nhailing from the proud kingdom of Moshorse, \nBelusra.You once enjoyed a peaceful life as\na mere traveller of the desert.But now, you\nare heralded as the chosen hero of the\nuniverse.Your life of tranquility has ended\nand you fight daily for the lives of many...",
                "30px customfont", "#00FF48", config.Screen.CENTER_X + 10, config.Screen.CENTER_Y);
            this._bodyParas[0].alpha = .9

            this._bodyContainers[0].addChild(this._instructionsRRectBGs[0], this._bodyParas[0])

            // start off, off screen so can zoom in later
            this._bodyContainers[0].y = 5000

            // container2
            this._bodyContainers[1] = new createjs.Container()
            this._instructionsRRectBGs[1] = new createjs.Shape()
            this._instructionsRRectBGs[1].graphics.beginFill('#fff')
            this._instructionsRRectBGs[1].graphics.drawRoundRect(15, 175, config.Screen.WIDTH - 30, 275, 25)
            this._instructionsRRectBGs[1].shadow = new createjs.Shadow("#000", 2, 2, 20)
            this._instructionsRRectBGs[1].alpha = .1

            this._bodyParas[1] = new objects.Label(
                "You pilot Amso, the spaceship you named after\nyour beloved cow, across the many galaxies of\nour universe. Throughout your journey, you\nmust navigate through asteroid belts, enemy\nfortresses, and enemy defense lines in order\nto eventually end the reign of the evil tyrant,\nSaja.",
                "30px customfont", "#00FF48", config.Screen.CENTER_X + 3, config.Screen.CENTER_Y);
            this._bodyParas[1].alpha = .9

            this._bodyContainers[1].addChild(this._instructionsRRectBGs[1], this._bodyParas[1])

            // start off, off screen so can zoom in later
            this._bodyContainers[1].y = 5000

            // container3
            this._bodyContainers[2] = new createjs.Container()
            this._instructionsRRectBGs[2] = new createjs.Shape()
            this._instructionsRRectBGs[2].graphics.beginFill('#fff')
            this._instructionsRRectBGs[2].graphics.drawRoundRect(15, 175, config.Screen.WIDTH - 30, 275, 25)
            this._instructionsRRectBGs[2].shadow = new createjs.Shadow("#000", 2, 2, 20)
            this._instructionsRRectBGs[2].alpha = .1

            this._bodyParas[2] = new objects.Label(
                "You complete your travels when you slay the\nevil emperor, Saja, and restore peace back to\nthe people of the universe. Before then, you\nmust navigate your spaceship, using controls\nyou later select, complete mission objectives,\nand accrue enough strength to do battle with\nSaja.",
                "30px customfont", "#00FF48", config.Screen.CENTER_X + 3, config.Screen.CENTER_Y);
            this._bodyParas[2].alpha = .9

            this._bodyContainers[2].addChild(this._instructionsRRectBGs[2], this._bodyParas[2])

            // start off, off screen so can zoom in later
            this._bodyContainers[2].y = 5000

            this.addChild(this._bodyContainers[0], this._bodyContainers[1], this._bodyContainers[2])
        }

        /**
         * Dispalys the nth panel of instructions - header and body container
         * 
         * @private
         * @param {objects.Label} h header label for the current panel of instructions
         * @param {createjs.Container} b the body container for the current panel of instructions
         * 
         * @memberOf Instructions
         */
        private _displaySlide(h: objects.Label, b: createjs.Container): void {
            console.log(h);

            // header fades into view
            createjs.Tween.get(h).wait(1000).to({
                alpha: 1
            }, 1000)

            // body zooms up
            createjs.Tween.get(b).wait(1500).to({
                y: 0
            }, 1000).call(e => {
                // only setup handlers now so the player can only click after animation finishes
                this._setupStageMouseEventHandlers()
            })
        }

        /**
         * Hides the nth panel of instructions - header and body container
         * 
         * @private
         * @param {objects.Label} h header label for the current panel of instructions
         * @param {createjs.Container} b the body container for the current panel of instructions
         * 
         * @memberOf Instructions
         */
        private _hideSlide(h: objects.Label, b: createjs.Container): void {
            // prevents skipping all instructions scene by spam clicking
            stage.removeAllEventListeners()

            // header fades into view
            createjs.Tween.get(h).wait(200).to({
                y: -2000
            }, 1000)

            // body zooms up
            createjs.Tween.get(b).wait(200).to({
                y: -2000
            }, 1000)
        }

        private _setupFlashingLabel(): void {
            this._flashingClickToContinue = new objects.Label("- Click anywhere to continue -", "30px customfont", "#00FF48", config.Screen.CENTER_X, config.Screen.CENTER_Y + 200);
            this._flashingClickToContinue.shadow = new createjs.Shadow('#000', 5, 5, 15)

            this.addChild(this._flashingClickToContinue)
        }

        private _setupButtons(): void {
            this._beginBtn = new objects.Button("letsbeginbtn", config.Screen.CENTER_X + 150, config.Screen.CENTER_Y + 200)
            this._beginBtn.on("click", this._beginBtnClick, this);
            this._beginBtn.alpha = 0

            this._menuBtn = new objects.Button("menubtn", config.Screen.CENTER_X - 150, config.Screen.CENTER_Y + 200)
            this._menuBtn.on("click", this._menuBtnClick, this);
            this._menuBtn.alpha = 0

            this.addChild(this._beginBtn, this._menuBtn);
        }

        /**
         * Switches the scene to LEVEL1
         * 
         * @private
         * 
         * @memberOf Instructions
         */
        private _beginBtnClick(): void {
            scene = config.Scene.CONTROLSELECT;
            changeScene();
        }

        /**
        * Switches the scene to Menu
        * 
        * @private
        * 
        * @memberOf Instructions
        */
        private _menuBtnClick(): void {
            scene = config.Scene.MENU;
            changeScene();
        }

        /**
         * Sets up the background image, and its box blur filter
         * 
         * @private
         * 
         * @memberOf Menu
         */
        private _setupBackground(): void {
            // Setting up BACKGROUND
            this._bg = new objects.Background("bg1", 0, 1);
            this._bgBuffer = new objects.Background("bg1", 1024, 1);

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(5, 5);
            this._bg.filters = [blurFilter];
            this._bgBuffer.filters = [blurFilter];
            let bitmapBounds = this._bg.getBounds();
            let bgBufBound = this._bgBuffer.getBounds();
            this._bg.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._bgBuffer.cache(bgBufBound.x, bgBufBound.y, bgBufBound.width, bgBufBound.height);
            this.addChild(this._bg, this._bgBuffer);
        }
    }
}