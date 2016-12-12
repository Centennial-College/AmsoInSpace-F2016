/**
 * @description Defines Text objects
 * @export
 * @class Label
 * @extends {createjs.Text}
 **/

module objects {
    export class Label extends createjs.Text {
        constructor(labelString: string, labelFont: string, labelColor: string, x: number, y: number,
            private _isCentered: boolean = true) {
            // MUST call parent class constructor. Requires text to be displayed, font, and color
            super(labelString, labelFont, labelColor);

            // Set registration point of the text. Used when performing transformations
            if (this._isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            // Set initial x,y position of the label
            this.x = x;
            this.y = y;
        }
    }
}