let initialString = 'Hello world';
let initialLetter = 'l';
let targetLetter = 'z';
let finalSstring;

function replaceAll(initStr, firstChar, secondChar) {
    let resultStr;
    
    /* Validation */
    if (firstChar.length > 1 ||
        secondChar.length > 1 ||
        firstChar.length == 0 ||
        secondChar.length == 0
    ) {
        console.error('Initial Letter and Target Letter should be equal to 1 character');
        return initStr;
    }

    /* String processing */
    resultStr = initStr.replace(firstChar, secondChar);
    return resultStr.indexOf(firstChar) != -1 ? replaceAll(resultStr, firstChar, secondChar) : resultStr;
}

finalSstring = replaceAll(initialString, initialLetter, targetLetter);

alert('Final string is - ' + finalSstring + '\n' + 'You can check console for details!');


/* Debug info */
console.log('Initial String - ' + initialString + '\n' 
            + 'Final String - ' + finalSstring + '\n'
            + 'Initial Letter - ' + initialLetter + '\n'
            + 'Target Letter - ' + targetLetter);