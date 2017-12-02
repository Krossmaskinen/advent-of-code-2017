var fs = require('fs');
let inputFile = './input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let checksum;

input = formatInput(input);
checksum = getChecksum(input);

console.log(`checksum: ${checksum}`);

return checksum;

function formatInput(input) {
    let rows = input.split('\n');

    return rows.map(row => {
        row = row.split(/\s+/);
        row.pop();

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
        let diff = getRowDiff(row);

        sum += getRowDiff(row);

        return sum;
    }, 0);
}