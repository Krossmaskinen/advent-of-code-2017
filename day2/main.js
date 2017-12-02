var fs = require('fs');
let inputFile = './input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let checksum1;
let checksum2;

// input = '3 8 6 5 ';
input = formatInput(input);
checksum1 = getChecksum(input);

checksum2 = getChecksumPart2(input);

console.log(`checksum1: ${checksum1}`);
console.log(`checksum2: ${checksum2}`);

return checksum1;

function formatInput(input) {
    let rows = input.split('\n');

    return rows.map(row => {
        row = row.split(/\s+/);

        if (!row[row.length - 1]) {
            row.pop();
        }

        row = row.map(col => Number(col));

        return row;
    });
}

function getRowDiff(row) {
    let lowest = Infinity;
    let highest = 0;

    row.forEach(col => {
        col = Number(col);
        lowest = (col < lowest) ? col : lowest;
        highest = (col > highest) ? col : highest;
    });

    return highest - lowest;
}

function getChecksum(rows) {
    return rows.reduce((sum, row) => {
        return sum += getRowDiff(row);
    }, 0);
}

function getRowResultPart2(row) {
    let result;

    row.forEach((col, index) => {
        if (!result) {
            row.forEach((col2, index2) => {
                let divisionResult;

                if (!result) {
                    if (index !== index2) {
                        if (col > col2) {
                            divisionResult = col / col2;
                        } else {
                            divisionResult = col2 / col;
                        }

                        if (Number.isInteger(divisionResult)) {
                            result = divisionResult;
                        }
                    }
                }
            });
        }
    });

    return result;
}

function getChecksumPart2(rows) {
    return rows.reduce((sum, row) => {
        return sum += getRowResultPart2(row);
    }, 0);
}