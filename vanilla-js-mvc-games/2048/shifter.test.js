const { beforeEach } = require('node:test');
const { describe } = require('yargs')
const shiftArray = require('./shifter')

  // {2, n, 2, n} => {4, n, n, n}
  // {2, n, n, 2} => {4, n, n, n}

  // {2, 2, 2, n} => {4, 2, n, n}
  // {4, 2, 2, n} => {4, 4, n, n}
  // {2, 2, 4, n} => {4, 4, n, n}

  // {2, 2, 2, 2} => {4, 4, n, n}
  // {2, 2, 4, 2} => {4, 4, 2, n}
  // {2, 4, 2, 2} => {2, 4, 4, n}
describe ('shiftArray', ()=>{

  beforeEach(()=>{})
  test("{2, n, 2, n} => {4, n, n, n} ", ()=> {
    arr = [2, null, 2, null];
    shiftArray(arr);
    expect(arr).toBe([4, null, null, null]);
  });
});