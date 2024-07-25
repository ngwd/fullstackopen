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

const genMatrix = (nrow: number, ncol: number, value: any) => matrix(range(nrow), range(ncol), value);
const genZeroMatrix = (nrow: number, ncol: number) => genMatrix(nrow, ncol, 0);
const genNullMatrix = (nrow: number, ncol: number) => genMatrix(nrow, ncol, null);
const genOneMatrix = (nrow: number, ncol: number) => genMatrix(nrow, ncol, 1);
export { range, randomChoice, crossProduct, matrix, genNullMatrix };