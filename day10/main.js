var fs = require('fs');
var inputFile = 'input.txt';
var baseInput = fs.readFileSync(inputFile, 'utf8');
var skipSize = 0;
var currentPos = 0;
let result;
let extraLengths = [17, 31, 73, 47, 23];
let input;
let input2;
let hashLength = 256;

sparseHash = getHashList(hashLength);
input = formatInput(baseInput);
input2 = formatInput2(baseInput);

function formatInput(input) {
    return input.split(',').map(Number);
}

function formatInput2(input, splitChar) {
    let formattedInput = input.split('').map(num => num.charCodeAt());

    formattedInput.push(...extraLengths);

    return formattedInput;
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
    let diff = sparseHash.length - (currentPos + totalLength);

    if (diff < 0) {
        length1 = sparseHash.length - currentPos;
        length2 = Math.abs(diff);
    }

    selection1 = sparseHash.slice(currentPos, currentPos + length1);
    totalSelection = selection1;

    if (length2) {
        selection2 = sparseHash.slice(0, length2);
        selection1.push(...selection2); // combine selection 1 and 2
    }

    totalSelection = totalSelection.reverse();

    insertResult(totalSelection, length1, length2)
    updatePosition(totalLength);
}

function insertResult(selection, length1, length2) {
    let part1 = selection.splice(0, length1);
    let part2;

    sparseHash.splice(currentPos, length1, ...part1);

    if (length2) {
        part2 = selection;
        sparseHash.splice(0, length2, ...part2);
    }
}

function updatePosition(length) {
    currentPos += length + skipSize++;

    if (currentPos >= sparseHash.length) {
        currentPos = currentPos - sparseHash.length;
    }
}

function getDenseHash(sparseHash) {
    let tempHash = [];
    let segments = [];
    let segment;

    for (let i = 0; i < 16; ++i) {
        segment = sparseHash.slice(i * 16, (i + 1) * 16);
        segments.push(segment);
    }

    for (segment of segments) {
        segment = segment.reduce((prev, cur) => {
            return prev ^ cur;
        }, 0)

        tempHash.push(segment);
    }

    return tempHash.map(num => {
        num = num.toString(16);
        if (num.length === 1) {
            num = '0' + num;
        }

        return num;
    }).join('');
}

function getResult() {
    return sparseHash[0] * sparseHash[1];
}

function reset() {
    skipSize = 0;
    currentPos = 0;
    result = 0;
    sparseHash = getHashList(hashLength);
}

function solve1() {
    for (let instruction of input) {
        step(instruction);
    }

    result = getResult();
    console.log(`result: ${result}`);
}

function solve2() {
    let denseHash;

    input2 = extraLengths;

    for (let i = 0; i < 64; ++i) {
        for (let instruction of input2) {
            step(instruction);
        }
    }

    denseHash = getDenseHash(sparseHash);
    console.log(`result: ${denseHash}`);
}

// solve1();
// reset();
// solve2();
test();

function test() {
    let temp;
    let input2 = formatInput2('');

    for (let i = 0; i < 64; ++i) {
        for (let instruction of input2) {
            step(instruction);
        }
    }

    let segments = [];
    let segment;

    for (let i = 0; i < 16; ++i) {
        segment = sparseHash.splice(0, 16);

        segment = segment.reduce((prev, cur) => {
            return prev ^ cur;
        }, 0);

        segments.push(segment);
    }


    segments = segments.map(num => {
        num = num.toString(16);
        if (num.length === 1) {
            num = '0' + num;
        }

        return num;
    }).join('');

    console.log('temp hash  ', segments);
    console.log('should be  ', '3efbe78a8d82f29979031a4aa0b16a9d');
}

