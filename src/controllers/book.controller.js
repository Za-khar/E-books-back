const { getDB } = require("../services/db.service");
const ObjectId = require("mongodb").ObjectId;

class BookController {
  async getBooks(req, res) {
    try {
      const db = getDB();

      const books = await db.collection("books").find({}).toArray();

      res.status(200).send(books);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Get books error!" });
    }
  }

  async addBook(req, res) {
    try {
      const db = getDB();

      const book = req.body;

      const result = await db.collection("books").insertOne(book);

      res.status(201).send({ _id: result.insertedId, ...book });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Add book error!" });
    }
  }

  async updateBook(req, res) {
    try {
      const db = getDB();

      const id = req.params.id;
      const updatedBook = req.body;

      const result = await db
        .collection("books")
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedBook });

      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Update book error!" });
    }
  }

  async deleteBook(req, res) {
    try {
      const db = getDB();

      const id = req.params.id;

      const result = await db
        .collection("books")
        .deleteOne({ _id: new ObjectId(id) });

      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Delete book error!" });
    }
  }
}

module.exports = new BookController();
