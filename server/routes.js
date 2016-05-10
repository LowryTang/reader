var express = require('express');
var router = express.Router();
var controller = require('./controllers/controller.js') ;

/* GET home page. */

router.get('/books/search', controller.searchBooks);
router.get('/books/author', controller.searchBooksByAuthor);
router.get('/books/tag', controller.searchBooksByTag);

router.get('/books/:id', controller.getBookDetail);
router.get('/books/:id/resources', controller.getBookResources);
router.get('/resources/:id', controller.getChaptersByResouceId);
router.get('/chapters/:url', controller.getChapterContent);

router.get('/ranks', controller.getRankCategory);
router.get('/ranks/:id', controller.getRankList);

router.get('/categories', controller.getCategories);
router.get('/categories/:name', controller.getBooksByCategory);






module.exports = router;
