const express = require('express');
const router = new express.Router();

const FamilyTrack = require('../../models/FamilyTrack.js');

// Add resources to the DB
router.post('/', (req, res) => {
  const question = new FamilyTrack({
    tag: req.body.tag,
    question: req.body.question,
  });
  question.save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
});

// Get a question
router.get('/:tag', (req, res) => {
  FamilyTrack.findOne({tag: req.params.tag})
    .exec()
    .then((docs) => {
      res.status(200).json({ok: true, data: docs});
    })
    .catch((err) => console.error(err));
});

module.exports = router;
