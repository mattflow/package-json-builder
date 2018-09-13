const express = require('express');
const child_process = require('child_process');
const path = require('path');
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const app = express();

const port = process.env.PORT || 8080;
const clientPath = path.join(__dirname, 'client/build');

app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.get('/npm/search/:name', (req, res) => {
  child_process.exec(`npm search --json --parsable ${req.params.name}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }

      res.json(JSON.parse(stdout));
    }
  );
});

if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

