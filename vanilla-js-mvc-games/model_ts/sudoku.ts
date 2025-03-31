export function isValid(board: string[][]): boolean {
  const ROW = 0, COL = 1, HIVE = 2;
  const check = [...Array(3)].map(_ => 
    [...Array(9)].map(_ => 
        Array(10).fill(0)
    )
  )
  for(let i = 0; i<board.length; ++i) {
    for(let j = 0; j<board[i].length; ++j) {
      let v = board[i][j];
      if (v === ".") continue;

      let vi: number = parseInt(v); 
      let k : number = ~~(i/3)*3 + ~~(j/3);
      if (check[ROW][i][vi] === 1) {
        return false;
      }
      ++check[ROW][i][vi];
      if (check[COL][j][vi] === 1) {
        return false;
      }
      ++check[COL][j][vi];
      if (check[HIVE][k][vi] === 1) {
        return false;
      }
      ++check[HIVE][k][vi];
    }
  }
  return true;
}