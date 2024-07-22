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
  var temp:any = rows.map(_ => cols.map(_ => value));
  return temp;

}
const genMatrix = (nrow: number, ncol: number, value: any) => matrix(range(nrow), range(ncol), value);
const genNullMatrix = (nrow: number, ncol: number) => genMatrix(nrow, ncol, null);
export { range, crossProduct, matrix, genNullMatrix};