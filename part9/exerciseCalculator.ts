interface ExcerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string; // 'not too bad but could be better',
  target: number;
  average: number; 
}
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
const calculateExercises = (hours:Array<number>, tgt:number) : ExcerciseSummary => {
  let agv:number = hours.reduce((acc, x) => acc + x, 0)/hours.length;
  let rate = ((avgHour: number) : number => {
    let gap :number = avgHour - tgt;
    let result: number;
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

  let rateDesc:Array<string> = [
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
} 
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))