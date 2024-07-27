const range = (lo : number, hi? : number) : number[] => {
  if (hi === undefined) {
    hi = lo;
    lo = 0; 
  }
  if (lo >= hi) return []; 
  return [...Array(hi-lo).keys()].map(i => i+lo);
};

const crossProduct = <T, U>(rows: T[], cols: U[]):[T, U][] => {
  return rows.flatMap(i => cols.map(j => [i,j] as [T, U]));
}

const matrix = (rows: number[], cols: number[], value: any):[number, number][] => {
  let temp: any = rows.map(_ => cols.map(_ => value));
  return temp;

}

const randomInt = (a: number, b: number): number => a + Math.floor(Math.random()*(b -a));
const randomChoice = <T>(arr: T[]): T => arr[randomInt(0, arr.length)];

const squeezeArray_left = <T extends number|null> (iterable: T[]): T[] => {
  let arr = Array.from(iterable);
  let cnt = arr.length;
  arr.push(null as T);
  let combined = false;
  for(let i = 0; i<cnt; i++) {
    const head: T|null = arr.shift()??null;
    if (head === null) continue;

    const tail: T = arr[arr.length-1];
    if (head === tail && typeof head ==='number' && combined === false ) {
      arr.pop();
      arr.push((2 * head) as T);
      combined = true;
    }
    else { // head !== tail
      arr.push(head);
      combined = false;
    }
  }
  arr.shift();
  while (arr.length < cnt) arr.push(null as T);
  return arr as T[];
}

enum DIRECTIONS { up = 1, down,  left, right };

const squeeze = <T extends number|null>(array:T[], direction:DIRECTIONS): T[]  => {
  if (direction === DIRECTIONS.left) {
    return squeezeArray_left(array);
  }
  else if (direction === DIRECTIONS.right) {
    array.reverse(); 
    array = squeezeArray_left(array);
    array.reverse();
    return array;
  }
  else {
    throw new Error('Invalid direction');
  }
}
const transpose = <T extends number|null>(matrix:T[][]) => {
  for(let i = 0; i<matrix.length; ++i) {
    for(let j = i+1; j<matrix[0].length; ++j) {
      const tmp:T|null = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = tmp;
    }
  }
};
const transpose_2 = <T extends number|null>(matrix:T[][]) => {
  const L = matrix.length - 1
  for(let j=0; j<L; ++j) {
    for(let i=0; i<L-j; ++i) {
      const tmp:T|null = matrix[i][j];
      matrix[i][j] = matrix[L-j][L-i];
      matrix[L-j][L-i] = tmp;
    }
  }
};
const flip = <T extends number|null>(matrix:T[][]) => {
  // horizontal flip
  matrix.forEach(row => row.reverse());
};


const genMatrix = (nrow: number, ncol: number, value: any) => matrix(range(nrow), range(ncol), value);
const genNullMatrix = (nrow: number, ncol: number) => genMatrix(nrow, ncol, null);
export { range, randomChoice, crossProduct, matrix, genNullMatrix, squeeze, flip, DIRECTIONS, transpose, transpose_2 };