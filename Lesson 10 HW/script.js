const calculator = createCalculator();


function createCalculator(val) {
    let result = 0;
    return {
        add: (val) => result += val,
        sub: (val) => result -= val,
        mult: (val) => result *= val,
        div: (val) => result /= val,
        set: (val) => result = val,
        reset: () => result = 0
    }
}