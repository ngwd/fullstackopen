const { squeeze, DIRECTIONS } = require('./shifter.js');

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