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

export { range, crossProduct };