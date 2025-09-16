import axios from 'axios';

const API_URL = 'https://school-app-backend-7loi.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

// ... (getTransactions function remains the same)
interface GetTransactionsParams {
    page?: number;
    limit?: number;
    status?: string;
    schoolId?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export const getTransactions = async (params: GetTransactionsParams = {}) => {
    const response = await apiClient.get('/transactions', { params });
    return response.data;
};


/**
 * Fetches the status of a single transaction by its ID.
 * @param transactionId - The collect_id of the transaction.
 */
export const checkTransactionStatus = async (transactionId: string) => {
  const response = await apiClient.get(`/transactions/status/${transactionId}`);
  return response.data;
};

/**
 * Registers a new user.
 */
export const register = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/register', { email, password });
  return response.data;
};

export const createPayment = async (amount: number, callback_url: string) => {
  const response = await apiClient.post('/payments/create-payment', { amount, callback_url });
  return response.data;
};
