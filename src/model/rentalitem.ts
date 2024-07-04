export class RentalItem {
    id: number;
    rentalId: number;
    productId: number;
    quanity: number;
    pricePerDay: number;
    totalPrice: number;

    constructor(_rentalId: number, _productId: number, _quanity: number,
        _pricePerDay: number, _totalPrice: number) {
        this.rentalId = _rentalId;
        this.productId = _productId;
        this.pricePerDay = _pricePerDay;
        this.quanity = _quanity;
        this.totalPrice = _totalPrice;
    }   
}
