import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from '../Components/Cards/card';
export const GetPage = () => {
  const [data, setData] = useState([]);

  const loadProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/allProfiles');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fixData = string => {
    const step1 = string.split('T');
    const step2 = step1[0].split('-');
    const result = `${step2[2]}/${step2[1]}/${step2[0]}`
    return result
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  return (
    <div>
      {data.map((i, k) => (
        <div key={k}>
          <Card
            role="admin"
            titolo={`${i.titolo}`}
            categoria={i.categoria}
            infoSecondarie={[{ Info1: i.descrizioneLunga, Info2: fixData(i.dataInserimento) }]}
          />
        </div>
      ))}
    </div>
  );
};
