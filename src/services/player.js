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
    return tokenSingup;
  } catch (error) {
    throw new Error(error);
  }
}

export async function passworRecovery(form) {
  const payload = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };

  try {
    const response = await fetch(`${API_URL}/api/players/recoverypassword`, payload);
    const data = await response.json();
    return data;
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
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveEditPassword(form) {
  try {
    const response = await fetch(`${API_URL}/api/players/changepassword`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(form),
    });
    const data = await (response.json());
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function sessionPlayer() {
  try {
    const response = await fetch(`${API_URL}/api/players/session`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await (response.json());
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveAvatar(formData) {
  try {
    const response = await fetch(`${API_URL}/api/players/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });
    const data = await (response.json());
    console.log({ 'avatar upload': data });
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
