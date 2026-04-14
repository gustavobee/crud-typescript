import {
  selectBooks,
  selectBook,
  insertBook,
  updateBook,
  deleteBook,
} from "./books.js";
import express from "express";

const app = express();
app.use(express.json());

app.get("/books", async (req, res) => {
  const books = await selectBooks();
  res.status(200).json(books);
});

app.get("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "O ID precisa ser um número válido." });
  }

  const book = await selectBook(id);

  if (!book) {
    return res.status(404).json({ error: "Livro não encontrado." });
  }

  res.status(200).json(book);
});

app.post("/books", async (req, res) => {
  await insertBook(req.body);
  res.sendStatus(201);
});

app.put("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await updateBook(id, req.body);
  res.sendStatus(200);
});

app.delete("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await deleteBook(id);
  res.sendStatus(204);
});

app.listen(3000);
