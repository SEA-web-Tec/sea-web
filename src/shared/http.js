import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
