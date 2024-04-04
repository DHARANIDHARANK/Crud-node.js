const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();
const Cookie= require('cookie-parser');
const { requireAuth } = require('./middleware/authmiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(Cookie());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000)).then(()=> {
    console.log('connected to the port 3000...')
    console.log("database connected...")
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

//coookies
// app.get('/set-cookies',(req,res)=>
// {
//   //res.setHeader('set-Cookies',"newUser=true");
// res.cookie('newUser', true, {maxAge: 1000* 60 *60 *24, httponly:true })

// });

// app.get('/read-cookies',(req,res)=>
// {
// const cookies = req.cookies;
// console.log(cookies.newUser);
// res.json(cookies)
// })