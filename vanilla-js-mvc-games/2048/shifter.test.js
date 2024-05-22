// import { shiftArray } from './shifter.js';
const { shiftArray } = require('./shifter.js');

  // {2, 4, 2, 2} => {2, 4, 4, n}
describe ('shiftArray', ()=>{
  test("{2, n, 2, n} => {4, n, n, n} ", ()=> {
    arr = [2, null, 2, null];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, null, null, null]);
  });
  test("{2, n, n, 2} => {4, n, n, n} ", ()=> {
    arr = [2, null, null, 2];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, null, null, null]);
  });

  test("{2, 2, 2, n} => {4, 2, n, n} ", ()=> {
    arr = [2, 2, 2, null];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, 2, null, null]);
  });

  test("{4, 2, 2, n} => {4, 4, n, n} ", ()=> {
    arr = [4, 2, 2, null];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, 4, null, null]);
  });

  test("{2, 2, 4, n} => {4, 4, n, n} ", ()=> {
    arr = [2, 2, 4, null];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, 4, null, null]);
  });

  test("{2, 2, 2, 2} => {4, 4, n, n} ", ()=> {
    arr = [2, 2, 2, 2];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, 4, null, null]);
  });

  test("{2, 2, 4, 2} => {4, 4, 2, n} ", ()=> {
    arr = [2, 2, 4, 2];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([4, 4, 2, null]);
  });

  test("{2, 4, 2, 2} => {2, 4, 4, n} ", ()=> {
    arr = [2, 4, 2, 2];
    arr = shiftArray(arr);
    expect(arr).toStrictEqual([2, 4, 4, null]);
  });
});