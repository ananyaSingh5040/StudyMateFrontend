const BASE_URL = "http://localhost:5000/api/planner";

import axios from 'axios';



export const getPlanner = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data;
};


export const fetchPlanner = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data; 
};


export const savePlanner = async (userId, tasks) => {
  const res = await fetch(`${BASE_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, tasks })
  });
  return res.json();
};

export const updateTask = async (userId, taskId, updates) => {
  const res = await fetch(`${BASE_URL}/${userId}/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  return res.json();
};

export const deleteTask = async (userId, taskId) => {
  const res = await fetch(`${BASE_URL}/${userId}/${taskId}`, {
    method: "DELETE"
  });
  return res.json();
};
