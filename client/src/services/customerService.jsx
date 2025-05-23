const API_URL = '/api/customers';

export const fetchCustomers = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addCustomer = async (customerData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
  });
  return await res.json();
};
