const express = require("express");
const router = express.Router();
const fs = require("fs")

const Book = require("../models/book.model");
const Author = require("../models/author.model");
const multer = require("multer");
const path = require("path");

const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
});

//All authors route
router.get("/", async (req, res) => {

    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
        const books = await query.exec()
        res.render("books/index", {
            books: books,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
})
router.post("/", upload.single('cover'), async (req, res) => {
    // console.log('book body',req.body)
    // console.log('file',req.file)

    const fileName = req.file != null ? req.file.filename : null;

    const book = new Book({
        title: req.body.title,
        author: req.body.auhtor,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })
    try {
        const newBook = await book.save();
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch (error) {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true)
    }
})
// new authors route
router.get("/new", async (req, res) => {
    renderNewPage(res, new Book());
});

function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if(err) console.error(err)
    })
}

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error on creating Book';

        res.render("books/new", params);
    } catch (error) {
        res.redirect("/books")
    }
}

module.exports = router;