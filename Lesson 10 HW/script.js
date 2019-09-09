const calculator = createCalculator(10); 

console.log('возвращает 55 ' + calculator.add(45));
console.log('возвращает 10 ' + calculator.sub(45));
console.log('возвращает 2 ' + calculator.divide(5));
console.log('возвращает 10 ' + calculator.mult(5));
console.log('устанавливает базовое значение в 100 ' + calculator.set(100));
console.log('//возвращает 500 ' + calculator.mult(5));


function createCalculator(result = 0) {
    /* save initial value to result*/
    // let result = val;
    
    return {
        add: (val) => result += val,
        sub: (val) => result -= val,
        divide: (val) => result /= val,
        mult: (val) => result *= val,
        reset: () => result = 0,
        set: (val) => result = val,
    }
}