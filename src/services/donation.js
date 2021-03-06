const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function sendDonation(donation) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(donation),
  };

  try {
    const reps = await fetch(`${API_URL}/api/donations`, payload);
    const data = await reps.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllDonation() {
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const reps = await fetch(`${API_URL}/api/donations`, payload);
    const data = await reps.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
