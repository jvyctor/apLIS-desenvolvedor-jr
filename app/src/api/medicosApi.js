import axios from "axios";

const medicosApi = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export default medicosApi;