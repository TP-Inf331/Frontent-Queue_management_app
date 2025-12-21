import apiClient from '../lib/api-client';
import { QueueStats, Ticket } from '../interface/api.interface';

export const operationsService = {
    callNext: async (queueId: string): Promise<Ticket> => {
        const response = await apiClient.post<Ticket>(`/tickets/${queueId}/next`);
        return response.data;
    },

    getQueueStats: async (queueId: string): Promise<QueueStats> => {
        const response = await apiClient.get<QueueStats>(`/reports/queue/${queueId}/stats`);
        return response.data;
    },
};
