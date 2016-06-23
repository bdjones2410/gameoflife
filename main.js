const randomizer = () => Math.floor(Math.random()*2)

const createMatrix = function(num){
    let retArr = [];
    for(var i = 0; i < num; i++){
      let myrow = []
      for(var j = 0; j < num; j++){
        myrow.push(randomizer());
      }
      retArr.push(myrow);
    }
    return retArr;
}

var prevState = createMatrix(20);
var nextState = createMatrix(20);



//reformat this to use more parameters,  start row, end row, start col, end col boil down to one function with loops.

const getNeighbors = function(row, column){
  if(row == 0 || column == 0){
    if(row == 0 && column == 0){
      bothStart(row, column)
    }else if(row == 0){
      if(column === (prevState[row].length -1)){
      //  console.log("column end row 0",row, column);
      }else {
      //  console.log("row 0",row, column);
      }
    }else{
    //  console.log("col 0",row, column);
    }
  }
  else if(row === (prevState.length -1) || column === (prevState[row].length -1)){
    if(row === (prevState.length -1) && column === (prevState[row].length -1)){
     bothEnd(row, column);
    }else if(row === (prevState.length -1)){
    //  console.log("row end", row, column);
    }else {
  //    console.log("column end", row, column);
    }
  }
  else {
    getAll(row, column);
  }
}


const bothStart = function(row, column) {
  let neighbors = 0;
  let startRow = row;
  let startColumn = column;

  while(startRow < row + 2){
    if(startRow == row && startColumn == column){
      startColumn ++;
    }
    else if(startColumn > column + 1){
      startColumn = column;
      startRow++;
    }
    else{
      startColumn++
      if(prevState[startRow][startColumn] == 1){
        neighbors++;

      }
    }
  }
  console.log("start", neighbors);
}

const rowZero = function(row, column){

}

const colZero = function(row, column){

}

const colZeroRowEnd = function(row, column) {

}

const rowZeroColEnd = function(row, column) {

}

const rowEnd = function(row, column){

}

const colEnd = function(row, column){

}

const bothEnd = function(row, column){
  let neighbors = 0;
  let startRow = (row - 1);
  let startColumn = (column - 1);
  while(startRow < row + 1){
    if(startRow == row && startColumn == column){
      startColumn ++;
    }
    else if(startColumn > column){
      startColumn = column - 1;
      startRow++;
    }
    else{
      startColumn++
      if(prevState[startRow][startColumn] == 1){
        neighbors++;
      }
    }
  }
  console.log("end", neighbors);
}

const getAll = function(row, column){
  let neighbors = 0;
  let startRow = (row - 1);
  let startColumn = (column - 1);
  while(startRow < row + 2){
    if(startRow == row && startColumn == column){
      startColumn ++;
    }
    else if(startColumn > column + 1){
      startColumn = column - 1;
      startRow++;
    }
    else{
      startColumn++
      if(prevState[startRow][startColumn] == 1){
        neighbors++;
      }
    }
  }
  console.log("mid", neighbors);
}






for(var i = 0; i < prevState.length; i++){
  for(var j = 0; j < prevState[i].length; j++){
    getNeighbors(i, j);
  }
}
