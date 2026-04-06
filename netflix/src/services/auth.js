import axios from "axios";
import { API_END_POINT } from "../utils/constant";

export const loginUser = (email, password, config = {}) => {
  return axios.post(`${API_END_POINT}/login`, { email, password }, config);
};

export const registerUser = (fullName, email, password, config = {}) => {
  return axios.post(`${API_END_POINT}/register`, { fullName, email, password }, config);
};
