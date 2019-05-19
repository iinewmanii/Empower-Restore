const express = require('express');
const router = new express.Router();

const Questions = require('../../models/Questions.js');

// Get the first question
router.get('/', (req, res) => {
  Questions.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => console.error(err));
});

router.post('/', (req, res) => {
  const question = new Questions({
    tag: req.body.tag,
    question: req.body.question,
  });
  question.save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
});

// Get the next question
router.get('/:tag', (req, res) => {
  Questions.find({tag: req.params.tag})
    .exec()
    .then((docs) => {
      res.status(200).json({ok: true, data: docs});
    })
    .catch((err) => console.error(err));
});

module.exports = router;
