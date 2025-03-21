import axios from 'axios';
import useSWR from 'swr';
import { CardAxios } from '../Components/Cards/Card-Axios';
export const GetPage = () => {
  const getAll = url => axios.get(url).then(res => res.data);
  const { data, error, isLoading } = useSWR('http://localhost:8080/allProfiles', getAll);

  // console.log('dati: ', data);
  // console.log('errori: ', error);
  // console.log('Caricamento: ', isLoading);

  const fixData = string => {
    const step1 = string.split('T');
    const step2 = step1[0].split('-');
    const result = `${step2[2]}/${step2[1]}/${step2[0]}`;
    return result;
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <h1>Lista degli oggetti</h1>
      {isLoading && <div> Caricamento... </div>}
      {error && error.code + ' - ' + error.message}
      <div className="flex flex-wrap gap-[16px]">
        {data?.map(i => (
          <div key={i.id}>
            {' '}
            {/* Usare i.id come chiave */}
            <CardAxios
              role="admin"
              id={i.id}
              titolo={`${i.titolo}`}
              categoria={i.categoria}
              descrizioneLunga={i.descrizioneLunga}
              data={i.dataInserimento}
              autore={i.autore}
              prezzo={i.prezzo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
