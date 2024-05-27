import express from 'express';
const app = express();
app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/hello', (_req, res) => {
  res.send('world');
})

const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`);
});