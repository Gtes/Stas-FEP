function Student(name, marks) {
    this.name = name;
    this.marks = marks;
}

Student.prototype.averageMark = function () {
    let averageMarkResult;
    let arrayLength = this.marks.length;

    averageMarkResult = this.marks.reduce((acc, cur) => cur += acc);
    averageMarkResult /= arrayLength;
    return Math.floor(averageMarkResult * 100) / 100;
}


function averageMark(group) {
    let concatedArr = [];
    let arrayLength;
    let averageMarkResult;

    for (let i in group) {
        concatedArr = concatedArr.concat(group[i].marks);
        // console.log(group[i]); < debug info
    }

    arrayLength = concatedArr.length;
    averageMarkResult = concatedArr.reduce((previous, current) =>
        current += previous);
    averageMarkResult /= arrayLength;

    return Math.floor(averageMarkResult * 100) / 100;
}

const students = [
    new Student('Student 1', [10, 9, 8, 0, 10]), // имя, оценки
    new Student('Student 12', [10, 0, 8, 0, 3, 4])
];

console.log('Student 1 Average Mark = ' + students[0].averageMark());
console.log('Student 2 Average Mark = ' + students[1].averageMark());

const groupAverageMark = averageMark(students);
console.log('Group Average Mark = ' + groupAverageMark);