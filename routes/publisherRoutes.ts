import { Router } from "express";
import {
  getPublishers,
  getPublisher,
  insertPublisher,
  updatePublisher,
  deletePublisher,
} from "../publisher.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await getPublishers();
    res.json(data);
  } catch (e) {
    res.status(500).send("Erro");
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "O ID precisa ser um número válido." });
    }

    const publisher = await getPublisher(id);

    if (!publisher) {
      return res.status(404).json({ error: "Editora não encontrada." });
    }

    res.status(200).json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar editora" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const newPublisher = await insertPublisher(req.body);
    res.status(201).json(newPublisher);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir editora" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await updatePublisher(id, req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar editora" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await deletePublisher(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar editora" });
  }
});

export default router;
