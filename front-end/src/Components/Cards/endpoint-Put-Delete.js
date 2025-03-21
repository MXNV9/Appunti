app.put('/api/updateContent/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send('Campi mancanti!');
  }

  const query = `
    UPDATE content 
    SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;

  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      console.error('Errore nel database:', err);
      return res.status(500).send('Errore interno del server.');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Elemento non trovato.');
    }

    res.status(200).send('Elemento aggiornato con successo.');
  });
});