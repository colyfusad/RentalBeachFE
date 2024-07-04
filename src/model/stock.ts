export class Stock {
    id: string;
    name: string;
    code: string;  
    price: number;  
    previousPrice: number;
    favorite: boolean = false;
    public exchange: string;

    /**
     *
     */
    constructor(_name: string, _code: string, _price: number, _previousPrice: number, _exchange) {
        this.code = _code;
        this.name = _name;
        this.price = _price;
        this.previousPrice = _previousPrice;
        this.exchange = _exchange;
    }   
    isPositiveChange(): boolean{
        return this.price >= this.previousPrice;
    }
}
