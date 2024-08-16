const flatArray = <T extends any> (array: T[]):T[] => {
  let result : T[] = [];
  array.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatArray(item));
    } else {
      result.push(item as T);
    }
  })
  return result;
}

export { flatArray };