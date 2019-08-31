const express = require('express');
const router = new express.Router();

const FamilyTrack = require('../../models/FamilyTrack.js');

// Add resources to the DB
router.post('/', (req, res) => {
  const familyTrack = new FamilyTrack({
    tag: req.body.tag,
    question: req.body.question,
  });
  familyTrack.save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
});

// Get a question
router.get('/:tag', (req, res) => {
  FamilyTrack.findOne({tag: req.params.tag})
    .exec()
    .then((docs) => {
      if (docs) {
        res.status(200).json({ok: true, data: docs});
      } else {
        res.json({ok: false, data: null});
      }
    })
    .catch((err) => console.error(err));
});

module.exports = router;
