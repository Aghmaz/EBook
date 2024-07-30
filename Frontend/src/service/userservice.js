import axios from "../config/Axios";

export const createUser = async (userData) => {
  return await axios.post("/api/auth/signup", userData);
};

export const loginUser = ({ email, password }) => {
  return axios.post("/api/auth/login", { email, password });
};
