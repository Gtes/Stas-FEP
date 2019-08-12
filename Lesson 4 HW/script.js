
let firstOperand;
let secondOperand;
let answerOperatorSymbol;
let finalResult;

function getOperand(operand) {
    let answerOperand = operand;

    do {
        answerOperand = prompt('Input opeand');
        answerOperand = Number(answerOperand);
        if (isNaN(answerOperand)) alert('You should input ONLY Numbers!');
    } while (isNaN(answerOperand));
    return answerOperand;
}

function getOperator(operator) {
    let answerOperator = operator;

    do {
        answerOperator = prompt('Input operator / * + -');
    } while (answerOperator != '+' &&
            answerOperator != '*' &&
            answerOperator != '-' &&
            answerOperator != '/'
    );
    return answerOperator;
}

function easyCalc(operator, firstNumber, secondNumber) {
    let answerOperator = operator;

    switch (answerOperator) {
        case '+': return firstNumber + secondNumber;
        case '-': return firstNumber - secondNumber;
        case '*': return firstNumber * secondNumber;
        case '/':
            if (secondNumber === 0) {
                return 'Infinity';
            } else {
                return firstNumber / secondNumber;
            }
        default:
            console.error('Something went wrong, you have entered a not avaliable operation!');
    }

}

answerOperatorSymbol = getOperator();
firstOperand = getOperand();
secondOperand = getOperand();


finalResult = easyCalc(answerOperatorSymbol, firstOperand, secondOperand);
alert('Final Result is ' + finalResult);

/* 
debug
console.log(answerOperatorSymbol, firstOperand, secondOperand);
console.log('final result is ' + finalResult);
 */




