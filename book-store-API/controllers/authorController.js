const Author = require("../models/author.model");
const Book = require("../models/book.model");

const getAllAuhtors = async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null &&  req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render("authors/index", {
            authors: authors,
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
};

const getNewAuthor = (req, res) => {
    res.render("authors/new", { author: new Author() });
}

const createAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect(`authors/${newAuthor.id}`)
        // console.log('new author', newAuthor)
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author.'
        })
    }
}

const editAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.render('authors/edit', { author: author })
    } catch (error) {
        res.redirect('/authors')
    }
}

const updateAuthor = async (req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.redirect(`/authors/${author.id}`)
    } catch (error) {
        if(author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author.'
            })
        }
    }
}

const deleteAuthor = async (req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        await author.deleteOne();
        // console.log(author.deleteOne())
        res.redirect(`/authors`)
    } catch (error) {
        if(author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
}

const showBooksByAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(4).exec()

        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = { 
    getAllAuhtors, 
    getNewAuthor, 
    createAuthor, 
    editAuthor, 
    updateAuthor, 
    deleteAuthor,
    showBooksByAuthor 
}