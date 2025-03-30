import axios from "axios";

export const PostFunction = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const LoginFuncion = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log(response)
    return response.data;
  } catch (error) {
    return error.response?.data || {msg: "Errore sconosciuto!"};
  }
};

export function jwtDecode(t) {
  let token = {};
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token;
}

