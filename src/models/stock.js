class Stock {
    constructor(name, code, price, previousPrice, exchange, id = null) {
      this.id = id;
      this.name = name;
      this.code = code;
      this.price = price;
      this.previousPrice = previousPrice;
      this.exchange = exchange;
      this.favorite = false;
    }
  
    isPositiveChange() {
      return this.price >= this.previousPrice;
    }
  }
  
  export default Stock;