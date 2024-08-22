const API_URL = "https://fakestoreapi.com";

export const getProducts = async (signal) => {
  const response = fetch(`${API_URL}/products`, { signal });
  return (await response).json();
};

export const authenticateUser = async () => {
  const response = fetch(`${API_URL}/users`);
  return (await response).json();
};
