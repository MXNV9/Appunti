import React, { useState } from 'react';

export const AutocompleteSearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Lista di dati (simulazione di un database o API)
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  // Gestione del cambiamento nella barra di ricerca
  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);

    // Filtra le opzioni basandosi sull'input
    if (value.length > 0) {
      const filteredSuggestions = items.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Nessun suggerimento se la query è vuota
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Barra di ricerca */}
      <input
        type="text"
        placeholder="Cerca..."
        value={query}
        onChange={handleChange}
        style={{
          padding: '10px',
          width: '300px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      {/* Suggerimenti dinamici */}
      {suggestions.length > 0 && (
        <ul
          style={{
            marginTop: '10px',
            padding: '0',
            listStyleType: 'none',
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxWidth: '300px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
              }}
              onClick={() => setQuery(item)} // Seleziona il suggerimento
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
