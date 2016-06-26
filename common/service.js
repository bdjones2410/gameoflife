(function() {
    'use strict';
    angular
      .module('app')
        .factory('mainService', [
          function() {

            //randomly assign 1(alive) or 0(dead);
            const randomizer = function() {
                return Math.floor(Math.random() * 2)
            };

            //creates our game initial Game of Life array/state
            const createMatrix = function(num) {
                let retArr = [];
                for (let i = 0; i < num; i++) {
                    let row = []
                    for (let j = 0; j < num; j++) {
                        let rando = randomizer();
                        rando === 1 ? row.push("alive") : row.push(
                            "dead")
                    }
                    retArr.push(row);
                }
                return retArr;
            };

            //begins the journey to create a new state array, and returning it once it's built
            const getNextState = function(curState) {
                let newArr = getArray(curState);
                return newArr;
            };

            //takes current array, makes a copy and then updates the copy one cell at a time based on currentState
            const getArray = function(curState) {
                    let nextArr = [];
                    for (let row in curState) {
                        nextArr[row] = [...curState[row]];
                    }
                    for (let i = 0; i < curState.length; i++) {
                        for (let j = 0; j < curState[i].length; j++) {
                            let cell = getCell(i, j, curState);
                            nextArr[i][j] = cell;
                        }
                    }
                    return nextArr;
                };

            //checks the neighbors of the current cell passed in by assigning start/end rows/columns,
            //counting neighbors and then returning a cell with a status based on its current status
            //and neighbor count
            const getCell = function(row, column, curState) {
                let startRow = row === 0 ? 0 : row - 1;
                let startColumn = column === 0 ? 0 : column - 1;
                let endRow = row === curState[row].length - 1 ? row : row + 1
                let endColumn = column === curState[column].length - 1 ? column : column + 1;
                let neighbors = 0;
                for (let i = startRow; i <= endRow; i++) {
                    for (let j = startColumn; j <= endColumn; j++) {
                        if (i === row && j === column) {} else {
                            if (curState[i][j] === "alive") {
                                neighbors++;
                            }
                        }
                    }
                }
                let cell = lifeCheck(curState[row][column], neighbors);
                return cell;
            };

            //return dead or alive for newState array cell based on currentState's status and neighbors
            const lifeCheck = function(status, count) {
                if (status === "dead") {
                    return count === 3 ? "alive" : "dead"
                } else {
                    return count < 2 ? "dead" : count > 3 ?
                        "dead" : "alive"
                }
            };

            return {
                createMatrix: createMatrix,
                lifeCheck: lifeCheck,
                getNextState: getNextState
            }
        }
    ])
}());
