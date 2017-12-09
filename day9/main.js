var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
var score = 0;
var count = 0;
var isIgnoring = false;
var isGarbage = false;
var isGroup = false;
var multiplier = 0;
var garbageCount = 0;

for (let i = 0; i < input.length; ++i) {
    let c = input[i];

    if (!isIgnoring) {
        if (c === '!') {
            isIgnoring = true;
        }

        if (!isGarbage) {
            if (c === '{') {
                multiplier++;
                isGroup = true;
            } else if (multiplier >= 1 && isGroup && c === '}') {
                score += multiplier;
                count++;
                multiplier--;

                if (multiplier < 1) {
                    isGroup = false;
                }
            } else if (c === '<') {
                isGarbage = true;
            }
        } else if (c === '>') {
            isGarbage = false;
        } else if (!isIgnoring) {
            garbageCount++;
        }
    } else {
        isIgnoring = false;
    }
}

console.log(`count: ${count}`);
console.log(`score: ${score}`);
console.log(`garbage: ${garbageCount}`);