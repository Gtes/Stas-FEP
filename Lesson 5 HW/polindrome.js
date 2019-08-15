'use strict';

const userString = 'zakaz';

function isPalindrom(str) {
    let i;

    /* check first and last char*/
    if (str[0] == str[str.length - 1]) {
        
        /* string processing */
        for (i = 0; i < str.length; i++) {
            if (str[i] != str[str.length - (i + 1)]) {
                return false;
            }
        }
        return true;
    } else {

        /* first last result */
        return false;
    }
};

let result = isPalindrom(userString);

console.log('\n' + userString + ' isPalindrom - ' + result);

