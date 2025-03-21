import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';

// Funzione per fare il fetch dei dati
const fetchContent = (url) => axios.get(url).then((res) => res.data);

export const GetContentPage = () => {
  // Utilizza SWR per il fetch e la gestione della cache
  const { data, error, isLoading } = useSWR('getContent', () =>
    fetchContent('http://localhost:8080/api/getcontent')
  );

  const handleUpdate = async (id, updatedContent) => {
    try {
      // Effettua la chiamata PUT per aggiornare i dati
      await axios.put(`http://localhost:8080/api/updateContent/${id}`, updatedContent);

      // Aggiorna i dati localmente nella cache (aggiornamento ottimistico)
      mutate(
        'getContent',
        (data) =>
          data.map((item) =>
            item.id === id ? { ...item, ...updatedContent } : item
          ),
        false
      );

      // Rifetcha i dati per sincronizzarli con il backend
      mutate('getContent');
    } catch (error) {
      console.error('Errore durante l’aggiornamento:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Effettua la chiamata DELETE
      await axios.delete(`http://localhost:8080/api/deleteContent/${id}`);

      // Aggiorna la cache invalidando i dati
      mutate('getContent', (data) => data.filter((item) => item.id !== id), false);
      mutate('getContent');
    } catch (error) {
      console.error('Errore durante la cancellazione:', error);
    }
  };

  if (isLoading) return <div>Caricamento in corso...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div>
      <h1>Lista dei Contenuti</h1>
      <div className="content-list">
        {data.map((item) => (
          <EditableContentCard
            key={item.id}
            {...item}
            onDelete={() => handleDelete(item.id)}
            onUpdate={(updatedContent) => handleUpdate(item.id, updatedContent)}
          />
        ))}
      </div>
    </div>
  );
};

const EditableContentCard = ({ id, title, description, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    const updatedContent = { title: editedTitle, description: editedDescription };
    onUpdate(updatedContent);
    setEditMode(false);
  };

  return (
    <div className="content-card">
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Salva</button>
          <button onClick={() => setEditMode(false)}>Annulla</button>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={() => setEditMode(true)}>Modifica</button>
          <button onClick={onDelete}>Elimina</button>
        </>
      )}
    </div>
  );
};