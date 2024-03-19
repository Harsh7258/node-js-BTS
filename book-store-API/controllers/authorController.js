const Author = require("../models/author");

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
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect("authors");
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author.'
        })
    }

}

module.exports = { getAllAuhtors, getNewAuthor, createAuthor }