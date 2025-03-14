import React from 'react';
import { Select } from '../Components/Select/select';
import { Forato } from '../Components/Buttons-no-icon/forato';

export const InsertPage = ({ optionData }) => {
  return (
    // parte di sx
    <div className="flex flex-col gap-[48px] p-4">
      <h2>Inserisci i dati</h2>
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="info1"> Informazione 1</label>
        <input
          type="text"
          placeholder="Informazione 1"
          id="info1"
          className="rounded-3xl px-4 py-2"
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="info2"> Informazione 2</label>
        <input
          type="number"
          placeholder="Informazione 2"
          id="info2"
          className="rounded-3xl px-4 py-2"
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="info3"> Informazione 3</label>
        <input
          type="text"
          placeholder="Informazione 3"
          id="info3"
          className="rounded-3xl px-4 py-2"
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="info4"> Informazione 4</label>
        <Select data={optionData} />
      </div>
      <div className="flex flex-col gap-[12px]">
        <label htmlFor="info5"> Informazione 5</label>
        <input
          type="text"
          placeholder="Informazione 5"
          id="info5"
          className="rounded-3xl px-4 py-2"
        />
      </div>
      <div className='text-center'>
        <Forato testo="Invia" />
      </div>
    </div>
  );
};
