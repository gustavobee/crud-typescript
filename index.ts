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

// GET
app.get("/books", async (req, res) => {
  try {
    const books = await selectBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

// GET ONE
app.get("/books/:id", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livro" });
  }
});

// POST
app.post("/books", async (req, res) => {
  try {
    const newBook = await insertBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir livro" });
  }
});

// PUT
app.put("/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await updateBook(id, req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await deleteBook(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar livro" });
  }
});

app.listen(3000, () => {
  console.log("Servidor ligado");
});
