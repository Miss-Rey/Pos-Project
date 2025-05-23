const API_URL = '/api/inventory';

export const fetchInventory = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addItem = async (itemData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  return await res.json();
};
