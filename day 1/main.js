var fs = require('fs');
let inputFile = 'input.txt';
let input;
let index = 0;
let result = 0;

input = fs.readFileSync(inputFile, 'utf8');

// var testInput1 = '1122';
// var testInput2 = '1111';
// var testInput3 = '1234';
// var testInput4 = '91212129';

result = getCaptchaResult(input);
console.log(result);

function getPairSum(input, i) {
    if (i === (input.length - 1)) {
        if (input[i] === input[0]) {
            return input[i];
        }

        return 0;
    }

    if (input[i] === input[i+1]) {
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