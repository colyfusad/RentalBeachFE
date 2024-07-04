export class Rental {
    id: number;
    userId: number;
    rentalDate: string;
    returnDate: string;
    totalAmount: number;
    statusId: number;

    constructor(_userId: number, _rentalDate: string, _returnDate: string,
        _totalAmount: number, _statusId: number) {
        this.userId = _userId;
        this.rentalDate = _rentalDate;
        this.returnDate = _returnDate;
        this.totalAmount = _totalAmount;
        this.statusId = _statusId;
    }   
}
