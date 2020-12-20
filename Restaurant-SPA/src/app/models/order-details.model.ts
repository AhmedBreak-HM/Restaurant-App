export class OrderDetails {
    constructor(
        public DetailsId: number,
        public OrderId: number,
        public ItemId: number,
        public DetailsQuantity: number,
        // view model
        public ItemName: string,
        public ItemPrice: number,
        public Total: number
    ) {}

}
