import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // PHP server URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login.php', credentials);
        return response.data;
    },
    register: async (userData: any) => {
        const response = await api.post('/auth/register.php', userData);
        return response.data;
    },
};

export const projectService = {
    getAll: async () => {
        const response = await api.get('/projects/index.php');
        return response.data;
    },
    create: async (projectData: any) => {
        const response = await api.post('/projects/index.php', projectData);
        return response.data;
    },
};

export const taskService = {
    getAll: async () => {
        const response = await api.get('/tasks/index.php');
        return response.data;
    },
    create: async (taskData: any) => {
        const response = await api.post('/tasks/index.php', taskData);
        return response.data;
    },
};

export const userService = {
    getAll: async () => {
        const response = await api.get('/users/index.php');
        return response.data;
    },
};

export default api;
