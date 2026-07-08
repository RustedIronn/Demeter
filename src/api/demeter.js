const API_URL = "http://localhost:5000/api";

export async function searchFoods(query) {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search foods.");
  }

  return await response.json();
}

export async function getFood(id) {
  const response = await fetch(`${API_URL}/food/${id}`);

  if (!response.ok) {
    throw new Error("Failed to get food.");
  }

  return await response.json();
}