/* 
3.Написать функцию которая будет делать полную (с учетом вложенностей) копию объекта. 

Ожидаю что использовать ее можно будет так:
const obj = {name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro}}
const objCopy = copy(obj);
*/

'use strict';

const initialObject = {
    name: 'Alex',
    age: 33,
    adress: {
        country: 'UA',
        city: 'Dnipro',
        district: 'aaa'
    }
};


function copyObject( obj ) {
    let newObj = {};
    for (let i in obj) {
        if ( typeof( obj[i] ) === 'object' ) {
            newObj[i] = copyObject(obj[i]);
        } else {
            newObj[i] = obj[i];
        }
    }
    return newObj;
}


const myObj = copyObject(initialObject);

myObj.adress.city = 'Gotham';

console.log(initialObject);
console.log(myObj);




