const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 8080;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Middleware per parsare in JSON le richieste
app.use(express.json());

// Middleware per parsare le richieste GET
app.use(express.urlencoded({ extended: true }));

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(token) {
  return jwt.sign(token, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    //console.log(err);
    if (err) return res.status(403).send("Utente non autorizzato!");
    req.user = user;
    next();
  });
}

// configuazione corss
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia con il dominio del tuo frontend se necessario
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// test se api funziona
app.get("/", (req, res) => {
  res.send("Sono attivo!");
});

// collegamento al db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dbProva",
  port: 3306,
});

// Test della connessione al database al momento dell'avvio
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err.message);
  } else {
    console.log("Connesso al database MySQL!");
  }
});

// Endpoint per il login
app.post("/login", (req, res) => {
  // Qui dovresti verificare username e password nel database
  const { username, password } = req.body;

  // Esempio: verifica nel database (da implementare con query reali)
  db.query(
    "SELECT * FROM utenti WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        return res.status(500).send("Errore del server");
      }

      if (results.length > 0) {
        // Utente trovato, genera token
        const user = { id: results[0].id, username: results[0].username };
        const token = generateAccessToken(user);

        res.json({ token });
      } else {
        // Utente non trovato
        res.status(401).send("Username o password non validi");
      }
    }
  );
});

// Esempio di endpoint protetto
app.get("/profile", authenticateToken, (req, res) => {
  // req.user contiene i dati dell'utente dal token
  res.json({ message: "Dati profilo", user: req.user });
});

app.get("/allProfiles", (req, res) => {
  // console.log("Qua");
  db.query("SELECT * FROM prova", (err, rows) => {
    if (err) {
      res.status(400);
    }
    res.status(200).json(rows);
  });
});

app.post("/newPost", (req, res) => {
  if (req.body) {
    const { titolo, prezzo, categoria, autore, descrizioneLunga } = req.body;

    if (!titolo || !prezzo || !categoria || !autore || !descrizioneLunga) {
      return res.status(400).send("Campi mancanti!");
    }

    const query =
      "INSERT INTO dbProva.prova(titolo, prezzo, categoria,autore,descrizioneLunga)VALUES(?,?,?,?,?)";
    db.query(
      query,
      [titolo, prezzo, categoria, autore, descrizioneLunga],
      (err, rows) => {
        if (!err) {
          return res.status(200).send("Elemento inviato con successo!");
        } else {
          return res
            .status(400)
            .send("Richiesta non valida. Verifica i dati inviati." + err);
        }
      }
    );
  } else {
    res.status(500).send("Qualcosa è andato storto");
  }
});

app.put("/editContent/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { titolo, prezzo, categoria, autore, descrizioneLunga } = req.body;

  if (!titolo || !prezzo || !categoria || !autore || !descrizioneLunga) {
    return res.status(400).send("Campi mancanti!");
  }

  if (prezzo < 0 || isNaN(prezzo)) {
    return res.status(400).send("Prezzo non valido!");
  }

  if (isNaN(id) || id <= 0) {
    return res.status(400).send("Id non valido!");
  }
  const query =
    "UPDATE dbProva.prova SET titolo = ?, prezzo = ?, categoria = ?, autore = ?, descrizioneLunga = ?, dataModifica = CURRENT_TIMESTAMP WHERE id = ? ";
  db.query(
    query,
    [titolo, prezzo, categoria, autore, descrizioneLunga, id],
    (err, rows) => {
      if (!err) {
        res.status(200).send({
          message: "Aggiornato con successo!",
          data: { titolo, prezzo, categoria, autore, descrizioneLunga },
        });
      } else {
        return res.status(500).send("Errore interno al server.");
      }
    }
  );
});

app.delete("/deleteItem/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).send("Id non valido!");
  }
  const query = "DELETE FROM dbProva.prova WHERE id = ?";
  db.query(query, [id], (err, rows) => {
    if (!err) {
      res.status(200).send({
        message: "Eliminato con successo!",
      });
    } else {
      return res.status(500).send("Errore interno al server.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto su ${port}`);
});
