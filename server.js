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

app.get('^/$|/index(.html)?', (req, res) => { // regex to make .html opitional
  //res.sendFile('./src/views/index.html', { root: __dirname })
  res.sendFile(path.join(__dirname, 'src/views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html');
});

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
  console.log('attempted to load hello.html');
  next()
}, (req, res) => {
  res.send('Hello World');
});

const one = (req, res, next) => {
  console.log('one');
  next();
}

const two = (req, res, next) => {
  console.log('two');
  next();
}

const three = (req, res) => {
  console.log('Finished at three')
  res.send('Finished');
}

app.get('/chain(.html)?', [one, two, three]); // Chained Route

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