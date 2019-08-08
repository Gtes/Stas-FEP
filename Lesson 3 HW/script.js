'use strict';

let finalResult;
let listOfOperands = [];
let i;
let answerNumbersOfOperand;
let answerOperand;
let answerOperator;
let counterOperand = ['first', 'second', 'third', 'fourth'];


//Get answer about Operator  = answerOperator
do {
    answerOperator = prompt('Input operator / * + -');
} while (answerOperator != '+' &&
        answerOperator != '*' &&
        answerOperator != '-' &&
        answerOperator != '/'
    );

//Get answer about Number of Operands  = answerNumbersOfOperand
do {
    answerNumbersOfOperand = prompt('Input number of Operands!');
    answerNumbersOfOperand = Number(answerNumbersOfOperand);

    if (answerNumbersOfOperand >= 5)
        alert('The Number of Operands must be LESS than 5');

    if (answerNumbersOfOperand <= 0)
        alert('The Number of Operands must be MORE than 0');

    if (isNaN(answerNumbersOfOperand))
        alert('You should input ONLY Numbers');

    if (answerNumbersOfOperand % 1 > 0)
        alert('The Number should be INTEGER!');

} while (isNaN(answerNumbersOfOperand) ||
        answerNumbersOfOperand <= 0 ||
        answerNumbersOfOperand % 1 > 0 ||
        answerNumbersOfOperand >= 5
    );

//Get answer about Operands = answerOperand
for (i = 0; i < answerNumbersOfOperand; i++) {

    do {
        answerOperand = prompt('Input ' + counterOperand[i] + ' Operand!');
        answerOperand = Number(answerOperand);
        if (isNaN(answerOperand)) alert('You should input ONLY Numbers!');

    } while (isNaN(answerOperand));

    listOfOperands.push(answerOperand);
}

/* 
Processing the collected information = 
answerOperator, answerNumbersOfOperand, answerOperand > finalResult
*/
switch (answerOperator) {
    case '+':
        finalResult = listOfOperands.reduce(function (acc, val) {
            return acc + val;
        });
        break;

    case '-':
        finalResult = listOfOperands.reduce(function (acc, val) {
            return acc - val;
        });
        break;
    case '*':
        finalResult = listOfOperands.reduce(function (acc, val) {
            return acc * val;
        });
        break;
    case '/':
        if (answerOperand == 0) {
            finalResult = 'Infinity';
        } else {
            finalResult = listOfOperands.reduce(function (acc, val) {
                return acc / val;
            });
        }
        break;
    default:
        alert('Something went wrong, you have entered a not avaliable operation!')
}

alert('Final Result is ' + finalResult);

/* debug information

console.log('Numbers Of Operand ' + answerNumbersOfOperand);
console.log('list Of Operands ' + listOfOperands);
console.log('final Result ' + finalResult); 
*/
