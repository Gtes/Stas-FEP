const nameAnswer = prompt('What is your name?', 'Boris')

document.getElementById('greeting').innerText = nameAnswer;
 

function checkArr() {
    const stringAswer = prompt('Enter numbers by ","', '1,2,3,4,5');

/* Prompt validation empty/cancel */
    if (stringAswer === '' ||
        stringAswer === null
    ) {
        alert('Please input numbers');
        return checkArr();

    } else {
        /* processing string to array */
        const stringAnswerArray = stringAswer.split(',');
        
        /* if any letter found in the stringAnswerArray > return wrongSymbol */
        const wrongSymbol = false;
        for (let i in stringAnswerArray) {
            if (isNaN(stringAnswerArray[i]) ||
                stringAnswerArray[i] === ''
            ) {
                return wrongSymbol; 
            }
        }
        /* if only digits found in the stringAnswerArray return stringAnswerArray */
        return stringAnswerArray;
    }
}

/* change background use selector as initial parameter */
function changeBackground(selector) {
    const mySelector = document.querySelector(selector);
    return mySelector.style.background = 'red';
}


/* get min/max functions*/
function getMax(arr) {
    /* if wrongSymbol > change background and return error text */
    if(!arr){
        changeBackground('#max');
        return 'number cannot be defined';
    }
    return arr.reduce((max, cur) => Number(cur) > Number(max) ? cur : max, arr[0]);
}

function getMin(arr) {
    if(!arr){
        changeBackground('#min');
        return 'number cannot be defined';
    }
    return arr.reduce((min, cur) => Number(cur) < Number(min) ? cur : min, arr[0]);
}

/* call function to get string and save rezult to variable */
const initialArray = checkArr();

/* call min/max funtions */
const maxResult = getMax(initialArray);
const minResult = getMin(initialArray);

document.querySelector('#max').innerText = 'Max ' + maxResult;
document.querySelector('#min').innerText = 'Min ' + minResult;