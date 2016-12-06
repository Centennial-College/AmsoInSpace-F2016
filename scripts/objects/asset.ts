/**
 * @description Defines external assets
 * @export
 * @class Asset
 **/

module objects {
    export class Asset {
        public id:string;
        public src:string;

        constructor(id:string, src:string){
            this.id = id;
            this.src = src;
        }
    }
}