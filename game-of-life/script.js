// https://p5js.org/reference/
//========================================
var grid = {
    x: 0, y: 0,
    col: 40, row: 40,
    w: 8, h: 8,
    grid: [],
    autocycle: false,
    oldGrids: [],
    //---------------------------------------
    makeGrid() {
        grid.grid = []
        for (let r = 0; r < grid.row; r++) {
            new_row = []
            for (let c = 0; c < grid.col; c++) {
                //new_row.push(Math.round(Math.random()))
                new_row.push(0)
                //new_row.push(1)
            }
            grid.grid.push(new_row)
        }
    },
    //---------------------------------------
    newStatus(r, c) {//returns either a 1 or a 0 based on the neighbors.  1 represents "alive", 0 "dead"
        var live = 0;
        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                if (a != 0 || b != 0) {
                    let nr = r + a
                    let nc = c + b

                    if (nr < 0) { nr += grid.grid.length }
                    if (nc < 0) { nc += grid.grid[r].length }
                    if (nr >= grid.grid.length) { nr -= grid.grid.length }
                    if (nc >= grid.grid[r].length) { nc -= grid.grid[r].length }
                    live += grid.grid[nr][nc]
                }
            }
        }
        //return(live)
        //Think about simplifying the logic here
        if (live == 2 && grid.grid[r][c] == 1 || live == 3 && grid.grid[r][c] == 1) {
            return 1
        } else if (live == 3 && grid.grid[r][c] == 0) {
            return 1
        } else {
            return 0
        }
    }
    ,
    //---------------------------------------
    newgeneration() {
        let ngarray = []
        for (let r = 0; r < grid.grid.length; r++) {
            let new_row = []
            for (let c = 0; c < grid.grid[r].length; c++) {
                new_row.push(grid.newStatus(r, c))
            }
            ngarray.push(new_row)
        }
        grid.oldGrids.push(grid.grid)
        grid.grid = ngarray

    },
    //---------------------------------------
    backOneGeneration() {
        if (grid.oldGrids.length > 0)
            grid.grid = grid.oldGrids.pop()
    },
    //---------------------------------------  
    getMouseRowCol() {
        columnclick = Math.floor((mouseX - grid.x) / grid.w) //haha funi line numbr
        rowclick = Math.floor((mouseY - grid.y) / grid.h)
        return [rowclick, columnclick]
    },
    //---------------------------------------
    inGrid(row, col) {
        //Returns true only if both row and col are in the grid's 2D array
        if (row < grid.row && row >= 0) {
            if (col < grid.col && col >= 0) {
                return true
            }
        }
        return false
    },
    //---------------------------------------   
    getMouseClick() {
        if (this.inGrid(...this.getMouseRowCol())) {
            let [r, c] = this.getMouseRowCol()
            grid.grid[r][c] = (mouseButton === LEFT ? 1 : 0)

        }
    },
    //---------------------------------------
    draw() {
        for (let r = 0; r < grid.row; r++) {
            for (let c = 0; c < grid.col; c++) {
                if (grid.grid[r][c] == 0) {
                    fill(0, 0, 0)
                } else {
                    fill(255, 255, 255)
                }
                rect(grid.x + (c * grid.w), grid.y + (r * grid.h), grid.w, grid.h)
            }
        }
    }
}
//=======================================
// p5js functions
//---------------------------------------
function setup() {
    createCanvas(400, 390);
    background(127)
    strokeWeight(0.1)
    stroke("darkgray")
    grid.makeGrid()
    grid.draw()
    frameRate(60);
    console.log("Left click on Grid to make a cell")
    console.log("Right click on Grid to remove it")

    console.log("Press E to autocycle generations\nPress the right arrow key to go forward one generation\nPress the left arrow key to go back on generation")
}

// // Would run every frame.  Wastes CPU cycles.
function draw() {
    if (grid.autocycle) {
        grid.newgeneration()
    }
    grid.draw()
}

function keyPressed() {
    if (keyCode == 69) {
        grid.autocycle = !grid.autocycle
        if (grid.autocycle) {
            console.log("started")
        } else {
            console.log("stopped")
        }
    } else if (keyCode == 37) {
        grid.backOneGeneration()
        grid.draw()
    } else if (keyCode == 39) {
        grid.newgeneration()
        grid.draw()
    }
}

function mousePressed() {
    grid.getMouseClick()
    grid.draw()
}

function mouseDragged() {
    grid.getMouseClick()
    grid.draw()
}

window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);