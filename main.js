const randomizer = () => Math.floor(Math.random()*2)

const MATRIX_SIZE = 15;

const createMatrix = function(num){
    let retArr = [];
    for(var i = 0; i < num; i++){
      let row = []
      for(var j = 0; j < num; j++){
        row.push(randomizer());
      }
      retArr.push(row);
    }
    return retArr;
}

var prevState = [];
var nextState = createMatrix(MATRIX_SIZE);

const getPoints = function(row, column){
  var startRow = 0;
  var startColumn = 0;
  var endRow = 0;
  var endColumn = 0;

  if(row === 0){
    startRow = 0;
    endRow = row + 1;
  }
  else if(row === MATRIX_SIZE -1){
    startRow = row - 1;
    endRow = row;
  }else{
    startRow = row -1;
    endRow = row + 1;
  }

  if(column === 0){
    startColumn = 0;
    endColumn = column + 1;
  }
  else if(column === MATRIX_SIZE -1){
    startColumn = column - 1;
    endColumn = column;
  }
  else{
    startColumn = column - 1;
    endColumn = column  + 1;
  }

 getNeighbors(row, column, startRow, startColumn, endRow, endColumn)
}


const getNeighbors = function(row, column, startRow, startColumn, endRow, endColumn){
  let neighbors = 0;
  for(var i = startRow; i <= endRow; i++){
    for(var j = startColumn; j <= endColumn; j++){
      if(i === row && j === column){

      }
      else{
        if(prevState[i][j] === 1){
          neighbors++;
        }
      }
    }
  }

  if(prevState[row][column] === 0){
    if(neighbors == 3){
      nextState[row][column] = 1;
    }
    else {
      nextState[row][column] = 0;
    }
  }
  else {
    if(neighbors < 2 || neighbors > 3){
      nextState[row][column] = 0;
    }
    else {
      nextState[row][column] = 1;
    }
  }
}

const printStates = function(){
  var html = ""
  for(var el in prevState){
    html+= "<div>"
    for(var item in prevState[el]){
      if(prevState[el][item] === 1){
        html +=  `<div class="alive"></div>`
      }
      else{
        html+=`<div class="dead"></div>`
      }
    }
    html+="</div>"
  }

  document.getElementById('print-states').innerHTML = html;
}


const loadStates = function(){
  printStates();
  prevState = nextState;
  nextState = [];
  for(var i in prevState){
    nextState.push([]);
  }

  for(var i = 0; i < prevState.length; i++){
    for(var j = 0; j < prevState[i].length; j++){
      getPoints(i, j);
    }
  }
  printStates();
}

const begin = function(){
  loadStates();
  setInterval(loadStates, 2000);
}

begin();
