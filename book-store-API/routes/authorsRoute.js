const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");

//All authors route
router.route('/').get( authorController.getAllAuhtors).post(authorController.createAuthor);
// new authors route
router.get('/new', authorController.getNewAuthor);

router.get('/:id/edit', authorController.editAuthor);

router.get('/:id', authorController.showBooksByAuthor)
router.put('/:id', authorController.updateAuthor)
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;