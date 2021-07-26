import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  return res.send('Olá NLW 6');
});

app.post('/test-post', (req, res) => {
  return res.send('NWL POST');
});

app.listen(3000, () => {
  console.log('Server is running NLW');
});
