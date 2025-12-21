import apiClient from '../lib/api-client';
import { AuthResponse, User } from '../interface/api.interface';
import { normalizeUser } from '../lib/normalizers';

export const authService = {
    login: async (username: string, password: string): Promise<AuthResponse> => {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        // First, get the token
        const tokenResponse = await apiClient.post<{ access_token: string; token_type: string }>('/auth/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Store token temporarily to make the next request authenticated
        const token = tokenResponse.data.access_token;
        localStorage.setItem('nowait_token', token);

        // Then fetch the user data
        const userResponse = await apiClient.get<User>('/users/me');

        // Return the combined response with normalized user data
        return {
            access_token: token,
            token_type: tokenResponse.data.token_type,
            user: normalizeUser(userResponse.data),
        };
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/users/me');
        return normalizeUser(response.data);
    },

    getAll: async (): Promise<User[]> => {
        const response = await apiClient.get<User[]>('/users/');
        return response.data.map(normalizeUser);
    },

    register: async (userData: Partial<User> & { password?: string }): Promise<User> => {
        const response = await apiClient.post<User>('/users/', userData);
        return normalizeUser(response.data);
    },

    update: async (userId: string, userData: Partial<User>): Promise<User> => {
        const response = await apiClient.patch<User>(`/users/${userId}`, userData);
        return normalizeUser(response.data);
    },

    delete: async (userId: string): Promise<void> => {
        await apiClient.delete(`/users/${userId}`);
    },
};
