interface ExcerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string; // 'not too bad but could be better',
  target: number;
  average: number; 
}

interface MultipleValues {
  target:number;
  hours:Array<number>;
}

const parseArguments = (args:string[]) : MultipleValues => {
  let target:number = 0;
  const hours:Array<number> = [];
  for(let n, i = 2; i<args.length; i++) {
    if (isNaN(n = Number(args[i]))) {
      throw new Error('Provided argument is not number');
    }
    else if (i == 2) {
      target = n; 
    }
    else {
      hours.push(n);
    }
  }
  return {target, hours};
};
/*
[3, 0, 2, 4.5, 0, 3, 1]
periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
  */
const calculateExercises = (tgt:number, hours:Array<number>) : ExcerciseSummary => {
  const agv:number = hours.reduce((acc, x) => acc + x, 0)/hours.length;
  const rate = ((avgHour: number) : number => {
    const gap :number = avgHour - tgt;
    let result: number = 0;
    if (-0.2 <gap && gap<0 ) {
      result = 2;
    }
    else if (gap <= -0.2) {
      result = 3;
    }
    else if (gap>=0) {
      result = 1;
    }
    return result;
  })( agv );

  const rateDesc:Array<string> = [
    "good",
    "not bad",
    "come on"
  ]; 

  return {
    periodLength: hours.length, 
    trainingDays: hours.filter(x => x!==0).length,
    success: agv>=tgt,
    rating:rate,
    ratingDescription: rateDesc[rate-1],
    target:tgt,
    average: agv,
  };
};
try {
  const {target, hours} = parseArguments(process.argv);
  // console.log( calculateExercises (2, [3, 0, 2, 4.5, 0, 3, 1]));
  const result : ExcerciseSummary = calculateExercises(target, hours);
  console.log(result);
}
catch(error: unknown) {
  let errorMessage = 'Something bad happened ';
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}