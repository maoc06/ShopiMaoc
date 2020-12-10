export class ShoppingProduct {
    constructor(
        public shprId: number,
        public proId: string,
        public proName: string,
        public proPrice: number,
        public proImage: string,
        public carId: number,
        public quantity: number,
        public total: number,
    ) { }
}
