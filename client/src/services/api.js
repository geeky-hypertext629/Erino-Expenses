
import axios from "axios";

const API_URL = "https://erino-expenses2.vercel.app/api/v1"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // For sending HTTP-only cookies
});

// Auth APIs
export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);
export const logout = () => api.get("/logout");

// Expense APIs
export const getExpenses = (params) => api.get("/expense", { params });
export const addExpense = (data) => api.post("/expense/create", data);
export const editExpense = (id, data) => api.put(`/expense/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expense/${id}`);
export const getExpenseById = (id) => api.get(`/expense/${id}`);
export const insightOnExpense = () => api.get(`/insights`);

export default api;