const  { range, crossProduct } = require('./shifter');

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