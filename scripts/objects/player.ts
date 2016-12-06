/**
 * @description Define player object
 * @export
 * @class Player
 * @extends {objects.GameObject}
 **/

module objects {
    export class Player extends objects.GameObject {

        // PRIVATE VARIABLES ++++++++++++++++++++++++++++++++++++++++++
        private _isArmorOn: boolean = false;
        private _livesOfArmor: number = 2;
        
        // PUBLIC VARIABLES +++++++++++++++++++++++++++++++++++++++++++
        //public NumOfArmors: number = 3;
        //public NumOfFriend: number = 3;
        public DefaultFireRate: number = 10;
        public Reload:number = 10;
        public ShieldDamage: boolean = false;
        

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("player")

            this.start();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        public start():void {
            this.x = 50;
            this.y = 300;

            this.position = new Vector2(this.x, this.y);
        }

        public update():void {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.position = new Vector2(this.x, this.y);

            this._checkBounds();

            if(this.Reload < this.DefaultFireRate) {
                this.Reload++;
            }
        }

        public damage(): boolean {
            if (this._isArmorOn) {
                if (this._livesOfArmor > 0) {
                    this._livesOfArmor -= 1;
                }
                if (this._livesOfArmor === 0) {
                    this._isArmorOn = false;
                    this.ShieldDamage = true;
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        private _checkBounds(): void {

            // checkbounds to stop player from going outside

            if (this.x <= (0 + (this.width * 0.5))) {
                this.x = (0 + (this.width * 0.5)); // left
            } else if(this.x >= (630 - (this.width * 0.5))) {
                this.x = (630 - (this.width * 0.5)); // right
            } else if(this.y <= (100 - (this.height * 0.5))) {
                this.y = (100 - (this.height * 0.5)); // top
            } else if (this.y >= (628 - (this.height * 0.5))) {
                this.y = (628 - (this.height * 0.5)); // bottom
            }
        }
    }
}