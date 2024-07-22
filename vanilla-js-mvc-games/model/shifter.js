/*
allCoordinates = ((rows, cols) => {
  return Array(rows).fill().map((_, x) => 
    Array(cols).fill().map((_, y) => [x, y])
  ).flat();
})(GAME_SIZE, GAME_SIZE);

genNullMatrix = ((rows, cols) => {
  // return Array(GAME_SIZE).fill(Array(GAME_SIZE).fill(null)) // it is buggy with this line, 
  return Array.from({length:rows}, ()=>Array(cols).fill(null));
});
*/
// range(5)   => [0, 1, 2, 3, 4];   range(2,5) => [2, 3, 4]; 
// export const range = (lo, hi) => {
const range = (lo, hi) => {
  if (hi === undefined) {
    hi = lo;
    lo = 0; 
  }
  if (lo >= hi) return []; 
  return [...Array(hi-lo).keys()].map(i => i+lo);
};
const crossProduct = (rows, cols) => rows.flatMap(i => cols.map(j => [i,j]));
const matrix = (rows, cols, value) => rows.map(_ => cols.map(_ => value));
const genMatrix = (nrow, ncol, value) => matrix(range(nrow), range(ncol), value);
const genNullMatrix = (nrow, ncol) => genMatrix(nrow, ncol, null);
// matrix(range(nrow), range(ncol), value);
const DIRECTIONS = Object.freeze({
  left: 0,
  right:1,
  up:   2,
  down: 3
})
/*
   {2, n, 2, n} => {4, n, n, n}
   {2, n, n, 2} => {4, n, n, n}

   {2, 2, 2, n} => {4, 2, n, n}
   {4, 2, 2, n} => {4, 4, n, n}
   {2, 2, 4, n} => {4, 4, n, n}

   {2, 2, 2, 2} => {4, 4, n, n}
   {2, 2, 4, 2} => {4, 4, 2, n}
   {2, 4, 2, 2} => {2, 4, 4, n}
*/
// export const shiftArray = (arr) => {
const squeezeArray_left = (iteratable) => {
  let arr = Array.from(iteratable);
  let cnt = arr.length;
  arr.push(null);
  let combined = false;
  for(let i = 0, head, tail; i<cnt; i++) {
    head = arr.shift(); 

    if (head === null) continue;

    tail = arr.at(-1);
    if (head === tail && combined === false ) {
      arr.pop();
      arr.push(2*tail);
      combined = true;
    }
    else { // head !== tail
      arr.push(head);
      combined = false;
    }
  }
  arr.shift();
  while (arr.length < cnt) arr.push(null);
  return arr;
}
// squeeze the array to right
const squeezeArray_right = (iteratable) => {
  let arr = Array.from(iteratable);
  let cnt = arr.length;
  arr.unshift(null);
  let combined = false;
  for(let i = 0, head, tail; i<cnt; i++) {
    head = arr.pop(); 

    if (head === null) continue;

    tail = arr.at(0);
    if (head === tail && combined === false ) {
      arr.shift();
      arr.unshift(2*tail);
      combined = true;
    }
    else { // head !== tail
      arr.unshift(head);
      combined = false;
    }
  }
  arr.pop();
  while (arr.length < cnt) arr.unshift(null);
  return arr;
}

function squeeze(array, direction) {
  if (direction === DIRECTIONS.left) {
    return squeezeArray_left(array);
  }
  else if (direction === DIRECTIONS.right) {
    return squeezeArray_right(array);
  }
  else {
    throw new Error('Invalid direction');
  }
}

const columnIterator = function* (matrix, columnIndex) {
  for(let row of matrix) { yield row[columnIndex]; }
  // matrix.map(row => yield row[columnIndex]);
}
const columnIterators = (matrix) => {
  return [...matrix[0].keys()].map(i => columnIterator(matrix, i));
}
const squeeze_row_wise = (matrix, d) =>{
  return matrix.map(row => squeeze(row, d));
}
const squeeze_col_wise = (matrix, d) =>{

  let cis = columnIterators(matrix);
  let matrix_transposed = Array.from(cis.map(row => Array.from(row)));
  let new_matrix = squeeze_row_wise(matrix_transposed, d)
  cis = columnIterators(new_matrix);
  return Array.from(cis.map(row => Array.from(row))) 
}
function areMatricesEqual(matrix1, matrix2) {
  // Check if the dimensions are the same
  if (matrix1.length !== matrix2.length) {
    return false;
  }
  
  for (let i = 0; i < matrix1.length; i++) {
    if (matrix1[i].length !== matrix2[i].length) {
      return false;
    }
    
    for (let j = 0; j < matrix1[i].length; j++) {
      if (matrix1[i][j] !== matrix2[i][j]) {
        return false;
      }
    }
  }
  
  return true;
}

export { range, crossProduct, squeeze_row_wise, squeeze, squeeze_col_wise, genNullMatrix, DIRECTIONS, columnIterators, areMatricesEqual };