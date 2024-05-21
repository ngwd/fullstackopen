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
export const range = (lo, hi) => {
  if (hi === undefined) {
    hi = lo;
    lo = 0; 
  }
  if (lo >= hi) return []; 
  return [...Array(hi-lo).keys()].map(i => i+lo);
};
export const crossProduct = (rows, cols) => rows.flatMap(i => cols.map(j => [i,j]));
export const nullMatrix = (rows, cols) => rows.map(_ => cols.map(_ => null));

export const genNullMatrix = (nrow, ncol) => nullMatrix(range(nrow), range(ncol));
  // {2, n, 2, n} => {4, n, n, n}
  // {2, n, n, 2} => {4, n, n, n}

  // {2, 2, 2, n} => {4, 2, n, n}
  // {4, 2, 2, n} => {4, 4, n, n}
  // {2, 2, 4, n} => {4, 4, n, n}

  // {2, 2, 2, 2} => {4, 4, n, n}
  // {2, 2, 4, 2} => {4, 4, 2, n}
  // {2, 4, 2, 2} => {2, 4, 4, n}
export const shiftArray = (arr) => {
  for(let i = 0, j; i < arr.length; ) {
    for( ; i < arr.length && arr[i] === null; ++i) {}
    if (i === arr.length) break;
    for(j = i+1; j < arr.length && arr[j] === null; ++j) {}
    if (j === arr.length) break;

    if (arr[i] === arr[j]) {
      arr[i] *= 2;
      arr[j] = null;
      i = j + 1;
    }
    else {
      i = j;
    }
  }
  // move all of the null back
  for(let i = 0, null_cnt = 0; i<arr.length; ++i) {
    if (arr[i] === null) ++null_cnt;
    else {
      [arr[i-null_cnt], arr[i]] = [arr[i], null];
    }
  }
}