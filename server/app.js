var express = require ('express');
app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var routes = require('./routes/index');

app.use('/css', express.static(path.join(__dirname, '../client/css')));
app.use('/js', express.static(path.join(__dirname, '../client/js')));
app.use('/partials', express.static(path.join(__dirname, '../client/js/angular/app/partials')));
app.use(express.static(path.join(__dirname, '/public'))); // for images
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.use(routes.router);
app.use('/api/users', routes.users);
app.use('/api/foods', routes.foods);
app.use('/api/journals/:journal_id/meals', routes.meals);
app.use('/api/journals/:journal_id/days', routes.days);
app.use('/api/journals/:journal_id/inspirations', routes.inspirations);

// send to angular
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('server online on port ' + PORT);
});