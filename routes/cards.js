const express = require('express');
const router = express.Router();
const { data } = require('../data/flashCardData.json');
// same as data=require(...).data
const { cards } = data;
// ^ same as cards = data.cards

router.get('/', (req, res) =>{
  const randInt = Math.floor(Math.random() * cards.length);
  const path = `/cards/${randInt}?side=question`;
  res.redirect(path);
});

router.get('/:id', (req, res) =>{
  const params = req.params;
  const name = req.cookies.username;
  // same as const side = req.query.side
  const { side } = req.query;
  const { id } = params;
  // like saying cards[id].question or whatever value is for side
  const text = cards[id][side];
  const { hint } = cards[id];
  // same as templateData = text: text, hint: hint
  const templateData = { text, side, id, name };

  if (!side){
    res.redirect(`/cards/${id}?side=question`);
  }

  if (side === "question"){
    templateData.hint = hint;
    templateData.cardSide = "answer";
    templateData.cardSideDisplay = "Answer";
  } else{
    templateData.cardSide = "question";
    templateData.cardSideDisplay = "Question";
  }
  res.render('card', templateData);
});

// always export router
module.exports = router;
