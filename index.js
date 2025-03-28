const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Carica le variabili di ambiente

const app = express();
const port = process.env.PORT || 8888;

// Importa il router per gestire le API
const studentRoutes = require("./routes/students");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Cambia con il dominio del tuo frontend se necessario
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Usa il router delle API per gestire le richieste sui percorsi specifici
app.use("/api/students", studentRoutes);

// Avvio del server
app.listen(port, () => {
  console.log(`Server ascolta sulla porta ${port}`);
});
