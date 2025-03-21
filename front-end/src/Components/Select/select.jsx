import CreatableSelect from 'react-select/creatable';

export const Select = ({ data, value, onChange }) => {
  return (
    <div className=''>
      <CreatableSelect
        isClearable
        options={data}
        onChange={onChange}
        value={data.find(option => option.value === value) || null}
        placeholder="Seleziona..."
      />
    </div>
  );
};
