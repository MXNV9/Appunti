import axios from 'axios';
import { mutate } from 'swr';
import { Formik } from 'formik';
import { Select } from '../Components/Select/select';
import { useState } from 'react';
import { DollarSignIcon } from 'lucide-react';

export const InsertPage = () => {
  // url => "http://localhost:8080/newPost"
  const [message, setMessage] = useState({ text: '', type: '' }); // Stato per messaggi

  const handlePost = async (url, dati) => {
    try {
      await mutate(
        url,
        async () => {
          const response = await axios.post(url, dati);
          return response.data;
        },
        { revalidate: true }
      );
      setMessage({ text: 'Annuncio inviato con successo!', type: 'success' }); // Messaggio di successo
    } catch (error) {
      console.log(error);
      setMessage({
        text: 'Errore durante l’invio dell’annuncio. Riprova più tardi. ' + error,
        type: 'error',
      }); // Messaggio di errore
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          titolo: 'AA',
          prezzo: 100.0,
          categoria: 'Nespole',
          autore: 'Mario Rossi',
          descrizioneLunga: 'Mario rossi',
        }}
        validate={values => {
          const errors = {};
          if (!values.titolo) {
            errors.titolo = 'Required';
          }
          if (values.prezzo < 0 || values.prezzo === 0 || values.prezzo > 1000000) {
            errors.prezzo = 'Price is not valid';
          }
          if (!values.categoria) {
            errors.categoria = 'Category is required';
          }
          if (!values.autore) {
            errors.autore = 'Required';
          }
          if (!values.descrizioneLunga) {
            errors.descrizione = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handlePost('http://localhost:8080/newPost', values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          /* and other goodies */
        }) => (
          <div>
            <h2>Inserisci un annuncio</h2>
            <h3>Compila i seguenti campi</h3>

            {/* Messaggio dinamico */}
            {message.text && (
              <div
                className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] p-4">
              <div className="form-field">
                <label htmlFor="titolo"> Titolo </label>
                <input
                  type="text"
                  id="titolo"
                  name="titolo"
                  className="rounded-xl p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.titolo}
                />
                <p>Inserisci titolo dell'annuncio</p>
                {errors.titolo && touched.titolo && errors.titolo}
              </div>

              <div className="form-field">
                <label htmlFor="prezzo"> Prezzo</label>
                <div className="flex items-center rounded-xl border p-2">
                  <DollarSignIcon />
                  <input
                    className="w-full border-none outline-none"
                    min={0}
                    type="number"
                    name="prezzo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prezzo}
                  />
                </div>
                <p>Inserisci il prezzo dell'annuncio</p>
                {errors.prezzo}
              </div>

              <div className="form-field">
                <label htmlFor="Categoria"> Cartegoria </label>
                <div id="Categoria">
                  <Select
                    data={[
                      { value: 'a', label: 'aaaa' },
                      { value: 'b', label: 'bbbb' },
                    ]}
                    value={values.categoria}
                    onChange={option => {
                      setFieldValue('categoria', option ? option.value : '');
                    }}
                  />
                </div>
                <p>Seleziona la categoria dell'annuncio</p>
                {errors.categoria}
              </div>

              <div className="form-field">
                <label htmlFor="desc"> Descrizione</label>
                <textarea
                  className="rounded-xl border p-2"
                  name="descrizioneLunga"
                  id="desc"
                  onChange={handleChange}
                  placeholder="Scrivi qua..."
                />
                <p>Inserisci una descrizione dell'annuncio</p>
                {errors.descrizioneLunga}
              </div>

              <div className="form-field">
                <label htmlFor="author"> Autore </label>
                <input
                  type="text"
                  name="autore"
                  id="author"
                  value={'Mario Neri'}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field text-center">
                <button type="submit" disabled={isSubmitting} onClick={() => console.log('qua')}>
                  {isSubmitting ? 'Attendi...' : ' Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
