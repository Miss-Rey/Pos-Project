const API_URL = '/api/employees';

export const fetchEmployees = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addEmployee = async (employeeData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  return await res.json();
};
