'use strict';

const userString = 'zakaz';

function isPalindrom(str) {
    let i;
    /* string processing */
    for (i = 0; i < str.length; i++) {
        if (str[i] != str[str.length - (i + 1)]) {
            return false;
        }
    }
    return true;
};

let result = isPalindrom(userString);

console.log('\n' + userString + ' isPalindrom - ' + result);