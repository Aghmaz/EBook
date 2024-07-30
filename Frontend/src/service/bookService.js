import axios from "../config/Axios";

export const fetchAllBooks = () => {
  return axios.get("/api/books/");
};

export const createBook = async (userData) => {
  return await axios.post("/api/books/", userData);
};

export const updateBook = ({ id, userData }) => {
  return axios.put(`/api/books/${id}`, userData);
};

export const deleteBook = (id) => {
  return axios.delete(`/api/books/${id}`);
};
