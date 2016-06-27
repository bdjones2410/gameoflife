'use strict';

(function () {
  'use strict';

  angular.module('app', []);
})();
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    'use strict';
    // TODO: secure input field to only accept valid numbers within a range.
    // TODO: look into dynamically setting css width and height of cells based on grid & browser size

    angular.module('app').controller('mainController', ['$scope', 'mainService', function ($scope, mainService) {
        var vm = this;

        //important variables
        var LIFE_ACTIVE = false;
        var INTERVAL = 2000;

        //defining our states
        vm.MATRIX_SIZE = 20;
        vm.ticks = 1;
        vm.currentState = [];

        //for ng-show of grid.
        vm.checkLife = function () {
            return LIFE_ACTIVE;
        };

        //clear out current Interval for Game of Life, reset LIFE_ACTIVE to false
        vm.reset = function () {
            window.clearInterval(vm.automateLife);
            LIFE_ACTIVE = false;
        };

        //initialize our states, start our interval for updates, set LIFE_ACTIVE to true
        vm.beginLife = function (num) {
            vm.ticks = 1;
            LIFE_ACTIVE = true;
            vm.currentState = [].concat(_toConsumableArray(mainService.createMatrix(num)));
            vm.automateLife = setInterval(getNextState, INTERVAL);
        };

        //set our currentState to current version of our nextState, cycle through our currentState to get our current cell location.
        var getNextState = function getNextState() {
            var newStateArr = mainService.getNextState(vm.currentState);
            //allows angular to see this change and update on the dom.
            $scope.$apply(vm.currentState = [].concat(_toConsumableArray(newStateArr)), vm.ticks++);
        };
    }]);
})();
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    'use strict';

    angular.module('app').factory('mainService', [function () {

        //randomly assign 1(alive) or 0(dead);
        var randomizer = function randomizer() {
            return Math.floor(Math.random() * 2);
        };

        //creates our game initial Game of Life array/state
        var createMatrix = function createMatrix(num) {
            var retArr = [];
            for (var i = 0; i < num; i++) {
                var row = [];
                for (var j = 0; j < num; j++) {
                    var rando = randomizer();
                    rando === 1 ? row.push("alive") : row.push("dead");
                }
                retArr.push(row);
            }
            return retArr;
        };

        //begins the journey to create a new state array, and returning it once it's built
        var getNextState = function getNextState(curState) {
            var newArr = getArray(curState);
            return newArr;
        };

        //takes current array, makes a copy and then updates the copy one cell at a time based on currentState
        var getArray = function getArray(curState) {
            var nextArr = [];
            for (var row in curState) {
                nextArr[row] = [].concat(_toConsumableArray(curState[row]));
            }
            for (var i = 0; i < curState.length; i++) {
                for (var j = 0; j < curState[i].length; j++) {
                    var cell = getCell(i, j, curState);
                    nextArr[i][j] = cell;
                }
            }
            return nextArr;
        };

        //checks the neighbors of the current cell passed in by assigning start/end rows/columns,
        //counting neighbors and then returning a cell with a status based on its current status
        //and neighbor count
        var getCell = function getCell(row, column, curState) {
            var startRow = row === 0 ? 0 : row - 1;
            var startColumn = column === 0 ? 0 : column - 1;
            var endRow = row === curState[row].length - 1 ? row : row + 1;
            var endColumn = column === curState[column].length - 1 ? column : column + 1;
            var neighbors = 0;
            for (var i = startRow; i <= endRow; i++) {
                for (var j = startColumn; j <= endColumn; j++) {
                    if (i !== row || j !== column) {
                        curState[i][j] === "alive" ? neighbors++ : null;
                    }
                }
            }
            var cell = lifeCheck(curState[row][column], neighbors);
            return cell;
        };

        //return dead or alive for newState array cell based on currentState's status and neighbors
        var lifeCheck = function lifeCheck(status, count) {
            if (status === "dead") {
                return count === 3 ? "alive" : "dead";
            } else {
                return count < 2 ? "dead" : count > 3 ? "dead" : "alive";
            }
        };

        return {
            createMatrix: createMatrix,
            getNextState: getNextState
        };
    }]);
})();
