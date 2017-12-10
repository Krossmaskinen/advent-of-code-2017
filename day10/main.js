var fs = require('fs');
var inputFile = 'input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
var hashList = getHashList(256);
var skipSize = 0;
var currentPos = 0;
let result;

input = formatInput(input);
console.log(input);

// input = [3, 4, 1, 5];
// hashList = [0, 1, 2, 3, 4];

console.log(hashList[255]);

function formatInput(input) {
    return input.split(',').map(Number);
}

function getHashList(size) {
    let hash = [];

    for (let i = 0; i < size; ++i) {
        hash.push(i);
    }

    return hash;
}

function step(totalLength) {
    let selection1;
    let selection2;
    let totalSelection;
    let length1 = totalLength;
    let length2;
    let part1;
    let part2;
    let diff = hashList.length - (currentPos + totalLength);

    if (diff < 0) {
        length1 = hashList.length - currentPos;
        length2 = Math.abs(diff);
    }

    selection1 = hashList.slice(currentPos, currentPos + length1);
    totalSelection = selection1;

    if (length2) {
        selection2 = hashList.slice(0, length2);
        selection1.push(...selection2); // combine selection 1 and 2
    }

    totalSelection = totalSelection.reverse();
    part1 = totalSelection.splice(0, length1);

    hashList.splice(currentPos, length1, ...part1);

    if (length2) {
        part2 = totalSelection;
        hashList.splice(0, length2, ...part2);
    }

    currentPos += totalLength + skipSize++;

    if (currentPos >= hashList.length) {
        currentPos = currentPos - hashList.length;
    }

    // console.log('size', totalLength);
    // console.log('new hash', hashList);
    // console.log('current pos', currentPos);
    // console.log('skip size', skipSize);
}

function getResult() {
    return hashList[0] * hashList[1];
}

let i = 1;

for (let instruction of input) {
    step(instruction);
}

result = getResult();

console.log(`result: ${result}`);