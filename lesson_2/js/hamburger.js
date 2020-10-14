/*
2 types of burger:
    - small [50 rub, 20 cal]
    - big [100 rub, 40 cal]

3 mandatory filling options
    - chesse [10 rub, 20 cal]
    - salad [20 rub, 5 cal]
    - potato [15 rub, 10 cal]

2 optional filling options
    - seasoning [15 rub, 0 cal]
    - mayo [20 rub, 5 cal]

Do a programm that calculates the final price and calories of the burger
*/


// создаём начальные перменные
let totalPrice = 0;
let totalCalories = 0;

// имитируем сервер с данными
const server = {
    burgers: [
        {
            type: 'small',
            price: 50,
            calories: 20
        },
        {
            type: 'big',
            price: 100,
            calories: 40
        }
    ],
    mandatoryFillings: [
        {
            type: 'cheese',
            price: 10,
            calories: 20
        },
        {
            type: 'salad',
            price: 20,
            calories: 5
        },
        {
            type: 'potato',
            price: 15,
            calories: 10
        }
    ],
    optionalFillings: [
        {
            type: 'seasoning',
            price: 15,
            calories: 0
        },
        {
            type: 'mayo',
            price: 20,
            calories: 5
        },
    ]
}

// создаем классы для ингредиентов
class Burger {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

class mandatoryFilling {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

class optionalFilling {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }
}

// создаём список DOM элементов
const smallBurger = document.getElementById('smallBurger');
const bigBurger = document.getElementById('bigBurger');
const cheese = document.getElementById('cheese');
const salad = document.getElementById('salad');
const potato = document.getElementById('potato');
const seasoning = document.getElementById('seasoning');
const mayo = document.getElementById('mayo');
const result = document.querySelector('.result')

// создаём массивы с ингредиентами
const burgersArr = [];
const mandatoryFillingsArr = [];
const optionalFillingsArr = [];

server.burgers.forEach(function (item) {
    burgersArr.push(new Burger(item.price, item.calories));
})

server.mandatoryFillings.forEach(function (item) {
    mandatoryFillingsArr.push(new mandatoryFilling(item.price, item.calories));
})

server.optionalFillings.forEach(function (item) {
    optionalFillingsArr.push(new optionalFilling(item.price, item.calories));
})

console.log(burgersArr);
console.log(mandatoryFillingsArr);
console.log(optionalFillingsArr);


// прикрепляем обработчик событий на кнопку

const checkBurgers = () => {
    if (smallBurger.checked) {
        totalPrice += +smallBurger.dataset.price;
        totalCalories += +smallBurger.dataset.calories;
    }

    if (bigBurger.checked) {
        totalPrice += +bigBurger.dataset.price;
        totalCalories += +bigBurger.dataset.calories;
    }
}

const checkMandatoryFillings = () => {
    if (cheese.checked) {
        totalPrice += +cheese.dataset.price;
        totalCalories += +cheese.dataset.calories;
    }

    if (salad.checked) {
        totalPrice += +salad.dataset.price;
        totalCalories += +salad.dataset.calories;
    }

    if (potato.checked) {
        totalPrice += +potato.dataset.price;
        totalCalories += +potato.dataset.calories;
    }
}

const checkOptionalFillings = () => {
    if (seasoning.checked) {
        totalPrice += +seasoning.dataset.price;
        totalCalories += +seasoning.dataset.calories;
    }

    if (mayo.checked) {
        totalPrice += +mayo.dataset.price;
        totalCalories += +mayo.dataset.calories;
    }

}

const showResult = () => {
    result.innerText = `Общая стоимость вашего бургера: ${totalPrice} ₽. Калорийность: ${totalCalories}`;
}

const clickHandler = () => {
    checkBurgers();
    checkMandatoryFillings();
    checkOptionalFillings();
    showResult();
}

const button = document.querySelector('.btn').addEventListener('click', clickHandler);





