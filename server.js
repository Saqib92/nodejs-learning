const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');


const PORT = process.env.PORT || 3500;

//Built In middlewares 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//for static Images and Files
app.use(express.static(path.join(__dirname, './src/')));
app.use('/subdir', express.static(path.join(__dirname, './src/'))); //For sub dir static files

//Routes
app.use('/', require('./src/routes/root')); // root stack router
app.use('/subdir', require('./src/routes/subdir')); //sub directory  router
app.use('/employees', require('./src/routes/api/employees'));


app.all('*', (req, res) => {
  res.status(404);
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'src/views', '404.html'));
  }else if(req.accepts('json')){
    res.json({error:'404 Not Found'});
  }else{
    res.type('txt').send('404 Not Found');
  }
})

app.listen(PORT, () => {
  console.log(`Server Running at port: ${PORT}`);
})