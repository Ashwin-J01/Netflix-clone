import axios from "axios";
import { API_END_POINT } from "../utils/constant";

// loginUser accepts an optional axios config as third parameter so callers
// can pass headers, withCredentials, etc.
export const loginUser = (email, password, config = {}) => {
  return axios.post(`${API_END_POINT}/auth/login`, { email, password }, config);
};
