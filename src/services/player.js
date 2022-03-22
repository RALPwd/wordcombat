const API_URL = 'http://localhost:65535/api';

export async function getLoginUser(email) {
  try {
    const response = await fetch(`${API_URL}/player`);
    const data = await response.json();
    const filterEmail = data.find((emailUser) => emailUser.email === email);
    return filterEmail;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createPlayer(player) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  };

  try {
    await fetch(`${API_URL}/player`, payload);
    return 'player created';
  } catch (error) {
    throw new Error(error);
  }
}
