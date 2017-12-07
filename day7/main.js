var fs = require('fs');
// var inputFile = './testInput.txt';
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
var programs = formatInput(input);

function formatInput(data) {
    let nextId = 0;
    let items = data.split('\n').map(item => item.split('\r')[0]);

    items = items.map(item => {
        let formatted = {
            id: nextId++,
            children: [],
            totalWeight: 0
        };

        formatted.name = item.split(' ')[0];
        formatted.weight = Number(item.split(/.+ \(/)[1].split(')')[0]);

        if (item.indexOf('->') !== -1) {
            formatted.children = item.split('-> ')[1].split(', ');
        }

        return formatted;
    });

    items.map(item => {
        item.totalWeight = getProgramTowerWeight(item, items);
        return item;
    });

    return items;
}

function getProgramTowerWeight(program, items) {
    let towerWeight = program.weight;

    for (child of program.children) {
        let childProgram = items.find(prog => prog.name === child);

        towerWeight += getProgramTowerWeight(childProgram, items);
    }

    return towerWeight;
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

function getBottomProgram() {
    let i = 0;

    for (i; i < programs.length; ++i) {
        if (checkIfChild(programs[i])) {
            return programs[i];
        }
    }
}

function findUnbalancedTower(program) {
    let towerWeights = program.children.map(child => {
        let prog = programs.find(p => p.name === child);
        return prog.totalWeight;
    });
    let allAreSameheight = towerWeights.every(prog => prog.totalWeight === towerWeights[0]);
    let unbalancedProgam;
    let nextUnbalancedProgram;

    if (!allAreSameheight) {
        for (let weight of towerWeights) {
            if (towerWeights.filter(w => w === weight).length === 1) {
                unbalancedProgam = programs.find(p => p.totalWeight === weight);

                nextUnbalancedProgram = findUnbalancedTower(unbalancedProgam);
                if (nextUnbalancedProgram) {
                    return nextUnbalancedProgram;
                } else {
                    return unbalancedProgam;
                }
            }
        }
    }

    return false;
}

function findParent(program) {
    return programs.find(prog => prog.children.indexOf(program.name) !== -1);
}

function solvePart1() {
    let bottomProgram = getBottomProgram();

    console.log(`The bottom program is ${bottomProgram.name}`);
}

function solvePart2() {
    let bottomProgram = getBottomProgram();
    let unbalancedProgam = findUnbalancedTower(bottomProgram);
    let parent = findParent(unbalancedProgam);
    let grandParent = findParent(parent);
    let siblings = programs.filter(prog => parent.children.indexOf(prog.name) !== -1);
    let normalTotalWeight = siblings.find(prog => prog.name !== unbalancedProgam.name).totalWeight;
    let diff = unbalancedProgam.totalWeight - normalTotalWeight;

    let siblingWeights = siblings.map(prog => prog.weight);

    console.log(`Weight should be ${unbalancedProgam.weight - diff}`);
}

solvePart1();
solvePart2();