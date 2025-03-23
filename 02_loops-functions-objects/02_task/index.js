const catalog = [
    {
        id: 1,
        name: "Куртка зимняя",
        description: "Зимняя курта для ежедневных прогулок",
        sizes: [
            "S", "M", "L",
        ],
        price: 150,
        available: true,
    },
    {
        id: 2,
        name: "Штаны для сноубординга",
        description: "Супер теплые штаны",
        sizes: [
            "S", "M", "L", "XL",
        ],
        price: 250,
        available: true,
    },
    {
        id: 3,
        name: "Майка BoB",
        description: "Майка для искушенных",
        sizes: [
            "X", "S", "M",
        ],
        price: 50,
        available: false,
    },
    {
        id: 4,
        name: "Панамка",
        description: "Классическая панамка",
        sizes: [
            46, 48, 50,
        ],
        price: 20,
        available: true,
    },
    {
        id: 5,
        name: "Кроссовки",
        description: "Для бега",
        sizes: [
            39, 40, 41, 42, 43,
        ],
        price: 220,
        available: false,
    },
];

const goods = {};

for (let i = 0; i < catalog.length; i++) {
    goods[catalog[i].id] = catalog[i];
}

const basket = [
    {
        good: goods[1],
        amount: 3,
    },
    {
        good: goods[2],
        amount: 4,
    },
];

function addGoodBasket(goodId, amount, goodArr, basketArr) {
    if (goodArr[goodId].available === true) {
        basketArr.push({
            good: goodArr[goodId],
            amount: amount,
        });
    } else {
        console.log("Товар недоступен для продажи")
    }
}

function delGoodBasket(goodId, basketArr) {
    let index = basketArr.findIndex(item => item.good.id === goodId);

    if (index !== -1) {
        basketArr.splice(index, 1);
    }
}

function clearBasket(basketArr) {
    basketArr.length = 0;
}

function total(basketArr) {
    return {
        totalAmount: basketArr.reduce((acc, item) => acc + item.amount, 0),
        totalSum: basketArr.reduce((acc, item) => acc + (item.good.price * item.amount), 0),
    };
}

clearBasket(basket);

addGoodBasket(1, 5, goods, basket);
addGoodBasket(2, 5, goods, basket);
addGoodBasket(3, 5, goods, basket);
addGoodBasket(4, 5, goods, basket);
addGoodBasket(5, 5, goods, basket);

delGoodBasket(2, basket);

addGoodBasket(2, 10, goods, basket);

console.log(total(basket));