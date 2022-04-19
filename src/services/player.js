const API_URL = process.env.REACT_APP_API_BASE_URL;
export async function getLoginUser(form) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };

  try {
    const response = await fetch(`${API_URL}/auth/local/login`, payload);
    const tokenSingup = await response.json();
    if (tokenSingup.token) {
      const { token, player } = tokenSingup;
      localStorage.setItem('token', token);
      return player;
    }

    return tokenSingup;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveEditProfile(player) {
  try {
    const response = await fetch(`${API_URL}/api/players`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(player),
    });
    const data = await (response.json());
    console.log(data);
    return data;
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
    const reps = await fetch(`${API_URL}/api/players`, payload);
    const data = await reps.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function ActivatePlayer(token) {
  try {
    await fetch(`${API_URL}/auth/local/verify-account/${token}`);
  } catch (error) {
    console.log(error);
  }
}
