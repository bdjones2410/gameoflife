(function() {
    'use strict';
    // TODO: refactor to be a pure function, returning a new array instead of replacing values one at a time
    // TODO: test cases
    // TODO: secure input field to only accept valid numbers within a range.
    // TODO: look into dynamically setting css width and height of cells based on grid & browser size
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
                };

            //clear out current running game of life, reset LIFE_ACTIVE to false
            vm.reset = function() {
                    window.clearInterval(vm.automateLife)
                    vm.LIFE_ACTIVE = false;
                };

            //initialize our states, start our interval for updates, set LIFE_ACTIVE to true
            vm.beginLife = function(num) {
                    vm.ticks = 1;
                    vm.LIFE_ACTIVE = true;
                    var retArr = mainService.createMatrix(num);
                    vm.currentState = [...retArr];
                    vm.nextState = [...retArr];
                    vm.automateLife = setInterval(vm.setNextState, vm.INTERVAL);
                };

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

                    //allows angular to see this change and update on the dom.
                    $scope.$apply(vm.currentState = [...vm.nextState], vm.ticks++);
                };

            //takes our current cell position, and sets our starting and end points for checking neighbor cells based on posistion of current cell.
            vm.getPoints = function(row, column) {
                let startRow = row === 0 ? 0 : row - 1;
                let startColumn = column === 0 ? 0 : column - 1;
                let endRow = row === vm.currentState[row].length -1 ? row : row + 1
                let endColumn = column === vm.currentState[column].length -1 ? column : column + 1;
                vm.getNeighbors(row, column, startRow, startColumn, endRow, endColumn)
              };

            //receives current cell posistion, and positions for start and end from getPoints, counts the number of living neighbor cells around our current cell, and sets the status of the current cell into the nextState
            vm.getNeighbors = function(row, column, startRow, startColumn, endRow, endColumn) {
                let lifeStats = vm.currentState[row][column];
                let neighbors = 0;
                for (var i = startRow; i <= endRow; i++) {
                    for (var j = startColumn; j <= endColumn; j++) {
                        if (i === row && j === column) {} else {
                            if (vm.currentState[i][j] === "alive") {
                                neighbors++;
                            }
                        }
                    }
                }

                //make a call to lifeCheck with current life status, and neighbor count
                //returns alive or dead and assigns it
                vm.nextState[row][column] = mainService.lifeCheck(lifeStats, neighbors);
            };


    }])
}());
