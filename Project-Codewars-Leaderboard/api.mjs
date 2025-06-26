export const fetchData = async (username) => {
  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`
    );
    if (!response.ok) throw new Error(`User ${username} not found`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch", username, error.message);
    return null;
  }
};
