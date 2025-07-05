import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/notes'; // Change if you have a different backend route

// Save new note
export const saveNote = async (noteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, noteData);
    return response.data;
  } catch (err) {
    console.error('Error saving note:', err);
    throw err;
  }
};

// Get all notes for a user
export const getNotes = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching notes:', err);
    throw err;
  }
};

// Update a single note
export const updateNote = async (userId, noteId, updatedData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${noteId}`, updatedData);
    return response.data;
  } catch (err) {
    console.error('Error updating note:', err);
    throw err;
  }
};

// Delete a note
export const deleteNote = async (userId, noteId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${noteId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting note:', err);
    throw err;
  }
};
