// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3005/users";

export const loginUser = async (username, password) => {
  const response = await axios.get(API_URL, {
    params: { username, password },
  });
  return response.data;
};

export const registerUser = async (username, password, role) => {
  const response = await axios.post(API_URL, {
    username,
    password,
    role,
  });
  return response.data;
};
