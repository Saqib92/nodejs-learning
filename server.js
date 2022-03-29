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
let io = require('socket.io')();
const Chat = require('./src/model/Chat');

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
app.use('/user', require('./src/routes/api/users'));
app.use('/chats', require('./src/routes/api/chat'));
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
  const serverInstance = app.listen(PORT, () => {
    console.log(`Server Running at port: ${PORT}`);
  })
  io.attach(serverInstance, {
    cors: {
      origin: '*',
    }
  });
})


io.on('connection', (socket) => {

  socket.on('message', async (message) => {
    try {
      const result = await Chat.create({
        senderId: message.senderId,
        receiverId: message.receiverId,
        message: message.message,
        isFile: message.isFile,
        roomId: message.roomId
      })
      io.emit('message', { data: result });
    } catch (err) {
      console.error(err)
    }
  });


});