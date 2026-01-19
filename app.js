const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const emproutes = require('./routes/basicroutes');


app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', emproutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
