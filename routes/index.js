const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  // can fire other funtions that are fired in the order they're written
  const name = req.cookies.username;
  // es6 shorhand name: name -> name
  if (name){
    res.render('index',  { name });
  } else{
    return res.redirect('/hello')
  }
});


router.get('/hello', (req, res)=>{
    const name = req.cookies.username;
  if (name){
    res.redirect("/");
  } else{
    res.render('hello')
  }
});

router.post('/goodbye', (req, res) =>{
  res.clearCookie('username');
  res.redirect('/hello');
});


router.post('/hello', (req, res)=>{
  // console.dir(req.body);
  res.cookie('username', req.body.username);
  return res.redirect('/');
});



module.exports = router;
