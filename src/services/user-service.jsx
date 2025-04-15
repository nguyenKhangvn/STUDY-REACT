// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:30000/users";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: { username, password },
    });
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi gọi API.");
  }
};

export const registerUser = async (username, password, role) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi gọi API.");
  }
};
