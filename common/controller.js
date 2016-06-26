(function() {
    'use strict';
    // TODO: secure input field to only accept valid numbers within a range.
    // TODO: look into dynamically setting css width and height of cells based on grid & browser size

    angular.module('app')
      .controller('mainController', ['$scope', 'mainService',
        function($scope, mainService) {
            const vm = this;

            //important variables
            vm.LIFE_ACTIVE = false;
            vm.MATRIX_SIZE = 20;
            vm.INTERVAL = 2000;

            //defining our states
            vm.ticks = 1;
            vm.currentState = [];

            //for ng-show of grid.
            vm.checkLife = function() {
                    return vm.LIFE_ACTIVE;
                };

            //clear out current Interval for Game of Life, reset LIFE_ACTIVE to false
            vm.reset = function() {
                    window.clearInterval(vm.automateLife)
                    vm.LIFE_ACTIVE = false;
                };

            //initialize our states, start our interval for updates, set LIFE_ACTIVE to true
            vm.beginLife = function(num) {
                    vm.ticks = 1;
                    vm.LIFE_ACTIVE = true;
                    vm.currentState = [...mainService.createMatrix(num)];
                    vm.automateLife = setInterval(vm.getNextState, vm.INTERVAL);
                };

            //set our currentState to current version of our nextState, cycle through our currentState to get our current cell location.
            vm.getNextState = function() {
                 let newStateArr = mainService.getNextState(vm.currentState);
                  //allows angular to see this change and update on the dom.
                  $scope.$apply(vm.currentState = [...newStateArr], vm.ticks++);
                };

    }])
}());
