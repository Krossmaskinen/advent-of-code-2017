var target = 368078;
var currentWidth = 1;
var currentHeight = 1;
var x = 0;
var y = 0;
var grid = [[]];

var xDir = 1;
var yDir = -1;
var xMoving = true;

var centerX = 0;
var centerY = 0;

var targetX;
var targetY;

var manhattanDist = 0;

// part 1
for (let i = 1; i <= target; ++i) {
    if (!xMoving) {
        populateRows(i);
    } else if (xMoving) {
        populateCols(i);
    }
}

manhattanDist = getManhattanDistance([centerX, centerY], [targetX, targetY]);

console.log(`center: ${centerX}, ${centerY}`);
console.log(`target: ${targetX}, ${targetY}`);

console.log(`dist: ${manhattanDist}`); // 371

function populateRows(i) {
    let newRow = checkAndUpdateRows();

    grid[y][x] = i;
    checkAndSaveTarget(i);

    if (newRow) {
        currentHeight++;
        yDir *= -1;
        xMoving = true;
        x += xDir;
    } else {
        y += yDir;
    }
}

function populateCols(i) {
    let newCol = checkAndUpdateCols();

    grid[y][x] = i;
    checkAndSaveTarget(i);

    if (newCol) {
        currentWidth++;
        xDir *= -1;
        xMoving = false;
        y += yDir;
    } else {
        x += xDir;
    }
}

function checkAndUpdateRows() {
    if (y < 0) {
        addNewRow(true);
        centerY++;
        y = 0;
        return true;
    } else if (y >= currentHeight) {
        addNewRow(false);
        return true;
    }

    return false;
}

function checkAndUpdateCols() {
    if (x < 0) {
        addNewCol(true);
        centerX++;
        x = 0;
        return true;
    } else if (x >= currentWidth) {
        addNewCol(false);
        return true;
    }

    return false;
}

function checkAndSaveTarget(i) {
    if (i === target) {
        targetX = x;
        targetY = y;
    }
}

function addNewRow(top) {
    if (top) {
        grid.unshift(new Array(currentWidth).fill(0));
    } else {
        grid.push(new Array(currentWidth).fill(0));
    }
}

function addNewCol(left) {
    if (left) {
        grid.map(row => {
            row.unshift(0);
            return row;
        });
    } else {
        grid.map(row => {
            row.push(0);
            return row;
        });
    }
}

function getManhattanDistance(point1, point2) {
    let distX = Math.abs(point1[0] - point2[0]);
    let distY = Math.abs(point1[1] - point2[1]);

    return distX + distY;
}

// part 2
// var running = true;
// var i = 1;
// currentWidth = 1;
// currentHeight = 1;
// x = 0;
// y = 0;
// grid = [[]];

// xDir = 1;
// yDir = -1;
// xMoving = true;

// centerX = 0;
// centerY = 0;

// while (running) {
//     if (!xMoving) {
//         populateRows(i);
//     } else if (xMoving) {
//         populateCols(i);
//     }

//     if (i > target) {
//         break;
//     }

//     i = getUpdatedValue(i);
// }

// console.log(`result: ${i}`);

// function getUpdatedValue(i) {
//     let col = (x < 0) ? 0 : x;
//     let row = (y < 0) ? 0 : y;

//     let top = row - 1;
//     let bottom = row + 1;
//     let right = col + 1;
//     let left = col - 1;

//     let hasTop = (!!grid[top]);
//     let hasBottom = (!!grid[bottom]);

//     let sum = 0;

//     if (hasTop) {
//         sum += grid[top][left] || 0;
//         sum += grid[top][col] || 0;
//         sum += grid[top][right] || 0;
//     }
//     if (hasBottom) {
//         sum += grid[bottom][right] || 0;
//         sum += grid[bottom][col] || 0;
//         sum += grid[bottom][left] || 0;
//     }

//     sum += grid[row][left] || 0;
//     sum += grid[row][right] || 0;

//     return sum;
// }