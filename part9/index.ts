import express from 'express';
import { bmi_calculator } from './bmiCalculator';

const app = express();
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
const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`);
});