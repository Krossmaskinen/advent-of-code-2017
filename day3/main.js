// var input = 368078;
var input = 25;
var width = Math.ceil(Math.sqrt(input));
var height = width;
var currentWidth = 1;
var currentHeight = 1;
var x = 0;
var y = 0;
var grid = [[]];

var xDir = 1;
var yDir = -1;
var xMoving = true;

for (let i = 1; i <= input; ++i) {
    if (!xMoving) {
        populateRows(i);
    } else if (xMoving) {
        populateCols(i);
    }
}

console.log(grid);

function populateRows(i) {
    if (y < 0) {
        grid.unshift([]);
        y = 0;
        grid[y][x] = i;
        currentHeight++;
        yDir *= -1;
        x += xDir;
        xMoving = true;
    } else if (y >= currentHeight) {
        grid.push([]);
        if (x < 0) {
            grid[y].unshift(i);
        } else {
            grid[y][x] = i;
        }
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
        y += yDir;
    }
}

function populateCols(i) {
    if (x < 0) {
        grid[y].unshift(i);
        currentWidth++;
        xDir *= -1;
        y += yDir;
        xMoving = false;
    } else if (x >= currentWidth) {
        grid[y][x] = i;
        currentWidth++;
        xDir *= -1;
        y += yDir;
        xMoving = false;
    } else {
        grid[y][x] = i;

        x += xDir;
    }
}