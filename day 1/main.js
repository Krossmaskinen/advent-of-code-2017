var fs = require('fs');
let inputFile = 'input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let result = 0;

result = getCaptchaResult(input);

console.log(result);
return result;

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