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
  password: "root",
  database: "da mettere",
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

app.listen(port, () => {
  console.log(`Server in ascolto su ${port}`);
});
