import apiClient from '../lib/api-client';
import { Ticket } from '../interface/api.interface';
import { normalizeTicket } from '../lib/normalizers';

export const ticketService = {
    joinQueue: async (queueId: string): Promise<Ticket> => {
        const response = await apiClient.post<Ticket>('/tickets/', { queue_id: queueId });
        return normalizeTicket(response.data);
    },

    getUserTickets: async (): Promise<Ticket[]> => {
        const response = await apiClient.get<Ticket[]>('/tickets/history');
        return response.data.map(normalizeTicket);
    },

    getById: async (id: string): Promise<Ticket> => {
        const response = await apiClient.get<Ticket>(`/tickets/${id}`);
        return normalizeTicket(response.data);
    },

    cancel: async (ticketId: string): Promise<void> => {
        await apiClient.delete(`/tickets/${ticketId}`);
    },
};
