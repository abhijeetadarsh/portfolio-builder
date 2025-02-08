const API_URL = "http://localhost:3000/api";

export const getPortfolios = async () => {
  const response = await fetch(`${API_URL}/portfolios`);
  if (!response.ok) {
    throw new Error("Failed to fetch portfolios");
  }
  return response.json();
};

export const createPortfolio = async (data) => {
  const response = await fetch(`${API_URL}/portfolios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create portfolio");
  }
  return response.json();
};

export const updatePortfolio = async (id, data) => {
  const response = await fetch(`${API_URL}/portfolios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update portfolio");
  }
  return response.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/portfolios/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
  return response.json();
};
