const fs = require('fs')
const express = require('express');
const app = express();
const $path = require('path')
const dataPath = $path.resolve('./data')
const port = process.env.PORT || 5000;

app.get('/api/scores', (req, res) => {
  const scoresFile = $path.join(dataPath, 'scores.json');
  const score = fs.readFileSync(scoresFile);
  const jsonScores = JSON.parse(score)
  res.type('json').send(jsonScores)
});

app.post('/guess', express.json(), (req, res) => {
  const scoresFile =  $path.join(dataPath, 'scores.json')
  fs.writeFileSync(scoresFile, JSON.stringify(req))
}) 

app.listen(port, (req, res) => {
  console.log(`app is listening on port: ${port}`)
})
