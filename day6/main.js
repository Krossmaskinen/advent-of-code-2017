var fs = require('fs');
let inputFile = './input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let memoryBanks;
let iterations = 0;

let checkedCombinations = [];

function formatInput(input) {
    input = input.split(/\s+/);

    input = input.map(col => Number(col));

    return input;
}

function redistribute() {
    let max = Math.max(...memoryBanks);
    let index = memoryBanks.findIndex(num => num === max);
    let bucket = max;

    memoryBanks[index] = 0;
    ++index;

    while(bucket > 0) {
        if (index > (memoryBanks.length - 1))
            index = 0;

        memoryBanks[index]++;
        bucket--;
        index++;
    }

    iterations++;
}

function checkIfExists(combination) {
    for (let i = 0; i < checkedCombinations.length; ++i) {
        let isSame = true;
        let checkedCombo = checkedCombinations[i];

        for (let j = 0; j < checkedCombo.length; ++j) {
            if (checkedCombo[j] !== combination[j]) {
               isSame = false;
               break;
            }
        }

        if (isSame)
            return true;
    }
}

function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

memoryBanks = formatInput(input);

while(!checkIfExists(memoryBanks)) {
    checkedCombinations.push(copyObject(memoryBanks));
    redistribute();
}

console.log(`iterations: ${iterations}`);
