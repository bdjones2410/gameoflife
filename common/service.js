angular
  .module('app')
    .factory('mainService', [function(){

      //randomly assign 1(alive) or 0(dead);
      const randomizer = function()  {
        return Math.floor(Math.random() * 2)
      }


      //creates our game of life arrays
      const createMatrix = function(num) {
           var retArr = [];
           for (var i = 0; i < num; i++) {
               let row = []
               for (var j = 0; j < num; j++) {
                 let rando = randomizer();
                 rando === 1 ? row.push("alive") : row.push("dead")
               }
               retArr.push(row);
           }
           return retArr;
       };

       //return dead or alive for newState array cell based on currentState's status and neighbors
       const lifeCheck = function(status, count){
         if (status === "dead") {
          return count == 3 ? "alive" : "dead"
         } else {
          return count < 2 ? "dead" :  count > 3 ? "dead" : "alive"
         }
       }

      return {
        createMatrix : createMatrix,
        lifeCheck : lifeCheck
      }
    }])
