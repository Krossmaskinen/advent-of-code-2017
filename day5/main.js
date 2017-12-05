var fs = require('fs');
var inputFile = './input.txt';

resetInstructions();

escapePart1();
resetInstructions();
escapePart2();

function resetInstructions() {
    input = fs.readFileSync(inputFile, 'utf8');
    instructions = input.split('\n');
    instructions = instructions.map(Number);

    steps = 0;
    currentIndex = 0;
}

function escapePart1() {
    while(currentIndex < instructions.length && currentIndex >= 0) {
        let nextIndex = currentIndex + instructions[currentIndex];

        instructions[currentIndex]++;
        currentIndex = nextIndex;

        steps++;
    }

    console.log(`The CPU is saved! It took ${steps} steps`);
}

function escapePart2() {
    while(currentIndex < instructions.length && currentIndex >= 0) {
        let nextIndex = currentIndex + instructions[currentIndex];

        if (instructions[currentIndex] > 2) {
            instructions[currentIndex]--;
        } else {
            instructions[currentIndex]++;
        }

        currentIndex = nextIndex;

        steps++;
    }

    console.log(`The CPU is saved (again)! It took ${steps} steps`);
}