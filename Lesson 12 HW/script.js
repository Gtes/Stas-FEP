'use strict'

function Hamburger(type, stuffing = 'without stuffing') {
    this.type = type;
    this.stuffing = stuffing;
}


Hamburger.prototype.calculateCalories = function () {
    let caloriesResult = 0;

    for (let i in this) {
        if (typeof (this[i]) === 'object') {
            caloriesResult += this[i].calories
        }
    }

    return caloriesResult;
}

Hamburger.prototype.calculatePrice = function () {
    let priceResult = 0;

    for (let i in this) {
        if (typeof (this[i]) === 'object') {
            priceResult += this[i].price
        }
    }

    return priceResult;
}

Hamburger.prototype.addTopping = function (topping) {
    if (this.hasOwnProperty('topping')) {
        this.additionalTopping = topping;
    } else {
        this.topping = topping;
    }
}

Hamburger.SIZE_SMALL = {
                            name: 'Small',
                            price: 50,
                            calories: 20
                        };

Hamburger.SIZE_BIG = {
                        name: 'Big',
                        price: 100,
                        calories: 50
                    };

Hamburger.STUFFING_CHEESE = {
                                name: 'Cheese',
                                price: 10,
                                calories: 20
                            };
                            
Hamburger.STUFFING_SALAD = {
                                name: 'Salad',
                                price: 20,
                                calories: 5
                            };

Hamburger.STUFFING_POTATO = {
                                name: 'Cheese',
                                price: 10,
                                calories: 20
                            };

Hamburger.TOPPING_SAUCE = {
                                name: 'Sauce',
                                price: 15,
                                calories: 0
                            };

Hamburger.TOPPING_MAYO = {
                                name: 'Mayo',
                                price: 20,
                                calories: 5
                            };


// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log('Calories: ' + hamburger.calculateCalories());
// сколько стоит
console.log('Price: ' + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// А сколько теперь стоит?
console.log('Price with sauce: ' + hamburger.calculatePrice());