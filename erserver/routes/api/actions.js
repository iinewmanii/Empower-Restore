const express = require('express');
const router = new express.Router();

const Actions = require('../../models/Actions.js');

// Get the actions
router.post('/', async (req, res) => {
  const actionsArr = req.body.actions;
  const actionsFindArr = [];
  for (let i = 0; i < actionsArr.length; i++) {
    const act = actionsArr[i];
    const fun = Actions.find({tag: `${act}`})
      .exec()
      .then((doc) => {
        console.log(doc);
        return doc;
      })
      .catch((err) => console.error(err));
    actionsFindArr.push(fun);
  }
  const prom = await Promise.all(actionsFindArr);
  res.status(200).json(prom);
});

module.exports = router;
