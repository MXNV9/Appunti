const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Configura il database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test della connessione al database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err.message);
  } else {
    console.log("Connesso al database MySQL!");
  }
});

// Get tutti gli studenti
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM studente");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore interno del server");
  }
});

// Get studente per ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query("SELECT * FROM studente WHERE matricola = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).send("Studente non trovato");
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore interno del server");
  }
});

// Crea un nuovo studente
router.post("/", async (req, res) => {
  const { matricola, email, password, classe } = req.body;
  try {
    const query = "INSERT INTO studente(matricola, email, password, classe) VALUES(?, ?, ?, ?)";
    const [result] = await db.promise().query(query, [matricola, email, password, classe]);
    res.status(201).send("Studente aggiunto con successo");
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).send("Matricola già registrata");
    }
    res.status(500).send("Errore interno!");
  }
});

// Aggiorna uno studente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, classe } = req.body;
  try {
    const query = "UPDATE studente SET email = ?, classe = ? WHERE matricola = ?";
    const [result] = await db.promise().query(query, [email, classe, id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Studente non trovato");
    }
    res.status(200).json({ msg: "Studente aggiornato con successo", data: { email, classe } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore interno");
  }
});

// Elimina uno studente
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM studente WHERE matricola = ?";
    const [result] = await db.promise().query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Studente non trovato");
    }
    res.status(200).send("Studente eliminato con successo");
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore interno");
  }
});

module.exports = router;
