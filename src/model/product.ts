export class Product {
    id: number;
    name: string;
    description: string;
    pricePerDay: number;
    quanityAvailable: number;
    imageUrl: string;
    categoriId: number;
    categoriName: string;

    constructor(_name: string, _description: string, _pricePerDay: number, 
        _quanityAvailable: number, _imageUrl: string, _categoryId: number, _categoryName: string) {
        this.name = _name;
        this.description = _description;
        this.pricePerDay = _pricePerDay;
        this.quanityAvailable = _quanityAvailable;
        this.imageUrl = _imageUrl;
        this.categoriId = _categoryId;
        this.categoriName = _categoryName;
    }   
}
