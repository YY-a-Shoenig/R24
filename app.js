var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const comparisons = require('./comparisons.js');
var session = require('express-session');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: null,           
    expires: null,          
}
}));



app.route('/')
.all(function (req,res,next){
  res.render('index',{title: 'MGM Assets!'});
  
});





app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
