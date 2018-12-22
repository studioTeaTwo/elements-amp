const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// config express sever
const app = express();

app.set('views', path.join(__dirname, './content'));
app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/amp', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  console.log('来たよ');
  res.render('amp');
});

app.listen(8080, () => console.log(`access http://localhost:8080`));
