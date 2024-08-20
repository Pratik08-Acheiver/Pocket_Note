// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your backend URL

// Fetch all groups
export const fetchGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups/getAllGroup`);
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

// Create a new group
export const createGroup = async (group) => {
  try {
    const response = await axios.post(`${API_URL}/groups/createGroup`, group);
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Delete a group
export const deleteGroup = async (groupId) => {
  try {
    await axios.delete(`${API_URL}/group/${groupId}`);
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};

//update a group name
export const updateGroup = async (groupId, group) => {
  try {
    const response = await fetch(`${API_URL}/updategroup?groupId=${groupId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Assuming the response contains the updated group data
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

// Fetch notes for a specific group
export const fetchNotes = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/notes/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Add a new note
export const addNote = async (groupId, content) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, null, {
      params: { groupId, content },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};



// Delete a note
export const deleteNote = async (noteId) => {
  try {
    await axios.delete(`${API_URL}/note/${noteId}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

//update notes
export const updateNote = (noteId, content) => {
  return fetch(`${API_URL}/updatenote?noteId=${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  }).then(response => response.json());
};