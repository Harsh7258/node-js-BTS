const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");

//All authors route
router.route('/').get( authorController.getAllAuhtors).post(authorController.createAuthor);
// new authors route
router.get('/new', authorController.getNewAuthor);

router.get('/:id/edit', authorController.editAuthor);

router.route('/:id').get(authorController.showBooksByAuthor).put(authorController.updateAuthor).delete(authorController.deleteAuthor)

module.exports = router;