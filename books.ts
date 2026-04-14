import database from "./infra/database.js";

interface Book {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: number;
}

export async function selectBooks() {
  try {
    const result = await database.query("SELECT * FROM books;");
    return result.rows;
  } catch (error) {
    console.error("Erro ao encontrar livros: " + error);
    throw error;
  }
}

export async function selectBook(id: number) {
  try {
    const query = {
      text: "SELECT * FROM books WHERE id = $1;",
      values: [id],
    };
    const result = await database.query(query);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao encontrar o livro: " + error);
    throw error;
  }
}

export async function insertBook(book: Book) {
  try {
    const query = {
      text: "INSERT INTO books (titulo, autor, isbn, ano_publicacao) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [book.titulo, book.autor, book.isbn, book.anoPublicacao],
    };
    const result = await database.query(query);
    return result.rows[0];
  } catch (error) {
    console.log("Erro ao inserir livros: " + error);
    throw error;
  }
}

export async function updateBook(id: number, book: Book) {
  try {
    const query = {
      text: "UPDATE books SET titulo=$1, autor=$2, isbn=$3, ano_publicacao=$4 where id=$5;",
      values: [book.titulo, book.autor, book.isbn, book.anoPublicacao, id],
    };
    const result = await database.query(query);
    return result.rows[0];
  } catch (error) {
    console.log("Erro ao atualizar livro: " + error);
    throw error;
  }
}

export async function deleteBook(id: number) {
  try {
    const query = {
      text: "DELETE FROM books WHERE id = $1;",
      values: [id],
    };
    await database.query(query);
  } catch (error) {
    console.log("Erro ao deletar livro: " + error);
    throw error;
  }
}
