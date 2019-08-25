const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const questions = require('./routes/api/questions');
const familyTrack = require('./routes/api/familyTrack');
const actions = require('./routes/api/actions');


const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use('/api/questions', questions);
app.use('/api/familyTrack', familyTrack);
app.use('/api/actions', actions);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
