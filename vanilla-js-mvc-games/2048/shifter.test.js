const { squeeze, DIRECTIONS, columnIterators, squeeze_col_wise} = require('./shifter.js');

  // {2, 4, 2, 2} => {2, 4, 4, n}
describe ('squeeze', ()=>{
  test("{n, n, 2, n} => {2, n, n, n} ", ()=> {
    let arr = [null, null, 2, null];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([2, null, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, null, 2]);
  });

  test("{2, n, 2, n} => {4, n, n, n} ", ()=> {
    let arr = [2, null, 2, null];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, null, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, null, 4]);
  });
  test("{2, n, n, 2} => {4, n, n, n} ", ()=> {
    let arr = [2, null, null, 2];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, null, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, null, 4]);
  });

  test("{2, 2, 2, n} => {4, 2, n, n} ", ()=> {
    let arr = [2, 2, 2, null];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, 2, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, 2, 4]);
  });

  test("{4, 2, 2, n} => {4, 4, n, n} ", ()=> {
    let arr = [4, 2, 2, null];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, 4, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, 4, 4]);
  });

  test("{2, 2, 4, n} => {4, 4, n, n} ", ()=> {
    let arr = [2, 2, 4, null];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, 4, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, 4, 4]);
  });

  test("{2, 2, 2, 2} => {4, 4, n, n} ", ()=> {
    let arr = [2, 2, 2, 2];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, 4, null, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, null, 4, 4]);
  });

  test("{2, 2, 4, 2} => {4, 4, 2, n} ", ()=> {
    let arr = [2, 2, 4, 2];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([4, 4, 2, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, 4, 4, 2]);
  });

  test("{2, 4, 2, 2} => {2, 4, 4, n} ", ()=> {
    let arr = [2, 4, 2, 2];
    let arr1 = squeeze(arr, DIRECTIONS.left);
    expect(arr1).toStrictEqual([2, 4, 4, null]);

    let arr2 = squeeze(arr, DIRECTIONS.right);
    expect(arr2).toStrictEqual([null, 2, 4, 4]);
  });
});

describe('columns ', ()=>{
  test("[[1,2,3],[4,5,6],[7,8,9]] => ", ()=> {
    let mtx = [[1,2,3],[4,5,6],[7,8,9]];
    let cis = columnIterators(mtx) 
    let mtx2 = Array.from(cis.map(row => Array.from(row)))
    expect(mtx2).toStrictEqual([[1, 4, 7],[2, 5, 8],[3, 6, 9]]);
    cis = columnIterators(mtx2)
    let mtx4 = Array.from(cis.map(row => Array.from(row)))
    expect(mtx4).toStrictEqual([[1, 2, 3],[4, 5, 6],[7, 8, 9]]);
  })
  test("[[null,2,2,2],[2,null,2,2],[null,null, 2, null], [2, null, null, 2]] => ", ()=> {
    let mtx = [[null,2,    2,    2],
               [2,   null, 2,    2],
               [null,null, 2,    4], 
               [2,   null, null, 2]];
    let mtx1 = squeeze_col_wise(mtx, DIRECTIONS.left);
    expect(mtx1).toStrictEqual([[4,    2,    4,    4],
                                  [null, null, 2,    4],
                                  [null, null, null, 2], 
                                  [null, null, null, null]]);
  })
})