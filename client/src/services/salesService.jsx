const API_URL = '/api/sales';

export const fetchSales = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const getSaleById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
};
