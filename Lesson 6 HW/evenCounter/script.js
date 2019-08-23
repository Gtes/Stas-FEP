/* 
1. Даем пользователю ввести число, проверяем что это действительно число.
После этого выводим сколько в этом числе четных цифр.
Например 1234 должно показать 2, 1111 - ноль
 */

'use strict';

function getNumber() {
    const numberAnswer = prompt('Input Number');

    /* number input validation number, empty, cancel, integer */
    if (isNaN(numberAnswer) ||
        numberAnswer === '' ||
        numberAnswer === null ||
        numberAnswer % 1 > 0 
    ) {
        alert('Please input INTEGER NUMBERS!');
        return getNumber();
    } else {
        return numberAnswer;
    }
}

function evenCount(userNumber) {
    let numberArray = [];
    let evenCounter = 0;

    /* initial number to array */
    userNumber = String(userNumber);
    numberArray = userNumber.split('');

    /* on even counter incrementation */
    for (let i in numberArray) {
        if (numberArray[i] % 2 == 0) {
            evenCounter += 1;
        }
    }

    return evenCounter;
}

const numberAnswer = getNumber();

const countResult = evenCount(numberAnswer);
console.log('You have ' + countResult + ' even nubers in your ' + numberAnswer);

