import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Employees API
export const getEmployees = () => api.get('/employees');
export const createEmployee = (employeeData) => api.post('/employees', employeeData);
export const updateEmployee = (id, employeeData) => api.put(`/employees/${id}`, employeeData);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// Add other API endpoints as needed

export default api;