const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function createGame(game) {
  try {
    const response = await fetch(`${API_URL}/api/games/newgame`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(game),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function editGame(game) {
  const { id } = game;
  try {
    const response = await fetch(`${API_URL}/api/games/edit/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(game),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
