var target = 368078;
var width = Math.ceil(Math.sqrt(target));
var height = width;
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

console.log(`dist: ${manhattanDist}`);

return manhattanDist;

function populateRows(i) {
    if (y < 0) {
        grid.unshift([]);
        y = 0;
        grid[y][x] = i;
        checkAndSaveTarget(i);
        currentHeight++;
        yDir *= -1;
        x += xDir;
        xMoving = true;
        centerY++;
    } else if (y >= currentHeight) {
        grid.push([]);
        if (x < 0) {
            grid[y].unshift(i);
        } else {
            grid[y][x] = i;
        }
        checkAndSaveTarget(i);
        currentHeight++;
        yDir *= -1;
        x = 1;
        xMoving = true;
    } else {
        if (x < 0) {
            grid[y].unshift(i);
        } else {
            grid[y][x] = i;
        }
        checkAndSaveTarget(i);
        y += yDir;
    }
}

function populateCols(i) {
    if (x < 0) {
        grid[y].unshift(i);
        checkAndSaveTarget(i);
        currentWidth++;
        xDir *= -1;
        y += yDir;
        xMoving = false;
        centerX++;
    } else if (x >= currentWidth) {
        grid[y][x] = i;
        checkAndSaveTarget(i);
        currentWidth++;
        xDir *= -1;
        y += yDir;
        xMoving = false;
    } else {
        grid[y][x] = i;
        checkAndSaveTarget(i);
        x += xDir;
    }
}

function checkAndSaveTarget(i) {
    if (i === target) {
        targetX = x;
        targetY = y;
    }
}

function getManhattanDistance(point1, point2) {
    let distX = Math.abs(point1[0] - point2[0]);
    let distY = Math.abs(point1[1] - point2[1]);

    return distX + distY;
}