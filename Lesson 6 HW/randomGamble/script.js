/* 
2. Даем пользователю ввести число от 0 до 10.
С помощью рандома генерируем случайное число. Если введенное пользователем число совпало с нашим, начисляем ему 10 баллов.
После этого спрашиваем хочет ли он продолжать и повторяем с самого начала
*/

'use strict';

function getNumber() {
    let numberAnswer = prompt('Input Number');

    /* number input validation number, empty, cancel, integer */
    if (isNaN(numberAnswer) ||
        numberAnswer === '' ||
        numberAnswer === null ||
        numberAnswer % 1 > 0 ||
        numberAnswer > 10 ||
        numberAnswer < 0
    ) {
        alert('Please input INTEGER NUMBERS from 0 to 10! ');
        return getNumber();
    } else {
        return numberAnswer;
    }
}

function getRandom(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function gamble() {
    let userScore = 0;

    do {
        /* get number and random functions calls */
        let userNumber = getNumber();
        let randomNumber = getRandom();

        /* main random - user numbers checker */
        if (userNumber == randomNumber) {
            userScore = userScore + 10;
            console.log('Your number - ' + userNumber);
            console.log('Win number - ' + randomNumber);
            console.log('Your score - ' + userScore);
        } else {
            userScore = Number(userScore) - 10;
            console.log('Your number - ' + userNumber);
            console.log('Win number - ' + randomNumber);
            console.log('Your score - ' + userScore);
        }

    } while (confirm('Should we continue? Your score is ' + userScore));

    return userScore;
}

console.log(gamble());


/*future garbage gamble recursion implementation

function gamble(userScore = 0) {
    let userNumber = getNumber();
    let randomizer = random();

    if (userNumber == randomizer) {
        userScore = userScore + 10;
        console.log('Your number - ' + userNumber)
        console.log('Win number - ' + randomizer)
        console.log('Your score - ' + userScore)
    } else {
        userScore = Number(userScore) - 10;
        console.log('Your number - ' + userNumber)
        console.log('Win number - ' + randomizer)
        console.log('Your score - ' + userScore)
    }

    return confirm('Should we continue? Your score is ' + userScore) ? gamble(userScore) : userScore;
}

*/