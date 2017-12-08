var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
let register = {};
var registerInstructions = formatInput(input);
var maxValue = -99999;

console.log(register);

function formatInput(data) {
    let instructions = data.split('\n').map(ins => ins.split('\r')[0]);
    let name;
    let modifier;
    let amount;
    let condition;

    instructions = instructions.map(instruction => {
        name = instruction.split(' ')[0];
        modifier = (instruction.split(' ')[1] === 'inc') ? ' + ' : ' - ';
        amount = instruction.split(' ')[2];
        condition = instruction.split('if ')[1];

        if (Object.keys(register).indexOf(name) === -1) {
            register[name] = 0;
        }

        return {
            name,
            modifier,
            amount,
            condition,
            value: 0
        }
    });

    return instructions;
}

function executeInstruction(inst) {
    let activeRegister = register[inst.name];
    let compareName = inst.condition.split(' ')[0];
    let leftValue = register[compareName];
    let operator = inst.condition.split(' ')[1];
    let rightValue = inst.condition.split(' ')[2];
    let condition = leftValue + operator + rightValue;
    let passed = eval(condition);

    if (passed) {
        register[inst.name] = eval(`${activeRegister}${inst.modifier}${inst.amount}`);

        maxValue = (register[inst.name] > maxValue) ? register[inst.name] : maxValue;
    }
}

function solvePart1() {
    let values = [];
    let currentMax;

    for (let instruction of registerInstructions) {
        executeInstruction(instruction);
    }

    for (let key of Object.keys(register)) {
        values.push(register[key]);
    }

    currentMax = Math.max(...values);

    console.log('values', values);
    console.log('max', currentMax);
    console.log('highest ever', maxValue);
}

solvePart1();