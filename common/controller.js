(function() {
    'use strict';
    // TODO: refactor to make more use of service and break down functions
    // TODO: refactor to be a pure function, returning a new array instead of replacing values one at a time
    // TODO: test cases
    // TODO: secure input field to only accept valid numbers within a range.
    angular.module('app').controller('mainController', ['$scope',
        'mainService',
        function($scope, mainService) {
            var vm = this;

            //important variables
            vm.LIFE_ACTIVE = false;
            vm.MATRIX_SIZE = 20;
            vm.INTERVAL = 2000;

            //defining our states
            vm.ticks = 1;
            vm.currentState = [];
            vm.nextState = [];

            //for ng-show of grid.
            vm.checkLife = function() {
                    return vm.LIFE_ACTIVE;
                }

            //clear out current running game of life, reset LIFE_ACTIVE to false
            vm.reset = function() {
                    window.clearInterval(vm.clearInt)
                    vm.LIFE_ACTIVE = false;
                }

            //initialize our states, start our interval for updates, set LIFE_ACTIVE to true
            vm.beginLife = function(num) {
                    vm.ticks = 1;
                    vm.LIFE_ACTIVE = true;
                    var retArr = mainService.createMatrix(num);
                    vm.currentState = [...retArr];
                    vm.nextState = [...retArr];
                    vm.clearInt = setInterval(vm.setNextState, vm.INTERVAL);
                }

            //set our currentState to current version of our nextState, cycle through our currentState to get our current cell location.
            vm.setNextState = function() {
                    for (var i in vm.currentState) {
                        vm.currentState[i] = [...vm.nextState[i]]
                    }
                    for (var i = 0; i < vm.currentState.length; i++) {
                        for (var j = 0; j < vm.currentState[i].length; j++) {
                            vm.getPoints(i, j);
                        }
                    }

                    //allows angular's digest cycle to watch for this change so it will update on the dom.
                    $scope.$apply(vm.currentState = [...vm.nextState], vm.ticks++);
                }

            //takes our current cell position, and sets our starting and end points for checking neighbor cells based on posistion of current cell.
            // TODO: break down each variable into functions or cleaner turnary format
            vm.getPoints = function(row, column) {
                    let startRow = 0;
                    let startColumn = 0;
                    let endRow = 0;
                    let endColumn = 0;
                    if (row === 0) {
                        startRow = 0;
                        endRow = row + 1;
                    } else if (row === vm.currentState[row].length -
                        1) {
                        startRow = row - 1;
                        endRow = row;
                    } else {
                        startRow = row - 1;
                        endRow = row + 1;
                    }
                    if (column === 0) {
                        startColumn = 0;
                        endColumn = column + 1;
                    } else if (column === vm.currentState[column].length -
                        1) {
                        startColumn = column - 1;
                        endColumn = column;
                    } else {
                        startColumn = column - 1;
                        endColumn = column + 1;
                    }
                    vm.getNeighbors(row, column, startRow,
                        startColumn, endRow, endColumn)
                }

            //receives current cell posistion, and positions for start and end from getPoints, counts the number of living neighbor cells around our current cell, and sets the status of the current cell into the nextState
            // TODO: break this down into two seperate functions. passing row, column, and neighbor count to return dead or alive.
            vm.getNeighbors = function(row, column, startRow,
                startColumn, endRow, endColumn) {
                let neighbors = 0;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startColumn; j <= endColumn; j++) {
                        if (i === row && j === column) {} else {
                            if (vm.currentState[i][j] ===
                                "alive") {
                                neighbors++;
                            }
                        }
                    }
                }
                if (vm.currentState[row][column] === "dead") {
                    if (neighbors == 3) {
                        vm.nextState[row][column] = "alive";
                    } else {
                        vm.nextState[row][column] = "dead";
                    }
                } else {
                    if (neighbors < 2 || neighbors > 3) {
                        vm.nextState[row][column] = "dead";
                    } else {
                        vm.nextState[row][column] = "alive";
                    }
                }
            }
        }
    ])
}());
