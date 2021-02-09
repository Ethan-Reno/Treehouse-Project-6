const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {projects} = require('./data.json');

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    res.render('about')
});

// Project routes
app.get("/project/:id", function(req, res, next) {
    const {id} = req.params;
    const project = projects[id];
    if(id < projects.length && id >= 0) {
      return res.render('project',{project});
    } else {
      let err = new Error("This project page doesn't exist");
      res.render('error');
      next(err);
    }
});

// Error handler
app.use((req, res, next) => {
    const err = new Error('Not found')
    next(err);
  })
  // Print the error page
  app.use((err, req, res, next) => {
    res.locals.error = err;
    err.status = 404;
    // Error Page
    res.status(err.status);
    res.render('error');
  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});