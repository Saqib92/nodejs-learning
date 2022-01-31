const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');

const PORT = process.env.PORT || 3500;

//Built In middlewares 
app.use(cors(corsOptions)); // FOR Cors
app.use(express.urlencoded({ extended: false })); //FOR Urlencoded form data
app.use(express.json()); //FOR JSON

//for static Images and Files
app.use(express.static(path.join(__dirname, './src/')));

//Routes
app.use('/', require('./src/routes/root')); // root stack router
app.use('/employees', require('./src/routes/api/employees'));


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

app.listen(PORT, () => {
  console.log(`Server Running at port: ${PORT}`);
})