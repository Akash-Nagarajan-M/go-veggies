// Product model
export class Product {
    constructor(
        public productId: number,
        public productName: string,
        public price: number,
        public description: string,
        public imageUrl: string,
        public type: string
         ) {
    }
}
