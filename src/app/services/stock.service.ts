import { Injectable } from '@angular/core';
import { Stock } from '../../model/stock';

import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})

export class StockService {
  private stocks: Stock[];

  constructor() { 
    this.stocks = [
      new Stock('First Stock Company', 'SSA', 10, 20, 'NSE'),
      new Stock('Second Stock Company', 'SSB', 15, 10, 'NSE'),
      new Stock('Three Stock Company', 'SSC', 120, 210, 'NSE'),
      new Stock('Four Stock Company', 'SSD', 104, 200, 'NSE'),
      new Stock('Five Stock Company', 'SSE', 13, 10, 'NSE'),
      new Stock('Six Stock Company', 'SSF', 15, 10, 'NSE'),
    ];
  }

  getStocks(): Observable<Stock[]>{
    return of(this.stocks);
  }

  createStock(stock: Stock): Observable<any>{
    let foundStock = this.stocks.find(each => each.code === stock.code);
    if (foundStock){
      return throwError({msg: 'Stock with code ' + stock.code + 'already exists'});
    }
    this.stocks.push(stock);
    return of({msg: 'Stock with code ' + stock.code + ' successfully created'});
  }

  toggleFavorite(stock: Stock): Observable<Stock>{
    let foundStock = this.stocks.find(each => each.code === stock.code);
    foundStock.favorite = !foundStock.favorite;
    return of(foundStock);
  }

  deleteStock(stock: Stock): Observable<any> {
    const foundStockIndex = this.stocks.findIndex(s => s.code === stock.code);
    if (foundStockIndex === -1) {
      return throwError({ msg: 'Stock with code ' + stock.code + ' does not exist' });
    }
    this.stocks.splice(foundStockIndex, 1);
    return of({ msg: 'Stock with code ' + stock.code + ' successfully deleted' });
  }
  
  updateStock(stock: Stock): Observable<any> {
    const foundStock = this.stocks.find(s => s.code === stock.code);
    if (!foundStock) {
      return throwError({ msg: 'Stock with code ' + stock.code + ' does not exist' });
    }
    foundStock.name = "KAKAAK";
    foundStock.price = 11;
    foundStock.exchange = "mmm";
    return of({ msg: 'Stock with code ' + stock.code + ' successfully updated' });
  }
}
