const  { flatArray } = require('./arena');
describe ('flatArray', ()=>{
  test("[1, [2, [3]]] => [1, 2, 3]", ()=> {
    let arr =[1, [2, [3]]]; 
    let arr1 = [1, 2, 3]; 
    let arr2 = flatArray(arr);
    expect(arr1).toStrictEqual(arr2);
  });
})