var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
var programs = formatInput(input);

function formatInput(data) {
    let nextId = 0;
    let items = data.split('\n').map(item => item.split('\r')[0]);

    items = items.map(item => {
        let formatted = {
            id: nextId++,
            children: []
        };

        formatted.name = item.split(' ')[0];
        formatted.weight = Number(item.split(/.+ \(/)[1].split(')')[0]);

        if (item.indexOf('->') !== -1) {
            formatted.children = item.split('-> ')[1].split(', ');
        }

        return formatted;
    });

    return items;
}

function checkIfChild(item) {
    for (let program of programs) {
        if (program.name !== item.name) {
            for (let child of program.children) {
                if (child === item.name) {
                    return false;
                }
            }
        }
    }

    return true;
}

function solvePart1() {
    let i = 0;

    for (i; i < programs.length; i++) {
        if (checkIfChild(programs[i])) {
            break;
        }
    }

    console.log(`the bottom program is ${programs[i].name}`);
}

solvePart1();