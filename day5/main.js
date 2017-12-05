var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');

var instructions = input.split('\n');
var steps = 0;
var currentIndex = 0;

instructions = instructions.map(Number);

escapePart1();

function escapePart1() {
    while(currentIndex < instructions.length && currentIndex >= 0) {
        let nextIndex = currentIndex + instructions[currentIndex];

        instructions[currentIndex]++;

        currentIndex = nextIndex;

        steps++;
    }

    console.log(`The CPU is saved! It took  ${steps} steps`);

    steps = 0;
    currentIndex = 0;
}