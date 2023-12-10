const Router = require("express");
const { body, validationResult } = require("express-validator");
const bookController = require("../controllers/book.controller");
const bookRouter = Router();

const validateAddBookFields = [
  body("author").notEmpty().withMessage("Author is required"),
  body("title").notEmpty().withMessage("Title is required"),
  // Add more validation rules as needed for other fields
];

bookRouter.get("/", bookController.getBooks);
bookRouter.post(
  "/",
  validateAddBookFields,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passed, proceed to the addBook controller method
    next();
  },
  bookController.addBook
);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
