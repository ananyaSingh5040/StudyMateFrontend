import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const getUserInfo = async (userId) => {
  const res = await axios.get(`${BASE_URL}/user/${userId}`);
  return res.data;
};


export const deleteUserAccount = async (userId) => {
  const res = await axios.delete(`${BASE_URL}/${userId}`);
  return res.data;
};

