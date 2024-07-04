export class RentalItemsBonus {
    id: number;
    rentalId: number;
    productId: number;
    quanity: number;
    price: number;
    totalPrice: number;
    productName: string;
    productImage: string;

    constructor(_rentalId: number, _productId: number, _quanity: number,
        _price: number, _totalPrice: number, _productName: string, _productImage: string
    ) {
        this.rentalId = _rentalId;
        this.productId = _productId;
        this.quanity = _quanity;
        this.price = _price;
        this.totalPrice = _totalPrice;
        this.productName = _productName;
        this.productImage = _productImage;
    }   
}