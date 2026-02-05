const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const emproutes = require('./routes/employeeRoutes');
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use('/', emproutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
