import axios from "axios";
import useSWR, { mutate } from "swr";

export const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get dei dati --> SWR + Axios -- no token
export const GetAll = ({ url }) => {
  const { data, error } = useSWR(url, fetcher);

  if (error) return <div> Errore {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  console.info("getAll", { data });
  // console.info(data);
  // da mettere la risposta
  return (
    data && (
      <div>Get all chiamata andata a buon fine! Numero {data.data.length} </div>
    )
  );
};

export const GetSingle = ({ url, id }) => {
  const { data, error } = useSWR(url + id, fetcher);

  if (error) return <div> Errore {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  console.info("getSingle ", { data });
  // console.info(data.data);

  // da mettere la risposta
  return data && <div> Get single chiamata andata a buon fine!</div>;
};

// post dei dati --> Axios

export const PostItem = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log(response.data);
    mutate("http://localhost:8888");
    return response.data;
  } catch (error) {
    console.error("Errore: ", error);
    throw error;
  }
};

// put dei dati --> Axios

export const EditItem = async (url, id, data) => {
  try {
    const response = await axios.put(url + id, data);
    console.log(response.data);
    mutate("http://localhost:8888");
    return response.data;
  } catch (error) {
    console.error("Errore" + error);
    throw error;
  }
};

// delete dei dati --> Axios
export const DeleteItem = async (url, id) => {
  try {
    const response = await axios.delete(url + id);
    console.log(response.data);
    mutate("http://localhost:8888");
    return response.data;
  } catch (error) {
    console.error("Errore" + error);
    throw error;
  }
};
