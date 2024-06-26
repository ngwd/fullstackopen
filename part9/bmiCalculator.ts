/*
  Category	  BMI (kg/m2)[c]	BMI Prime[c]
  Underweight (Severe thinness)	< 16.0	< 0.64
  Underweight (Moderate thinness)	16.0 – 16.9	0.64 – 0.67
  Underweight (Mild thinness)	17.0 – 18.4	0.68 – 0.73
  Normal      range	18.5 – 24.9	0.74 – 0.99
  Overweight (Pre-obese)	25.0 – 29.9	1.00 – 1.19
  Obese (Class I)	30.0 – 34.9	1.20 – 1.39
  Obese (Class II)	35.0 – 39.9	1.40 – 1.59
  )	≥ 40.0
*/
interface BmiResult {
  height:number;
  weight:number;
  bmi: number;
  desc:string;
}
export const bmi_calculator = (height:number, weight:number) : BmiResult => {
  const bmi:number = (weight*10000)/(height*height);
  let bmi_desc:string;
  if (bmi < 16.0) {
    bmi_desc = "Underweight (Severe thinness)";
  }
  else if (bmi < 16.9) {
    bmi_desc = "Underweight (Moderate thinness)";
  }
  else if (bmi < 18.4) {
    bmi_desc = "Underweight (Mild thinness)";
  }
  else if (bmi < 24.9) {
    bmi_desc = "Normal";
  }
  else if (bmi < 29.9) {
    bmi_desc = "Overweight (Pre-obese)";
  }
  else if (bmi < 34.9) {
    bmi_desc = "Obese (Class I)";
  }
  else if (bmi < 39.9) {
    bmi_desc = "Obese (Class II)";
  }
  else {
    bmi_desc = "Obese (Class III)";
  }
  return {
    height:height,
    weight:weight,
    bmi:bmi,
    desc:bmi_desc,
  };
};

// console.log(bmi_calculator(180, 74))
// export { bmi_calculator };