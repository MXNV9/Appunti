// --------------- Configurazione --------------- //
// Import
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const port = 8888;

// Middleware per l'autenticazione del token
const authenticateToken = require("./middleware/auth.js");

// Configurazioe applicazione
const app = express();

// Configurazione db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mercatino",
  port: 3306,
});

// Verifica lo stato del database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err.message);
  } else {
    console.log("Connesso al database MySQL!");
  }
});

// Configurazione cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware per parsare in JSON le richieste
app.use(express.json());

// prende le variabili di ambiente (.env)
dotenv.config();

// accede alle variabili nel file .env
process.env.TOKEN_SECRET;

// Funzione per generare token
function generateAccessToken(token) {
  return jwt.sign(token, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

// limite di accesi possibili
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 15, //15 tentativi
  message: "Troppi tentativi di login! Riprova piu tardi.",
  handler: (req, res) => {
    res.status(429).json({
      msg: "Troppi tentativi di login! Riprova più tardi.",
      remaining: 0,
    });
  },
});

// --------------- Route --------------- //

// --------------- Registrazione --------------- //

app.post("/api/register", async (req, res) => {
  const { nome, cognome, email, password } = req.body;

  if (!nome || !cognome || !email || !password) {
    return res.status(400).send("Credenziali non valide!");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO utente(nome,cognome,email,password) VALUES(?,?,?,?)";
    db.query(query, [nome, cognome, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send("Email gia utilizzata!");
        }
        return res
          .status(500)
          .send("Errore interno al server, si prega di riprovare piu tardi!");
      }
      return res.status(200).send("Utente Agggiunto con successo!");
    });
  } catch (error) {
    return res.status(500).send("Errore nella registrazione!");
  }
});

app.post("/api/login", loginLimiter, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Email e password richiesti!");
  }

  const query =
    "SELECT email,nome,cognome,password FROM utente WHERE email = ? ";
  db.query(query, [email], async (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Errore interno al server!" });
    }

    if (rows.length === 0) {
      return res.status(401).json({
        msg: "Email o password errati!",
        remaining: req.rateLimit.remaining,
      });
    }

    const user = rows[0];
    // validazione della password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Email o password errati!",
        remaining: req.rateLimit.remaining,
      });
    }
    const token = generateAccessToken({
      id: user.id,
      email: user.email,
      nome: user.nome,
      cognome: user.cognome,
    });
    res.json({ token, msg: "Accesso effettuato!" });
  });
});

app.get("/provaToken", (res) => {
  const token = generateAccessToken({
    nome: "Mario",
    email: "sturnio00@gmail.com",
    nickname: "LelloBello1000",
  });
  res.json({ token });
});

app.get("/validazioneToken", authenticateToken, (req, res) => {
  res.json({ message: "Dati profilo", user: req.user });
});

app.listen(port, () => {
  console.log(`Server in ascolto su ${port}`);
});
