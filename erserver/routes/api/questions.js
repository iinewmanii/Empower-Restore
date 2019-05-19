const express = require('express');
const router = new express.Router();

const Questions = require('../../models/Questions.js');

// Add resources to the DB
router.post('/', (req, res) => {
  const question = new Questions({
    tag: req.body.tag,
    question: req.body.question,
  });
  question.save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
});

// Get a question
router.get('/:tag', (req, res) => {
  Questions.findOne({tag: req.params.tag})
    .exec()
    .then((docs) => {
      res.status(200).json({ok: true, data: docs});
    })
    .catch((err) => console.error(err));
});

module.exports = router;
