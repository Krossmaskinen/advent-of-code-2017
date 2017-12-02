var fs = require('fs');
let inputFile = './input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let result1;
let result2;

result1 = getCaptchaResult(input);
result2 = getCaptchaResultPart2(input);

console.log(`part1: ${result1}`);
console.log(`part1: ${result2}`);

return result2;

function getPairSum(input, i) {
    if (i === (input.length - 1)) {
        if (input[i] === input[0]) {
            return input[i];
        }

        return 0;
    }

    if (input[i] === input[i + 1]) {
        return input[i];
    }

    return 0;
}

function getCaptchaResult(input) {
    let sum = 0;

    for (let i = 0; i < input.length; ++i) {
        sum += Number(getPairSum(input, i));
    }

    return sum;
}

function getCaptchaResultPart2(input) {
    let sum = 0;

    for (let i = 0; i < input.length; ++i) {
        sum += Number(getPairSumPart2(input, i));
    }

    return sum;
}

function getPairSumPart2(input, i) {
    let offset = parseInt(input.length / 2);
    let i2 = i + offset;

    if (i2 >= input.length) {
        i2 = i2 - (input.length);
    }

    if (input[i] === input[i2]) {
        return input[i];
    }

    return 0;
}