const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();


// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
//mongodb+srv://st124438:<password>@cluster0.wwgr6yd.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://st124438:<password>@cluster0.wwgr6yd.mongodb.net/?retryWrites=true&w=majority
const dbURI = 'mongodb+srv://st124438:Japan01@cluster0.wwgr6yd.mongodb.net/nodeauth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(cookieParser())

// routes
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));