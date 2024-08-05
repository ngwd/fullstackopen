const  { range, crossProduct, matrix, genNullMatrix, squeeze, DIRECTIONS, flip0, transpose, transpose_2 } = require('./shifter');

describe('range ', ()=>{
  it('Given one argument a, should return [0, a) ', ()=>{
    expect(range(5)).toEqual([0, 1, 2, 3, 4])
  });
  it('Given 2 argument 2, 5, should return [2, 3, 4) ', ()=>{
    expect(range(2, 5)).toEqual([2, 3, 4])
  });
  it('Given 2 argument 2, 2, should return [] ', ()=>{
    expect(range(2, 2)).toEqual([])
  });
  it('Given 2 argument 3, 2, should return [] ', ()=>{
    expect(range(3, 2)).toEqual([])
  });
})
describe ('crossProduct', ()=> {
  it('crossProduct of [1, 2, 3] and [a, b]', ()=> {
    expect(crossProduct([1, 2, 3], ['a', 'b'])).toEqual([[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b'],[3, 'a'], [3, 'b']])
  });
})
describe ('matrix', ()=> {
  it('initial a matrix of [1, 2, 3] and [1, 2] with value 1 ', ()=> {
    expect(matrix([1, 2, 3], [1, 2], 1)).toEqual([[1, 1], [1, 1], [1, 1]])
  });
})
describe ('genNullMatrix', ()=> {
  it('initial a matrix of 3 row and 2 column with value null ', ()=> {
    expect(genNullMatrix(3, 2)).toEqual([[null, null], [null, null], [null, null]])
  });
})

describe ("squeeze", ()=>{
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
})

describe ('flip0', ()=>{
  test("[[1, 2, 3], [4, 5, 6], [7, 8, 9]] => [[3, 2, 1], [6, 5, 4], [9, 8, 7]]", ()=> {
    let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; 
    let arr1 = [[3, 2, 1], [6, 5, 4], [9, 8, 7]];
    flip0(arr);
    expect(arr1).toStrictEqual(arr);
  });
})

describe ('transpose', ()=>{
  test("[[1, 2, 3], [4, 5, 6], [7, 8, 9]] => [[1, 4, 7], [2, 5, 8], [3, 6, 9]]", ()=> {
    let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; 
    let arr1 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    transpose(arr);
    expect(arr1).toStrictEqual(arr);
  });
  test("[[1, 2, 3], [4, 5, 6], [7, 8, 9]] => ", ()=> {
    let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; 
    let arr1 = [[9, 6, 3], [8, 5, 2], [7, 4, 1]];
    transpose_2(arr);
    expect(arr1).toStrictEqual(arr);
  });
})