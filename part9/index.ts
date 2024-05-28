import express from 'express';
import { bmi_calculator } from './bmiCalculator';

const app = express();
app.use(express.json());
app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/hello', (_req, res) => {
  res.send('world');
});
app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  if (!height || !weight) {
    return res.status(400).send('height and weight both needed');
  }
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (isNaN(h) || isNaN(w)) {
    return res.status(400).send('height and weight should both number');
  }
  const bmi = bmi_calculator(h, w);
  return res.json(bmi);
});
/*
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
*/
app.post('/webExcercise', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  console.log(daily_exercises, target);

 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.json({daily_exercises, target});
});
const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`);
});