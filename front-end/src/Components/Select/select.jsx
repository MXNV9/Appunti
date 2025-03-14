import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export const Select = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = option => {
    setSelectedOption(option);
    console.log('Valore selezionato:', option.value);
  };
  return (
    <div>
      <CreatableSelect
        isClearable
        options={data}
        onChange={handleChange}
        value={selectedOption}
        placeholder="Seleziona..."
      />
    </div>
  );
};
