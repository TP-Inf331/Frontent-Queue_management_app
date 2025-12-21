import apiClient from '../lib/api-client';
import { Queue } from '../interface/api.interface';
import { normalizeQueue } from '../lib/normalizers';

export const queueService = {
    getAll: async (): Promise<Queue[]> => {
        const response = await apiClient.get<Queue[]>('/queues/');
        return response.data.map(normalizeQueue);
    },

    create: async (queueData: Partial<Queue>): Promise<Queue> => {
        const response = await apiClient.post<Queue>('/queues/', queueData);
        return normalizeQueue(response.data);
    },

    getById: async (id: string): Promise<Queue> => {
        const response = await apiClient.get<Queue>(`/queues/${id}`);
        return normalizeQueue(response.data);
    },

    update: async (id: string, queueData: Partial<Queue>): Promise<Queue> => {
        const response = await apiClient.patch<Queue>(`/queues/${id}`, queueData);
        return normalizeQueue(response.data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/queues/${id}`);
    },
};
