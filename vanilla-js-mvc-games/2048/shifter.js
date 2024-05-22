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
/*
export const crossProduct = (rows, cols) => rows.flatMap(i => cols.map(j => [i,j]));
export const nullMatrix = (rows, cols) => rows.map(_ => cols.map(_ => null));
export const genNullMatrix = (nrow, ncol) => nullMatrix(range(nrow), range(ncol));
*/
const crossProduct = (rows, cols) => rows.flatMap(i => cols.map(j => [i,j]));
const nullMatrix = (rows, cols) => rows.map(_ => cols.map(_ => null));

const genNullMatrix = (nrow, ncol) => nullMatrix(range(nrow), range(ncol));
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
const shiftArray = (iteratable) => {
  let arr = Array.from(iteratable);
  let cnt = arr.length;
  arr.push(null);
  let combined = false;
  for(let i = 0, head; i<cnt; i++) {
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
module.exports = {
  range,
  crossProduct,
  nullMatrix, 
  shiftArray,
  genNullMatrix,
}