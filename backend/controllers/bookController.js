
const Book = require("../models/Book")

// GET ALL BOOKS

const getBooks = async (req, res) => {
    try {
        const {status, tags} = req.query;

        const filter = {
            user : req.user.userId,
        };

        if(status) {
            filter.status = status
        }

        if(tags) {
            filter.tags = tags
        }

        const books = await Book.find(filter).sort({
            createdAt : -1,
        });

        res.json({
            books,
        });

    } catch (error) {
        res.status(500).json({
            message : error.message,
        });
    }
};

// GET SINGLE BOOK

const getBook = async (req, res) => {
    try {
        const book = await Book.findOne({
            id : req.params.id,
            user : req.user.userId,
        });

        if(!book) {
            return res.status(404).json({
                message : "Book not found"
            })
        }

        res.json({
            book,
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
};

// CREATE BOOK

const createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            tags,
            status,
        } = req.body;

        if(!title || !author) {
            return res.status(400).json({
                message : "Title and author are required",
            });
        }

        const book = await Book.create({
            title,
            author,
            tags : tags || [],
            status : status || "Want to Read",
            user : req.user.userId,
        });

        res.status(201).json({
            message : "Book created successfully",
            book,
        });
    } catch (error) {
        res.status(500).json({
            message : error.message,
        });
    }
};

// UPDATE BOOK

const updateBook = async (req, res) => {
    try {
        const {
            title,
            author,
            tags,
            status
        } = req.body
        
        const book = await Book.findOne({
            _id : req.params.id,
            user : req.user.userId
        });

        if(!book) {
            return res.status(404).json({
                message : "Book not found"
            });
        }

        book.title = title ?? book.title;
        book.author = author ?? book.author;
        book.tags = tags ?? book.tags;
        book.status = status ?? book.status;

        await book.save()

        res.json({
            message : "Book updated successfully",
            book,
        });
    } catch (error) {
        res.status(500).json({
            message : error.message,
        });
    }
};

// DELETE BOOK

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({
            _id : req.params.id,
            user : req.user.userId
        });

        if(!book) {
            return res.status(404).json({
                message : "Book not found",
            });
        }

        res.json({
            message : "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message,
        });
    }
};

// DASHBOARD STATS

const getStats = async (req, res) => {
    try {
        const userId = req.user.userId

        const total = await Book.countDocuments({
            user : userId,
        });

        const wantToRead = await Book.countDocuments({
            user : userId,
            status : "Want to Read",
        });

        const reading = await Book.countDocuments({
            user : userId,
            status : "Reading",
        });

        const completed = await Book.countDocuments({
            user : userId,
            status : "Completed"
        });

        res.json({
            total,
            wantToRead,
            reading,
            completed
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getStats,
};