import { useState } from 'react';
import axios from 'axios'; // Importa Axios
import { Editbtn } from '../Buttons-icon/editable-btn';
import { Plain } from '../Buttons-no-icon/plain';

export const CardAxios = ({
  id, // Aggiungi un identificatore unico per la card
  role = 'admin',
  titolo = 'Titolo',
  categoria = 'Categoria',
  infoSecondarie = [
    {
      Info1: 'Descrizione lunga',
      Info2: '22-01-2025',
      Info3: 'Descrizione Corta' || '',
    },
  ],
}) => {
  const [edit, setEdit] = useState(false);
  const [editedCategory, setEditedCategory] = useState(categoria);
  const [editedTitle, setEditedTitle] = useState(titolo);
  const [editedInfo1, setEditedInfo1] = useState(infoSecondarie[0].Info1);
  const [editedInfo3, setEditedInfo3] = useState(infoSecondarie[0].Info3);
  const [del, setDelete] = useState(false);

  const roles = {
    admin: 'admin',
    user: 'user',
  };

  const roleCheck = roles[role];
  if (!roleCheck) {
    return <p className="font-bold text-red-600">Ruolo non contemplato!</p>;
  }

  const handleEditToggle = async () => {
    if (edit) {
      // Effettuare la chiamata PUT per aggiornare la card
      const updatedCard = {
        titolo: editedTitle,
        categoria: editedCategory,
        infoSecondarie: [{ Info1: editedInfo1, Info3: editedInfo3 }],
      };
      try {
        const response = await axios.put(`/api/put/${id}`, updatedCard);
        if (response.status === 200) {
          console.log('Card aggiornata con successo');
        } else {
          console.log("Errore nell'aggiornamento della card");
        }
      } catch (error) {
        console.error('Errore nella richiesta PUT:', error);
      }
    }
    setEdit(!edit);
  };

  const handleDelete = async () => {
    // Effettuare la chiamata DELETE per eliminare la card
    try {
      const response = await axios.delete(`/api/delete/${id}`);
      if (response.status === 200) {
        console.log('Card eliminata con successo');
        setDelete(true); // Nasconde la card dopo l'eliminazione
      } else {
        console.log("Errore nell'eliminazione della card");
      }
    } catch (error) {
      console.error('Errore nella richiesta DELETE:', error);
    }
  };

  const renderInfo = info => {
    return info ? info.length > 100 ? <p>{info.slice(0, 100)}...</p> : <p>{info}</p> : null;
  };

  const containerClass = 'container'; // Solo variante light
  const titoloClass = 'titolo'; // Solo variante light
  const infoClass = 'info-secondarie'; // Solo variante light

  if (del) {
    // Se la card è stata eliminata (del è true), non la mostriamo più
    return null;
  }

  return (
    <div className={containerClass}>
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
          {infoSecondarie.map((i, k) => (
            <div key={k} className="info-secondarie-content">
              {edit ? (
                <div className="mb-[12px] w-full">
                  <textarea
                    className="h-[150px] w-full rounded-xl px-1 pb-4"
                    value={editedInfo1}
                    onChange={e => setEditedInfo1(e.currentTarget.value)}
                  />
                  <div>
                    <input
                      type="text"
                      value={editedInfo3}
                      onChange={e => setEditedInfo3(e.currentTarget.value)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {renderInfo(editedInfo1)}
                  {renderInfo(editedInfo3)}
                  <p className="data">{i.Info2}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-[24px]">
          <div>
            <Plain testo="Scopri di più" />
          </div>
          {role === 'admin' && (
            <div className="flex gap-[24px]">
              <div onClick={handleEditToggle}>
                <Editbtn icona={edit ? 'Check' : 'Edit'} />
              </div>
              <div onClick={handleDelete}>
                <Editbtn icona="Trash" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
