var router = require('express').Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
	res.redirect('/');
});

router.post('/', function(req, res, next){
	// res.json(req.body);
	var title = req.body.title;
	var content = req.body.content;
	var page = Page.build({
		title: title,
		content: content
	});
	page.save()
	.then(function(savedPage){
		res.redirect(savedPage.route);
	})
	.catch(next);
});

router.get('/add', function(req, res, next){
	res.render('addpage');
});

router.get('/:wikititle', function(req, res, next){
	Page.findOne({
 		where: {
 			urlTitle: req.params.wikititle
 		}
	})
	.then(function(foundPage){
		res.render('wikipage', {page: foundPage});
	})
	.catch(next);
});