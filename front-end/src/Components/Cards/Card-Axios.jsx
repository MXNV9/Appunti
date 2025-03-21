import axios from 'axios';
import { mutate } from 'swr';
import { useState } from 'react';
import { Editbtn } from '../Buttons-icon/editable-btn';
import { Plain } from '../Buttons-no-icon/plain';
import { DollarSign } from 'lucide-react';

export const CardAxios = ({
  id, // Aggiungi un identificatore unico per la card
  role = 'admin',
  titolo = 'Titolo',
  autore,
  categoria = 'Categoria',
  descrizioneLunga,
  data,
  prezzo,
}) => {
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(titolo);
  const [editedCategory, setEditedCategory] = useState(categoria);
  const [descrizioneNew, setDescrizioneLunga] = useState(descrizioneLunga);
  const [prezzoNew, SetPrezzo] = useState(prezzo);
  const [message, setMessage] = useState({ text: '', type: '' }); // Stato per messaggi

  const roles = {
    admin: 'admin',
    user: 'user',
  };

  const roleCheck = roles[role];
  if (!roleCheck) {
    return <p className="font-bold text-red-600">Ruolo non contemplato!</p>;
  }

  const handleEditToggle = async url => {
    if (edit) {
      // Effettuare la chiamata PUT per aggiornare la card
      const updatedCard = {
        titolo: editedTitle,
        categoria: editedCategory,
        descrizioneLunga: descrizioneNew,
        autore: autore,
        prezzo: prezzoNew,
      };
      try {
        await mutate(
          url,
          async () => {
            const response = await axios.put(url, updatedCard);
            return response.data;
          },
          { revalid: true }
        );
        setMessage({ text: 'Annuncio aggiornato con successo!', type: 'success' }); // Messaggio di successo
      } catch (error) {
        setMessage({
          text: 'Errore durante l’invio dell’annuncio. Riprova più tardi. ',
          type: 'error',
        }); // Messaggio di errore
      }
    }
  };

  const handleDelete = async (url, id) => {
    try {
      // Aggiornamento ottimistico: rimuove l'elemento localmente
      mutate(
        'http://localhost:8080/allProfiles',
        data => data.filter(item => item.id !== id),
        false
      );

      // Effettua la richiesta DELETE
      await axios.delete(`${url}${id}`);

      // Rifetch dei dati per sincronizzare con il server
      mutate('http://localhost:8080/allProfiles');
    } catch (error) {
      console.error('Errore durante la cancellazione:', error);
      setMessage({ text: 'Errore durante l’eliminazione. Riprova più tardi.', type: 'error' });
    }
  };

  const renderInfo = info => {
    return info ? info.length > 100 ? <p>{info.slice(0, 100)}...</p> : <p>{info}</p> : null;
  };

  const containerClass = 'container'; // Solo variante light
  const titoloClass = 'titolo'; // Solo variante light
  const infoClass = 'info-secondarie'; // Solo variante light

  return (
    <div>
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}
      <div className={containerClass}>
        {/* Messaggio dinamico */}
        <div className="category">
          {edit ? (
            <input
              type="text"
              value={editedCategory}
              onChange={e => setEditedCategory(e.currentTarget.value)}
            />
          ) : (
            editedCategory
          )}
        </div>
        <div className="content">
          <div className={titoloClass}>
            {edit ? (
              <input
                type="text"
                value={editedTitle}
                onChange={e => setEditedTitle(e.currentTarget.value)}
              />
            ) : (
              editedTitle
            )}
          </div>

          <div className={infoClass}>
            {edit ? (
              <div>
                <textarea
                  className="h-[140px] w-full"
                  value={descrizioneNew}
                  onChange={e => setDescrizioneLunga(e.currentTarget.value)}
                ></textarea>
              </div>
            ) : (
              renderInfo(descrizioneNew)
            )}
          </div>

          <div>
            {edit ? (
              <div className="w-[200px]">
                <input
                  type="number"
                  value={prezzoNew}
                  className="w-fit rounded-xl border-none bg-white px-4 py-2 outline-none"
                  onChange={e => SetPrezzo(e.currentTarget.value)}
                />
              </div>
            ) : (
              <div className="flex w-fit items-center rounded-xl border bg-white p-2 px-4">
                <DollarSign /> {prezzoNew}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-[24px]">
            <div>
              <Plain testo="Scopri di più" />
            </div>
            {role === 'admin' && (
              <div className="flex gap-[24px]">
                <div
                  onClick={() => {
                    setEdit(true);
                    handleEditToggle('http://localhost:8080/editContent/' + id);
                  }}
                >
                  <Editbtn icona={edit ? 'Check' : 'Edit'} />
                </div>
                <div
                  onClick={() => {
                    if (!edit) {
                      handleDelete('http://localhost:8080/deleteItem/', id);
                      mutate('http://localhost:8080/allProfiles');
                    } else {
                      setEdit(false);
                    }
                  }}
                >
                  <Editbtn icona={edit ? 'X' : 'Trash'} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
