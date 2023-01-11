import axios from "axios";

export const api = axios.create({
  baseURL: "https://hotel4u.onrender.com"
});