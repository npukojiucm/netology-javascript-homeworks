const good = new Array;
const catalog = new Array;

class Good {
    constructor (id, name, description, sizes, price, available) {
        good.push(this)
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = [].concat(sizes);
        this.price = price;
        this.available = available;
        }
    
    setAvailable() {
        if (this.available) {
            this.available = false;
        } else {
            this.available = true;
        }
        
    }
}

class GoodList {
    #goods = good;
    #reg = str => new RegExp(str, "gi");

    constructor (filter = "", price = false, dir = true) {       
        this.filter = filter;
        this.sortPrice = price;
        this.sortDir = dir;       
    }


    get list() {
        const result = this.#goods.filter(good => this.#reg(this.filter).test(good.name) && good.available)
        
        if (this.sortPrice) {
            result.sort((a, b) => {
                if (this.sortDir) {
                    return a.price - b.price;
                }
                return b.price - a.price;
            })
        }

        return result
    }
    
    add (id) {
        let index = this.#goods.findIndex(item => item.id === id);

        if (index !== -1) {
            catalog.push(this.#goods[index]);
        }
    }

    remove(id) {
        let index = catalog.findIndex(item => item.id === id);

        if (index !== -1) {
            catalog.splice(index, 1);
        }
    }
}

class BasketGood extends Good {
    constructor (objGood, amount) {
        super(objGood.id, objGood.name, objGood.description, objGood.sizes, objGood.price, objGood.available);
        this.amount = amount;
    }
}

class Basket {
    constructor (goods = new Array) {
        this.goods = goods;
    }

    get totalAmount() {
        const result = this.goods.reduce((sum, current) => sum + current.amount, 0);
        return result;
    }

    get totalSum() {
        const result = this.goods.reduce((sum, current) => sum + current.amount * current.price, 0);
        return result;
    }

    add (good, amount) {
        let indexCatalog = catalog.findIndex(item => item.id === good);

        if (indexCatalog === -1) {
            console.log("Товар отсутствует в каталоге");
        } else {
            let indexBasket = this.goods.findIndex(item => item.id === good);

            if (indexBasket === -1) {
                this.goods.push(new BasketGood(catalog[indexCatalog], amount));
            } else {
                this.goods[indexBasket].amount = this.goods[indexBasket].amount + amount;
            }
        }
    }

    remove(good, amount) {
        let indexBasket = this.goods.findIndex(item => item.id === good);
        this.goods[indexBasket].amount = this.goods[indexBasket].amount - amount;

        if (this.goods[indexBasket].amount <= 0) {
            this.goods.splice(indexBasket, 1);
        }
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods = this.goods.filter(item => item.available === true);
    }
}


new Good(1, "Шапка", "Теплая", [42, 43, 44], 150, true);
new Good(2, "Куртка", "Теплая", [42, 43, 44], 300, true);
new Good(3, "Штаны", "Теплые", ["S", "M", "L"], 250, false);
new Good(4, "Сапоги", "Резиновые", [42, 43, 44], 350, false);
new Good(5, "Носки", "Шерстяные", ["38-41", "41-43", "43-45"], 50, true);
new Good(6, "Шарф", "Клеточка", [35, 38, 41], 100, false);
new Good(7, "Перчатки", "Кожанные", ["S", "M"], 200, true);

const goodList = new GoodList;
const basket = new Basket;

// Изменение доступности товара
// good[2].setAvailable();
// good[3].setAvailable();
// console.log(good[2])
// console.log(good[3])


// Использование геттера без фильтров
// console.log(goodList.list);

// Использование геттера сортировка по цене от <
// goodList.sortPrice = true;
// console.log(goodList.list);

// Использование геттера сортировка по цене от >
// goodList.sortPrice = true;
// goodList.sortDir = false;
// console.log(goodList.list);

// Использование геттера поиск по имени
// goodList.filter = "шап";
// console.log(goodList.list);

// Добавление товара в каталог
goodList.add(1);
goodList.add(2);
goodList.add(5);
goodList.add(7);
// console.log(catalog);

// Удаление товара из каталога
// goodList.remove(1);
// goodList.remove(2);
// console.log(catalog);

// Добавление товара в корзину
basket.add(1, 5);
basket.add(2, 10);
basket.add(2, 5);
// console.log(basket.goods);

// Корректировка количества или удаление товара из корзины
// basket.remove(1, 3);
// basket.remove(2, 8);
// basket.remove(2, 10);
// console.log(basket.goods);

// Очистка корзины
// basket.clear();
// console.log(basket.goods);

// Очистка корзины по доступности продажи
// goodList.add(1);
// goodList.add(2);
// goodList.add(3);
// goodList.add(4);
// goodList.add(5);
// goodList.add(6);
// goodList.add(7);
// basket.add(1, 5);
// basket.add(2, 10);
// basket.add(3, 6); // false
// basket.add(4, 8); // false
// basket.add(5, 1);
// basket.add(6, 4); // false
// basket.add(7, 9);
// basket.removeUnavailable();
// console.log(basket.goods);


// Использование геттеров
// console.log(basket.totalAmount);
// console.log(basket.totalSum);