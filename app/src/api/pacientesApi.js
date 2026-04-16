import axios from "axios";

const pacientesApi = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

export default pacientesApi;