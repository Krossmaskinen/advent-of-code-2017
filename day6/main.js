var fs = require('fs');
let inputFile = './input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let memoryBanks;
let iterations = 0;
let foundDouble = false;
let lastSeenCyclesAgo = 0;
let lookForCombination;

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
    if (foundDouble) {
        lastSeenCyclesAgo++;
    }
}

function checkIfExists(combination) {
    for (let i = 0; i < checkedCombinations.length; ++i) {
        let isSame = true;
        let checkedCombo = checkedCombinations[i];

        if (compareArrays(checkedCombo, combination))
            return true;
    }
}

function compareArrays(arr1, arr2) {
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) {
           return false;
        }
    }

    return true;
}

function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function solvePart1() {
    memoryBanks = formatInput(input);

    while(!checkIfExists(memoryBanks)) {
        checkedCombinations.push(copyObject(memoryBanks));
        redistribute();
    }

    console.log(`double found after ${iterations} cycles`);
}

function solvePart2() {
    // input = '0 2 7 0';
    memoryBanks = formatInput(input);
    iterations = 0;
    checkedCombinations.length = 0;

    while(true) {
        checkedCombinations.push(copyObject(memoryBanks));
        redistribute();

        if (!foundDouble) {
            if (checkIfExists(memoryBanks)) {
                foundDouble = true;
                lookForCombination = copyObject(memoryBanks);
            }
        } else if (compareArrays(memoryBanks, lookForCombination)) {
            break;
        }
    }

    console.log(`last seen ${lastSeenCyclesAgo} cycles ago`);
}

solvePart1();
solvePart2();