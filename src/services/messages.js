/* eslint-disable import/prefer-default-export */
const API_URL = 'http://localhost:65535/api';

export async function getAllMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createMessage(message) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  };

  try {
    const response = await fetch(`${API_URL}/messages`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
