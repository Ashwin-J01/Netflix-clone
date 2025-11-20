import axios from "axios";
import { API_END_POINT } from "../utils/constant";

// loginUser accepts an optional axios config as third parameter so callers
// can pass headers, withCredentials, etc.
export const loginUser = (email, password, config = {}) => {
  // Backend exposes POST /login under the /user route
  return axios.post(`${API_END_POINT}/login`, { email, password }, config);
};

// registerUser helper
export const registerUser = (fullName, email, password, config = {}) => {
  return axios.post(`${API_END_POINT}/register`, { fullName, email, password }, config);
};
