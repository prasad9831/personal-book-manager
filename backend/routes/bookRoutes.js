
const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getBooks,
    getBook,
    getStats,
    updateBook,
    deleteBook,
    createBook,
} = require("../controllers/bookController");


const router = express.Router();

router.use(protect);

router.get("/", getBooks);
router.get("/stats", getStats);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;