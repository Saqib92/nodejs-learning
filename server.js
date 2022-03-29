require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const credentials = require('./src/middleware/credentials');
const corsOptions = require('./src/config/corsOptions');
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./src/config/dbConn');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3500;

//Connect to MONGODB

connectDB();

//Built In middlewares 

app.use(credentials);
app.use(fileUpload());

// FOR Cors
app.use(cors(corsOptions));

//FOR Urlencoded form data
app.use(express.urlencoded({ extended: false }));

//FOR JSON
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//for static Images and Files
app.use(express.static(path.join(__dirname, './src/')));

//Routes

// root stack router
app.use('/', require('./src/routes/root'));

app.use('/register', require('./src/routes/api/register'));
app.use('/auth', require('./src/routes/api/auth'));
app.use('/refresh', require('./src/routes/api/refresh'));
app.use('/logout', require('./src/routes/api/logout'));

// Protected Routes with JWT
app.use(verifyJWT);
app.use('/getUserDetail', require('./src/routes/api/users'));
app.use('/employees', require('./src/routes/api/employees'));
app.use('/imageUpload', require('./src/routes/api/imageUpload'));


app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'src/views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
})


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server Running at port: ${PORT}`);
  })
})