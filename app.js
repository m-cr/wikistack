var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
swig.setDefaults({ cache:false });

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next){
	res.render('index', {});
});

app.listen(process.env.PORT, function(){
	console.log('listening on port ' + process.env.PORT);
});