type Operation = 'multiply'|'add'|'divide';
const calculator = (a: number, b: number, op: Operation) : number=>{
  switch(op) {
    case 'multiply':
      return a*b;
    case 'divide':
      if (b===0) throw new Error('can\'t divided by 0')
      return a/b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not defined');
  }
}
try {
  console.log(calculator(1, 5, 'divide'));
}
catch(error: unknown) {
  let errMsg = 'sth wrong';
  if (error instanceof Error) {
    errMsg += error.message;
  }
  console.log(errMsg);
}