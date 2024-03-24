const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController")
// const fs = require("fs")

// const multer = require("multer");
// const path = require("path");

// const uploadPath = path.join('public', Book.coverImageBasePath);

// const upload = multer({
//     dest: uploadPath,
//     fileFilter: (req, file, cb) => {
//         cb(null, imageMimeTypes.includes(file.mimetype))
//     }
// });

//All authors route
router.get("/", bookController.getAllBooks)
router.post("/", bookController.createBook)

// new authors route
router.get("/new", bookController.getNewAuthorBook);

// Get book by id
router.get('/:id', bookController.getBookById)

// Get update book
router.get("/:id/edit", bookController.getUpdateBook);

// Update Book Route
router.put('/:id', bookController.updateBook)

// delete book
router.delete('/:id', bookController.deleteBook)

// function removeBookCover(fileName) {
//     fs.unlink(path.join(uploadPath, fileName), err => {
//         if(err) console.error(err)
//     })
// }



module.exports = router;