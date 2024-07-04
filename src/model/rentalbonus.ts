import { RentalItem } from './rentalitem';

export class RentalBonus {
    id: number;
    rentalDate: string;
    returnDate: string;
    totalAmount: number;
    statusName: string;
    rentalItem: RentalItem;

    constructor(_userId: number, _rentalDate: string, _returnDate: string,
        _totalAmount: number, _statusId: string) {
        this.rentalDate = _rentalDate;
        this.returnDate = _returnDate;
        this.totalAmount = _totalAmount;
        this.statusName = _statusId;
    }   
}
