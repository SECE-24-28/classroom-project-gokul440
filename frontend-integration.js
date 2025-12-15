const API_BASE = 'http://localhost:3001/api';

// Authentication
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

// Group Management
export const createGroup = async (name, participants, token) => {
  const response = await fetch(`${API_BASE}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, participants })
  });
  return response.json();
};

// Expense Management
export const addExpense = async (groupId, description, amount, paidBy, token) => {
  const response = await fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ groupId, description, amount, paidBy })
  });
  return response.json();
};

export const getBalances = async (groupId, token) => {
  const response = await fetch(`${API_BASE}/expenses/balances/${groupId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};