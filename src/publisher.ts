import database from "../infra/database.js";

interface Publisher {
  id?: number;
  nome: string;
  pais: string;
}

export async function getPublishers() {
  try {
    const result = await database.query("SELECT * FROM publisher;");
    return result.rows;
  } catch (error) {
    console.log("Erro ao encontrar editoras: " + error);
    throw error;
  }
}

export async function getPublisher(id: number) {
  try {
    const query = {
      text: "SELECT * FROM publisher WHERE id = $1;",
      values: [id],
    };
    const result = await database.query(query);
    return result.rows[0] || null;
  } catch (error) {
    console.log("Erro ao encontrar editora: " + error);
    throw error;
  }
}

export async function insertPublisher(publisher: Publisher) {
  try {
    const query = {
      text: "INSERT INTO publisher (nome, pais) VALUES ($1, $2) RETURNING *",
      values: [publisher.nome, publisher.pais],
    };
    const result = await database.query(query);
    return result.rows[0];
  } catch (error) {
    console.log("Erro ao inserir editora: " + error);
    throw error;
  }
}

export async function updatePublisher(id: number, publisher: Publisher) {
  try {
    const query = {
      text: "UPDATE publisher SET nome=$1, pais=$2 where id=$3;",
      values: [publisher.nome, publisher.pais, id],
    };
    const result = await database.query(query);
    return result.rows[0];
  } catch (error) {
    console.log("Erro ao atualizar editora: " + error);
    throw error;
  }
}

export async function deletePublisher(id: number) {
  try {
    const query = {
      text: "DELETE FROM publisher WHERE id = $1;",
      values: [id],
    };
    await database.query(query);
  } catch (error) {
    console.log("Erro ao deletar editora: " + error);
    throw error;
  }
}
