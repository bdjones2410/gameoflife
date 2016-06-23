// TODO: refactor into Angular
// TODO: refactor to set size of matrix based on user input
const MATRIX_SIZE = 20;

//randomly assign initial state of each cell to 1(alive) or 0(dead)
const randomizer = () => Math.floor(Math.random() * 2)

//create our initial matrix
const createMatrix = function(num) {
        let retArr = [];
        for (var i = 0; i < num; i++) {
            let row = []
            for (var j = 0; j < num; j++) {
                row.push(randomizer());
            }
            retArr.push(row);
        }
        return retArr;
    }

//define our previous matrix state to iterate through for next state
let prevState = [];

//begin by creating our next state to load
let nextState = createMatrix(MATRIX_SIZE);

//set up our points for reference when getting neighbors based on location of cell
//currently selected
// TODO: break down each variable into functions or cleaner turnary format
const getPoints = function(row, column) {
        let startRow = 0;
        let startColumn = 0;
        let endRow = 0;
        let endColumn = 0;
        if (row === 0) {
            startRow = 0;
            endRow = row + 1;
        } else if (row === MATRIX_SIZE - 1) {
            startRow = row - 1;
            endRow = row;
        } else {
            startRow = row - 1;
            endRow = row + 1;
        }
        if (column === 0) {
            startColumn = 0;
            endColumn = column + 1;
        } else if (column === MATRIX_SIZE - 1) {
            startColumn = column - 1;
            endColumn = column;
        } else {
            startColumn = column - 1;
            endColumn = column + 1;
        }
        getNeighbors(row, column, startRow, startColumn, endRow, endColumn)
    }

    //get neighbors of current cell,
    // TODO: refactor to be a pure function, returning a new array instead of replacing values one at a time
const getNeighbors = function(row, column, startRow, startColumn, endRow,
        endColumn) {
        let neighbors = 0;
        for (var i = startRow; i <= endRow; i++) {
            for (var j = startColumn; j <= endColumn; j++) {
                if (i === row && j === column) {} else {
                    if (prevState[i][j] === 1) {
                        neighbors++;
                    }
                }
            }
        }
        if (prevState[row][column] === 0) {
            if (neighbors == 3) {
                nextState[row][column] = 1;
            } else {
                nextState[row][column] = 0;
            }
        } else {
            if (neighbors < 2 || neighbors > 3) {
                nextState[row][column] = 0;
            } else {
                nextState[row][column] = 1;
            }
        }
    }

//set the HTML to render our new matrix on the page
// TODO: refactor to use tables and cells instead of divs?
const printStates = function() {
        var html = ""
        for (var el in prevState) {
            html += "<div>"
            for (var item in prevState[el]) {
                if (prevState[el][item] === 1) {
                    html += `<div class="alive"></div>`
                } else {
                    html += `<div class="dead"></div>`
                }
            }
            html += "</div>"
        }
        document.getElementById('print-states').innerHTML = html;
    }

//assign previousState to store the current state.
//clear nextState to adopt new alive or dead cells
const loadStates = function() {
        printStates();
        prevState = nextState;
        nextState = [];
        for (var i in prevState) {
            nextState.push([]);
        }
        for (var i = 0; i < prevState.length; i++) {
            for (var j = 0; j < prevState[i].length; j++) {
                getPoints(i, j);
            }
        }
        printStates();
    }

//load initial State on the page, begin setInterval
const begin = function() {
        loadStates();
        setInterval(loadStates, 2000);
    }
     
//begin the Game of Life
begin();
