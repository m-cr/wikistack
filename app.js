var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
swig.setDefaults({ cache:false });
var models = require('./models')

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next){
	res.render('index', {});
});

models.User.sync({})
.then(function(){
	return models.Page.sync({})
}).then(function(){
	app.listen(process.env.PORT, function(){
		console.log('listening on port ' + process.env.PORT);
	});
})
.catch(console.error);

