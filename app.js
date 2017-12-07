const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// set port deployment and localhost
const port = process.env.PORT || 3000;
const hostname = "127.0.0.1"

// functions are fired in the order you write them
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// this where your seet up static assets
// add a url for routing
// stylesheet in static/css/style.css
app.use('/static', express.static('public'));

// app.use((req, res, next)=>{
//   const err = new Error('Ooops!!!');
//   err.status = 500;
//   next(err);
// });


// const friends = [
//   "monica",
//   "derek",
//   "allie",
//   "john",
//   "wendy"
// ]
// app.get('/play', (req, res)=>{
//   res.render('play', { friends });
// });

// import routes
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
// end import routes


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next)=>{
  // sets the locals to be the error object
  res.locals.error = err;
  res.status(err.status)
  res.render('error');
});

app.listen(port, hostname, ()=>{
  console.log("serving on port 3000")
});
