
// Central place for client-side constants.
// Read API base URL from environment variable `REACT_APP_API_URL`.
// Create React App requires env vars to be prefixed with REACT_APP_.
const API_END_POINT = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1";

export { API_END_POINT };

